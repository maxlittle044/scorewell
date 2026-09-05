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
 * Two of these were softened when the features existed but the content did not: 10 of 46
 * questions carried evidence and 2 of 38 carried per-distractor notes, which made universal
 * wording a promise the site broke on the first test anyone opened. Both are stated in full
 * again because every reading and listening question is now written up — 46 of 46 and 38 of
 * 38. `scripts/check-evidence-quotes.ts` is what keeps that true; if coverage ever slips
 * behind these sentences again, soften the sentences rather than hoping nobody checks.
 */
const POINTS = [
  {
    title: "Every real question type",
    body: "True/False/Not Given, matching headings, completion — not just multiple choice.",
  },
  {
    title: "See where the answer was",
    body: "Review highlights the exact sentence in the passage that proves each answer.",
  },
  {
    title: "Learn why you fell for it",
    body: "Every wrong option is explained, so you stop repeating the same trap.",
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
