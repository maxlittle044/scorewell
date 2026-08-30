import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, translator, type Locale } from "@/lib/i18n";

/**
 * The reader's interface language, from the cookie the switcher sets.
 *
 * Reading a cookie opts a route out of static rendering, which costs nothing here: the root
 * layout already awaits `auth()` on every request, so every page is dynamic already.
 *
 * `Accept-Language` is deliberately not consulted. A Nepali browser locale says where
 * someone is, not that they want an English-practice site's chrome in Nepali — and guessing
 * wrong flips the whole shell under a reader who never asked. English until asked otherwise.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Locale plus its lookup, for server components that render chrome text. */
export async function getTranslator() {
  const locale = await getLocale();
  return { locale, t: translator(locale) };
}
