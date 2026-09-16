import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { QuestionSetSchema } from "./schema";
import { LEG_ORDER, setSlug } from "./simulation-types";
import type {
  LegPart,
  ListeningLeg,
  ReadingLeg,
  SimulationSet,
  SimulationSetSummary,
  SpeakingLeg,
  Variant,
  WritingLeg,
} from "./simulation-types";

// Re-exported so server callers can pull shapes and loaders from one module. Client
// components must import from ./simulation-types directly — see the note there.
export * from "./simulation-types";

/**
 * Full four-skill simulation sittings (site-build-prompt.md section 4b: "full four-skill
 * simulation sitting with one global clock").
 *
 * A sitting *is* a collection: the four tests sharing one `sourceTestSet`, which
 * prisma/seed-data/mock-sets.ts now assigns across skills rather than per skill. A
 * collection missing any of the four skills simply isn't offered as a sitting, so
 * partial collections like "Extra Practice" degrade to library browsing instead of
 * producing a broken sitting.
 */

/**
 * Real IELTS module allowances. Reading and Writing defer to the test's own stored
 * duration where it has one (Writing Task 1 is 20 minutes of the 60-minute module and
 * Task 2 is 40, and a sitting carries one task), so these are the fallbacks.
 */
const LISTENING_MINUTES = 30;
const READING_MINUTES = 60;
const SPEAKING_MINUTES = 15;

const ListeningDataSchema = z.intersection(
  z.object({ audioLabel: z.string(), transcript: z.string() }),
  QuestionSetSchema,
);

const ReadingDataSchema = z.intersection(
  z.object({ passage: z.string(), durationMinutes: z.number().optional() }),
  QuestionSetSchema,
);

const WritingDataSchema = z.object({
  prompt: z.string(),
  instructions: z.string(),
  minWords: z.number(),
  minutes: z.number(),
});

const SpeakingDataSchema = z.object({
  questions: z.array(z.string()),
  cueCardPoints: z.array(z.string()).optional(),
  guidance: z.string(),
});


/** Reading and Writing split by variant; the tag lives on the test that splits. */
function variantFromTags(tags: string[]): Variant | null {
  if (tags.includes("academic")) return "academic";
  if (tags.includes("general-training")) return "general-training";
  return null;
}

type Row = {
  slug: string;
  title: string;
  skill: string | null;
  taskType: string | null;
  tags: string[];
  sourceTestSet: string | null;
  data: unknown;
};

/** "…-p3" / "…-s4" → 3 / 4. A row with no such suffix is the sitting's only part. */
function partNumberFromSlug(slug: string): number {
  const match = slug.match(/-[ps](\d+)$/);
  return match ? Number(match[1]) : 1;
}

/** Strips a "-p<N>" / "-s<N>" suffix, or returns the slug unchanged if it has none. */
function baseSlugOf(slug: string): string {
  return slug.replace(/-[ps]\d+$/, "");
}

/**
 * True only when every row is the sitting's sole item for that skill, or a part of the same
 * bundled paper — never an arbitrary mix of unrelated tests that happen to share a collection.
 * Without this check, the ungrouped "Extra Practice" catch-all (every generated passage/
 * section with no named sitting) would look like one enormous multi-part leg.
 */
function formsOnePaper(rows: Row[]): boolean {
  if (rows.length <= 1) return true;
  return new Set(rows.map((row) => baseSlugOf(row.slug))).size === 1;
}

/**
 * Builds a multi-part leg from every row for one skill in a collection. A short sitting's
 * skill has exactly one row (partNumber 1); a full-length sitting's has three (Reading) or
 * four (Listening), following the same `-p<N>`/`-s<N>` slug convention as the standalone
 * full papers in lib/content/full-paper.ts.
 */
function buildReadingLeg(rows: Row[]): ReadingLeg | null {
  const parts: LegPart[] = [];
  for (const row of rows) {
    const parsed = ReadingDataSchema.safeParse(row.data);
    if (!parsed.success) return null;
    const { passage, ...questionSet } = parsed.data;
    parts.push({
      key: row.slug,
      partNumber: partNumberFromSlug(row.slug),
      title: row.title,
      passage,
      questionSet: { questions: questionSet.questions, groups: questionSet.groups },
    });
  }
  if (parts.length === 0) return null;
  parts.sort((a, b) => a.partNumber - b.partNumber);

  const first = rows[0];
  const single = parts.length === 1 ? ReadingDataSchema.safeParse(rows[0].data) : null;
  const minutes =
    parts.length > 1 ? READING_MINUTES : (single?.success && single.data.durationMinutes) || READING_MINUTES;

  return { skill: "READING", slug: first.slug, title: first.title, minutes, parts };
}

