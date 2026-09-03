/**
 * Creates (or resets) the two test accounts named in .env. Rerunnable: upserts by email,
 * so running it twice re-hashes the password rather than erroring.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const ACCOUNTS = [
  {
    email: process.env.TEST_FREE_EMAIL!,
    password: process.env.TEST_FREE_PASSWORD!,
    name: "Free Tester",
    tier: "FREE" as const,
  },
  {
    email: process.env.TEST_PREMIUM_EMAIL!,
    password: process.env.TEST_PREMIUM_PASSWORD!,
    name: "Premium Tester",
    tier: "PREMIUM" as const,
  },
];

async function main() {
  for (const a of ACCOUNTS) {
    if (!a.email || !a.password) throw new Error(`missing env for ${a.name}`);
    const passwordHash = await bcrypt.hash(a.password, 10);
    // A year out, so the premium account does not silently lapse mid-test.
    const periodEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const user = await prisma.user.upsert({
      where: { email: a.email },
      update: { name: a.name, passwordHash },
      create: { email: a.email, name: a.name, passwordHash },
      select: { id: true },
    });

    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        tier: a.tier,
        status: "ACTIVE",
        billingInterval: a.tier === "PREMIUM" ? "MONTHLY_12" : null,
        currentPeriodEnd: a.tier === "PREMIUM" ? periodEnd : null,
      },
      create: {
        userId: user.id,
        tier: a.tier,
        status: "ACTIVE",
        billingInterval: a.tier === "PREMIUM" ? "MONTHLY_12" : null,
        currentPeriodEnd: a.tier === "PREMIUM" ? periodEnd : null,
      },
    });

    const sub = await prisma.subscription.findUniqueOrThrow({ where: { userId: user.id } });
    console.log(`${a.name.padEnd(15)} ${a.email.padEnd(34)} tier=${sub.tier} status=${sub.status}`);
  }
}
main().finally(() => prisma.$disconnect());
