import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * The questions this learner has got wrong, ready to be re-served
 * (site-build-prompt.md section 6, "spaced-repetition prompts for ... past mistakes").
 *
 * **Only self-contained exercises are queued** — grammar tests and mini exercises, which
 * share the MINI_EXERCISE content type. A reading or listening question cannot be pulled out
 * and asked again on its own: without its passage or its audio it is unanswerable, and
 * re-serving the whole passage is a retake, not a review. Those attempts still feed the
 * mistake analytics; they just cannot be drilled question by question.
 *
 * Scheduling shares the Leitner ladder with flashcards (lib/flashcards.ts) so a learner meets
 * one set of rules across the site, not two.
 */

const OutcomeSchema = z.object({
  id: z.string(),
  type: z.string().optional(),
  correct: z.boolean(),
});

const QuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  type: z.string().optional(),
});

const QuizDataSchema = z.object({ questions: z.array(QuestionSchema) });

export type MistakeQuestion = z.infer<typeof QuestionSchema> & {
  contentItemId: string;
  /** Where the question came from, so the learner can go back to the whole exercise. */
  sourceTitle: string;
  sourceHref: string;
  /** Absent until the question has been through review at least once. */
  box?: number;
  dueAt?: Date;
  isDue: boolean;
};

export type MistakeQueue = {
  questions: MistakeQuestion[];
  dueCount: number;
  laterCount: number;
  nextDueAt: Date | null;
  /**
   * Attempts on passage-based tests that recorded mistakes which cannot be drilled here.
   * Surfaced rather than silently dropped — otherwise the page looks empty to someone who
   * knows they have been getting reading questions wrong.
   */
  passageMistakes: number;
};

function hrefFor(taskType: string | null, slug: string): string {
  return taskType === "grammar-test"
    ? `/ielts/grammar-tests/${slug}`
    : `/ielts/mini-exercises/${slug}`;
}

export async function getMistakeQueue(
  userId: string,
  now: Date = new Date(),
): Promise<MistakeQueue> {
  const rows = await prisma.progress.findMany({
    // Rows with no `details` are filtered in JS below rather than in the query: a JSON
    // column needs Prisma's DbNull sentinel to be compared, and a plain `{ not: null }`
    // there silently drops rows instead of erroring.
    where: { userId, contentItemId: { not: null } },
    orderBy: { completedAt: "asc" },
    select: {
      contentItemId: true,
      details: true,
      contentItem: {
        select: { id: true, slug: true, title: true, taskType: true, contentType: true, data: true },
      },
    },
  });

  // Wrong at least once, keyed by item + question. A later correct answer in a fresh attempt
  // does not remove it: getting something right once after getting it wrong is exactly the
  // state spaced repetition exists to test.
  const wrong = new Map<string, { contentItemId: string; questionId: string }>();
  let passageMistakes = 0;

  for (const row of rows) {
    const item = row.contentItem;
    if (!item || !row.contentItemId) continue;

    const outcomes = z.array(OutcomeSchema).safeParse(row.details);
    if (!outcomes.success) continue;

    const missed = outcomes.data.filter((outcome) => !outcome.correct);
    if (missed.length === 0) continue;

    if (item.contentType !== "MINI_EXERCISE") {
      passageMistakes += missed.length;
      continue;
    }

    for (const outcome of missed) {
      wrong.set(`${row.contentItemId}:${outcome.id}`, {
        contentItemId: row.contentItemId,
        questionId: outcome.id,
      });
    }
  }

  if (wrong.size === 0) {
    return { questions: [], dueCount: 0, laterCount: 0, nextDueAt: null, passageMistakes };
  }

  const itemIds = [...new Set([...wrong.values()].map((entry) => entry.contentItemId))];
  const [items, reviews] = await Promise.all([
    prisma.contentItem.findMany({
      where: { id: { in: itemIds }, published: true },
      select: { id: true, slug: true, title: true, taskType: true, data: true },
    }),
    prisma.mistakeReview.findMany({
      where: { userId, contentItemId: { in: itemIds } },
      select: { contentItemId: true, questionId: true, box: true, dueAt: true },
    }),
  ]);

  const reviewByKey = new Map(
    reviews.map((review) => [`${review.contentItemId}:${review.questionId}`, review]),
  );

  const questions: MistakeQuestion[] = [];

  for (const item of items) {
    const parsed = QuizDataSchema.safeParse(item.data);
    if (!parsed.success) continue;

    for (const question of parsed.data.questions) {
      const key = `${item.id}:${question.id}`;
      // A question can disappear when an exercise is re-seeded; the stale mistake row is
      // simply skipped rather than rendering an empty card.
      if (!wrong.has(key)) continue;

      const review = reviewByKey.get(key);
      questions.push({
        ...question,
        contentItemId: item.id,
        sourceTitle: item.title,
        sourceHref: hrefFor(item.taskType, item.slug),
        box: review?.box,
        dueAt: review?.dueAt,
        isDue: !review || review.dueAt.getTime() <= now.getTime(),
      });
    }
  }

  const later = questions.filter((question) => !question.isDue && question.dueAt);
  const nextDueAt = later.reduce<Date | null>(
    (soonest, question) =>
      !soonest || (question.dueAt && question.dueAt < soonest) ? (question.dueAt ?? soonest) : soonest,
    null,
  );

  return {
    questions,
    dueCount: questions.filter((question) => question.isDue).length,
    laterCount: later.length,
    nextDueAt,
    passageMistakes,
  };
}

/** Just the count, for the dashboard prompt. */
export async function countDueMistakes(userId: string, now: Date = new Date()): Promise<number> {
  const queue = await getMistakeQueue(userId, now);
  return queue.dueCount;
}
