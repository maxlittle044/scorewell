import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { anthropic } from "./anthropic";

export type WritingTaskType = "task1-academic" | "task1-general" | "task2";

const TASK_INFO: Record<WritingTaskType, { name: string; firstCriterion: string }> = {
  "task1-academic": {
    name: "IELTS Academic Writing Task 1 (a report describing a chart, graph, table, or process)",
    firstCriterion: "Task Achievement",
  },
  "task1-general": {
    name: "IELTS General Training Writing Task 1 (a formal, semi-formal, or informal letter)",
    firstCriterion: "Task Achievement",
  },
  task2: {
    name: "IELTS Writing Task 2 (an essay)",
    firstCriterion: "Task Response",
  },
};

const CheckResultSchema = z.object({
  overallBand: z.number().min(0).max(9),
  criteria: z
    .array(
      z.object({
        name: z.string(),
        band: z.number().min(0).max(9),
        feedback: z.string(),
      }),
    )
    .length(4),
  strengths: z.array(z.string()).min(1).max(5),
  improvements: z.array(z.string()).min(1).max(5),
});

export type WritingCheckResult = z.infer<typeof CheckResultSchema>;

export async function checkWritingAnswer(params: {
  taskType: WritingTaskType;
  essayText: string;
  examPrompt?: string;
}): Promise<WritingCheckResult> {
  const task = TASK_INFO[params.taskType];

  const response = await anthropic.messages.parse({
    model: "claude-opus-5",
    max_tokens: 16000,
    output_config: { effort: "medium", format: zodOutputFormat(CheckResultSchema) },
    system: `You are an expert IELTS examiner. Score the candidate's response to this ${task.name} using the official IELTS band descriptors (0-9, half bands allowed). Return exactly four criteria in this order: "${task.firstCriterion}", "Coherence and Cohesion", "Lexical Resource", "Grammatical Range and Accuracy". Be honest and specific in your feedback — quote or reference phrases from the response. Do not inflate scores.`,
    messages: [
      {
        role: "user",
        content: params.examPrompt
          ? `Exam prompt:\n${params.examPrompt}\n\nCandidate's response:\n${params.essayText}`
          : `Candidate's response:\n${params.essayText}`,
      },
    ],
  });

  if (!response.parsed_output) {
    throw new Error("The AI response could not be parsed.");
  }

  return response.parsed_output;
}

export async function generateSampleAnswer(params: {
  taskType: WritingTaskType;
  examPrompt: string;
}): Promise<string> {
  const task = TASK_INFO[params.taskType];

  const response = await anthropic.messages.create({
    model: "claude-opus-5",
    max_tokens: 16000,
    output_config: { effort: "medium" },
    system: `You are an expert IELTS writing coach. Write a band-9 sample response to the given ${task.name} prompt. Return only the sample response text, with no preamble, headings, or explanation.`,
    messages: [{ role: "user", content: params.examPrompt }],
  });

  let text = "";
  for (const block of response.content) {
    if (block.type === "text") {
      text += block.text;
    }
  }
  return text.trim();
}
