import { prisma } from "@/lib/prisma";
import { toSlug } from "@/lib/slug";
import { getPrintable, type PrintableDoc } from "./printable";
import { PACK_MIN_TESTS, SKILL_ORDER, packLedgerReason } from "./practice-pack-config";
import type { Skill } from "@/generated/prisma/enums";

/**
 * Downloadable practice packs (site-build-prompt.md section 4b, "downloadable practice packs
 * as a purchasable product").
 *
 * A pack is one library collection — the same `sourceTestSet` grouping the Exam Library
 * already renders — printed as a single document: every test in order, then all the answer
 * keys together at the back.
 *
 * **What is actually being sold.** Every test in a pack is still free to print one at a time
 * from its own page, and that stays true — see /print/[slug], which is unchanged and
 * ungated. The pack is the assembly, not the content: one file instead of a dozen, in a
 * fixed order, with the keys separated out. The pack page says this in as many words,
 * because charging for it while implying the tests are otherwise unavailable would be the
 * kind of claim the honesty rules rule out.
 *
 * **No schema change.** Ownership is a row in the existing CreditTransaction ledger whose
 * reason is this pack's canonical string. That one row is both the charge and the
 * entitlement, written inside spendCredits' serializable transaction, so a pack can never be
 * charged for without being granted or granted without being charged for.
 */

export type PackSummary = {
  slug: string;
  name: string;
  testCount: number;
  /** Distinct skills covered, in a stable order, for the card's metadata row. */
  skills: Skill[];
};

export type PackDetail = PackSummary & {
  docs: PrintableDoc[];
};

type Row = { slug: string; skill: Skill | null; sourceTestSet: string | null; createdAt: Date };

async function loadRows(): Promise<Row[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "PRACTICE_TEST",
      published: true,
      // sourceTestSet is nullable, and `{ not: null }` alone would be fine here, but the
      // grouping below skips nulls anyway so the filter stays simple and explicit.
      NOT: { sourceTestSet: null },
    },
    select: { slug: true, skill: true, sourceTestSet: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return items as Row[];
}

function groupRows(rows: Row[]): Map<string, { name: string; rows: Row[] }> {
  const groups = new Map<string, { name: string; rows: Row[] }>();

  for (const row of rows) {
    if (!row.sourceTestSet || !row.skill) continue;
    const slug = toSlug(row.sourceTestSet);
    if (!slug) continue;
    const group = groups.get(slug) ?? { name: row.sourceTestSet, rows: [] };
    group.rows.push(row);
    groups.set(slug, group);
  }

  return groups;
}

function summarise(slug: string, group: { name: string; rows: Row[] }): PackSummary {
  const present = new Set(group.rows.map((row) => row.skill as Skill));
  return {
    slug,
    name: group.name,
    testCount: group.rows.length,
    skills: SKILL_ORDER.filter((skill) => present.has(skill)),
  };
}

/** Every collection large enough to be worth assembling, alphabetical for a stable page. */
export async function listPacks(): Promise<PackSummary[]> {
  const groups = groupRows(await loadRows());

  return [...groups.entries()]
    .filter(([, group]) => group.rows.length >= PACK_MIN_TESTS)
    .map(([slug, group]) => summarise(slug, group))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * A pack with every test resolved to its printable form.
 *
 * Tests that fail to resolve are dropped rather than failing the whole pack: one malformed
 * seed row should not take a paid download offline. The count shown to the buyer comes from
 * the resolved documents, so it can never promise more sheets than the file contains.
 */
export async function getPack(slug: string): Promise<PackDetail | null> {
  const groups = groupRows(await loadRows());
  const group = groups.get(slug);
  if (!group || group.rows.length < PACK_MIN_TESTS) return null;

  // Ordered by skill so a pack reads Listening → Reading → Writing → Speaking rather than
  // in seed order, which is how a paper booklet is laid out.
  const ordered = [...group.rows].sort(
    (a, b) =>
      SKILL_ORDER.indexOf(a.skill as Skill) - SKILL_ORDER.indexOf(b.skill as Skill) ||
      a.createdAt.getTime() - b.createdAt.getTime(),
  );

  const resolved = await Promise.all(ordered.map((row) => getPrintable(row.slug)));
  const docs = resolved.filter((doc): doc is PrintableDoc => doc !== null);
  if (docs.length === 0) return null;

  const present = new Set(docs.map((doc) => doc.skill as Skill));

  return {
    slug,
    name: group.name,
    testCount: docs.length,
    skills: SKILL_ORDER.filter((skill) => present.has(skill)),
    docs,
  };
}

/** Which of these packs the user has already bought. Premium is handled by the caller. */
export async function getOwnedPackSlugs(
  userId: string,
  slugs: string[],
): Promise<Set<string>> {
  if (slugs.length === 0) return new Set();

  const rows = await prisma.creditTransaction.findMany({
    where: { userId, reason: { in: slugs.map(packLedgerReason) } },
    select: { reason: true },
  });

  const bySlug = new Map(slugs.map((slug) => [packLedgerReason(slug), slug]));
  return new Set(
    rows.map((row) => bySlug.get(row.reason)).filter((slug): slug is string => Boolean(slug)),
  );
}

export async function hasBoughtPack(userId: string, slug: string): Promise<boolean> {
  const row = await prisma.creditTransaction.findFirst({
    where: { userId, reason: packLedgerReason(slug) },
    select: { id: true },
  });
  return row !== null;
}

/** Premium includes every pack for as long as the plan is active. */
export async function hasPremiumPlan(userId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findUnique({ where: { userId } });
  return subscription?.tier === "PREMIUM" && subscription.status === "ACTIVE";
}

