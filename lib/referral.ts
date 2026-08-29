import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";

export const REFERRAL_COOKIE = "scorewell_ref";
/** Months of Premium credited to each side when a referral converts. */
export const REFERRAL_REWARD_MONTHS = 1;

// Avoids look-alike characters (0/O, 1/I/l) so codes stay easy to read aloud.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function generateCode(length = 8): string {
  const bytes = randomBytes(length);
  let code = "";
  for (let i = 0; i < length; i++) {
    code += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return code;
}

/** Returns the user's referral code, assigning one on first use. */
export async function getOrCreateReferralCode(userId: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { referralCode: true },
  });
  if (user?.referralCode) return user.referralCode;

  // Retry on the (very unlikely) event of a code collision.
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    try {
      await prisma.user.update({ where: { id: userId }, data: { referralCode: code } });
      return code;
    } catch {
      // unique constraint hit — try a new code
    }
  }
  throw new Error("Could not generate a unique referral code.");
}

export type ReferralStats = { total: number; pending: number; rewarded: number };

export async function getReferralStats(userId: string): Promise<ReferralStats> {
  const [total, rewarded] = await Promise.all([
    prisma.referral.count({ where: { referrerId: userId } }),
    prisma.referral.count({ where: { referrerId: userId, status: "REWARDED" } }),
  ]);
  return { total, pending: total - rewarded, rewarded };
}

/**
 * Links a newly-created user to whoever referred them. Silently no-ops on
 * anything invalid (unknown code, self-referral, already referred) — a bad
 * referral cookie must never block a signup.
 */
export async function recordReferralSignup(newUserId: string, code: string): Promise<void> {
  try {
    const referrer = await prisma.user.findUnique({
      where: { referralCode: code },
      select: { id: true },
    });
    if (!referrer || referrer.id === newUserId) return;

    await prisma.referral.create({
      data: { referrerId: referrer.id, referredUserId: newUserId },
    });
  } catch (error) {
    console.error("recordReferralSignup failed:", error);
  }
}

function addMonths(from: Date, months: number): Date {
  const d = new Date(from);
  d.setMonth(d.getMonth() + months);
  return d;
}

/** Extends a subscription by N months from its current expiry (or from now). */
async function creditMonths(userId: string, months: number): Promise<void> {
  const subscription = await prisma.subscription.findUnique({ where: { userId } });
  const now = new Date();
  const base =
    subscription?.currentPeriodEnd && subscription.currentPeriodEnd > now
      ? subscription.currentPeriodEnd
      : now;

  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      tier: "PREMIUM",
      status: "ACTIVE",
      currentPeriodEnd: addMonths(base, months),
    },
    update: {
      tier: "PREMIUM",
      status: "ACTIVE",
      currentPeriodEnd: addMonths(base, months),
    },
  });
}

/**
 * Called when a referred user's first payment is approved: credits a free
 * month to both sides. Idempotent — a referral is only ever rewarded once.
 */
export async function rewardReferralIfPending(referredUserId: string): Promise<boolean> {
  const referral = await prisma.referral.findUnique({ where: { referredUserId } });
  if (!referral || referral.status === "REWARDED") return false;

  await creditMonths(referral.referrerId, REFERRAL_REWARD_MONTHS);
  await creditMonths(referral.referredUserId, REFERRAL_REWARD_MONTHS);

  await prisma.referral.update({
    where: { id: referral.id },
    data: { status: "REWARDED", rewardedAt: new Date() },
  });

  return true;
}
