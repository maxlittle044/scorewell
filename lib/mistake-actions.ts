"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MAX_BOX, nextBox, nextDueAt } from "@/lib/flashcards";

export type ReviewMistakeResult = {
  ok: boolean;
  /** The server's own marking, so the screen never disagrees with the schedule. */
  correct?: boolean;
  box?: number;
  error?: string;
};

const QuizDataSchema = z.object({
  questions: z.array(z.object({ id: z.string(), correctIndex: z.number() })),
});

/**
 * Records one answer in a mistake-review session and reschedules the question.
 *
 * The answer is re-marked here against the stored `correctIndex` rather than trusting the
 * client's verdict. The review screen already knows the right answer — it has to, to show
 * feedback — so a client that simply reported "correct" every time could otherwise retire a
 * question the learner has never actually got right, and quietly empty their own queue.
 *
 * The question is also checked to belong to the item it claims, for the same reason the deck
 * checks its card keys: without it a crafted request could plant rows for questions that are
 * in no exercise, and every later "mistakes due" count would be wrong.
 */
export async function reviewMistakeAction(params: {
  contentItemId: string;
  questionId: string;
  chosenIndex: number;
}): Promise<ReviewMistakeResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Please log in to save your progress." };

  const item = await prisma.contentItem.findFirst({
    where: { id: params.contentItemId, contentType: "MINI_EXERCISE", published: true },
    select: { data: true },
  });
  if (!item) return { ok: false, error: "That exercise is no longer available." };

  const parsed = QuizDataSchema.safeParse(item.data);
  const question = parsed.success
    ? parsed.data.questions.find((q) => q.id === params.questionId)
    : undefined;
  if (!question) return { ok: false, error: "That question isn't part of this exercise." };

  const correct = question.correctIndex === params.chosenIndex;

  const where = {
    userId_contentItemId_questionId: {
      userId: session.user.id,
      contentItemId: params.contentItemId,
      questionId: params.questionId,
    },
  };

  const existing = await prisma.mistakeReview.findUnique({ where });
  // As with flashcards, a question meeting review for the first time enters box 1 either
  // way: it is already a known mistake, so one correct answer is not evidence of much.
  const box = existing ? nextBox(existing.box, correct ? "good" : "again") : 1;

  await prisma.mistakeReview.upsert({
    where,
    create: {
      userId: session.user.id,
      contentItemId: params.contentItemId,
      questionId: params.questionId,
      box,
      dueAt: nextDueAt(box),
      reviewCount: 1,
    },
    update: {
      box,
      dueAt: nextDueAt(box),
      lastReviewedAt: new Date(),
      reviewCount: { increment: 1 },
    },
  });

  return { ok: true, correct, box: Math.min(box, MAX_BOX) };
}
