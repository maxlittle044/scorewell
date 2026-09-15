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
    await auth.updateUser(user.uid, { password, emailVerified: true });
    return { email: user.email ?? email };
  } catch (error) {
    console.error("Could not set the welcome password:", error);
    return { error: "This account setup link is invalid or has expired." };
  }
}
