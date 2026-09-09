import { prisma } from "@/lib/prisma";

/**
 * Resolves a verified Firebase identity to the Postgres user row that owns all the data.
 *
 * Firebase owns identity; `User.id` still owns everything else — progress, submissions,
 * drafts, credits, referrals. This is the one place the two are joined, and it has to handle
 * three cases without ever creating a duplicate account for the same person:
 *
 * 1. **Known Firebase user** — matched by `firebaseUid`. The ordinary path.
 * 2. **Existing account signing in through Firebase for the first time** — matched by email
 *    and stamped with the uid. This is what keeps everyone's history attached to them across
 *    the switch; without it they would silently get a fresh, empty account.
 * 3. **Genuinely new** — a row is created, along with the free Subscription that the rest of
 *    the app assumes every user has.
 *
 * Email is the matching key because Firebase verifies it and `User.email` is unique. A
 * Firebase identity with no email is rejected by the caller rather than handled here.
 */
export async function linkFirebaseUser(params: {
  firebaseUid: string;
  email: string;
  name?: string | null;
  image?: string | null;
}) {
  const byUid = await prisma.user.findUnique({
    where: { firebaseUid: params.firebaseUid },
    select: { id: true, name: true, email: true, image: true },
  });
  if (byUid) return byUid;

  const byEmail = await prisma.user.findUnique({
    where: { email: params.email },
    select: { id: true, name: true, email: true, image: true, firebaseUid: true },
  });

  if (byEmail) {
    // Claim the existing account. `passwordHash` is deliberately left in place — it is the
    // revert path, and clearing it here would quietly make that impossible.
    if (byEmail.firebaseUid && byEmail.firebaseUid !== params.firebaseUid) {
      // Two Firebase identities claiming one email should not happen (Firebase enforces
      // uniqueness), and silently reassigning would hand one person another's history.
      throw new Error("This email is already linked to a different sign-in.");
    }
    const updated = await prisma.user.update({
      where: { id: byEmail.id },
      data: {
        firebaseUid: params.firebaseUid,
        // Only fill blanks; never overwrite a name the learner set here with a Google one.
        name: byEmail.name ?? params.name ?? null,
        image: byEmail.image ?? params.image ?? null,
      },
      select: { id: true, name: true, email: true, image: true },
    });
    return updated;
  }

  return prisma.user.create({
    data: {
      firebaseUid: params.firebaseUid,
      email: params.email,
      name: params.name ?? null,
      image: params.image ?? null,
      // No local password: this account has never had one here.
      passwordHash: null,
      // Every other part of the app assumes a subscription row exists.
      subscription: { create: {} },
    },
    select: { id: true, name: true, email: true, image: true },
  });
}
