import { prisma } from "@/lib/prisma";
import { verifyIdToken } from "@/lib/firebase/admin";

/**
 * The Postgres user id behind a Firebase ID token, or null if the token is not valid.
 *
 * Separate from `linkFirebaseUser` because this one only reads: it is used to attribute a
 * referral just after sign-up, and must never create or modify an account as a side effect of
 * answering "who is this?".
 */
export async function userIdForToken(idToken: string): Promise<string | null> {
  const decoded = await verifyIdToken(idToken);
  if (!decoded?.uid) return null;

  const user = await prisma.user.findUnique({
    where: { firebaseUid: decoded.uid },
    select: { id: true },
  });
  return user?.id ?? null;
}
