"use client";

import { useRef } from "react";
import { setCurrencyAction } from "@/lib/currency-actions";
import {
  BASE_CURRENCY,
  CURRENCIES,
  CURRENCY_INFO,
  RATES_AS_OF,
  type Currency,
} from "@/lib/currency";

/**
 * Display-currency switcher (spec section 6).
 *
 * A `<select>` inside a plain form rather than the row of pill buttons the language switcher
 * uses: seven currencies do not fit on a phone as buttons, and a select is the control people
 * already expect for this. Changing it submits the form, and the submit button stays rendered
 * so the switch still works before hydration and with JavaScript off — the same no-JS
 * guarantee the language switcher gives.
 *
 * The "≈" note is not decoration. It is the honest half of this feature: the reader is being
 * shown a converted number at a rate we last checked on a stated date, and is paying in NPR
 * regardless of what the select says.
 */
export function CurrencySwitcher({ currency }: { currency: Currency }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        ref={formRef}
        action={setCurrencyAction}
        className="flex items-center gap-2"
        aria-label="Display currency"
      >
        <label htmlFor="currency-select" className="text-sm text-ink-muted">
          Show prices in
        </label>
        <select
          id="currency-select"
          name="currency"
          defaultValue={currency}
          onChange={() => formRef.current?.requestSubmit()}
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-medium text-ink"
        >
          {CURRENCIES.map((option) => (
            <option key={option} value={option}>
              {option} — {CURRENCY_INFO[option].name}
            </option>
          ))}
        </select>
        {/* Redundant once hydrated, and deliberately kept: without it the control is
            unusable with JavaScript off. */}
        <button
          type="submit"
          className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink-body transition-colors hover:border-brand-400 hover:text-link"
        >
          Show
        </button>
      </form>

      {currency !== BASE_CURRENCY && (
        <p className="max-w-md text-center text-xs text-ink-muted">
          Approximate, converted at a fixed reference rate (last checked {RATES_AS_OF}). You pay
          in Nepalese rupees — that is the amount your bank or wallet will show.
        </p>
      )}
    </div>
  );
}
