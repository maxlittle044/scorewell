import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { listSuccessStories } from "@/lib/content/success-stories";

export const metadata: Metadata = {
  title: "Success stories — ScoreWell",
  description:
    "Learners who reached the band they needed, in their own words.",
};

export default async function SuccessStoriesPage() {
  const stories = await listSuccessStories();

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Success stories"
          description="Learners who reached the band they needed, in their own words."
        />

        {stories.length === 0 ? (
          /* An empty state that says why it is empty. Inventing a story here would mean
             inventing a person and a score — see section 9 of the spec. */
          <div className="rounded-2xl border border-line bg-surface-muted p-6">
            <h2 className="text-sm font-semibold text-ink">No stories here yet</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-body">
              We only publish results from real learners who have told us their score and
              agreed to have their words shared. We would rather leave this page empty than
              fill it with stories nobody actually lived.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-body">
              Sat your test using ScoreWell?{" "}
              <Link href="/contact" className="font-medium text-link hover:underline">
                Tell us how it went
              </Link>{" "}
              — with your permission, your story could be the first one here.
            </p>
          </div>
        ) : (
          <ol className="flex flex-col gap-8">
            {stories.map((story) => (
              <li
                key={story.slug}
                className="border-b border-line pb-8 last:border-0 last:pb-0"
              >
                <div className="mb-2 flex flex-wrap items-baseline gap-2">
                  <h2 className="font-display text-lg font-bold text-ink">
                    {story.title}
                  </h2>
                  <span className="rounded-full bg-pop-50 px-2.5 py-0.5 text-xs font-semibold text-pop-700">
                    {story.startingBand !== undefined
                      ? `Band ${story.startingBand} → ${story.achievedBand}`
                      : `Band ${story.achievedBand}`}
                  </span>
                </div>
                <p className="text-sm text-ink-muted">
                  {story.name} · {story.goal}
                </p>
                <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-ink-body">
                  {story.quote.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
