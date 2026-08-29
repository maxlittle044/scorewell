"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getConversationTopic } from "@/lib/content/ai-conversations";
import { describeAiError } from "./anthropic";
import {
  ChatMessagesSchema,
  MAX_LEARNER_TURNS,
  countLearnerTurns,
  nextExaminerTurn,
  reviewConversation,
  type ChatMessage,
  type ConversationFeedback,
} from "./conversation";
import { checkAiQuota, quotaMessage, recordAiUsage } from "./usage";
import type { QuotaSource } from "./usage";

export type ConversationState = {
  conversationId?: string;
  messages?: ChatMessage[];
  turnsUsed?: number;
  turnsRemaining?: number;
  feedback?: ConversationFeedback;
  error?: string;
  limitReached?: boolean;
};

/** Loads a conversation and proves the caller owns it. */
async function loadOwned(conversationId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Please log in to continue this conversation." } as const;

  const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
  if (!conversation || conversation.userId !== session.user.id) {
    return { error: "That conversation could not be found." } as const;
  }

  const parsed = ChatMessagesSchema.safeParse(conversation.messages);
  if (!parsed.success) return { error: "That conversation could not be read." } as const;

  return { conversation, messages: parsed.data } as const;
}

function stateFrom(
  conversationId: string,
  messages: ChatMessage[],
  feedback?: ConversationFeedback,
): ConversationState {
  const turnsUsed = countLearnerTurns(messages);
  return {
    conversationId,
    messages,
    turnsUsed,
    turnsRemaining: Math.max(0, MAX_LEARNER_TURNS - turnsUsed),
    feedback,
  };
}

/**
 * Opens a conversation. The opener is stored content, not a model call, so
 * this costs nothing — the AI use is charged on the first successful examiner
 * reply instead. Quota is still checked here so a learner who is out of uses
 * finds out before typing an answer rather than after.
 */
export async function startConversationAction(slug: string): Promise<ConversationState> {
  const topic = await getConversationTopic(slug);
  if (!topic) return { error: "That conversation topic isn't available." };

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  const messages: ChatMessage[] = [{ role: "assistant", content: topic.opener }];

  try {
    const conversation = await prisma.conversation.create({
      data: { userId: quota.userId, slug: topic.slug, title: topic.title, messages },
    });
    return stateFrom(conversation.id, messages);
  } catch (error) {
    console.error("startConversationAction failed:", error);
    return { error: "Couldn't start the conversation. Please try again." };
  }
}

export async function sendMessageAction(
  conversationId: string,
  text: string,
): Promise<ConversationState> {
  const answer = text.trim();
  if (!answer) return { error: "Type an answer first." };

  const owned = await loadOwned(conversationId);
  if ("error" in owned) return { error: owned.error };

  const topic = await getConversationTopic(owned.conversation.slug);
  if (!topic) return { error: "That conversation topic isn't available." };

  const turnsUsed = countLearnerTurns(owned.messages);
  if (turnsUsed >= MAX_LEARNER_TURNS) {
    return {
      ...stateFrom(conversationId, owned.messages),
      error: `This conversation has reached its ${MAX_LEARNER_TURNS}-turn limit. Ask for feedback, or start a new one.`,
    };
  }

  // One AI use per conversation, charged on the first reply that actually
  // succeeds — later turns and the closing feedback are included in it.
  const isFirstTurn = turnsUsed === 0;
  // Hoisted out of the block below so the eventual recordAiUsage call knows
  // which allowance covered this conversation and can spend a credit if needed.
  let quotaSource: QuotaSource = "free";
  if (isFirstTurn) {
    const quota = await checkAiQuota();
    if (!quota.allowed) {
      return {
        ...stateFrom(conversationId, owned.messages),
        error: quotaMessage(quota.reason),
        limitReached: quota.reason === "limit-reached",
      };
    }
    quotaSource = quota.source;
  }

  const withAnswer: ChatMessage[] = [...owned.messages, { role: "user", content: answer }];

  try {
    const reply = await nextExaminerTurn({ topic, messages: withAnswer });
    const messages: ChatMessage[] = [...withAnswer, { role: "assistant", content: reply }];
    await prisma.conversation.update({ where: { id: conversationId }, data: { messages } });
    if (isFirstTurn) {
      await recordAiUsage(
        owned.conversation.userId,
        `ai-conversation:${owned.conversation.slug}`,
        quotaSource,
      );
    }
    return stateFrom(conversationId, messages);
  } catch (error) {
    console.error("sendMessageAction failed:", error);
    // The learner's turn isn't saved, so they can retry without losing it.
    return { ...stateFrom(conversationId, owned.messages), error: describeAiError(error) };
  }
}

export async function requestFeedbackAction(conversationId: string): Promise<ConversationState> {
  const owned = await loadOwned(conversationId);
  if ("error" in owned) return { error: owned.error };

  if (countLearnerTurns(owned.messages) === 0) {
    return {
      ...stateFrom(conversationId, owned.messages),
      error: "Answer at least one question before asking for feedback.",
    };
  }

  const topic = await getConversationTopic(owned.conversation.slug);
  if (!topic) return { error: "That conversation topic isn't available." };

  try {
    const feedback = await reviewConversation({ topic, messages: owned.messages });
    await prisma.conversation.update({ where: { id: conversationId }, data: { feedback } });
    return stateFrom(conversationId, owned.messages, feedback);
  } catch (error) {
    console.error("requestFeedbackAction failed:", error);
    return { ...stateFrom(conversationId, owned.messages), error: describeAiError(error) };
  }
}
