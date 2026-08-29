import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { Skill } from "@/generated/prisma/enums";

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

/**
 * Band-score trend over time (site-build-prompt.md section 6, "average band score trend").
 *
 * The dashboard already showed the latest band per skill, which says where a learner is
 * but not whether they're improving. This adds the time series behind it.
 *
 * Only attempts that actually produced a band are plotted. Writing and Speaking practice
 * carries no band unless it was evaluated, so those points appear when they exist rather
 * than being interpolated — a gap in the line is a real gap in the record.
 */

export type TrendPoint = {
  /** Epoch ms, so the caller can format in the reader's locale. */
  at: number;
  band: number;
  label: string;
};

export type SkillTrend = {
  skill: Skill;
  points: TrendPoint[];
  first: number;
  latest: number;
  /** Positive means improving. Null when a single attempt gives nothing to compare. */
  change: number | null;
};

export type BandTrend = {
  /** Chronological, every banded attempt across all skills. */
  overall: TrendPoint[];
  bySkill: SkillTrend[];
  best: number | null;
  latest: number | null;
  /** Latest minus first across the whole record. Null until there are two points. */
  change: number | null;
};

/** Enough points that a line means something rather than showing a single dot. */
const MIN_POINTS_FOR_TREND = 2;

export async function getBandTrend(userId: string): Promise<BandTrend> {
  const rows = await prisma.progress.findMany({
    where: { userId, bandScore: { not: null } },
    orderBy: { completedAt: "asc" },
    select: {
      skill: true,
      bandScore: true,
      completedAt: true,
      taskType: true,
      contentItem: { select: { title: true } },
    },
  });

  const overall: TrendPoint[] = rows.map((row) => ({
    at: row.completedAt.getTime(),
    band: row.bandScore!,
    label: row.contentItem?.title ?? row.taskType ?? "Practice",
  }));

  const grouped = new Map<Skill, TrendPoint[]>();
  for (const [index, row] of rows.entries()) {
    if (!row.skill) continue;
    grouped.set(row.skill, [...(grouped.get(row.skill) ?? []), overall[index]]);
  }

  const bySkill: SkillTrend[] = [...grouped.entries()]
    .map(([skill, points]) => {
      const first = points[0].band;
      const latest = points[points.length - 1].band;
      return {
        skill,
        points,
        first,
        latest,
        change: points.length >= MIN_POINTS_FOR_TREND ? round1(latest - first) : null,
      };
    })
    .sort((a, b) => a.skill.localeCompare(b.skill));

  return {
    overall,
    bySkill,
    best: overall.length ? Math.max(...overall.map((point) => point.band)) : null,
    latest: overall.length ? overall[overall.length - 1].band : null,
    change:
      overall.length >= MIN_POINTS_FOR_TREND
        ? round1(overall[overall.length - 1].band - overall[0].band)
        : null,
  };
}

/** Band deltas are halves; float subtraction otherwise yields things like 0.30000000000000004. */
function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export { MIN_POINTS_FOR_TREND };

/**
 * Total study time (site-build-prompt.md section 6).
 *
 * Counts only attempts that were actually measured. Rows written before timing existed
 * carry no duration and are reported separately rather than being estimated — a total
 * padded with guesses would be worse than a total with a caveat.
 *
 * Completed simulation sittings are included from their own start and finish times, since
 * a sitting is study time that never writes a Progress row.
 */
export type StudyTime = {
  totalSeconds: number;
  /** Attempts contributing to the total. */
  measuredAttempts: number;
  /** Attempts too old to have been timed, so excluded from it. */
  untimedAttempts: number;
  sittings: number;
};

export async function getStudyTime(userId: string): Promise<StudyTime> {
  const [timed, untimedAttempts, sittings] = await Promise.all([
    prisma.progress.aggregate({
      where: { userId, durationSeconds: { not: null } },
      _sum: { durationSeconds: true },
      _count: { _all: true },
    }),
    prisma.progress.count({ where: { userId, durationSeconds: null } }),
    prisma.simulationAttempt.findMany({
      where: { userId, status: "COMPLETED", completedAt: { not: null } },
      select: { startedAt: true, completedAt: true },
    }),
  ]);

  // A sitting's clock is wall-clock, so cap each one at its own generous ceiling for the
  // same reason single attempts are capped.
  const sittingSeconds = sittings.reduce((sum, sitting) => {
    const seconds = (sitting.completedAt!.getTime() - sitting.startedAt.getTime()) / 1000;
    if (!Number.isFinite(seconds) || seconds <= 0) return sum;
    return sum + Math.min(Math.round(seconds), 4 * 60 * 60);
  }, 0);

  return {
    totalSeconds: (timed._sum.durationSeconds ?? 0) + sittingSeconds,
    measuredAttempts: timed._count._all,
    untimedAttempts,
    sittings: sittings.length,
  };
}

/** "1h 24m" / "12m" / "45s" — whichever units actually carry information. */
export function formatStudyTime(totalSeconds: number): string {
  if (totalSeconds < 60) return `${Math.max(0, Math.round(totalSeconds))}s`;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  if (!hours) return `${minutes}m`;
  return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
}
