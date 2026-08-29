"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCreditBalance, spendCredits } from "@/lib/credits";
import {
  HUMAN_REVIEW_ENABLED,
  REVIEW_COST_CREDITS,
  REVIEW_MIN_WORDS,
  REVIEW_TURNAROUND_HOURS,
  countWords,
} from "@/lib/review";
import type { Skill } from "@/generated/prisma/enums";

export type ReviewActionState = { error?: string; success?: boolean };

const TASK_TYPES = ["task1-academic", "task1-general", "task2", "speaking"] as const;

/**
 * Request a paid human review of an answer.
 *
 * The submission is created unpublished — a review request is private work,
 * unlike sharing an answer to the community feed.
 */
export async function requestReviewAction(
  _prevState: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  // Checked here, not only in the UI: with no reviewer behind the queue this
  // would take credits and promise feedback nobody is going to write.
  if (!HUMAN_REVIEW_ENABLED) {
    return { error: "Human examiner review is not accepting requests yet." };
  }

  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to request a review." };
  }

  const answerText = String(formData.get("answerText") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim() || null;
  const taskTypeRaw = String(formData.get("taskType") ?? "");
  const taskType = (TASK_TYPES as readonly string[]).includes(taskTypeRaw) ? taskTypeRaw : "task2";

  if (!answerText) return { error: "Paste your answer before requesting a review." };
  if (countWords(answerText) < REVIEW_MIN_WORDS) {
    return { error: `Answers need at least ${REVIEW_MIN_WORDS} words for a useful review.` };
  }

  const balance = await getCreditBalance(session.user.id);
  if (balance < REVIEW_COST_CREDITS) {
    return {
      error: `A review costs ${REVIEW_COST_CREDITS} credits — you have ${balance}. Buy credits from the pricing page.`,
    };
  }

  const skill: Skill = taskType === "speaking" ? "SPEAKING" : "WRITING";

  // Charge first: if the spend loses a race the request is never created, which
  // is the safe direction. Creating the request first could hand out a free review.
  const charged = await spendCredits(
    session.user.id,
    REVIEW_COST_CREDITS,
    "Human examiner review",
  );
  if (!charged) {
    return { error: "Could not take the credits for this review. Please try again." };
  }

  try {
    await prisma.submission.create({
      data: {
        userId: session.user.id,
        title,
        taskType,
        skill,
        answerText,
        published: false,
        reviewRequest: {
          create: {
            userId: session.user.id,
            turnaroundHours: REVIEW_TURNAROUND_HOURS,
            creditsCharged: REVIEW_COST_CREDITS,
          },
        },
      },
    });
  } catch (error) {
    // Refund rather than silently keeping credits for work that was never queued.
    await prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        delta: REVIEW_COST_CREDITS,
        reason: "Refund: review request failed",
      },
    });
    console.error("requestReviewAction failed:", error);
    return { error: "Something went wrong creating the request. Your credits were refunded." };
  }

  revalidatePath("/reviews");
  return { success: true };
}

/** Cancel a request that no reviewer has picked up, refunding what was charged. */
export async function cancelReviewAction(
  _prevState: ReviewActionState,
  formData: FormData,
): Promise<ReviewActionState> {
  const session = await auth();
  if (!session?.user) return { error: "Please log in." };

  const id = String(formData.get("requestId") ?? "");
  const request = await prisma.reviewRequest.findUnique({ where: { id } });

  if (!request || request.userId !== session.user.id) {
    return { error: "That request does not exist." };
  }
  if (request.status !== "PENDING") {
    return { error: "This request is already being worked on and cannot be cancelled." };
  }

  await prisma.$transaction([
    prisma.reviewRequest.update({ where: { id }, data: { status: "CANCELLED" } }),
    prisma.creditTransaction.create({
      data: {
        userId: session.user.id,
        delta: request.creditsCharged,
        reason: "Refund: review cancelled",
      },
    }),
  ]);

  revalidatePath("/reviews");
  return { success: true };
}
