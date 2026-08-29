import type { Metadata } from "next";
import { LegalNotice } from "@/components/layout/legal-notice";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Terms & Conditions — ScoreWell",
};

export default function TermsPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Terms & Conditions" description="Last updated: August 24, 2026" />
        <LegalNotice />

        <div className="flex flex-col gap-6 text-zinc-700">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Accounts</h2>
            <p>
              You must provide accurate information when creating an account
              and are responsible for keeping your login credentials secure.
              You must be old enough to consent to use online services in
              your country to create an account.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Acceptable use</h2>
            <ul className="flex flex-col gap-1.5 pl-5 list-disc">
              <li>Don&apos;t share your account or resell access to our tools</li>
              <li>Don&apos;t attempt to scrape, reverse-engineer, or overload our systems</li>
              <li>Don&apos;t submit content to our AI tools that is illegal or infringes on others&apos; rights</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Subscriptions & billing</h2>
            <p>
              Premium subscriptions renew automatically for the billing period
              you select until cancelled. You can cancel any time from your
              account settings; you&apos;ll keep access until the end of the
              current period. See our Refund Policy for refund eligibility.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Intellectual property</h2>
            <p>
              All practice tests, sample answers, and site content are owned
              by ScoreWell or licensed to us, except for content you submit
              yourself. You keep ownership of what you submit, and grant us a
              license to use it to operate the service (for example, showing
              your public submission to other learners).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Termination</h2>
            <p>
              We may suspend or terminate accounts that violate these terms.
              You can close your account at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Limitation of liability</h2>
            <p>
              ScoreWell is provided &ldquo;as is.&rdquo; We aren&apos;t liable
              for exam outcomes, and our AI tools&apos; feedback is an
              estimate, not a guarantee — see our Disclaimers page.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
