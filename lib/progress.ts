import { prisma } from "@/lib/prisma";
import type { Skill } from "@/generated/prisma/enums";

/**
 * Longest single attempt we'll count as study time. Even the full Reading paper is an hour,
 * so anything beyond three is a tab left open rather than work done — counting it would
 * quietly inflate the dashboard's total.
 */
export const MAX_ATTEMPT_SECONDS = 3 * 60 * 60;

/** Discards nonsense (negative, absurd, non-finite) rather than storing it. */
export function sanitiseDuration(seconds: number | undefined): number | null {
  if (seconds === undefined || !Number.isFinite(seconds) || seconds <= 0) return null;
  return Math.min(Math.round(seconds), MAX_ATTEMPT_SECONDS);
}

/**
 * Records an AI-scored Writing or Speaking attempt as a `Progress` row.
 *
 * Until this existed, only the exam runner wrote progress, so Reading and Listening were the
 * only skills a learner had any history for: the dashboard's band trend could not plot
 * Writing or Speaking, the Exam Library could not show a result on a writing test, and
 * "Saved progress & history" — a line already on the pricing table — quietly meant half of
 * what it says. An essay was scored and then forgotten.
 *
 * **Deliberately not a `"use server"` export.** Everything exported from an action module is
 * callable by anything that can reach the site, and a band score that a client could post
 * directly would be a band score learners could set themselves. This is called from the AI
 * actions, after the model has returned a score, and cannot be reached from a browser.
 *
 * Each check writes a row, so re-checking a revised draft counts as another attempt — which
 * is what it is. There is no objective breakdown to store: `details`, `correctCount` and
 * `totalCount` stay null, and every reader of those already tolerates their absence.
 */
export async function recordAiBandProgress(params: {
  userId: string;
  skill: Skill;
  /** The model's overall band for the attempt. */
  band: number;
  /** Human-readable label — the test's title where there is one, else the tool's name. */
  taskType: string;
  /** Set when the attempt was made on a practice test's own page. */
  contentItemId?: string | null;
  /**
   * Seconds from opening the test to asking for the check. Sent only from a test page,
   * where the learner is sitting the task in front of us; a tool-page check is left
   * untimed because the essay pasted into it may have been written anywhere.
   */
  durationSeconds?: number;
}): Promise<void> {
  try {
    // The id arrives from a form field, so it is checked rather than trusted: a stale or
    // invented one would otherwise fail the foreign key and take an AI result the learner
    // has already paid a use for down with it.
    const contentItemId = params.contentItemId
      ? (
          await prisma.contentItem.findUnique({
            where: { id: params.contentItemId },
            select: { id: true },
          })
        )?.id ?? null
      : null;

    await prisma.progress.create({
      data: {
        userId: params.userId,
        skill: params.skill,
        taskType: params.taskType,
        contentItemId,
        bandScore: params.band,
        durationSeconds: sanitiseDuration(params.durationSeconds),
      },
    });
  } catch (error) {
    // Never let bookkeeping swallow the feedback. The learner spent a use to get this score;
    // losing the history row is a smaller failure than losing the result.
    console.error("recordAiBandProgress failed:", error);
  }
}
