import { cookies } from "next/headers";
import { BASE_CURRENCY, CURRENCY_COOKIE, isCurrency, type Currency } from "@/lib/currency";

/**
 * The reader's chosen display currency, from the cookie the switcher sets.
 *
 * Defaults to NPR rather than guessing from a header, for the same reason `getLocale` ignores
 * `Accept-Language`: where a request comes from is not a statement about what the reader wants
 * to see, and NPR is the currency actually charged — the safe thing to show someone who has
 * not asked for anything else.
 */
export async function getCurrency(): Promise<Currency> {
  const cookieStore = await cookies();
  const value = cookieStore.get(CURRENCY_COOKIE)?.value;
  return isCurrency(value) ? value : BASE_CURRENCY;
}
