import { z } from "zod";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { hrefForContentItem } from "@/lib/content/tags";

// Every auto-marked exercise stores its questions the same way, whatever the
// content type — that shared shape is what makes a single index possible.
const QuestionsSchema = z.object({
  questions: z.array(z.object({ correctIndex: z.number() })),
});

export type AnswerKeyEntry = {
  slug: string;
  title: string;
  topic: string | null;
  href: string;
  questionCount: number;
};

export type AnswerKeyGroup = {
  key: string;
  heading: string;
  description: string;
  entries: AnswerKeyEntry[];
};

type GroupSpec = {
  key: string;
  heading: string;
  description: string;
  where: Prisma.ContentItemWhereInput;
};

const GROUPS: GroupSpec[] = [
  {
    key: "reading",
    heading: "Reading tests",
    description: "Full passages with multiple-choice questions.",
    where: { contentType: "PRACTICE_TEST", skill: "READING", published: true },
  },
  {
    key: "listening",
    heading: "Listening tests",
    description: "Transcript-based sets covering Sections 1 to 4.",
    where: { contentType: "PRACTICE_TEST", skill: "LISTENING", published: true },
  },
  {
    key: "grammar",
    heading: "Grammar tests",
    description: "Short targeted sets on one grammar point each.",
    where: { contentType: "MINI_EXERCISE", taskType: "grammar-test", published: true },
  },
  {
    key: "mini",
    heading: "Mini exercises",
    description: "Three-question warm-ups, also used for the daily challenge.",
    where: { contentType: "MINI_EXERCISE", taskType: "mini-exercise", published: true },
  },
];

/**
 * Everything on the site that is marked automatically, grouped by kind.
 * Deliberately links to the tests rather than listing the answers themselves —
 * answers are revealed on submit so the practice value isn't given away.
 */
export async function getAnswerKeyGroups(): Promise<AnswerKeyGroup[]> {
  const groups = await Promise.all(
    GROUPS.map(async (group) => {
      const items = await prisma.contentItem.findMany({
        where: group.where,
        orderBy: { slug: "asc" },
      });

      const entries = items.flatMap((item) => {
        const parsed = QuestionsSchema.safeParse(item.data);
        if (!parsed.success) return [];
        return [
          {
            slug: item.slug,
            title: item.title,
            topic: item.topic,
            href: hrefForContentItem(item),
            questionCount: parsed.data.questions.length,
          },
        ];
      });

      return { ...group, entries };
    }),
  );

  return groups.filter((group) => group.entries.length > 0);
}

export function totalQuestions(groups: AnswerKeyGroup[]): number {
  return groups.reduce(
    (sum, group) => sum + group.entries.reduce((n, entry) => n + entry.questionCount, 0),
    0,
  );
}
