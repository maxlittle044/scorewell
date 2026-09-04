import { z } from "zod";
import { prisma } from "@/lib/prisma";

const QuizDataSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number(),
      type: z.string().optional(),
      // Zod strips what it does not declare, so an explanation absent here never reaches the
      // page however carefully it was written into the seed.
      evidence: z.object({ quote: z.string().optional(), explanation: z.string() }).optional(),
      distractorNotes: z.record(z.string(), z.string()).optional(),
    }),
  ),
});

export type QuizContent = {
  id: string;
  title: string;
  tags: string[];
  questions: z.infer<typeof QuizDataSchema>["questions"];
};

/**
 * Loads a question-only exercise (grammar test or mini exercise). Both share
 * the MINI_EXERCISE content type and differ only by taskType.
 */
export async function getQuizContent(
  slug: string,
  taskType: "grammar-test" | "mini-exercise",
): Promise<QuizContent | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "MINI_EXERCISE", taskType, published: true },
  });
  if (!item) return null;

  const parsed = QuizDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, title: item.title, tags: item.tags, questions: parsed.data.questions };
}

/** All published exercises of one kind, for index pages and daily rotation. */
export async function listQuizContent(taskType: "grammar-test" | "mini-exercise") {
  return prisma.contentItem.findMany({
    where: { contentType: "MINI_EXERCISE", taskType, published: true },
    orderBy: { slug: "asc" },
    select: { id: true, slug: true, title: true, topic: true, data: true },
  });
}
