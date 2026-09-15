import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { QuestionSetSchema } from "@/lib/exam/schema";
import type { QuestionSet } from "@/lib/exam/schema";

/**
 * Accepts both shapes: legacy `{ audioLabel, transcript, questions: [...] }` (flat multiple
 * choice, seeded before v2) and `{ audioLabel, transcript, groups: [...] }` (real IELTS
 * question types — note/form completion, matching, multiple choice). QuestionSetSchema
 * handles the union, mirroring lib/content/reading.ts, so no reseed is required for old
 * content to keep working.
 */
const ListeningDataSchema = z.intersection(
  z.object({ audioLabel: z.string(), transcript: z.string() }),
  QuestionSetSchema,
);

export type ListeningTest = {
  id: string;
  title: string;
  tags: string[];
  audioLabel: string;
  transcript: string;
  questionSet: QuestionSet;
};

export async function getListeningTest(slug: string): Promise<ListeningTest | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "PRACTICE_TEST", skill: "LISTENING", published: true },
  });
  if (!item) return null;

  const parsed = ListeningDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  const { audioLabel, transcript, ...questionSet } = parsed.data;
  return { id: item.id, title: item.title, tags: item.tags, audioLabel, transcript, questionSet };
}
