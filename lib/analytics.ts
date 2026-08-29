import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Mistake analytics (site-build-prompt.md section 6 — a Premium feature).
 *
 * Everything here is derived from rows the learner actually generated. Where
 * there isn't enough data to say anything, the caller renders an honest empty
 * state rather than a chart of noise.
 */

const OutcomeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  correct: z.boolean(),
});
const OutcomesSchema = z.array(OutcomeSchema);

/** A breakdown row: how many attempts, how many right, in one bucket. */
export type Breakdown = {
  label: string;
  correct: number;
  total: number;
  accuracy: number;
};

export type Analytics = {
  /** Attempts that carry a per-question breakdown. */
  analysedAttempts: number;
  /** Attempts recorded before analytics existed, so they have no breakdown. */
  attemptsWithoutDetail: number;
  totalQuestions: number;
  totalCorrect: number;
  byQuestionType: Breakdown[];
  bySkill: Breakdown[];
  byTopic: Breakdown[];
  /** The weakest bucket with enough attempts to be worth naming. */
  weakest: Breakdown | null;
};

const MIN_QUESTIONS_TO_JUDGE = 3;

function toBreakdowns(counts: Map<string, { correct: number; total: number }>): Breakdown[] {
  return [...counts.entries()]
    .map(([label, { correct, total }]) => ({
      label,
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total);
}

function bump(
  counts: Map<string, { correct: number; total: number }>,
  key: string,
  correct: boolean,
) {
  const entry = counts.get(key) ?? { correct: 0, total: 0 };
  entry.total += 1;
  if (correct) entry.correct += 1;
  counts.set(key, entry);
}

export async function getAnalytics(userId: string): Promise<Analytics> {
  const rows = await prisma.progress.findMany({
    where: { userId },
    orderBy: { completedAt: "desc" },
    include: { contentItem: { select: { topic: true } } },
  });

  const byType = new Map<string, { correct: number; total: number }>();
  const bySkill = new Map<string, { correct: number; total: number }>();
  const byTopic = new Map<string, { correct: number; total: number }>();

  let analysedAttempts = 0;
  let attemptsWithoutDetail = 0;
  let totalQuestions = 0;
  let totalCorrect = 0;

  for (const row of rows) {
    const parsed = OutcomesSchema.safeParse(row.details);
    if (!parsed.success || parsed.data.length === 0) {
      attemptsWithoutDetail += 1;
      continue;
    }
    analysedAttempts += 1;

    // Prefer the content item's own topic; fall back to the attempt's label so
    // unlinked exercises still land somewhere meaningful.
    const topic = row.contentItem?.topic ?? row.taskType ?? null;

    for (const outcome of parsed.data) {
      totalQuestions += 1;
      if (outcome.correct) totalCorrect += 1;
      if (outcome.type) bump(byType, outcome.type, outcome.correct);
      if (row.skill) bump(bySkill, row.skill, outcome.correct);
      if (topic) bump(byTopic, topic, outcome.correct);
    }
  }

  const byQuestionType = toBreakdowns(byType);
  const weakest =
    byQuestionType.find((b) => b.total >= MIN_QUESTIONS_TO_JUDGE && b.accuracy < 1) ?? null;

  return {
    analysedAttempts,
    attemptsWithoutDetail,
    totalQuestions,
    totalCorrect,
    byQuestionType,
    bySkill: toBreakdowns(bySkill),
    byTopic: toBreakdowns(byTopic),
    weakest,
  };
}

export { MIN_QUESTIONS_TO_JUDGE };
