/**
 * Display-currency switcher (site-build-prompt.md section 6, "If targeting multiple regions:
 * localized pricing/currency (currency switcher)").
 *
 * **This converts what is shown, never what is charged.** The v4 note fixes payments on the
 * existing rails — eSewa, Khalti, bank transfer, all in NPR with manual admin approval — so
 * there is no such thing as paying in dollars here. NPR is the real price; every other
 * currency is a reading aid for someone working out whether they can afford it. Every
 * converted figure therefore carries a "≈" and every surface that shows one also states the
 * NPR amount that will actually leave the buyer's account.
 *
 * **The rates are fixed, dated, and shown as such.** A live FX feed is a metered service and
 * the zero-running-cost rule rules it out; a free one would still be a network call, and only
 * AI tool pages may depend on one. So the table below is checked in, `RATES_AS_OF` is printed
 * next to the switcher, and conversions round coarsely — quoting "$10.87" from a rate that has
 * been drifting for months claims a precision we do not have, while "≈ $11" is honest about
 * being an estimate.
 *
 * **Before launch, and periodically after:** verify every rate below against a real source and
 * move `RATES_AS_OF` to the date you checked. These are approximations recorded at the date
 * shown, not quotes. The NPR pricing they convert is itself still placeholder — see
 * `lib/pricing.ts` and `lib/credits.ts`.
 */

export const CURRENCIES = ["NPR", "INR", "USD", "GBP", "EUR", "AUD", "CAD"] as const;
export type Currency = (typeof CURRENCIES)[number];

/** The currency we actually bill in. Everything else is a conversion of this. */
export const BASE_CURRENCY: Currency = "NPR";

export const CURRENCY_COOKIE = "scorewell_currency";

/** The date the rates below were last checked, shown wherever a converted price appears. */
export const RATES_AS_OF = "September 2026";

export type CurrencyInfo = {
  /** Written before the amount, e.g. "$12". */
  symbol: string;
  /** Full name, for the switcher's option text and its accessible label. */
  name: string;
  /**
   * How many NPR one unit of this currency is worth. Stored this way round because it is the
   * direction a person can sanity-check at a glance: one pound is worth a couple of hundred
   * rupees, not 0.0056 of one.
   */
  nprPerUnit: number;
};

export const CURRENCY_INFO: Record<Currency, CurrencyInfo> = {
  NPR: { symbol: "Rs. ", name: "Nepalese rupee", nprPerUnit: 1 },
  // Not an estimate: the Nepalese rupee is pegged to the Indian rupee at a fixed 1.6, and has
  // been for decades. This is the one row below that does not drift.
  INR: { symbol: "₹", name: "Indian rupee", nprPerUnit: 1.6 },
  USD: { symbol: "$", name: "US dollar", nprPerUnit: 138 },
  GBP: { symbol: "£", name: "British pound", nprPerUnit: 178 },
  EUR: { symbol: "€", name: "Euro", nprPerUnit: 152 },
  AUD: { symbol: "A$", name: "Australian dollar", nprPerUnit: 91 },
  CAD: { symbol: "C$", name: "Canadian dollar", nprPerUnit: 100 },
};

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && (CURRENCIES as readonly string[]).includes(value);
}

/**
 * Converts an NPR amount for display, rounded to the precision the rate can support: whole
 * units wherever they carry the number, one decimal only below 5 so a per-use price does not
 * collapse to "≈ $0". Quoting "$10.87" from a rate last checked months ago would dress an
 * estimate up as a quote; "≈ $11" says what we actually know.
 */
export function convertFromNpr(amountNpr: number, currency: Currency): number {
  if (currency === BASE_CURRENCY) return amountNpr;

  const converted = amountNpr / CURRENCY_INFO[currency].nprPerUnit;
  return converted >= 5 ? Math.round(converted) : Math.round(converted * 10) / 10;
}

/** Formats an amount already in `currency`. No "≈" — the caller decides whether it is one. */
export function formatAmount(amount: number, currency: Currency): string {
  const { symbol } = CURRENCY_INFO[currency];
  // en-IN gives the lakh grouping Nepali and Indian readers expect for rupee amounts; the
  // other currencies are small enough here that grouping rarely shows at all.
  const locale = currency === "NPR" || currency === "INR" ? "en-IN" : "en-US";
  return `${symbol}${amount.toLocaleString(locale, { maximumFractionDigits: 1 })}`;
}

/**
 * The headline price string for an NPR amount in the reader's chosen currency — prefixed with
 * "≈" whenever it is a conversion, because it is one.
 */
export function formatConverted(amountNpr: number, currency: Currency): string {
  const formatted = formatAmount(convertFromNpr(amountNpr, currency), currency);
  return currency === BASE_CURRENCY ? formatted : `≈ ${formatted}`;
}
