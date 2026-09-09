import { Button } from "@/components/ui/button";
import { REVIEW_COST_CREDITS, REVIEW_TURNAROUND_HOURS } from "@/lib/review";

/**
 * The human-review cross-sell (site-build-prompt.md section 3, item 23).
 *
 * This previously advertised 1-on-1 tutoring, mock interviews and a bespoke study plan via an
 * affiliate partner, behind a "Find a tutor" button pointing at /coaching — a page that does
 * not exist and returned 404 from the homepage. The spec makes that cross-sell optional and
 * conditional on actually having a partner; there is none.
 *
 * So it now sells the thing that is genuinely built: a real examiner reading one submission,
 * for a stated price and a stated turnaround, both imported from the same constants the
 * checkout enforces so the pitch cannot drift from the product.
 */

function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 22c.6-4 3.4-6.5 7-6.5s6.4 2.5 7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 15.7c2.7.5 4.6 2.5 5 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CoachingCrossSell() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-linear-to-br from-surface-muted to-brand-50/40 px-6 py-10 text-center md:flex-row md:text-left"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface text-link shadow-md ring-1 ring-inset ring-black/5">
            <UsersIcon />
          </span>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-ink">
              Want a human to read it?
            </h2>
            <p className="mt-1.5 max-w-xl text-ink-body">
              Send a writing or speaking answer for review by a real examiner — the judgement
              an automated score can&apos;t give you. {REVIEW_COST_CREDITS} credits, back
              within {REVIEW_TURNAROUND_HOURS} hours.
            </p>
          </div>

          <Button href="/reviews" variant="dark" className="shrink-0">
            Request a review
          </Button>
        </div>
      </div>
    </section>
  );
}
