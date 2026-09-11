"use server";

import { cookies } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { REFERRAL_COOKIE, recordReferralSignup } from "@/lib/referral";
import { safeCallbackUrl } from "@/lib/safe-redirect";

export type AuthActionState = { error?: string };

/**
 * Exchanges a verified Firebase ID token for a ScoreWell session.
 *
 * The browser has already signed in with Firebase by this point (see the login form), so all
 * that is left is to hand the token to NextAuth, which verifies it server-side and resolves it
 * to the Postgres user — the session cookie behaves exactly as it did before the switch.
 *
 * `isNewSignup` exists only to credit a referral. It is a hint from the client rather than a
 * decision: `recordReferralSignup` still checks the code and the account, so a forged flag
 * cannot manufacture a reward.
 *
 * `callbackUrl` is where the visitor was trying to go. It used to be ignored — every sign-in
 * went to the dashboard, so an admin opening /admin while signed out, or someone halfway to
 * paying at /checkout, signed in and then had to find their way back. It arrives from the
 * browser and is therefore checked here, not trusted: anything that is not a path on this site
 * falls back to the dashboard.
 */
export async function completeSignInAction(
  idToken: string,
  isNewSignup: boolean,
  callbackUrl?: string,
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
    await signIn("credentials", { idToken, redirectTo: safeCallbackUrl(callbackUrl) });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "We couldn't sign you in. Please try again." };
    }
    throw error;
  }

  return {};
}
