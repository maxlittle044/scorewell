"use server";

import { describeAiError } from "./anthropic";
import { checkWritingAnswer, generateSampleAnswer, type WritingTaskType } from "./writing-checker";
import type { WritingCheckResult } from "./writing-checker";
import { checkAiQuota, quotaMessage, recordAiUsage } from "./usage";

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

export async function checkWritingAction(
  _prevState: CheckActionState,
  formData: FormData,
): Promise<CheckActionState> {
  const essayText = String(formData.get("essayText") ?? "").trim();
  const taskType = parseTaskType(formData.get("taskType"));
  const examPrompt = String(formData.get("examPrompt") ?? "").trim() || undefined;

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
