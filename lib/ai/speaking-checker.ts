import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { anthropic, FALLBACKS, FALLBACK_BETAS, throwIfRefused } from "./anthropic";

export type SpeakingPart = "part1" | "part2" | "part3";

const PART_INFO: Record<SpeakingPart, string> = {
  part1:
    "IELTS Speaking Part 1 (short personal questions on familiar topics; answers are typically 2-4 sentences)",
  part2:
    "IELTS Speaking Part 2 (the long turn — a 1-2 minute individual talk from a cue card)",
  part3:
    "IELTS Speaking Part 3 (a two-way discussion of more abstract ideas related to the Part 2 topic; answers should be developed and justified)",
};

// IELTS Speaking is marked on four criteria, but Pronunciation cannot be
// judged from a text transcript — only the three that survive transcription
// are scored, and the UI says so explicitly rather than inventing a score.
const SpeakingResultSchema = z.object({
  overallBand: z.number().min(0).max(9),
  criteria: z
    .array(
      z.object({
        name: z.string(),
        band: z.number().min(0).max(9),
        feedback: z.string(),
      }),
    )
    .length(3),
  strengths: z.array(z.string()).min(1).max(5),
  improvements: z.array(z.string()).min(1).max(5),
});

export type SpeakingCheckResult = z.infer<typeof SpeakingResultSchema>;

export async function checkSpeakingAnswer(params: {
  part: SpeakingPart;
  prompt: string;
  transcript: string;
}): Promise<SpeakingCheckResult> {
  const response = await anthropic.beta.messages.parse({
    model: "claude-opus-5",
    betas: [...FALLBACK_BETAS],
    fallbacks: FALLBACKS,
    max_tokens: 16000,
    output_config: { effort: "medium", format: zodOutputFormat(SpeakingResultSchema) },
    system: `You are an expert IELTS speaking examiner. You are given a TEXT TRANSCRIPT of a candidate's spoken answer to a ${PART_INFO[params.part]} question.

Score it using the official IELTS Speaking band descriptors (0-9, half bands allowed). Return exactly three criteria in this order: "Fluency and Coherence", "Lexical Resource", "Grammatical Range and Accuracy".

Do NOT score Pronunciation — it cannot be assessed from a transcript. The overall band should be your best estimate from these three criteria only.

Because this is a transcript of speech, judge it as speech, not writing: false starts, self-correction, fillers and contractions are normal and should not be penalised as they would be in writing. Be honest and specific, referencing the candidate's actual words. Do not inflate scores.`,
    messages: [
      {
        role: "user",
        content: `Question:\n${params.prompt}\n\nCandidate's transcribed answer:\n${params.transcript}`,
      },
    ],
  });

  throwIfRefused(response);

  if (!response.parsed_output) {
    throw new Error("The AI response could not be parsed.");
  }

  return response.parsed_output;
}

export async function generateSpeakingSample(params: {
  part: SpeakingPart;
  prompt: string;
}): Promise<string> {
  const response = await anthropic.beta.messages.create({
    model: "claude-opus-5",
    betas: [...FALLBACK_BETAS],
    fallbacks: FALLBACKS,
    max_tokens: 16000,
    output_config: { effort: "medium" },
    system: `You are an expert IELTS speaking coach. Write a band-9 model spoken answer to the given ${PART_INFO[params.part]} question.

Write it the way a confident candidate would actually speak — natural spoken English with contractions and natural discourse markers, not a written essay. Return only the answer text, with no preamble, headings, or explanation.`,
    messages: [{ role: "user", content: params.prompt }],
  });

  throwIfRefused(response);

  let text = "";
  for (const block of response.content) {
    if (block.type === "text") text += block.text;
  }
  return text.trim();
}
