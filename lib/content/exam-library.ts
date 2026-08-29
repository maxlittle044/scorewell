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

export type LibraryTest = {
  slug: string;
  title: string;
  skill: Skill;
  href: string;
  /** Real attempt count from Progress. Zero renders as nothing, never as a seeded figure. */
  attempts: number;
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

export async function getLibrary(filters: LibraryFilters): Promise<LibraryCollection[]> {
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

  // One grouped count query rather than a per-test count.
  const counts = await prisma.progress.groupBy({
    by: ["contentItemId"],
    where: { contentItemId: { in: visible.map((item) => item.id) } },
    _count: { _all: true },
  });
  const attemptsById = new Map(counts.map((row) => [row.contentItemId, row._count._all]));

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
