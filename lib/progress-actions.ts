"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rawScoreToBand } from "@/lib/band-conversion";
// One definition of the cap, shared with the AI-scored path so both kinds of attempt are
// measured to the same rules.
import { sanitiseDuration } from "@/lib/progress";
import type { Skill } from "@/generated/prisma/enums";

/** One question's outcome, stored on Progress.details for mistake analytics. */
export type QuestionOutcome = { id: string; type?: string; correct: boolean };

export async function saveQuizProgressAction(params: {
  skill?: Skill;
  title: string;
  contentItemId?: string;
  correctCount: number;
  totalCount: number;
  details?: QuestionOutcome[];
  /** Seconds from opening the exercise to submitting it. */
  durationSeconds?: number;
}): Promise<{ saved: boolean }> {
  const session = await auth();
  if (!session?.user) {
    return { saved: false };
  }

  // Quizzes here are shorter than a real 40-question test — scale to the
  // 40-question raw-score table so the band estimate stays meaningful.
  const scaledCorrect =
    params.totalCount > 0 ? Math.round((params.correctCount / params.totalCount) * 40) : 0;
  const bandScore = rawScoreToBand(scaledCorrect);

  await prisma.progress.create({
    data: {
      userId: session.user.id,
      skill: params.skill ?? null,
      taskType: params.title,
      contentItemId: params.contentItemId ?? null,
      score: params.correctCount,
      bandScore,
      correctCount: params.correctCount,
      totalCount: params.totalCount,
      details: params.details ?? undefined,
      durationSeconds: sanitiseDuration(params.durationSeconds),
    },
  });

  return { saved: true };
}
