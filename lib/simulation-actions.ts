"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rawScoreToBand, roundBandAverage } from "@/lib/band-conversion";
import type { QuestionOutcome } from "@/lib/progress-actions";
import { getSimulationSet } from "@/lib/exam/simulation";
import type { LegSkill } from "@/lib/exam/simulation";
import { describeAiError } from "@/lib/ai/anthropic";
import { checkAiQuota, quotaMessage, recordAiUsage } from "@/lib/ai/usage";
import { checkWritingAnswer, type WritingTaskType } from "@/lib/ai/writing-checker";
import { checkSpeakingAnswer, type SpeakingPart } from "@/lib/ai/speaking-checker";
import type { CriterionResult } from "@/components/tools/criterion-feedback";

/**
 * Server actions for a full four-skill sitting.
 *
 * A sitting deliberately writes no `Progress` rows: those stay the record of standalone
 * per-skill practice, and mixing a sitting's legs into them would double-count a learner's
 * history and distort the dashboard's per-skill trend. The sitting's own row is the record.
 */

/** Every write re-checks ownership — an attempt id in the client is not authorisation. */
async function ownedAttempt(attemptId: string) {
  const session = await auth();
  if (!session?.user) return null;
  return prisma.simulationAttempt.findFirst({
    where: { id: attemptId, userId: session.user.id },
  });
}

export type StartResult =
  | { ok: true; attemptId: string; startedAt: number; resumed: boolean }
  | { ok: false; reason: "not-logged-in" };

/**
 * Starts a sitting, or hands back the one already running for this set.
 *
 * Resuming rather than restarting is what makes the global clock honest: it is derived
 * from `startedAt` on every render, so closing the tab does not pause the exam and
 * reopening it cannot buy more time.
 */
export async function startSimulationAction(sourceTestSet: string): Promise<StartResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, reason: "not-logged-in" };

  const existing = await prisma.simulationAttempt.findFirst({
    where: { userId: session.user.id, sourceTestSet, status: "IN_PROGRESS" },
    orderBy: { startedAt: "desc" },
  });
  if (existing) {
    return {
      ok: true,
      attemptId: existing.id,
      startedAt: existing.startedAt.getTime(),
      resumed: true,
    };
  }

  const attempt = await prisma.simulationAttempt.create({
    data: { userId: session.user.id, sourceTestSet },
  });
  return { ok: true, attemptId: attempt.id, startedAt: attempt.startedAt.getTime(), resumed: false };
}

/**
 * Records one auto-gradable leg. Scaled to the standard 40-question paper so a band from
 * a short practice test is comparable with one from a full-length paper, matching what
 * the standalone runner already does.
 */
export async function saveObjectiveLegAction(params: {
  attemptId: string;
  skill: Extract<LegSkill, "LISTENING" | "READING">;
  correctCount: number;
  totalCount: number;
  details: QuestionOutcome[];
}): Promise<{ saved: boolean; band?: number }> {
  const attempt = await ownedAttempt(params.attemptId);
  if (!attempt) return { saved: false };

  const scaled =
    params.totalCount > 0 ? Math.round((params.correctCount / params.totalCount) * 40) : 0;
  const band = rawScoreToBand(scaled);

  await prisma.simulationAttempt.update({
    where: { id: attempt.id },
    data:
      params.skill === "LISTENING"
        ? { listeningBand: band, listeningDetails: params.details }
        : { readingBand: band, readingDetails: params.details },
  });

  return { saved: true, band };
}

/**
 * Records a Writing or Speaking response. No band is written: a band for either skill
 * requires an evaluation, and inferring one from the text alone would be an invented
 * score. They stay null until an evaluation fills them in.
 */
export async function saveProducedLegAction(params: {
  attemptId: string;
  skill: Extract<LegSkill, "WRITING" | "SPEAKING">;
  text: string;
}): Promise<{ saved: boolean }> {
  const attempt = await ownedAttempt(params.attemptId);
  if (!attempt) return { saved: false };

  await prisma.simulationAttempt.update({
    where: { id: attempt.id },
    data:
      params.skill === "WRITING"
        ? { writingResponse: params.text }
        : { speakingTranscript: params.text },
  });

  return { saved: true };
}

export type FinishResult = {
  saved: boolean;
  listeningBand?: number | null;
  readingBand?: number | null;
  overallBand?: number | null;
};

/**
 * Closes the sitting.
 *
 * `overallBand` is written only once all four skills carry a band, because an IELTS
 * overall is the average of four — averaging the two auto-gradable ones and labelling
 * the result "overall" would overstate what we actually measured. Until Writing and
 * Speaking are evaluated it stays null and the results screen says so.
 */
