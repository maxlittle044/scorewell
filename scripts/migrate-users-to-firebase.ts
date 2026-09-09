/**
 * Imports existing accounts into Firebase, keeping their current passwords.
 *
 *   npx tsx scripts/migrate-users-to-firebase.ts          # report only
 *   npx tsx scripts/migrate-users-to-firebase.ts --apply  # actually import
 *
 * Firebase can verify bcrypt hashes directly, so accounts move across without anyone being
 * forced to reset or even noticing. Without this step every existing learner would find their
 * password rejected — the email match in `linkFirebaseUser` only runs *after* Firebase has
 * authenticated someone, and it cannot authenticate an account it has never heard of.
 *
 * Safe to re-run: users already present in Firebase are skipped, and the Postgres row is only
 * stamped with the uid it actually got.
 */
import "dotenv/config";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { prisma } from "@/lib/prisma";

const APPLY = process.argv.includes("--apply");

/** Must match the cost factor bcryptjs used when the hashes were written (10). */
const BCRYPT_ROUNDS = 10;

function admin() {
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

async function main() {
  const auth = getAuth(admin());

  const users = await prisma.user.findMany({
    where: { firebaseUid: null },
    select: { id: true, email: true, name: true, passwordHash: true },
  });

  const withPassword = users.filter((u) => u.passwordHash);
  const without = users.length - withPassword.length;

  console.log(`${users.length} account(s) not yet linked to Firebase`);
  if (without) console.log(`  ${without} have no password hash and cannot be imported — they will need a reset link`);
  if (!APPLY) {
    console.log(`\nDry run. ${withPassword.length} would be imported with their existing passwords.`);
    console.log("Re-run with --apply to do it.");
    return;
  }

  let imported = 0;
  let linked = 0;

  for (const u of withPassword) {
    // Reuse the Firebase account if this email is already there (a re-run, or someone who
    // signed up directly), rather than creating a duplicate.
    let uid: string | null = null;
    try {
      uid = (await auth.getUserByEmail(u.email)).uid;
    } catch {
      const result = await auth.importUsers(
        [
          {
            uid: u.id, // reuse the Postgres id so the two systems share one identifier
            email: u.email,
            displayName: u.name ?? undefined,
            passwordHash: Buffer.from(u.passwordHash!),
          },
        ],
        { hash: { algorithm: "BCRYPT", rounds: BCRYPT_ROUNDS } },
      );
      if (result.failureCount) {
        console.log(`  FAILED ${u.email}: ${result.errors[0]?.error.message}`);
        continue;
      }
      uid = u.id;
      imported++;
    }

    await prisma.user.update({ where: { id: u.id }, data: { firebaseUid: uid } });
    linked++;
  }

  console.log(`\nimported ${imported} into Firebase, linked ${linked} Postgres rows`);
  console.log("Passwords are unchanged — everyone signs in exactly as before.");
}

main()
  .catch((e) => {
    console.error("FAILED:", e?.message ?? e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
