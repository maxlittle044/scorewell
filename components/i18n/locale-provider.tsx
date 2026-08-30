"use client";

import { createContext, use, type ReactNode } from "react";
import { DEFAULT_LOCALE, translator, type Locale, type Translate } from "@/lib/i18n";

/**
 * Carries the interface language to the client components that make up the shell — the
 * header, the announcement bar, the utility rail — so none of them has to be handed a
 * `locale` prop through the layout.
 *
 * The dictionary itself is imported, not sent: it is a few kilobytes of static strings that
 * belong in the bundle, and shipping it through the RSC payload on every navigation would
 * cost more than including it once.
 */

type LocaleContextValue = { locale: Locale; t: Translate };

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  t: translator(DEFAULT_LOCALE),
});

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  // Recreated only when the locale actually changes, which is the point of the memo-free
  // shape here: `translator` is a closure over a constant object, so this is cheap.
  const value: LocaleContextValue = { locale, t: translator(locale) };
  return <LocaleContext value={value}>{children}</LocaleContext>;
}

/** The chrome translator. Falls back to English text outside a provider. */
export function useTranslate(): LocaleContextValue {
  return use(LocaleContext);
}