export async function finishSimulationAction(attemptId: string): Promise<FinishResult> {
  const attempt = await ownedAttempt(attemptId);
  if (!attempt) return { saved: false };

  const bands = [
    attempt.listeningBand,
    attempt.readingBand,
    attempt.writingBand,
    attempt.speakingBand,
  ];
  const complete = bands.every((band): band is number => band !== null);
  const overallBand = complete
    ? roundBandAverage(bands.reduce((sum, band) => sum + band, 0) / bands.length)
    : null;

  const updated = await prisma.simulationAttempt.update({
    where: { id: attempt.id },
    data: { status: "COMPLETED", completedAt: new Date(), overallBand },
  });

  return {
    saved: true,
    listeningBand: updated.listeningBand,
    readingBand: updated.readingBand,
    overallBand: updated.overallBand,
  };
}

/**
 * Recomputes the overall band after an evaluation fills in a missing skill, using the
 * same all-four rule as `finishSimulationAction`.
 */
async function recomputeOverall(attemptId: string): Promise<number | null> {
  const attempt = await prisma.simulationAttempt.findUnique({ where: { id: attemptId } });
  if (!attempt) return null;

  const bands = [
    attempt.listeningBand,
    attempt.readingBand,
    attempt.writingBand,
    attempt.speakingBand,
  ];
  if (!bands.every((band): band is number => band !== null)) return null;

  const overallBand = roundBandAverage(bands.reduce((sum, band) => sum + band, 0) / bands.length);
  await prisma.simulationAttempt.update({ where: { id: attemptId }, data: { overallBand } });
  return overallBand;
}

export type EvaluateResult = {
  result?: CriterionResult;
  overallBand?: number | null;
  error?: string;
  limitReached?: boolean;
};

const WRITING_TASK_TYPES: WritingTaskType[] = ["task1-academic", "task1-general", "task2"];
const SPEAKING_PARTS: SpeakingPart[] = ["part1", "part2", "part3"];

/**
 * Evaluates the Writing or Speaking leg of a finished sitting and records the band.
 *
 * Deliberately a separate, learner-initiated step rather than part of handing the section
 * in: the sitting itself must work with AI switched off, so nothing in the exam flow may
 * depend on an API call. This is also why it runs through the same quota gate as the
 * standalone tools — a sitting is not a way around the free allowance.
 */
export async function evaluateSimulationLegAction(params: {
  attemptId: string;
  skill: Extract<LegSkill, "WRITING" | "SPEAKING">;
}): Promise<EvaluateResult> {
  const attempt = await ownedAttempt(params.attemptId);
  if (!attempt) return { error: "That sitting is no longer available." };

  const text =
    params.skill === "WRITING" ? attempt.writingResponse : attempt.speakingTranscript;
  if (!text?.trim()) {
    return { error: "There's nothing recorded for that section to evaluate." };
  }

  const set = await getSimulationSet(attempt.sourceTestSet);
  if (!set) return { error: "The tests behind this sitting are no longer available." };

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  try {
    if (params.skill === "WRITING") {
      const taskType = WRITING_TASK_TYPES.includes(set.writing.taskType as WritingTaskType)
        ? (set.writing.taskType as WritingTaskType)
        : "task2";

      const result = await checkWritingAnswer({
        taskType,
        essayText: text,
        examPrompt: set.writing.prompt,
      });
      await recordAiUsage(quota.userId, `simulation-writing:${taskType}`, quota.source);
      await prisma.simulationAttempt.update({
        where: { id: attempt.id },
        data: { writingBand: result.overallBand, writingFeedback: result },
      });

      return { result, overallBand: await recomputeOverall(attempt.id) };
    }

    const part = SPEAKING_PARTS.includes(set.speaking.part as SpeakingPart)
      ? (set.speaking.part as SpeakingPart)
      : "part1";

    // The cue card's bullets are part of the question for Part 2, so they go in the prompt.
    const prompt = [
      ...set.speaking.questions,
      ...(set.speaking.cueCardPoints ?? []).map((point) => `- ${point}`),
    ].join("\n");

    const result = await checkSpeakingAnswer({ part, prompt, transcript: text });
    await recordAiUsage(quota.userId, `simulation-speaking:${part}`, quota.source);
    await prisma.simulationAttempt.update({
      where: { id: attempt.id },
      data: { speakingBand: result.overallBand, speakingFeedback: result },
    });

    return { result, overallBand: await recomputeOverall(attempt.id) };
  } catch (error) {
    console.error("evaluateSimulationLegAction failed:", error);
    return { error: describeAiError(error) };
  }
}

export async function abandonSimulationAction(attemptId: string): Promise<{ saved: boolean }> {
  const attempt = await ownedAttempt(attemptId);
  if (!attempt) return { saved: false };

  await prisma.simulationAttempt.update({
    where: { id: attempt.id },
    data: { status: "ABANDONED", completedAt: new Date() },
  });
  return { saved: true };
}
