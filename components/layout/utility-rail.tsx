"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Fixed right-edge shortcut rail (spec section 7.1) — visible as the page scrolls,
 * with a back-to-top control that appears once there is somewhere to go back to.
 * Hidden below `xl` so it never overlaps page content on narrow viewports.
 */

const SHORTCUTS = [
  {
    href: "/exam-library",
    label: "Library",
    icon: (
      <>
        <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H9a2 2 0 0 1 2 2v13a1.5 1.5 0 0 0-1.5-1.5h-4A1.5 1.5 0 0 1 4 16Z" />
        <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H15a2 2 0 0 0-2 2v13a1.5 1.5 0 0 1 1.5-1.5h4a1.5 1.5 0 0 0 1.5-1.5Z" />
      </>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
      </>
    ),
  },
];

export function UtilityRail() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex">
      {SHORTCUTS.map((shortcut) => (
        <Link
          key={shortcut.href}
          href={shortcut.href}
          className="flex w-20 flex-col items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white px-2 py-3 text-brand-700 shadow-lg shadow-zinc-900/5 transition-colors hover:border-pop-300 hover:text-pop-600"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {shortcut.icon}
          </svg>
          <span className="text-xs font-semibold">{shortcut.label}</span>
        </Link>
      ))}

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/20 transition-colors hover:bg-brand-600"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
