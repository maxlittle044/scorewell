import type { Metadata } from "next";
import { LegalNotice } from "@/components/layout/legal-notice";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Privacy Policy — ScoreWell",
};

export default function PrivacyPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Privacy Policy" description="Last updated: August 24, 2026" />
        <LegalNotice />

        <div className="flex flex-col gap-6 text-zinc-700">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Information we collect</h2>
            <p>
              We collect information you provide directly, such as your name
              and email when you create an account, along with usage data
              like your test results, saved progress, and the text you submit
              to our AI tools.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">How we use it</h2>
            <ul className="flex flex-col gap-1.5 pl-5 list-disc">
              <li>To provide and improve practice tests, tools, and progress tracking</li>
              <li>To process subscription payments and send billing receipts</li>
              <li>To send product updates you can opt out of at any time</li>
              <li>To detect abuse and keep the platform secure</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Third-party services</h2>
            <p>
              We share data with service providers strictly to operate the
              platform — for example, payment processing, hosting, and the AI
              provider used to power our checking tools. We do not sell your
              personal data.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Cookies</h2>
            <p>
              We use cookies to keep you signed in and remember preferences
              like a dismissed announcement banner. You can disable cookies in
              your browser, though some features may not work correctly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Your rights</h2>
            <p>
              You can request a copy of your data, ask us to correct it, or
              request deletion of your account at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-zinc-900">Contact</h2>
            <p>Questions about this policy? Reach us via the Contact Us page.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
