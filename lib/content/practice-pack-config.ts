import type { Skill } from "@/generated/prisma/enums";

/**
 * Practice pack constants and pure helpers.
 *
 * Client-safe only: no prisma, no server imports, so the unlock button and the pack pages can
 * both read these. The database side lives in ./practice-packs, which imports this — importing
 * it the other way round would pull the Prisma client into the browser bundle. Same split as
 * lib/review.ts and lib/review-actions.ts.
 */

/** Well under the 5 credits a human review costs — this is assembly, not anyone's time. */
export const PACK_COST_CREDITS = 2;

/** A single test is not a pack; it is already free on its own page. */
export const PACK_MIN_TESTS = 2;

/** The canonical ledger reason that proves ownership of a pack. */
export function packLedgerReason(slug: string): string {
  return `Practice pack: ${slug}`;
}

/** Booklet order: the order the real exam runs its papers in. */
export const SKILL_ORDER: Skill[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];

export function describeSkills(skills: Skill[]): string {
  return skills.map((skill) => skill.charAt(0) + skill.slice(1).toLowerCase()).join(" · ");
}
