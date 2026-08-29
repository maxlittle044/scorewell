import { prisma } from "@/lib/prisma";

/**
 * Pay-per-use credits (site-build-prompt.md section 6) — the alternative to a
 * subscription for learners who want occasional AI scoring without a recurring
 * plan.
 *
 * The balance is the sum of an append-only ledger rather than a mutable number,
 * so any balance can be explained: positive rows are purchases or grants,
 * negative rows are spends. One credit buys one AI tool use.
 */

export type CreditPack = {
  id: string;
  credits: number;
  priceNpr: number;
  bestValue?: boolean;
};

// Placeholder NPR pricing, matching the convention in lib/pricing.ts — swap
// these for real price points before launch.
export const CREDIT_PACKS: CreditPack[] = [
  { id: "pack-10", credits: 10, priceNpr: 400 },
  { id: "pack-25", credits: 25, priceNpr: 900 },
  { id: "pack-60", credits: 60, priceNpr: 1800, bestValue: true },
];

export function getCreditPack(id: string | null | undefined): CreditPack | null {
  return CREDIT_PACKS.find((pack) => pack.id === id) ?? null;
}

export async function getCreditBalance(userId: string): Promise<number> {
  const result = await prisma.creditTransaction.aggregate({
    where: { userId },
    _sum: { delta: true },
  });
  return result._sum.delta ?? 0;
}

/** Add credits — a purchase approved by an admin, or a manual grant. */
export async function grantCredits(
  userId: string,
  credits: number,
  reason: string,
): Promise<void> {
  if (credits <= 0) return;
  await prisma.creditTransaction.create({
    data: { userId, delta: credits, reason },
  });
}

/**
 * Spend `amount` credits, refusing to overdraw.
 *
 * The balance check and the write happen in one serializable transaction —
 * without that, two spends racing on a balance of 1 could both read 1 and both
 * commit, leaving the learner at -1.
 */
export async function spendCredits(
  userId: string,
  amount: number,
  reason: string,
): Promise<boolean> {
  if (amount <= 0) return true;

  try {
    return await prisma.$transaction(
      async (tx) => {
        const result = await tx.creditTransaction.aggregate({
          where: { userId },
          _sum: { delta: true },
        });
        const balance = result._sum.delta ?? 0;
        if (balance < amount) return false;

        await tx.creditTransaction.create({
          data: { userId, delta: -amount, reason },
        });
        return true;
      },
      { isolationLevel: "Serializable" },
    );
  } catch {
    // A serialization failure means another spend won the race; treating that
    // as "not enough credit" is the safe direction to fail.
    return false;
  }
}

/** One AI tool use costs one credit. */
export async function spendCredit(userId: string, tool: string): Promise<boolean> {
  return spendCredits(userId, 1, `AI tool: ${tool}`);
}

export function formatCredits(count: number): string {
  return `${count} ${count === 1 ? "credit" : "credits"}`;
}
