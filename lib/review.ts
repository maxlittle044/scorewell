/**
 * Paid human examiner evaluation (site-build-prompt.md section 6) — a slower,
 * higher-touch option layered on top of the instant AI scoring.
 *
 * Client-safe constants only: no server imports, so the pricing copy and the
 * request form can both read them.
 */

/** Credits taken per review. One credit is one AI tool use, so this is priced well above that. */
export const REVIEW_COST_CREDITS = 5;

/** The promise made at request time. Stored on each row so changing it never rewrites a live promise. */
export const REVIEW_TURNAROUND_HOURS = 48;

/**
 * Whether requests are actually being accepted.
 *
 * FALSE until a real examiner is behind the queue. Taking someone's credits and
 * promising them feedback within 48 hours when nobody is there to write it
 * would be a false claim to a paying customer — the exact thing the honesty
 * rules exist to prevent. The whole flow below is built and the admin queue
 * works; flip this to true once a reviewer is in place, and nothing else needs
 * to change.
 */
export const HUMAN_REVIEW_ENABLED = false;

export const REVIEW_STATUS_LABELS: Record<string, string> = {
  PENDING: "Waiting for a reviewer",
  IN_REVIEW: "Being reviewed",
  COMPLETED: "Feedback ready",
  CANCELLED: "Cancelled",
};

/** Minimum answer length worth an examiner's time — below this it is not a real attempt. */
export const REVIEW_MIN_WORDS = 50;

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
