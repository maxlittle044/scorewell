/**
 * Shared between the placement form and the action that validates its submission.
 *
 * It lives here rather than in learning-path-actions.ts because every export of a
 * "use server" module must be an async function — exporting a constant from one makes
 * the importing page fail to render. It can't live in learning-path.ts either, since
 * that imports Prisma and the form is a client component.
 */

/** Bands a learner can set as a goal. Below 5 nobody targets; 9 is the ceiling. */
export const TARGET_BANDS = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9] as const;

export type TargetBand = (typeof TARGET_BANDS)[number];

export function isTargetBand(value: number): value is TargetBand {
  return (TARGET_BANDS as readonly number[]).includes(value);
}
