import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { QuestionSetSchema } from "@/lib/exam/schema";
import type { QuestionSet } from "@/lib/exam/schema";

/**
 * Accepts both shapes: legacy `{ passage, questions: [...] }` (flat multiple choice, seeded
 * before v2) and `{ passage, groups: [...] }` (real IELTS question types). QuestionSetSchema
 * handles the union, so no reseed is required for old content to keep working.
 */
const ReadingDataSchema = z.intersection(
  z.object({ passage: z.string(), durationMinutes: z.number().optional() }),
  QuestionSetSchema,
);

export type ReadingTest = {
  id: string;
  title: string;
  tags: string[];
  passage: string;
  durationMinutes?: number;
  questionSet: QuestionSet;
};

export async function getReadingTest(slug: string): Promise<ReadingTest | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "PRACTICE_TEST", skill: "READING", published: true },
  });
  if (!item) return null;

  const parsed = ReadingDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  const { passage, durationMinutes, ...questionSet } = parsed.data;
  return { id: item.id, title: item.title, tags: item.tags, passage, durationMinutes, questionSet };
}
