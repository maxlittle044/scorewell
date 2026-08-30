/**
 * The spaced-repetition schedule (site-build-prompt.md section 6).
 *
 * A five-box Leitner ladder. Answer a card correctly and it moves up a box and comes back
 * after a longer gap; miss it and it drops straight back to box 1 and returns the same day.
 *
 * Chosen over SM-2 because the whole schedule can be printed on the page: "you'll see this
 * again in 3 days" is a true, checkable statement here, where an ease factor drifting per
 * card would not be explainable without teaching the reader the algorithm. For a few hundred
 * exam words the retention difference does not pay for that opacity.
 */

/** Days until a card in each box comes back. Index 0 is unused so box numbers read directly. */
const INTERVAL_DAYS = [0, 1, 3, 7, 21, 60] as const;

export const MAX_BOX = INTERVAL_DAYS.length - 1;

export type ReviewResult = "again" | "good";

export function intervalDaysForBox(box: number): number {
  return INTERVAL_DAYS[Math.min(Math.max(box, 1), MAX_BOX)];
}

/** Where a card lands after an answer. A miss always returns to box 1, however long its streak. */
export function nextBox(box: number, result: ReviewResult): number {
  if (result === "again") return 1;
  return Math.min(box + 1, MAX_BOX);
}

export function nextDueAt(box: number, from: Date = new Date()): Date {
  const due = new Date(from);
  due.setDate(due.getDate() + intervalDaysForBox(box));
  return due;
}

/**
 * How the gap is described on screen. "Tomorrow" rather than "in 1 day", because that is
 * what a learner actually plans around.
 *
 * A missed card is scheduled for tomorrow, but the session also puts it back in the queue
 * before finishing — seeing it once more while it is still fresh is the point of getting it
 * wrong. That requeue is session state, not a second schedule stored in the database.
 */
export function describeInterval(box: number): string {
  const days = intervalDaysForBox(box);
  return days === 1 ? "tomorrow" : `in ${days} days`;
}
