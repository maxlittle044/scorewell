import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { WritingTaskType } from "@/lib/ai/writing-checker";

const ChartSeriesSchema = z.object({ label: z.string(), values: z.array(z.number()) });

/**
 * The visual a Task 1 Academic prompt describes ("the chart below shows..."). Stored as data,
 * not an image file, so it renders as inline SVG/table server-side — free, no hosting, and the
 * AI checker can read the same numbers the learner is looking at instead of grading blind.
 */
export const ChartDataSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bar"),
    unit: z.string().optional(),
    categories: z.array(z.string()).min(1),
    series: z.array(ChartSeriesSchema).min(1),
  }),
  z.object({
    type: z.literal("line"),
    unit: z.string().optional(),
    xLabels: z.array(z.string()).min(2),
    series: z.array(ChartSeriesSchema).min(1),
  }),
  z.object({
    type: z.literal("pie"),
    unit: z.string().optional(),
    slices: z.array(z.object({ label: z.string(), value: z.number() })).min(2),
  }),
  z.object({
    type: z.literal("table"),
    columns: z.array(z.string()).min(1),
    rows: z.array(z.object({ label: z.string(), values: z.array(z.union([z.number(), z.string()])) })).min(1),
  }),
]);

export type ChartData = z.infer<typeof ChartDataSchema>;

const WritingDataSchema = z.object({
  prompt: z.string(),
  instructions: z.string(),
  minWords: z.number(),
  minutes: z.number(),
  chart: ChartDataSchema.optional(),
});

/**
 * Flattens chart data to text so it can be appended to the exam prompt sent for AI scoring —
 * otherwise the checker grades task achievement blind, unable to tell an accurate summary from
 * an invented one.
 */
export function chartDataAsText(chart: ChartData): string {
  const unit = "unit" in chart && chart.unit ? ` (${chart.unit})` : "";
  switch (chart.type) {
    case "bar":
      return (
        `Chart data${unit}:\n` +
        chart.categories
          .map((category, i) =>
            chart.series.map((s) => `${category} — ${s.label}: ${s.values[i]}`).join("; "),
          )
          .join("\n")
      );
    case "line":
      return (
        `Chart data${unit}:\n` +
        chart.series.map((s) => `${s.label}: ` + chart.xLabels.map((x, i) => `${x}=${s.values[i]}`).join(", ")).join("\n")
      );
    case "pie":
      return `Chart data${unit}:\n` + chart.slices.map((s) => `${s.label}: ${s.value}`).join(", ");
    case "table":
      return (
        `Table data — columns: ${chart.columns.join(", ")}\n` +
        chart.rows.map((r) => `${r.label}: ${r.values.join(", ")}`).join("\n")
      );
  }
}

export type WritingItem = {
  id: string;
  title: string;
  taskType: WritingTaskType;
  tags: string[];
  prompt: string;
  instructions: string;
  minWords: number;
  minutes: number;
  chart?: ChartData;
};

const TASK_TYPES: WritingTaskType[] = ["task1-academic", "task1-general", "task2"];

function toTaskType(value: string | null): WritingTaskType {
  return TASK_TYPES.includes(value as WritingTaskType) ? (value as WritingTaskType) : "task2";
}

export type WritingItemSummary = {
  slug: string;
  title: string;
  taskType: WritingTaskType;
  topic: string | null;
  /** Null when the stored payload fails validation, so the card omits it. */
  minWords: number | null;
};

/** Index listing for one variant. `kind` splits timed tests from exercises. */
export async function listWritingItems(kind: "test" | "exercise"): Promise<WritingItemSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: kind === "test" ? "PRACTICE_TEST" : "WRITING_EXERCISE",
      skill: "WRITING",
      published: true,
    },
    orderBy: [{ taskType: "asc" }, { slug: "asc" }],
    select: { slug: true, title: true, taskType: true, topic: true, data: true },
  });

  return items.map((item) => {
    const parsed = WritingDataSchema.safeParse(item.data);
    return {
      slug: item.slug,
      title: item.title,
      taskType: toTaskType(item.taskType),
      topic: item.topic,
      minWords: parsed.success ? parsed.data.minWords : null,
    };
  });
}

/** `kind` picks the timed test vs the untimed exercise variant. */
export async function getWritingItem(
  slug: string,
  kind: "test" | "exercise",
): Promise<WritingItem | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: kind === "test" ? "PRACTICE_TEST" : "WRITING_EXERCISE",
      skill: "WRITING",
      published: true,
    },
  });
  if (!item) return null;

  const parsed = WritingDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return {
    id: item.id,
    title: item.title,
    taskType: toTaskType(item.taskType),
    tags: item.tags,
    ...parsed.data,
  };
}
