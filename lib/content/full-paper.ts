import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { QuestionSetSchema } from "@/lib/exam/schema";
import type { QuestionSet } from "@/lib/exam/schema";

/**
 * Bundles the generated multi-part Reading/Listening sets (`…-0001-p1/p2/p3`,
 * `…-0001-s1/s2/s3/s4`) into one continuous paper, the way the real exam and reference
 * test-library sites present them — one shared clock across all parts, not three or four
 * disconnected short tests.
 *
 * Deliberately not a schema change: the grouping is read straight off the slug convention the
 * generator already uses, so there's no new column and nothing to migrate. A base slug only
 * becomes a paper once it has every expected part; an incomplete set is served as its
 * standalone parts until it's complete, rather than 404ing or showing gaps.
 */

const EXPECTED_PARTS = { READING: 3, LISTENING: 4 } as const;

/** One part of a bundled paper — a Reading passage or a Listening section. */
export type FullPaperPart = {
  contentItemId: string;
  partNumber: number;
  title: string;
  questionSet: QuestionSet;
  /** Reading only. */
  passage?: string;
  /** Listening only. */
  transcript?: string;
  audioLabel?: string;
};

export type FullPaper = {
  slug: string;
  title: string;
  skill: "READING" | "LISTENING";
  /** "Passage" or "Section", for the tab/heading labels. */
  partLabel: string;
  minutes: number;
  parts: FullPaperPart[];
};

export type FullPaperSummary = {
  slug: string;
  title: string;
  partCount: number;
  questionCount: number;
};

function questionCountOf(questionSet: QuestionSet): number {
  const groups = questionSet.groups ?? [];
  const flat = questionSet.questions ?? [];
  return groups.reduce((sum, g) => sum + g.questions.length, 0) + flat.length;
}

// ---------------------------------------------------------------- Reading

const PART_SUFFIX_P = /^(.*)-p(\d+)$/;

const ReadingDataSchema = z.intersection(
  z.object({ passage: z.string(), durationMinutes: z.number().optional() }),
  QuestionSetSchema,
);

/** "generated-reading-academic-0001" → "Academic Reading — Full Paper 1". */
function readingPaperTitle(baseSlug: string): string {
  const num = baseSlug.match(/(\d+)$/)?.[1];
  const variant = baseSlug.includes("general") ? "General Training" : "Academic";
  return `${variant} Reading — Full Paper ${num ? parseInt(num, 10) : ""}`.trim();
}

export async function listFullReadingPapers(): Promise<FullPaperSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { skill: "READING", contentType: "PRACTICE_TEST", published: true },
    select: { slug: true, data: true },
  });

  const byBase = new Map<string, { partNumber: number; questionCount: number }[]>();
  for (const item of items) {
    const match = item.slug.match(PART_SUFFIX_P);
    if (!match) continue;
    const parsed = ReadingDataSchema.safeParse(item.data);
    if (!parsed.success) continue;
    const [, base, partStr] = match;
    const list = byBase.get(base) ?? [];
    list.push({ partNumber: Number(partStr), questionCount: questionCountOf(parsed.data) });
    byBase.set(base, list);
  }

  const papers: FullPaperSummary[] = [];
  for (const [base, parts] of byBase) {
    if (parts.length < EXPECTED_PARTS.READING) continue;
    papers.push({
      slug: base,
      title: readingPaperTitle(base),
      partCount: parts.length,
      questionCount: parts.reduce((sum, p) => sum + p.questionCount, 0),
    });
  }

  return papers.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getFullReadingPaper(baseSlug: string): Promise<FullPaper | null> {
  const items = await prisma.contentItem.findMany({
    where: {
      skill: "READING",
      contentType: "PRACTICE_TEST",
      published: true,
      slug: { startsWith: `${baseSlug}-p` },
    },
  });

  const parts: FullPaperPart[] = [];
  for (const item of items) {
    const match = item.slug.match(PART_SUFFIX_P);
    if (!match || match[1] !== baseSlug) continue;
    const parsed = ReadingDataSchema.safeParse(item.data);
    if (!parsed.success) continue;

    const { passage, ...questionSet } = parsed.data;
    parts.push({
      contentItemId: item.id,
      partNumber: Number(match[2]),
      title: item.title,
      passage,
      questionSet: { questions: questionSet.questions, groups: questionSet.groups },
    });
  }

  if (parts.length < EXPECTED_PARTS.READING) return null;
  parts.sort((a, b) => a.partNumber - b.partNumber);

  // Real Academic Reading: 60 minutes for the whole paper, regardless of individual
  // passages' own scaled-down durations — those are for practising a passage alone.
  return {
    slug: baseSlug,
    title: readingPaperTitle(baseSlug),
    skill: "READING",
    partLabel: "Passage",
    minutes: 60,
    parts,
  };
}

