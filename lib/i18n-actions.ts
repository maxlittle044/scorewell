"use server";

import { cookies } from "next/headers";
import { refresh } from "next/cache";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale } from "@/lib/i18n";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Stores the chosen interface language.
 *
 * A cookie rather than a column on User, because the choice has to work before anyone logs
 * in — most visitors to a free content site never will — and because it is a display
 * preference, like the theme, not account data.
 *
 * `refresh()` re-renders the current route so the new language appears without a navigation.
 * It does not touch cached data, which is right: nothing about the content changed.
 */
export async function setLocaleAction(formData: FormData) {
  const requested = formData.get("locale");
  const locale = isLocale(requested) ? requested : DEFAULT_LOCALE;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
    sameSite: "lax",
    // Readable by script on purpose — nothing secret is stored, and a future client-side
    // switcher should not need a round trip to find out which language is showing.
    httpOnly: false,
  });

  refresh();
}
