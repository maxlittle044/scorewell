import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Exam registration — ScoreWell",
};

export default function ExamRegistrationPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Registering for your IELTS exam"
          description="ScoreWell is a prep platform, not a test center — here's how registration actually works."
        />

        <div className="flex flex-col gap-6 text-ink-body">
          <p>
            The IELTS exam is jointly owned and administered by the British
            Council, IDP: IELTS Australia, and Cambridge Assessment English.
            ScoreWell is not affiliated with, endorsed by, or a reseller for
            any of these organizations — we&apos;re an independent practice
            platform.
          </p>
          <p>
            To register for your exam, book directly through whichever of
            these organizations administers testing in your country or city.
            Search &ldquo;IELTS registration&rdquo; along with your location
            to find your nearest official test center, available dates, and
            current fees.
          </p>
          <div className="rounded-xl border border-line bg-surface-muted p-5">
            <p className="text-sm font-medium text-ink">Before you book, check:</p>
            <ul className="mt-2 flex list-disc flex-col gap-1.5 pl-5 text-sm text-ink-body">
              <li>Whether you need Academic or General Training</li>
              <li>Paper-based or Computer-delivered test availability near you</li>
              <li>Your test date leaves enough time to receive results before any deadline</li>
              <li>The identification documents your test center requires</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
