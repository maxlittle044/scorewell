"use server";

import { describeAiError } from "./anthropic";
import {
  checkSpeakingAnswer,
  generateSpeakingSample,
  type SpeakingCheckResult,
  type SpeakingPart,
} from "./speaking-checker";
import { checkAiQuota, quotaMessage, recordAiUsage } from "./usage";

export type SpeakingCheckState = {
  result?: SpeakingCheckResult;
  error?: string;
  limitReached?: boolean;
};
export type SpeakingSampleState = { sample?: string; error?: string; limitReached?: boolean };

const PARTS: SpeakingPart[] = ["part1", "part2", "part3"];

function parsePart(value: FormDataEntryValue | null): SpeakingPart {
  return PARTS.includes(value as SpeakingPart) ? (value as SpeakingPart) : "part1";
}

export async function checkSpeakingAction(
  _prevState: SpeakingCheckState,
  formData: FormData,
): Promise<SpeakingCheckState> {
  const part = parsePart(formData.get("part"));
  const prompt = String(formData.get("prompt") ?? "").trim();
  const transcript = String(formData.get("transcript") ?? "").trim();

  if (!transcript) {
    return { error: "Record or type your answer before checking." };
  }

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  try {
    const result = await checkSpeakingAnswer({ part, prompt, transcript });
    await recordAiUsage(quota.userId, `speaking-check:${part}`, quota.source);
    return { result };
  } catch (error) {
    console.error("checkSpeakingAction failed:", error);
    return { error: describeAiError(error) };
  }
}

export async function generateSpeakingSampleAction(
  _prevState: SpeakingSampleState,
  formData: FormData,
): Promise<SpeakingSampleState> {
  const part = parsePart(formData.get("part"));
  const prompt = String(formData.get("prompt") ?? "").trim();

  if (!prompt) return { error: "No question selected." };

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  try {
    const sample = await generateSpeakingSample({ part, prompt });
    await recordAiUsage(quota.userId, `speaking-generate:${part}`, quota.source);
    return { sample };
  } catch (error) {
    console.error("generateSpeakingSampleAction failed:", error);
    return { error: describeAiError(error) };
  }
}
