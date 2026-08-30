import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { FOUNDER, PLACEHOLDER } from "@/lib/site/founder";

export const metadata: Metadata = {
  title: "Our story — ScoreWell",
  description:
    "Who built ScoreWell, what they teach, and why the site exists.",
  // Kept out of search results while the bio is placeholder copy: an unfinished page
  // indexed under the founder's name is harder to undo than it is to prevent.
  robots: PLACEHOLDER ? { index: false, follow: true } : undefined,
};

export default function OurStoryPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {PLACEHOLDER && (
          <div className="mb-10 rounded-2xl border border-amber-300 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-900">
              Placeholder — this page hasn&apos;t been written yet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/90">
              Everything in brackets below is a prompt to be replaced, not a claim. Nothing
              here describes a real person&apos;s qualifications yet, and it is kept out of
              search results until it does. Fill in <code className="font-mono">lib/site/founder.ts</code>{" "}
              and set its <code className="font-mono">PLACEHOLDER</code> flag to false.
            </p>
          </div>
        )}

        <PageHeader title="Our story" description={FOUNDER.headline} />

        <section className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* A typographic tile, not a stock portrait: section 7.2 rules out borrowed
              photography, and an invented face on a founder page is worse than no face. */}
          <div
            aria-hidden="true"
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-brand-600 to-pop-500 text-3xl font-bold text-white"
          >
            {FOUNDER.initials}
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-ink">{FOUNDER.name}</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {FOUNDER.role} · {FOUNDER.location}
            </p>
            <div className="mt-4 flex flex-col gap-3 text-ink-body">
              {FOUNDER.intro.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Credentials
          </h2>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {FOUNDER.credentials.map((credential) => (
              <li
                key={credential.label}
                className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3.5"
              >
                <span className="text-sm font-medium text-ink">{credential.label}</span>
                <span className="text-sm text-ink-muted">{credential.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Why this site exists
          </h2>
          <div className="flex flex-col gap-4 leading-relaxed text-ink-body">
            {FOUNDER.story.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            How I teach it
          </h2>
          <ul className="flex flex-col gap-2.5">
            {FOUNDER.approach.map((line, i) => (
              <li key={i} className="border-l-2 border-brand-200 pl-3 leading-relaxed text-ink-body">
                {line}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-line bg-surface-muted p-6">
          <h2 className="text-sm font-semibold text-ink">The independence bit</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">
            ScoreWell is not affiliated with the British Council, IDP or Cambridge Assessment
            English. We prepare people for the exam; we do not run it, and we cannot tell you
            what will be on it.{" "}
            <Link href="/about" className="font-medium text-link hover:underline">
              More about the platform
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-medium text-link hover:underline">
              get in touch
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
