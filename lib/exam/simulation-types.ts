import type { QuestionSet } from "./schema";

/**
 * Shapes and constants for a full four-skill sitting, kept free of any database import.
 *
 * The runner is a client component and needs `LEG_ORDER` at runtime; importing it from
 * `simulation.ts` would drag Prisma — and through it the `pg` driver — into the browser
 * bundle. Types alone would be erased, but a value import is not.
 */

export const LEG_ORDER = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;
export type LegSkill = (typeof LEG_ORDER)[number];

export type Variant = "academic" | "general-training";

/** One passage or section within a leg — a leg has exactly one for a short sitting, several
 *  for a full-length one, and the runner renders both the same way (tabs are just trivial
 *  when there's only one). */
export type LegPart = {
  key: string;
  partNumber: number;
  title: string;
  questionSet: QuestionSet;
  /** Reading only. */
  passage?: string;
  /** Listening only. */
  transcript?: string;
  audioLabel?: string;
};

export type ListeningLeg = {
  skill: "LISTENING";
  slug: string;
  title: string;
  minutes: number;
  parts: LegPart[];
};

export type ReadingLeg = {
  skill: "READING";
  slug: string;
  title: string;
  minutes: number;
  parts: LegPart[];
};

export type WritingLeg = {
  skill: "WRITING";
  slug: string;
  title: string;
  minutes: number;
  taskType: string;
  prompt: string;
  instructions: string;
  minWords: number;
};

export type SpeakingLeg = {
  skill: "SPEAKING";
  slug: string;
  title: string;
  minutes: number;
  part: string;
  questions: string[];
  cueCardPoints?: string[];
  guidance: string;
};

export type SimulationSet = {
  name: string;
  variant: Variant | null;
  totalMinutes: number;
  listening: ListeningLeg;
  reading: ReadingLeg;
  writing: WritingLeg;
  speaking: SpeakingLeg;
};

export type SimulationSetSummary = {
  name: string;
  slug: string;
  variant: Variant | null;
  totalMinutes: number;
  legs: { skill: LegSkill; title: string; minutes: number }[];
};

/**
 * Collection names are free text, so they're slugified for the URL and matched back by
 * slugifying candidates rather than by reversing the slug — reversing would guess at the
 * original punctuation and casing and break on any name that doesn't round-trip.
 */
export function setSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
