"use server";

import { describeAiError } from "./anthropic";
import { runTextTool, type TextToolKind } from "./text-tool";
import { checkAiQuota, quotaMessage, recordAiUsage } from "./usage";

export type TextToolActionState = { result?: string; error?: string; limitReached?: boolean };

const KINDS: TextToolKind[] = [
  "grammar-checker",
  "paraphraser",
  "summarizer",
  "text-improver",
  "sentence-explainer",
  "translator",
];

export async function runTextToolAction(
  _prevState: TextToolActionState,
  formData: FormData,
): Promise<TextToolActionState> {
  const kindRaw = String(formData.get("kind") ?? "");
  const kind = KINDS.includes(kindRaw as TextToolKind) ? (kindRaw as TextToolKind) : null;
  const inputText = String(formData.get("inputText") ?? "").trim();
  const targetLanguage = String(formData.get("targetLanguage") ?? "").trim() || undefined;

  if (!kind) return { error: "Unknown tool." };
  if (!inputText) return { error: "Please enter some text first." };

  const quota = await checkAiQuota();
  if (!quota.allowed) {
    return { error: quotaMessage(quota.reason), limitReached: quota.reason === "limit-reached" };
  }

  try {
    const result = await runTextTool({ kind, inputText, targetLanguage });
    await recordAiUsage(quota.userId, kind, quota.source);
    return { result };
  } catch (error) {
    console.error("runTextToolAction failed:", error);
    return { error: describeAiError(error) };
  }
}
