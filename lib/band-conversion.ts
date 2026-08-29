const RAW_SCORE_TABLE: { min: number; band: number }[] = [
  { min: 39, band: 9 },
  { min: 37, band: 8.5 },
  { min: 35, band: 8 },
  { min: 33, band: 7.5 },
  { min: 30, band: 7 },
  { min: 27, band: 6.5 },
  { min: 23, band: 6 },
  { min: 19, band: 5.5 },
  { min: 15, band: 5 },
  { min: 13, band: 4.5 },
  { min: 10, band: 4 },
  { min: 8, band: 3.5 },
  { min: 6, band: 3 },
  { min: 4, band: 2.5 },
  { min: 0, band: 2 },
];

/** Approximate raw-score (out of 40) to band conversion, for estimation only. */
export function rawScoreToBand(correct: number): number {
  const clamped = Math.max(0, Math.min(40, correct));
  return RAW_SCORE_TABLE.find((row) => clamped >= row.min)?.band ?? 0;
}

/**
 * How many more correct answers (on the 40-question scale) would reach the next band up.
 * Returned so the score screen can be transparent about the conversion instead of just
 * asserting a band. Null once band 9 is reached.
 */
export function nextBandStep(correct: number): { needed: number; band: number } | null {
  const clamped = Math.max(0, Math.min(40, correct));
  const current = rawScoreToBand(clamped);
  const next = RAW_SCORE_TABLE.filter((row) => row.band > current).at(-1);
  if (!next) return null;
  return { needed: next.min - clamped, band: next.band };
}

/** Rounds an average of band scores using IELTS's up-only .25/.75 rounding rule. */
export function roundBandAverage(average: number): number {
  const whole = Math.floor(average);
  const frac = average - whole;
  if (frac < 0.25) return whole;
  if (frac < 0.75) return whole + 0.5;
  return whole + 1;
}
