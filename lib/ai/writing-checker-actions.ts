"use server";

import { describeAiError } from "./anthropic";
import { checkWritingAnswer, generateSampleAnswer, type WritingTaskType } from "./writing-checker";
import type { WritingCheckResult } from "./writing-checker";
import { checkAiQuota, quotaMessage, recordAiUsage } from "./usage";
import { recordAiBandProgress } from "@/lib/progress";

export type CheckActionState = {
  result?: WritingCheckResult;
  error?: string;
  limitReached?: boolean;
};
export type GenerateActionState = { sample?: string; error?: string; limitReached?: boolean };

const TASK_TYPES: WritingTaskType[] = ["task1-academic", "task1-general", "task2"];

function parseTaskType(value: FormDataEntryValue | null): WritingTaskType {
  return TASK_TYPES.includes(value as WritingTaskType) ? (value as WritingTaskType) : "task2";
}

/** What the attempt is called on the dashboard when it was not sat on a test's own page. */
const TASK_LABELS: Record<WritingTaskType, string> = {
  "task1-academic": "Writing Task 1 (Academic)",
  "task1-general": "Writing Task 1 (General)",
  task2: "Writing Task 2",
};

export async function checkWritingAction(
  _prevState: CheckActionState,
  formData: FormData,
): Promise<CheckActionState> {
  const essayText = String(formData.get("essayText") ?? "").trim();
  const taskType = parseTaskType(formData.get("taskType"));
  const examPrompt = String(formData.get("examPrompt") ?? "").trim() || undefined;
  // Both are absent on the standalone tool pages, where the attempt belongs to no test.
  const contentItemId = String(formData.get("contentItemId") ?? "").trim() || null;
  const title = String(formData.get("title") ?? "").trim();
  const durationSeconds = Number(formData.get("durationSeconds")) || undefined;

  if (!essayText) {
    return { error: "Please write a response before checking." };
  }

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  try {
    const result = await checkWritingAnswer({ taskType, essayText, examPrompt });
    await recordAiUsage(quota.userId, `writing-check:${taskType}`, quota.source);
    await recordAiBandProgress({
      userId: quota.userId,
      skill: "WRITING",
      band: result.overallBand,
      taskType: title || TASK_LABELS[taskType],
      contentItemId,
      durationSeconds,
    });
    return { result };
  } catch (error) {
    console.error("checkWritingAction failed:", error);
    return { error: describeAiError(error) };
  }
}

export async function generateSampleAction(
  _prevState: GenerateActionState,
  formData: FormData,
): Promise<GenerateActionState> {
  const examPrompt = String(formData.get("examPrompt") ?? "").trim();
  const taskType = parseTaskType(formData.get("taskType"));

  if (!examPrompt) {
    return { error: "Please enter a prompt or topic first." };
  }

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  try {
    const sample = await generateSampleAnswer({ taskType, examPrompt });
    await recordAiUsage(quota.userId, `writing-generate:${taskType}`, quota.source);
    return { sample };
  } catch (error) {
    console.error("generateSampleAction failed:", error);
    return { error: describeAiError(error) };
  }
}
