"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { useTranslate } from "@/components/i18n/locale-provider";

/**
 * Light/dark toggle (site-build-prompt.md sections 2 and 7).
 *
 * Three states rather than two: light, dark, and following the operating system. A binary
 * toggle silently overrides someone's OS preference the first time they touch it and gives
 * them no way back — "system" is the default and stays reachable.
 *
 * The choice is read through `useSyncExternalStore` rather than an effect that sets state:
 * it lives in localStorage, which does not exist during SSR, and this is the hook built
 * for exactly that. It also keeps two open tabs in step, since a write in one fires
 * `storage` in the other.
 *
 * The stored key matches the inline script in the root layout, which applies the theme
 * before first paint so a returning dark-mode reader never sees a white flash.
 */

export const THEME_STORAGE_KEY = "scorewell-theme";

type Theme = "light" | "dark" | "system";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    // Private browsing can refuse storage entirely; following the OS is the safe default.
    return "system";
  }
}

/** Nothing is knowable on the server, so the first paint shows the default. */
function getServerSnapshot(): Theme {
  return "system";
}

function choose(next: Theme) {
  const root = document.documentElement;
  if (next === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", next);

  try {
    if (next === "system") window.localStorage.removeItem(THEME_STORAGE_KEY);
    else window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // The choice still applies to this visit even if it cannot be remembered.
  }
  for (const listener of listeners) listener();
}

const OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Light",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
  },
  {
    value: "system",
    label: "System",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    value: "dark",
    label: "Dark",
    icon: <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />,
  },
];

export function ThemeToggle() {
  const { t } = useTranslate();
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className="flex items-center gap-0.5 rounded-full bg-white/10 p-0.5"
      role="radiogroup"
      aria-label={t("Colour theme")}
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={theme === option.value}
          aria-label={t(option.label)}
          title={t(option.label)}
          onClick={() => choose(option.value)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
            theme === option.value
              ? // Literal navy: this pill is white in both themes, so it must not follow
                // the link token, which lifts on dark surfaces.
                "bg-white text-brand-700"
              : "text-white/70 hover:bg-white/10 hover:text-white",
          )}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {option.icon}
          </svg>
        </button>
      ))}
    </div>
  );
}
