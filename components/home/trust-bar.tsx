/**
 * Replaced the previous "4.8/5 average learner rating · 50,000+ learners" strip: those
 * numbers were invented, and the spec's honesty rules forbid fabricated ratings and user
 * counts. Real library counts now live in the hero; this strip states what the product
 * actually does differently, all of which is verifiable on the site itself.
 */
/**
 * Each line is a claim to a visitor, so each one has to be true of the product as it stands
 * today — not of the feature in the abstract, and not of where the content is heading.
 *
 * Two of these previously said "each answer" and "every wrong option". The features exist,
 * but the content behind them does not yet: of 46 reading and listening questions, 10 carry
 * evidence, and of 38 multiple-choice questions, 2 carry per-distractor notes. Universal
 * wording made both a promise the site breaks on the first test a visitor opens. They are
 * worth restoring in that form once coverage is there — and only then.
 */
const POINTS = [
  {
    title: "Every real question type",
    body: "True/False/Not Given, matching headings, completion — not just multiple choice.",
  },
  {
    title: "See where the answer was",
    body: "Review highlights the sentence in the passage an answer came from, so you can check the reasoning and not just the tick.",
  },
  {
    title: "Sit the whole exam at once",
    body: "All four skills in one sitting under a single clock — not four exercises on four different days.",
  },
  {
    title: "Transparent band scores",
    body: "We show the raw-to-band conversion, and what one more mark would change.",
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5l3.2 3.2L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TrustBar() {
  return (
    <section className="border-b border-line bg-surface">
      <div
        data-reveal
        className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8"
      >
        {POINTS.map((point) => (
          <div key={point.title} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pop-100 text-pop-600">
              <CheckIcon />
            </span>
            <div>
              <p className="font-semibold text-heading">{point.title}</p>
              <p className="mt-1 text-sm text-ink-body">{point.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
