"use client";

import { useState } from "react";
import { roundBandAverage } from "@/lib/band-conversion";

const SCORES = Array.from({ length: 19 }, (_, i) => i * 0.5);

export function CriteriaBandCalculator({ criteria }: { criteria: [string, string, string, string] }) {
  const [scores, setScores] = useState<[number, number, number, number]>([6.5, 6.5, 6.5, 6.5]);

  const average = scores.reduce((a, b) => a + b, 0) / 4;
  const band = roundBandAverage(average);

  function updateScore(index: number, value: number) {
    setScores((prev) => {
      const next = [...prev] as [number, number, number, number];
      next[index] = value;
      return next;
    });
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {criteria.map((label, i) => (
          <div key={label}>
            <label htmlFor={`criterion-${i}`} className="mb-1.5 block text-sm font-medium text-ink-body">
              {label}
            </label>
            <select
              id={`criterion-${i}`}
              value={scores[i]}
              onChange={(e) => updateScore(i, Number(e.target.value))}
              className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            >
              {SCORES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-brand-50 px-5 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-wide text-link">Estimated band</p>
        <p className="mt-1 text-3xl font-bold text-link">{band}</p>
      </div>
    </div>
  );
}
