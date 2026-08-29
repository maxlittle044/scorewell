"use client";

import { useState } from "react";
import { rawScoreToBand } from "@/lib/band-conversion";

export function ScoreBandCalculator() {
  const [correct, setCorrect] = useState(30);

  return (
    <div>
      <label htmlFor="correct" className="mb-1.5 block text-sm font-medium text-ink-body">
        Correct answers (out of 40)
      </label>
      <input
        id="correct"
        type="number"
        min={0}
        max={40}
        value={correct}
        onChange={(e) => setCorrect(Number(e.target.value))}
        className="w-32 rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      <div className="mt-6 rounded-xl bg-brand-50 px-5 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-link">Estimated band</p>
        <p className="mt-1 text-3xl font-bold text-link">{rawScoreToBand(correct)}</p>
      </div>

      <p className="mt-4 text-xs text-ink-muted">
        This is an approximate conversion based on commonly published band
        thresholds — actual scoring varies slightly by test version.
      </p>
    </div>
  );
}
