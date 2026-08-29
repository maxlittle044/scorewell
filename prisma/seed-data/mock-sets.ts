/**
 * Cross-skill mock test sets — the grouping the Exam Library renders as collections
 * (site-build-prompt.md section 4a, whose own examples are "Mock Test Set 1" /
 * "Academic Practice Volume 2") and the unit a full simulation sitting is built from
 * (section 4b, "full four-skill simulation sitting with one global clock").
 *
 * Before this, `sourceTestSet` carried a per-skill label ("Academic", "Writing Practice"),
 * which made every collection single-skill and left a four-skill sitting impossible to
 * assemble from the data. Each set below names one test per skill, so a collection is a
 * sitting and `SimulationAttempt.sourceTestSet` is a real ContentItem grouping key rather
 * than a label that happens to match.
 *
 * A test belongs to exactly one collection. Tests not listed here stay browsable via the
 * skill indexes and the library; they simply aren't part of a complete sitting.
 */

export type MockSet = {
  name: string;
  /** Listening and Speaking are shared across variants; Reading and Writing are not. */
  variant: "academic" | "general-training";
  listening: string;
  reading: string;
  writing: string;
  speaking: string;
};

export const MOCK_SETS: MockSet[] = [
  {
    name: "Mock Test Set 1",
    variant: "academic",
    listening: "practice-set-1",
    reading: "academic-test-1",
    writing: "task1-renewable-energy-bar-chart",
    speaking: "part1-everyday-topics",
  },
  {
    name: "Mock Test Set 2",
    variant: "academic",
    listening: "practice-set-2",
    reading: "academic-test-2",
    writing: "task2-ai-job-market",
    speaking: "part2-place-to-visit",
  },
  {
    name: "Mock Test Set 3",
    variant: "academic",
    listening: "practice-set-3",
    reading: "academic-test-3",
    writing: "task2-free-university-education",
    speaking: "part2-skill-to-learn",
  },
  {
    name: "General Training Set 1",
    variant: "general-training",
    listening: "practice-set-4",
    reading: "gt-test-1",
    writing: "task1-letter-refund-request",
    speaking: "part3-travel-and-tourism",
  },
];

/** Where tests that aren't part of a complete sitting are collected instead. */
export const SPARE_COLLECTION = "Extra Practice";

const BY_SLUG = new Map<string, string>(
  MOCK_SETS.flatMap((set) =>
    [set.listening, set.reading, set.writing, set.speaking].map(
      (slug) => [slug, set.name] as const,
    ),
  ),
);

/** The collection a practice test belongs to, or `SPARE_COLLECTION` if it's in no sitting. */
export function collectionFor(slug: string): string {
  return BY_SLUG.get(slug) ?? SPARE_COLLECTION;
}
