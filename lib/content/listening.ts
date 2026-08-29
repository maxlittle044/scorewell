import { z } from "zod";
import { prisma } from "@/lib/prisma";

const ListeningQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  type: z.string().optional(),
});

const ListeningDataSchema = z.object({
  audioLabel: z.string(),
  transcript: z.string(),
  questions: z.array(ListeningQuestionSchema),
});

export type ListeningTest = {
  id: string;
  title: string;
  tags: string[];
  audioLabel: string;
  transcript: string;
  questions: z.infer<typeof ListeningQuestionSchema>[];
};

export async function getListeningTest(slug: string): Promise<ListeningTest | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "PRACTICE_TEST", skill: "LISTENING", published: true },
  });
  if (!item) return null;

  const parsed = ListeningDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, title: item.title, tags: item.tags, ...parsed.data };
}
