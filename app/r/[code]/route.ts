import { NextResponse, type NextRequest } from "next/server";
import { REFERRAL_COOKIE } from "@/lib/referral";
import { loginUrl } from "@/lib/safe-redirect";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

/**
 * Referral share link. Stores the code in a cookie, then sends the visitor to sign up — the
 * signup action reads the cookie and links the accounts.
 *
 * Opens the form on the Sign up tab. It used to land on Log in, which is the wrong form for
 * exactly the person a referral link exists to reach: someone who does not have an account.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/r/[code]">) {
  const { code } = await ctx.params;

  const response = NextResponse.redirect(new URL(loginUrl(undefined, { mode: "signup" }), request.url));
  response.cookies.set(REFERRAL_COOKIE, code, {
    maxAge: THIRTY_DAYS,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
