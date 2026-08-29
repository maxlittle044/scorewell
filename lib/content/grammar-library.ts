import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * The grammar library (site-build-prompt.md section 4b) — grammar organised by point
 * rather than as a pile of quizzes.
 *
 * Points are ARTICLEs split off by taskType "grammar-point", the same pattern tips, topic
 * pools and topic banks already use, so this needed no schema change.
 */

export const GRAMMAR_POINT_TASK_TYPE = "grammar-point";

const ExampleSchema = z.object({
  wrong: z.string().optional(),
  right: z.string(),
  note: z.string().optional(),
});

const GrammarPointDataSchema = z.object({
  category: z.string(),
  summary: z.string(),
  explanation: z.array(z.string()).min(1),
  examples: z.array(ExampleSchema).min(1),
  ieltsNote: z.string(),
  practiceSlug: z.string().optional(),
});

export type GrammarExample = z.infer<typeof ExampleSchema>;

export type GrammarPoint = {
  slug: string;
  title: string;
  tags: string[];
  category: string;
  summary: string;
  explanation: string[];
  examples: GrammarExample[];
  ieltsNote: string;
  /** Only set when the linked quiz actually exists — see `resolvePractice`. */
  practice: { slug: string; title: string } | null;
};

export type GrammarPointSummary = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  hasPractice: boolean;
};

/**
 * Confirms the linked quiz is still published before the page offers it.
 * A renamed or unpublished test degrades to "no practice link" rather than a dead end.
 */
async function resolvePractice(slug: string | undefined) {
  if (!slug) return null;
  const quiz = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "MINI_EXERCISE",
      taskType: "grammar-test",
      published: true,
    },
    select: { slug: true, title: true },
  });
  return quiz ?? null;
}

export type GrammarCategory = { name: string; points: GrammarPointSummary[] };

/** Every published point, grouped by category, categories and points both alphabetical. */
export async function listGrammarPoints(): Promise<GrammarCategory[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "ARTICLE",
      taskType: GRAMMAR_POINT_TASK_TYPE,
      published: true,
    },
    select: { slug: true, title: true, data: true },
    orderBy: { title: "asc" },
  });

  const byCategory = new Map<string, GrammarPointSummary[]>();
  for (const item of items) {
    const parsed = GrammarPointDataSchema.safeParse(item.data);
    if (!parsed.success) continue;

    const entry: GrammarPointSummary = {
      slug: item.slug,
      title: item.title,
      category: parsed.data.category,
      summary: parsed.data.summary,
      hasPractice: Boolean(parsed.data.practiceSlug),
    };
    byCategory.set(parsed.data.category, [
      ...(byCategory.get(parsed.data.category) ?? []),
      entry,
    ]);
  }

  return [...byCategory.entries()]
    .map(([name, points]) => ({ name, points }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getGrammarPoint(slug: string): Promise<GrammarPoint | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "ARTICLE",
      taskType: GRAMMAR_POINT_TASK_TYPE,
      published: true,
    },
  });
  if (!item) return null;

  const parsed = GrammarPointDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  const { practiceSlug, ...rest } = parsed.data;
  return {
    slug: item.slug,
    title: item.title,
    tags: item.tags,
    ...rest,
    practice: await resolvePractice(practiceSlug),
  };
}

export function countGrammarPoints(categories: GrammarCategory[]): number {
  return categories.reduce((sum, category) => sum + category.points.length, 0);
}
