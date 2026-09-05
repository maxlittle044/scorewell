import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { anthropic, FALLBACKS, FALLBACK_BETAS, throwIfRefused } from "./anthropic";
import type { ConversationTopic } from "@/lib/content/ai-conversations";

/**
 * A conversation costs one AI use, not one per turn — five turns would
 * otherwise exhaust a free user's whole monthly allowance. The cap keeps that
 * bounded and matches the real length of a Speaking Part 1 (4-5 minutes).
 */
export const MAX_LEARNER_TURNS = 10;

export type ChatRole = "assistant" | "user";
export type ChatMessage = { role: ChatRole; content: string };

export const ChatMessageSchema = z.object({
  role: z.enum(["assistant", "user"]),
  content: z.string(),
});
export const ChatMessagesSchema = z.array(ChatMessageSchema);

export function countLearnerTurns(messages: ChatMessage[]): number {
  return messages.filter((m) => m.role === "user").length;
}

function examinerSystemPrompt(topic: ConversationTopic, turnsUsed: number): string {
  const remaining = MAX_LEARNER_TURNS - turnsUsed;

  return `You are an IELTS Speaking examiner running a ${topic.part} conversation on the topic "${topic.title}". You are talking with a candidate who is practising.

Steer the conversation through these areas as it develops, in whatever order feels natural:
${topic.followUpAreas.map((a) => `- ${a}`).join("\n")}

How to behave:
- Speak like a real examiner in conversation: warm but neutral, never gushing. Do not praise every answer.
- Keep each turn SHORT — one or two sentences, ending in a single clear question. This is a spoken exchange, not an essay.
- Ask ONE question at a time. Never stack two questions in a turn.
- React to what the candidate actually said before moving on — pick up a detail they mentioned.
- If an answer is very short, push for development ("Why is that?", "Can you give me an example?") rather than moving straight to a new area.
- Do NOT correct their English, give band scores, or comment on their grammar during the conversation. A real examiner does not, and detailed feedback comes separately at the end.
- Do not use markdown, headings, bullets or emoji. Plain spoken English only.
${remaining <= 1 ? "\nThis is the FINAL turn of the conversation. Do not ask another question — thank the candidate and close the conversation naturally, as an examiner would at the end of a part." : ""}`;
}

export async function nextExaminerTurn(params: {
  topic: ConversationTopic;
  messages: ChatMessage[];
}): Promise<string> {
  const turnsUsed = countLearnerTurns(params.messages);

  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    betas: [...FALLBACK_BETAS],
    fallbacks: FALLBACKS,
    max_tokens: 4000,
    output_config: { effort: "low" },
    system: examinerSystemPrompt(params.topic, turnsUsed),
    messages: params.messages.map((m) => ({ role: m.role, content: m.content })),
  });

  throwIfRefused(response);

  let text = "";
  for (const block of response.content) {
    if (block.type === "text") text += block.text;
  }
  return text.trim();
}

// Same honesty constraint as the standalone speaking checker: IELTS Speaking
// has four criteria, but Pronunciation cannot be judged from typed text, so
// only the three that survive are scored and the UI says so.
const ConversationFeedbackSchema = z.object({
  overallBand: z.number().min(0).max(9),
  criteria: z
    .array(
      z.object({
        name: z.string(),
        band: z.number().min(0).max(9),
        feedback: z.string(),
      }),
    )
    .length(3),
  strengths: z.array(z.string()).min(1).max(5),
  improvements: z.array(z.string()).min(1).max(5),
  /** Concrete rewrites of things the learner actually said. */
  rephrasings: z
    .array(z.object({ said: z.string(), better: z.string(), why: z.string() }))
    .max(4),
});

export type ConversationFeedback = z.infer<typeof ConversationFeedbackSchema>;

export const ConversationFeedbackParseSchema = ConversationFeedbackSchema;

export async function reviewConversation(params: {
  topic: ConversationTopic;
  messages: ChatMessage[];
}): Promise<ConversationFeedback> {
  const transcript = params.messages
    .map((m) => `${m.role === "assistant" ? "EXAMINER" : "CANDIDATE"}: ${m.content}`)
    .join("\n\n");

  const response = await anthropic.beta.messages.parse({
    model: "claude-opus-5",
    betas: [...FALLBACK_BETAS],
    fallbacks: FALLBACKS,
    max_tokens: 16000,
    output_config: { effort: "medium", format: zodOutputFormat(ConversationFeedbackSchema) },
    system: `You are an expert IELTS Speaking examiner. You are given the transcript of an IELTS Speaking ${params.topic.part} practice conversation on the topic "${params.topic.title}".

Assess ONLY the CANDIDATE's turns, using the official IELTS Speaking band descriptors (0-9, half bands allowed). Return exactly three criteria in this order: "Fluency and Coherence", "Lexical Resource", "Grammatical Range and Accuracy".

Do NOT score Pronunciation — the candidate typed these answers, so there is no speech to assess. The overall band is your best estimate from these three criteria only.

For "rephrasings", quote short phrases the candidate ACTUALLY used and show a stronger version, with a one-line reason. Never invent quotes they did not say. If their English was already strong throughout, return fewer rephrasings rather than manufacturing weak ones.

Be honest and specific. Do not inflate scores, and do not praise generically.`,
    messages: [{ role: "user", content: transcript }],
  });

  throwIfRefused(response);

  if (!response.parsed_output) {
    throw new Error("The AI response could not be parsed.");
  }

  return response.parsed_output;
}
