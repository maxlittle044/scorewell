import { z } from "zod";
import { prisma } from "@/lib/prisma";
import type { WritingTaskType } from "@/lib/ai/writing-checker";

const WritingDataSchema = z.object({
  prompt: z.string(),
  instructions: z.string(),
  minWords: z.number(),
  minutes: z.number(),
});

export type WritingItem = {
  id: string;
  title: string;
  taskType: WritingTaskType;
  tags: string[];
  prompt: string;
  instructions: string;
  minWords: number;
  minutes: number;
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
