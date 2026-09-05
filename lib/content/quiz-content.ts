import { z } from "zod";
import { prisma } from "@/lib/prisma";

const QuizDataSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      // Optional so a question can ask the learner to type the answer instead of
      // picking one. A question carries either options or `accept`, never neither.
      options: z.array(z.string()).optional(),
      correctIndex: z.number().optional(),
      accept: z.array(z.string()).min(1).optional(),
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

/**
 * Index-page cards, built from the database rather than a list kept alongside it.
 *
 * Both index pages used to hardcode their entries, so a seeded exercise existed, worked at
 * its own URL, and was reachable from nowhere — the listing and the content could disagree
 * indefinitely without anything failing.
 *
 * The question count is read from the payload; the reading estimate is derived from it rather
 * than stored, so it cannot drift from the exercise it describes.
 */
export async function listQuizCards(taskType: "grammar-test" | "mini-exercise") {
  const items = await listQuizContent(taskType);

  return items.map((item) => {
    const parsed = QuizDataSchema.safeParse(item.data);
    const count = parsed.success ? parsed.data.questions.length : 0;
    // Roughly a minute a question, floored at two so a three-question drill does not
    // advertise itself as instant.
    const minutes = Math.max(2, count);
    return {
      slug: item.slug,
      title: item.title,
      tag: item.topic ?? "Practice",
      meta: `${minutes} min · ${count} ${count === 1 ? "question" : "questions"}`,
    };
  });
}