// ---------------------------------------------------------------- Listening

const PART_SUFFIX_S = /^(.*)-s(\d+)$/;

const ListeningDataSchema = z.intersection(
  z.object({ audioLabel: z.string(), transcript: z.string() }),
  QuestionSetSchema,
);

/** "generated-listening-academic-0001" → "Academic Listening — Full Paper 1". */
function listeningPaperTitle(baseSlug: string): string {
  const num = baseSlug.match(/(\d+)$/)?.[1];
  const variant = baseSlug.includes("general") ? "General Training" : "Academic";
  return `${variant} Listening — Full Paper ${num ? parseInt(num, 10) : ""}`.trim();
}

export async function listFullListeningPapers(): Promise<FullPaperSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { skill: "LISTENING", contentType: "PRACTICE_TEST", published: true },
    select: { slug: true, data: true },
  });

  const byBase = new Map<string, { partNumber: number; questionCount: number }[]>();
  for (const item of items) {
    const match = item.slug.match(PART_SUFFIX_S);
    if (!match) continue;
    const parsed = ListeningDataSchema.safeParse(item.data);
    if (!parsed.success) continue;
    const [, base, partStr] = match;
    const list = byBase.get(base) ?? [];
    list.push({ partNumber: Number(partStr), questionCount: questionCountOf(parsed.data) });
    byBase.set(base, list);
  }

  const papers: FullPaperSummary[] = [];
  for (const [base, parts] of byBase) {
    if (parts.length < EXPECTED_PARTS.LISTENING) continue;
    papers.push({
      slug: base,
      title: listeningPaperTitle(base),
      partCount: parts.length,
      questionCount: parts.reduce((sum, p) => sum + p.questionCount, 0),
    });
  }

  return papers.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getFullListeningPaper(baseSlug: string): Promise<FullPaper | null> {
  const items = await prisma.contentItem.findMany({
    where: {
      skill: "LISTENING",
      contentType: "PRACTICE_TEST",
      published: true,
      slug: { startsWith: `${baseSlug}-s` },
    },
  });

  const parts: FullPaperPart[] = [];
  for (const item of items) {
    const match = item.slug.match(PART_SUFFIX_S);
    if (!match || match[1] !== baseSlug) continue;
    const parsed = ListeningDataSchema.safeParse(item.data);
    if (!parsed.success) continue;

    const { transcript, audioLabel, ...questionSet } = parsed.data;
    parts.push({
      contentItemId: item.id,
      partNumber: Number(match[2]),
      title: item.title,
      transcript,
      audioLabel,
      questionSet: { questions: questionSet.questions, groups: questionSet.groups },
    });
  }

  if (parts.length < EXPECTED_PARTS.LISTENING) return null;
  parts.sort((a, b) => a.partNumber - b.partNumber);

  // Real Listening: 30 minutes of audio for the whole paper.
  return {
    slug: baseSlug,
    title: listeningPaperTitle(baseSlug),
    skill: "LISTENING",
    partLabel: "Section",
    minutes: 30,
    parts,
  };
}
