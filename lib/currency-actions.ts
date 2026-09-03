"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { BASE_CURRENCY, CURRENCY_COOKIE, isCurrency } from "@/lib/currency";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Stores the chosen display currency — a cookie rather than a column on User, for the same
 * reasons as the language choice in `lib/i18n-actions.ts`: it has to work before anyone logs
 * in, and it is a display preference rather than account data.
 *
 * Nothing about an order is decided here. The amount a purchase is recorded at is read from
 * `lib/pricing.ts` server-side at checkout, in NPR, so a tampered cookie changes what a
 * visitor reads and nothing about what they owe.
 */
export async function setCurrencyAction(formData: FormData) {
  const requested = formData.get("currency");
  const currency = isCurrency(requested) ? requested : BASE_CURRENCY;

  const cookieStore = await cookies();
  cookieStore.set(CURRENCY_COOKIE, currency, {
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });

  refresh();
}
