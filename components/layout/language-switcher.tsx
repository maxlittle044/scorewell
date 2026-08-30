"use client";

import { useTranslate } from "@/components/i18n/locale-provider";
import { setLocaleAction } from "@/lib/i18n-actions";
import { LOCALES, LOCALE_CODES, LOCALE_NAMES } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Interface language switcher (site-build-prompt.md section 6).
 *
 * A form of submit buttons rather than a `<select>` with an onChange handler: this way the
 * switch is a plain POST that works before hydration and without JavaScript, and there is
 * no state to keep in step with the cookie — the server re-renders with the new language.
 *
 * `variant="bar"` is the compact pair of codes for the navy nav band; `variant="menu"` is
 * the full-width version for the mobile menu, where there is room to name each language and
 * to say what the switch actually covers.
 */
export function LanguageSwitcher({ variant = "bar" }: { variant?: "bar" | "menu" }) {
  const { locale, t } = useTranslate();
  const isMenu = variant === "menu";

  return (
    <div className={isMenu ? "flex flex-col gap-2" : undefined}>
      {isMenu && (
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          {t("Interface language")}
        </p>
      )}

      <form
        action={setLocaleAction}
        // The compact variant has no room for the scope note the menu shows, so the label
        // carries it — a reader switching languages should not have to guess how far the
        // switch reaches.
        aria-label={`${t("Interface language")} — ${t("Menus and site chrome only — pages and lessons stay in English.")}`}
        className={cn(
          "flex items-center",
          isMenu ? "gap-2" : "gap-0.5 rounded-full bg-white/10 p-0.5",
        )}
      >
        {LOCALES.map((option) => {
          const active = option === locale;
          return (
            <button
              key={option}
              type="submit"
              name="locale"
              value={option}
              lang={option}
              aria-pressed={active}
              // The compact variant shows a two-character code, which is not a name anyone
              // could act on when read aloud, so the language names itself here too.
              aria-label={LOCALE_NAMES[option]}
              title={LOCALE_NAMES[option]}
              className={cn(
                isMenu
                  ? "flex-1 rounded-full border px-3 py-2 text-sm font-medium transition-colors"
                  : "flex h-7 items-center justify-center rounded-full px-2.5 text-xs font-semibold transition-colors",
                isMenu
                  ? active
                    ? "border-brand-500 bg-brand-50 text-link"
                    : "border-line text-ink-body hover:border-brand-400"
                  : active
                    ? // Literal navy on white: this pill sits on the navy band in both
                      // themes, so it must not follow the link token.
                      "bg-white text-brand-700"
                    : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {isMenu ? LOCALE_NAMES[option] : LOCALE_CODES[option]}
            </button>
          );
        })}
      </form>

      {isMenu && (
        <p className="text-xs text-ink-muted">
          {t("Menus and site chrome only — pages and lessons stay in English.")}
        </p>
      )}
    </div>
  );
}
