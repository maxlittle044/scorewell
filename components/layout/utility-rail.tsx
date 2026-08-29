"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Fixed right-edge shortcut rail (spec section 7.1), plus a back-to-top control.
 *
 * **Why the rail's breakpoint is an exact pixel value.** It used to be `xl` (1280px),
 * which is also the width of `max-w-7xl` page containers — so from 1280px up to roughly
 * 1470px the rail was drawn on top of the page's right-hand column, clipping card text on
 * every page. The rail only clears the container once the gutter is wider than the rail:
 *
 *   container right edge = (viewport + 1280) / 2      rail left edge = viewport - 96
 *   (viewport + 1280) / 2 <= viewport - 96   =>   viewport >= 1472
 *
 * (96px = the rail's `w-20` plus its `right-4` offset.) Hence `min-[1472px]`, which shows
 * the rail everywhere it genuinely fits and nowhere it doesn't.
 *
 * Back-to-top is deliberately *not* in that rail. It is useful on long pages at every
 * width, so it sits on its own in the bottom-right corner where a small round control
 * covers nothing that matters.
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
    <>
      <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 min-[1472px]:flex">
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
      </div>

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg shadow-brand-900/20 transition-colors hover:bg-brand-600"
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
    </>
  );
}
