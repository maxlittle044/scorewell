import { anthropic } from "./anthropic";

export type TextToolKind =
  | "grammar-checker"
  | "paraphraser"
  | "summarizer"
  | "text-improver"
  | "sentence-explainer"
  | "translator";

const SYSTEM_PROMPTS: Record<TextToolKind, string> = {
  "grammar-checker":
    "You are an expert English grammar checker for IELTS learners. Given the user's text, first give a corrected version of the full text, then a short bullet list explaining each correction you made. If there are no mistakes, say so briefly and explain why the text is already correct.",
  paraphraser:
    "You are a paraphrasing assistant for IELTS learners. Rewrite the user's text using different words and sentence structures while preserving the original meaning. Return only the paraphrased text, with no preamble.",
  summarizer:
    "You are a summarization assistant for IELTS reading practice. Summarize the user's text concisely in a few sentences, preserving the key points. Return only the summary, with no preamble.",
  "text-improver":
    "You are a writing coach for IELTS learners. Rewrite the user's text so it sounds more natural, fluent, and appropriate for a high-scoring IELTS response, while preserving the original meaning. Return only the improved text, with no preamble.",
  "sentence-explainer":
    "You are an English tutor for IELTS learners. Explain the meaning of the user's sentence in plain, simple English, including any idioms, phrasal verbs, or advanced vocabulary it uses. Return only the explanation, with no preamble.",
  translator: "You are a translation assistant. Translate the user's text accurately and naturally. Return only the translated text, with no preamble.",
};

export async function runTextTool(params: {
  kind: TextToolKind;
  inputText: string;
  targetLanguage?: string;
}): Promise<string> {
  const system =
    params.kind === "translator" && params.targetLanguage
      ? `${SYSTEM_PROMPTS.translator} Translate into ${params.targetLanguage}.`
      : SYSTEM_PROMPTS[params.kind];

  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    output_config: { effort: "medium" },
    system,
    messages: [{ role: "user", content: params.inputText }],
  });

  let text = "";
  for (const block of response.content) {
    if (block.type === "text") {
      text += block.text;
    }
  }
  return text.trim();
}
