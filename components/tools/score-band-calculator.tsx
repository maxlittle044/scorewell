"use client";

import { useState } from "react";
import { rawScoreToBand } from "@/lib/band-conversion";

export function ScoreBandCalculator() {
  const [correct, setCorrect] = useState(30);

  return (
    <div>
      <label htmlFor="correct" className="mb-1.5 block text-sm font-medium text-zinc-700">
        Correct answers (out of 40)
      </label>
      <input
        id="correct"
        type="number"
        min={0}
        max={40}
        value={correct}
        onChange={(e) => setCorrect(Number(e.target.value))}
        className="w-32 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      <div className="mt-6 rounded-xl bg-brand-50 px-5 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">Estimated band</p>
        <p className="mt-1 text-3xl font-bold text-brand-700">{rawScoreToBand(correct)}</p>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        This is an approximate conversion based on commonly published band
        thresholds — actual scoring varies slightly by test version.
      </p>
    </div>
  );
}
