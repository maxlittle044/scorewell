/**
 * Creates (or resets) the two test accounts named in .env. Rerunnable: upserts by email,
 * so running it twice re-hashes the password rather than erroring.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "@/lib/prisma";

/**
 * Identity lives in Firebase now, so an account written only to Postgres cannot sign in.
 * Each test user is therefore created in both: Firebase owns the password, Postgres owns the
 * data, and the bcrypt hash is still written so these accounts survive a revert too.
 */
function adminApp() {
  if (getApps().length) return getApps()[0];
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error("Firebase server credentials are not set.");
  }
  return initializeApp({
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

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

    // Create or reset the Firebase account, which is what actually authenticates them.
    const auth = getAuth(adminApp());
    let firebaseUid: string;
    try {
      const existing = await auth.getUserByEmail(a.email);
      await auth.updateUser(existing.uid, { password: a.password, displayName: a.name });
      firebaseUid = existing.uid;
    } catch {
      const created = await auth.createUser({ email: a.email, password: a.password, displayName: a.name });
      firebaseUid = created.uid;
    }
    // A year out, so the premium account does not silently lapse mid-test.
    const periodEnd = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const user = await prisma.user.upsert({
      where: { email: a.email },
      update: { name: a.name, passwordHash, firebaseUid },
      create: { email: a.email, name: a.name, passwordHash, firebaseUid },
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
