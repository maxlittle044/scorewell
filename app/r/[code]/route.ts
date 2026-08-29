import { NextResponse, type NextRequest } from "next/server";
import { REFERRAL_COOKIE } from "@/lib/referral";

const THIRTY_DAYS = 60 * 60 * 24 * 30;

/**
 * Referral share link. Stores the code in a cookie, then sends the visitor to
 * signup — the signup action reads the cookie and links the accounts.
 */
export async function GET(request: NextRequest, ctx: RouteContext<"/r/[code]">) {
  const { code } = await ctx.params;

  const response = NextResponse.redirect(new URL("/login", request.url));
  response.cookies.set(REFERRAL_COOKIE, code, {
    maxAge: THIRTY_DAYS,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
