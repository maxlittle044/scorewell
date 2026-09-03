"use server";

import { describeAiError } from "./anthropic";
import {
  checkSpeakingAnswer,
  generateSpeakingSample,
  type SpeakingCheckResult,
  type SpeakingPart,
} from "./speaking-checker";
import { checkAiQuota, quotaMessage, recordAiUsage } from "./usage";
import { recordAiBandProgress } from "@/lib/progress";

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

/** What the attempt is called on the dashboard when it was not sat on a test's own page. */
const PART_LABELS: Record<SpeakingPart, string> = {
  part1: "Speaking Part 1",
  part2: "Speaking Part 2",
  part3: "Speaking Part 3",
};

export async function checkSpeakingAction(
  _prevState: SpeakingCheckState,
  formData: FormData,
): Promise<SpeakingCheckState> {
  const part = parsePart(formData.get("part"));
  const prompt = String(formData.get("prompt") ?? "").trim();
  const transcript = String(formData.get("transcript") ?? "").trim();
  // Absent on the standalone tool page, where the attempt belongs to no test.
  const contentItemId = String(formData.get("contentItemId") ?? "").trim() || null;
  const title = String(formData.get("title") ?? "").trim();

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
    await recordAiBandProgress({
      userId: quota.userId,
      skill: "SPEAKING",
      band: result.overallBand,
      taskType: title || PART_LABELS[part],
      contentItemId,
    });
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
