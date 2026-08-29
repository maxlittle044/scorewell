"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rawScoreToBand } from "@/lib/band-conversion";
import { getPlacement, PLACEMENT_TASK_TYPE } from "@/lib/learning-path";
import { isTargetBand } from "@/lib/learning-path-constants";

export type PlacementSubmission = {
  /** questionId -> chosen option index */
  answers: Record<string, number>;
  targetBand: number;
  /** Seconds from opening the diagnostic to submitting it. */
  durationSeconds?: number;
};

export type PlacementResult =
  | { ok: true; correct: number; total: number; band: number }
  | { ok: false; error: string };

/**
 * Scores the diagnostic and records the learner's goal.
 *
 * The result is written as an ordinary Progress row (taskType "placement") rather than to
 * a table of its own, so it flows into the dashboard, the band trend and the mistake
 * analytics exactly like any other attempt — the diagnostic is practice too.
 */
export async function submitPlacementAction(
  submission: PlacementSubmission,
): Promise<PlacementResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Please log in to save your result." };

  if (!isTargetBand(submission.targetBand)) {
    return { ok: false, error: "Choose a target band between 5 and 9." };
  }

  const placement = await getPlacement();
  if (!placement) return { ok: false, error: "The diagnostic isn't available right now." };

  const details = placement.questions.map((question) => ({
    id: question.id,
    type: question.type,
    correct: submission.answers[question.id] === question.correctIndex,
  }));
  const correct = details.filter((row) => row.correct).length;
  const total = details.length;

  // Scaled to the 40-question paper the band table is built for, as every other
  // short exercise on the site is, so the number is comparable with them.
  const band = rawScoreToBand(Math.round((correct / total) * 40));

  await prisma.$transaction([
    prisma.progress.create({
      data: {
        userId: session.user.id,
        taskType: PLACEMENT_TASK_TYPE,
        contentItemId: placement.id,
        // No skill: the diagnostic mixes reading with grammar and vocabulary, so
        // attributing it to one IELTS skill would misreport it in the per-skill trend.
        score: correct,
        bandScore: band,
        correctCount: correct,
        totalCount: total,
        details,
        durationSeconds:
          submission.durationSeconds && submission.durationSeconds > 0
            ? Math.min(Math.round(submission.durationSeconds), 3 * 60 * 60)
            : null,
      },
    }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { targetBand: submission.targetBand },
    }),
  ]);

  revalidatePath("/learning-path");
  revalidatePath("/dashboard");
  return { ok: true, correct, total, band };
}

export async function setTargetBandAction(targetBand: number): Promise<{ ok: boolean }> {
  const session = await auth();
  if (!session?.user) return { ok: false };
  if (!isTargetBand(targetBand)) return { ok: false };

  await prisma.user.update({ where: { id: session.user.id }, data: { targetBand } });
  revalidatePath("/learning-path");
  return { ok: true };
}