function buildListeningLeg(rows: Row[]): ListeningLeg | null {
  const parts: LegPart[] = [];
  for (const row of rows) {
    const parsed = ListeningDataSchema.safeParse(row.data);
    if (!parsed.success) return null;
    // Listening stores either flat multiple choice or real IELTS groups; QuestionSetSchema
    // accepts both, so both shapes reach the shared grader the same way.
    const questions = QuestionSetSchema.safeParse(parsed.data);
    if (!questions.success) return null;
    parts.push({
      key: row.slug,
      partNumber: partNumberFromSlug(row.slug),
      title: row.title,
      transcript: parsed.data.transcript,
      audioLabel: parsed.data.audioLabel,
      questionSet: questions.data,
    });
  }
  if (parts.length === 0) return null;
  parts.sort((a, b) => a.partNumber - b.partNumber);

  const first = rows[0];

  return { skill: "LISTENING", slug: first.slug, title: first.title, minutes: LISTENING_MINUTES, parts };
}

/** Builds the four legs from one collection's rows, or null if any skill is missing/invalid. */
function buildSet(name: string, rows: Row[]): SimulationSet | null {
  const byskill = new Map<string, Row[]>();
  for (const row of rows) {
    if (!row.skill) continue;
    byskill.set(row.skill, [...(byskill.get(row.skill) ?? []), row]);
  }
  const listeningRows = byskill.get("LISTENING");
  const readingRows = byskill.get("READING");
  const writingRow = byskill.get("WRITING")?.[0];
  const speakingRow = byskill.get("SPEAKING")?.[0];
  if (!listeningRows || !readingRows || !writingRow || !speakingRow) return null;
  if (!formsOnePaper(listeningRows) || !formsOnePaper(readingRows)) return null;

  const listening = buildListeningLeg(listeningRows);
  const reading = buildReadingLeg(readingRows);
  if (!listening || !reading) return null;

  const writingData = WritingDataSchema.safeParse(writingRow.data);
  const speakingData = SpeakingDataSchema.safeParse(speakingRow.data);
  if (!writingData.success || !speakingData.success) return null;

  const writing: WritingLeg = {
    skill: "WRITING",
    slug: writingRow.slug,
    title: writingRow.title,
    minutes: writingData.data.minutes || 40,
    taskType: writingRow.taskType ?? "task2",
    prompt: writingData.data.prompt,
    instructions: writingData.data.instructions,
    minWords: writingData.data.minWords,
  };

  const speaking: SpeakingLeg = {
    skill: "SPEAKING",
    slug: speakingRow.slug,
    title: speakingRow.title,
    minutes: SPEAKING_MINUTES,
    part: speakingRow.taskType ?? "part1",
    questions: speakingData.data.questions,
    cueCardPoints: speakingData.data.cueCardPoints,
    guidance: speakingData.data.guidance,
  };

  return {
    name,
    variant: variantFromTags(readingRows[0].tags) ?? variantFromTags(writingRow.tags),
    totalMinutes: listening.minutes + reading.minutes + writing.minutes + speaking.minutes,
    listening,
    reading,
    writing,
    speaking,
  };
}

async function loadCollections(name?: string): Promise<Map<string, Row[]>> {
  const rows = await prisma.contentItem.findMany({
    where: {
      contentType: "PRACTICE_TEST",
      published: true,
      // An unnamed collection can't be addressed by URL, so it can't be a sitting.
      ...(name ? { sourceTestSet: name } : { NOT: { sourceTestSet: null } }),
    },
    select: {
      slug: true,
      title: true,
      skill: true,
      taskType: true,
      tags: true,
      sourceTestSet: true,
      data: true,
    },
  });

  const grouped = new Map<string, Row[]>();
  for (const row of rows) {
    const key = row.sourceTestSet;
    if (!key) continue;
    grouped.set(key, [...(grouped.get(key) ?? []), row]);
  }
  return grouped;
}

/** Every collection that holds all four skills, ordered by name for a stable page. */
export async function listSimulationSets(): Promise<SimulationSetSummary[]> {
  const grouped = await loadCollections();

  const sets: SimulationSetSummary[] = [];
  for (const [name, rows] of grouped) {
    const set = buildSet(name, rows);
    if (!set) continue;
    sets.push({
      name: set.name,
      slug: setSlug(set.name),
      variant: set.variant,
      totalMinutes: set.totalMinutes,
      legs: LEG_ORDER.map((skill) => {
        const leg = set[skill.toLowerCase() as "listening" | "reading" | "writing" | "speaking"];
        return { skill, title: leg.title, minutes: leg.minutes };
      }),
    });
  }

  return sets.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getSimulationSet(name: string): Promise<SimulationSet | null> {
  const grouped = await loadCollections(name);
  const rows = grouped.get(name);
  return rows ? buildSet(name, rows) : null;
}

/** Resolves a URL slug back to its sitting, or null if it names no complete collection. */
export async function getSimulationSetBySlug(slug: string): Promise<SimulationSet | null> {
  const grouped = await loadCollections();
  for (const [name, rows] of grouped) {
    if (setSlug(name) !== slug) continue;
    return buildSet(name, rows);
  }
  return null;
}
