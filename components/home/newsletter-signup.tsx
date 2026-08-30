"use client";

import { useActionState } from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { subscribeToNewsletterAction } from "@/lib/newsletter-actions";

/**
 * Newsletter capture (site-build-prompt.md section 3, item 20).
 *
 * The spec's example line is "get new lessons/tips weekly". This block does not say weekly,
 * because nothing here sends mail on a schedule yet — the honesty rules do not allow a
 * cadence we cannot keep, and a promise made on the homepage is a promise to every learner
 * who leaves an address. What it says instead is what is true: the address is stored, and
 * it is used to tell them when new material goes up.
 *
 * No subscriber count is shown, for the same reason the trust bar shows none.
 */
export function NewsletterSignup() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletterAction, {});

  return (
    <section className="bg-surface-muted/70">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="Stay in the loop"
          title={
            <>
              New practice material, <span className="text-pop-600">as it lands</span>
            </>
          }
          description="Tests, band-9 samples and video lessons are added regularly. Leave your email and we'll tell you when."
        />

        <div data-reveal>
          {state.subscribed ? (
            <p
              role="status"
              className="rounded-2xl border border-pop-100 bg-pop-50 px-5 py-4 text-center text-sm font-medium text-pop-700"
            >
              You&apos;re on the list. We&apos;ll email you when there&apos;s something new —
              nothing else.
            </p>
          ) : (
            <form
              action={formAction}
              className="mx-auto flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input type="hidden" name="source" value="homepage" />
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                aria-describedby={state.error ? "newsletter-error" : undefined}
                className="min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="submit"
                disabled={pending}
                className="shrink-0 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
              >
                {pending ? "Adding…" : "Keep me posted"}
              </button>
            </form>
          )}

          {state.error && (
            <p id="newsletter-error" role="alert" className="mt-3 text-center text-sm text-rose-700">
              {state.error}
            </p>
          )}

          <p className="mt-4 text-center text-xs text-ink-muted">
            One address, stored for this and nothing else. No list is sold or shared, and{" "}
            <Link href="/contact" className="font-medium text-link hover:underline">
              asking us to remove you
            </Link>{" "}
            is enough — no account needed.
          </p>
        </div>
      </div>
    </section>
  );
}
