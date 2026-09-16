import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { QuestionSetSchema } from "@/lib/exam/schema";
import type { QuestionSet } from "@/lib/exam/schema";

/**
 * Bundles the generated multi-passage Reading sets (`…-0001-p1/p2/p3`) into one continuous
 * paper, the way the real exam and reference test-library sites present them — one shared
 * clock across all passages, not three disconnected short tests.
 *
 * Deliberately not a schema change: the grouping is read straight off the slug convention the
 * generator already uses (`<base>-p<N>`), so there's no new column and nothing to migrate. A
 * base slug only becomes a paper once it has every expected part; an incomplete set is served
 * as its standalone parts until it's complete, rather than 404ing or showing gaps.
 */

const PART_SUFFIX = /^(.*)-p(\d+)$/;
const EXPECTED_PARTS = 3;

const ReadingDataSchema = z.intersection(
  z.object({ passage: z.string(), durationMinutes: z.number().optional() }),
  QuestionSetSchema,
);

export type ReadingPaperPart = {
  contentItemId: string;
  partNumber: number;
  title: string;
  passage: string;
  questionSet: QuestionSet;
};

export type ReadingPaperSummary = {
  slug: string;
  title: string;
  partCount: number;
  questionCount: number;
};

export type ReadingPaper = {
  slug: string;
  title: string;
  parts: ReadingPaperPart[];
};

function questionCountOf(questionSet: QuestionSet): number {
  const groups = questionSet.groups ?? [];
  const flat = questionSet.questions ?? [];
  return groups.reduce((sum, g) => sum + g.questions.length, 0) + flat.length;
}

/** "generated-reading-academic-0001" → "Academic Reading — Full Paper 1". */
function paperTitle(baseSlug: string): string {
  const num = baseSlug.match(/(\d+)$/)?.[1];
  const variant = baseSlug.includes("general") ? "General Training" : "Academic";
  return `${variant} Reading — Full Paper ${num ? parseInt(num, 10) : ""}`.trim();
}

export async function listFullReadingPapers(): Promise<ReadingPaperSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { skill: "READING", contentType: "PRACTICE_TEST", published: true },
    select: { slug: true, data: true },
  });

  const byBase = new Map<string, { partNumber: number; questionCount: number }[]>();
  for (const item of items) {
    const match = item.slug.match(PART_SUFFIX);
    if (!match) continue;
    const parsed = ReadingDataSchema.safeParse(item.data);
    if (!parsed.success) continue;
    const [, base, partStr] = match;
    const list = byBase.get(base) ?? [];
    list.push({ partNumber: Number(partStr), questionCount: questionCountOf(parsed.data) });
    byBase.set(base, list);
  }

  const papers: ReadingPaperSummary[] = [];
  for (const [base, parts] of byBase) {
    if (parts.length < EXPECTED_PARTS) continue;
    papers.push({
      slug: base,
      title: paperTitle(base),
      partCount: parts.length,
      questionCount: parts.reduce((sum, p) => sum + p.questionCount, 0),
    });
  }

  return papers.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getFullReadingPaper(baseSlug: string): Promise<ReadingPaper | null> {
  const items = await prisma.contentItem.findMany({
    where: {
      skill: "READING",
      contentType: "PRACTICE_TEST",
      published: true,
      slug: { startsWith: `${baseSlug}-p` },
    },
  });

  const parts: ReadingPaperPart[] = [];
  for (const item of items) {
    const match = item.slug.match(PART_SUFFIX);
    if (!match || match[1] !== baseSlug) continue;
    const parsed = ReadingDataSchema.safeParse(item.data);
    if (!parsed.success) continue;

    const { passage, durationMinutes: _durationMinutes, ...questionSet } = parsed.data;
    parts.push({
      contentItemId: item.id,
      partNumber: Number(match[2]),
      title: item.title,
      passage,
      questionSet,
    });
  }

  if (parts.length < EXPECTED_PARTS) return null;
  parts.sort((a, b) => a.partNumber - b.partNumber);

  return { slug: baseSlug, title: paperTitle(baseSlug), parts };
}
