import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCreditBalance, spendCredit } from "@/lib/credits";
import { FREE_MONTHLY_AI_USES } from "./usage-limits";

export { FREE_MONTHLY_AI_USES };

function startOfMonth(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export type UsageStatus = {
  isPremium: boolean;
  used: number;
  limit: number | null; // null = unlimited
  remaining: number | null;
  /** Pay-per-use credits, spendable once the free monthly allowance is gone. */
  credits: number;
};

/** Reads the signed-in user's current month usage. */
export async function getUsageStatus(userId: string): Promise<UsageStatus> {
  const [subscription, used, credits] = await Promise.all([
    prisma.subscription.findUnique({ where: { userId } }),
    prisma.aiUsage.count({ where: { userId, createdAt: { gte: startOfMonth() } } }),
    getCreditBalance(userId),
  ]);

  const isPremium = subscription?.tier === "PREMIUM" && subscription.status === "ACTIVE";

  return {
    isPremium,
    used,
    limit: isPremium ? null : FREE_MONTHLY_AI_USES,
    remaining: isPremium ? null : Math.max(0, FREE_MONTHLY_AI_USES - used),
    credits,
  };
}

/** Which allowance covered this call — decides whether a credit is spent. */
export type QuotaSource = "premium" | "free" | "credit";

export type QuotaResult =
  | { allowed: true; userId: string; source: QuotaSource }
  | { allowed: false; reason: "not-signed-in" | "limit-reached" };

/**
 * Gate an AI tool call. Requires sign-in so usage can be attributed — otherwise
 * the free limit would be trivially bypassed by logging out.
 *
 * Order is premium → free monthly allowance → pay-per-use credits, so credits
 * are only ever consumed after the free allowance is exhausted.
 */
export async function checkAiQuota(): Promise<QuotaResult> {
  const session = await auth();
  if (!session?.user) return { allowed: false, reason: "not-signed-in" };

  const status = await getUsageStatus(session.user.id);

  if (status.isPremium) {
    return { allowed: true, userId: session.user.id, source: "premium" };
  }
  if (status.remaining !== null && status.remaining > 0) {
    return { allowed: true, userId: session.user.id, source: "free" };
  }
  if (status.credits > 0) {
    return { allowed: true, userId: session.user.id, source: "credit" };
  }

  return { allowed: false, reason: "limit-reached" };
}

/**
 * Record one consumed AI use. Call only after a successful AI response.
 *
 * When the call was covered by credits, one credit is spent here rather than at
 * check time, so a failed AI request does not cost the learner anything. The
 * spend is guarded by a serializable transaction, so the worst case in a burst
 * of parallel requests is a small bounded overrun, never a negative balance.
 */
export async function recordAiUsage(
  userId: string,
  tool: string,
  source: QuotaSource = "free",
): Promise<void> {
  if (source === "credit") {
    await spendCredit(userId, tool);
  }
  await prisma.aiUsage.create({ data: { userId, tool } });
}

export function quotaMessage(reason: "not-signed-in" | "limit-reached"): string {
  return reason === "not-signed-in"
    ? "Please log in to use the AI tools."
    : `You've used all ${FREE_MONTHLY_AI_USES} free AI tool uses this month. Upgrade to Premium for unlimited access, or buy credits to keep going.`;
}
