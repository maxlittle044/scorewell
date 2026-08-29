"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "sw-announcement-dismissed";
const MESSAGE = "Limited-time offer: 20% off ScoreWell Premium for new learners.";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Reads localStorage (unavailable during SSR), so this can't be a lazy
    // useState initializer without causing a hydration mismatch.
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(false);
      }
    } catch {
      // localStorage unavailable — keep the bar visible
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-linear-to-r from-brand-700 via-pop-600 to-brand-700 px-10 py-2 text-center text-sm font-medium text-white">
      <p>
        {MESSAGE}{" "}
        <a href="/pricing" className="underline underline-offset-2 hover:no-underline">
          Upgrade now
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
