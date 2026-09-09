"use server";

import { cookies } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { REFERRAL_COOKIE, recordReferralSignup } from "@/lib/referral";

export type AuthActionState = { error?: string };

/**
 * Exchanges a verified Firebase ID token for a ScoreWell session.
 *
 * The browser has already signed in with Firebase by this point (see the login page), so all
 * that is left is to hand the token to NextAuth, which verifies it server-side and resolves it
 * to the Postgres user — the session cookie behaves exactly as it did before the switch.
 *
 * `isNewSignup` exists only to credit a referral. It is a hint from the client rather than a
 * decision: `recordReferralSignup` still checks the code and the account, so a forged flag
 * cannot manufacture a reward.
 */
export async function completeSignInAction(
  idToken: string,
  isNewSignup: boolean,
): Promise<AuthActionState> {
  if (!idToken) return { error: "Sign-in failed. Please try again." };

  if (isNewSignup) {
    const cookieStore = await cookies();
    const referralCode = cookieStore.get(REFERRAL_COOKIE)?.value;
    if (referralCode) {
      // Recorded before the redirect below, which never returns.
      try {
        const { userIdForToken } = await import("@/lib/auth-user-lookup");
        const userId = await userIdForToken(idToken);
        if (userId) {
          await recordReferralSignup(userId, referralCode);
          cookieStore.delete(REFERRAL_COOKIE);
        }
      } catch (error) {
        // A referral that fails to record must not cost someone their sign-up.
        console.error("recordReferralSignup failed:", error);
      }
    }
  }

  try {
    await signIn("credentials", { idToken, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "We couldn't sign you in. Please try again." };
    }
    throw error;
  }

  return {};
}
