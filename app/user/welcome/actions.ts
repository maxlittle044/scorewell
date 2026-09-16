"use server";

import { readUserWelcomeToken } from "@/lib/user-welcome-token";
import { getFirebaseAdminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";

export type WelcomePasswordResult = { email?: string; error?: string };

export async function setWelcomePasswordAction(
  token: string,
  password: string,
): Promise<WelcomePasswordResult> {
  if (!isFirebaseConfigured()) return { error: "The sign-in service is not configured." };
  if (password.length < 6) return { error: "Your password must be at least 6 characters." };

  const email = readUserWelcomeToken(token).trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return { error: "This account setup link is invalid or has expired." };
  }

  try {
    const auth = getFirebaseAdminAuth();
    const user = await auth.getUserByEmail(email);
    // Completing setup marks the address verified, so a verified account has already used
    // its link — reusing that flag as the single-use check needs no extra storage, but does
    // mean this link is the only way to (re)verify: someone who never finishes setup and
    // instead verifies some other way would also close this off, which isn't a path this app
    // currently has.
    if (user.emailVerified) {
      return { error: "This account setup link has already been used." };
    }
    await auth.updateUser(user.uid, { password, emailVerified: true });
    return { email: user.email ?? email };
  } catch (error) {
    console.error("Could not set the welcome password:", error);
    return { error: "This account setup link is invalid or has expired." };
  }
}
