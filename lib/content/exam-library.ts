import { prisma } from "@/lib/prisma";
import type { Skill } from "@/generated/prisma/enums";

/**
 * The Exam Library (site-build-prompt.md section 4a) — one page holding every
 * practice test, filtered down rather than navigated to.
 *
 * Tests are grouped into named collections via `sourceTestSet`, which already
 * existed as an indexed column, so this needed no schema change.
 */

export const SKILLS = ["LISTENING", "READING", "WRITING", "SPEAKING"] as const;

export const VARIANTS = ["academic", "general-training"] as const;
export type Variant = (typeof VARIANTS)[number];

export const SORTS = ["newest", "practised", "alphabetical"] as const;
export type Sort = (typeof SORTS)[number];

export type LibraryFilters = {
  variant: Variant | null;
  skill: Skill | null;
  q: string;
  sort: Sort;
};

/**
 * What the signed-in learner has done with one test (section 4a: "a completion state for
 * signed-in learners"). `null` for signed-out readers, and for a test they have never sat —
 * the tile then shows nothing at all rather than an "unattempted" badge, which would put a
 * label on every tile on the page to say nothing had happened.
 *
 * **Only Reading and Listening can populate this today.** Those run through the exam runner,
 * which writes a `Progress` row on submit. A Writing or Speaking attempt is checked by the AI
 * and then forgotten — nothing persists it — so those tiles stay blank however many times
 * they are sat. That is a gap in what gets recorded, not one this file can paper over, and
 * inventing a state for them would be worse than showing none.
 *
 * The spec's third state, "in progress", is deliberately absent: an attempt is atomic here,
 * submitted or lost, so nothing in the database can distinguish a half-finished test from an
 * unopened one. It becomes real the day attempts are resumable.
 */
export type LearnerState = {
  /** Best band across every attempt. */
  bestBand: number;
  /** How many times this learner has sat it. */
  attempts: number;
};

export type LibraryTest = {
  slug: string;
  title: string;
  skill: Skill;
  href: string;
  /** Real attempt count from Progress. Zero renders as nothing, never as a seeded figure. */
  attempts: number;
  /** This reader's own history with the test, or null if they have none. */
  learner: LearnerState | null;
};

export type LibraryCollection = {
  name: string;
  tests: LibraryTest[];
};

const SKILL_PATHS: Record<Skill, string> = {
  READING: "/ielts/reading",
  LISTENING: "/ielts/listening",
  WRITING: "/ielts/writing",
  SPEAKING: "/ielts/speaking",
};

export function parseFilters(params: Record<string, string | string[] | undefined>): LibraryFilters {
  const one = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const variant = one("variant");
  const skill = one("skill")?.toUpperCase();
  const sort = one("sort");

  return {
    variant: VARIANTS.includes(variant as Variant) ? (variant as Variant) : null,
    skill: SKILLS.includes(skill as Skill) ? (skill as Skill) : null,
    q: (one("q") ?? "").trim(),
    sort: SORTS.includes(sort as Sort) ? (sort as Sort) : "newest",
  };
}

/**
 * Listening and Speaking are identical across Academic and General Training, so a
 * test carrying neither variant tag belongs under *both* filters rather than
 * being hidden by either. Only Reading and Writing actually split by variant.
 */
function matchesVariant(tags: string[], variant: Variant | null): boolean {
  if (!variant) return true;
  const hasAcademic = tags.includes("academic");
  const hasGeneral = tags.includes("general-training");
  if (!hasAcademic && !hasGeneral) return true;
  return variant === "academic" ? hasAcademic : hasGeneral;
}

export async function getLibrary(
  filters: LibraryFilters,
  /** The signed-in reader, if there is one. Signed-out readers get no per-tile state. */
  userId?: string | null,
): Promise<LibraryCollection[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "PRACTICE_TEST",
      published: true,
      ...(filters.skill ? { skill: filters.skill } : {}),
      ...(filters.q
        ? {
            OR: [
              { title: { contains: filters.q, mode: "insensitive" as const } },
              { topic: { contains: filters.q, mode: "insensitive" as const } },
              { tags: { has: filters.q.toLowerCase() } },
            ],
          }
        : {}),
    },
    select: {
      id: true,
      slug: true,
      title: true,
      skill: true,
      tags: true,
      sourceTestSet: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const visible = items.filter((item) => item.skill && matchesVariant(item.tags, filters.variant));

  const visibleIds = visible.map((item) => item.id);

  // Two grouped queries rather than a pair per test: everyone's attempts for the "practised"
  // sort and the tile's count, and — only when someone is signed in — that reader's own.
  const [counts, mine] = await Promise.all([
    prisma.progress.groupBy({
      by: ["contentItemId"],
      where: { contentItemId: { in: visibleIds } },
      _count: { _all: true },
    }),
    userId
      ? prisma.progress.groupBy({
          by: ["contentItemId"],
          where: {
            userId,
            contentItemId: { in: visibleIds },
            // A row with no band cannot report a best band, and counting it would let the
            // attempt tally disagree with the band it sits next to.
            bandScore: { not: null },
          },
          _count: { _all: true },
          _max: { bandScore: true },
        })
      : Promise.resolve([]),
  ]);

  const attemptsById = new Map(counts.map((row) => [row.contentItemId, row._count._all]));
  const learnerById = new Map<string, LearnerState>();
  for (const row of mine) {
    const bestBand = row._max.bandScore;
    if (row.contentItemId === null || bestBand === null) continue;
    learnerById.set(row.contentItemId, { bestBand, attempts: row._count._all });
  }

  const collections = new Map<string, LibraryTest[]>();
  for (const item of visible) {
    const skill = item.skill as Skill;
    const name = item.sourceTestSet ?? "Other practice tests";
    const list = collections.get(name) ?? [];
    list.push({
      slug: item.slug,
      title: item.title,
      skill,
      href: `${SKILL_PATHS[skill]}/${item.slug}`,
      attempts: attemptsById.get(item.id) ?? 0,
      learner: learnerById.get(item.id) ?? null,
    });
    collections.set(name, list);
  }

  const sorted = [...collections.entries()].map(([name, tests]) => ({
    name,
    tests: sortTests(tests, filters.sort),
  }));

  // Collections themselves stay alphabetical so the page order is stable as
  // content is added; only the tests inside them respond to the sort control.
  return sorted.sort((a, b) => a.name.localeCompare(b.name));
}

function sortTests(tests: LibraryTest[], sort: Sort): LibraryTest[] {
  const copy = [...tests];
  if (sort === "alphabetical") return copy.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "practised") return copy.sort((a, b) => b.attempts - a.attempts || a.title.localeCompare(b.title));
  return copy; // newest — already ordered by createdAt desc from the query
}

export function countTests(collections: LibraryCollection[]): number {
  return collections.reduce((sum, collection) => sum + collection.tests.length, 0);
}
