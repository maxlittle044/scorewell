import type { Metadata } from "next";
import { LegalNotice } from "@/components/layout/legal-notice";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Refund Policy — ScoreWell",
};

export default function RefundPolicyPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Refund Policy" description="Last updated: August 24, 2026" />
        <LegalNotice />

        <div className="flex flex-col gap-6 text-ink-body">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">Free plan</h2>
            <p>The free plan is never billed, so there&apos;s nothing to refund.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">Premium subscriptions</h2>
            <p>
              New Premium subscriptions are eligible for a full refund within
              7 days of purchase, as long as your AI tool usage during that
              window stays under 10 uses. Renewals of an existing
              subscription are not refundable, but you can cancel to stop
              future charges.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-ink">How to request a refund</h2>
            <p>
              Contact us through the Contact Us page with your account email
              and the reason for your request. We aim to respond within 2
              business days.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
