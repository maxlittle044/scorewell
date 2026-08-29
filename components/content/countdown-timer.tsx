"use client";

import { useEffect, useState } from "react";

export function CountdownTimer({ minutes }: { minutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const ss = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold tabular-nums ${
        secondsLeft <= 60 ? "bg-rose-100 text-rose-700" : "bg-zinc-100 text-zinc-700"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      {mm}:{ss}
    </span>
  );
}
