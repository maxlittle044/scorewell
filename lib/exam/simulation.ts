import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { QuestionSetSchema } from "./schema";
import { LEG_ORDER, setSlug } from "./simulation-types";
import type {
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

const ListeningDataSchema = z.object({
  audioLabel: z.string(),
  transcript: z.string(),
  questions: z.array(z.unknown()),
});

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

/** Builds the four legs from one collection's rows, or null if any skill is missing/invalid. */
function buildSet(name: string, rows: Row[]): SimulationSet | null {
  const bySkill = new Map(rows.map((row) => [row.skill, row]));
  const listeningRow = bySkill.get("LISTENING");
  const readingRow = bySkill.get("READING");
  const writingRow = bySkill.get("WRITING");
  const speakingRow = bySkill.get("SPEAKING");
  if (!listeningRow || !readingRow || !writingRow || !speakingRow) return null;

  const listeningData = ListeningDataSchema.safeParse(listeningRow.data);
  const readingData = ReadingDataSchema.safeParse(readingRow.data);
  const writingData = WritingDataSchema.safeParse(writingRow.data);
  const speakingData = SpeakingDataSchema.safeParse(speakingRow.data);
  if (!listeningData.success || !readingData.success || !writingData.success || !speakingData.success) {
    return null;
  }

  // Listening stores flat multiple choice, which QuestionSetSchema accepts and normalises,
  // so both objective legs reach the shared grader in the same shape.
  const listeningQuestions = QuestionSetSchema.safeParse({ questions: listeningData.data.questions });
  if (!listeningQuestions.success) return null;

  const { passage, durationMinutes, ...readingQuestionSet } = readingData.data;

  const listening: ListeningLeg = {
    skill: "LISTENING",
    slug: listeningRow.slug,
    title: listeningRow.title,
    minutes: LISTENING_MINUTES,
    audioLabel: listeningData.data.audioLabel,
    transcript: listeningData.data.transcript,
    questionSet: listeningQuestions.data,
  };

  const reading: ReadingLeg = {
    skill: "READING",
    slug: readingRow.slug,
    title: readingRow.title,
    minutes: durationMinutes ?? READING_MINUTES,
    passage,
    questionSet: readingQuestionSet,
  };

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
    variant: variantFromTags(readingRow.tags) ?? variantFromTags(writingRow.tags),
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
