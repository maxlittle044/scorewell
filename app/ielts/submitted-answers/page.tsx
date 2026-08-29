import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { listPublishedSubmissions } from "@/lib/content/submissions";

export const metadata: Metadata = {
  title: "User-Submitted Answers — ScoreWell",
  description: "Real learners share their practice answers and get feedback from the community.",
};

export default async function SubmittedAnswersIndexPage() {
  const submissions = await listPublishedSubmissions();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Community-submitted answers"
          description="Real learners share their attempts and get feedback from the community."
        />

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-12 text-center">
            <p className="text-sm font-medium text-ink-body">No answers shared yet</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              Write an answer on any writing test or exercise, then choose &ldquo;Share with the
              community&rdquo; to be the first to post one here.
            </p>
            <Link
              href="/writing-exercises"
              className="mt-6 inline-block rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Try a writing exercise
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {submissions.map((sub) => (
              <ContentCard
                key={sub.id}
                tag={sub.taskType ?? "Answer"}
                title={sub.title}
                meta={`${sub.author} · ${sub.replyCount} ${sub.replyCount === 1 ? "reply" : "replies"}`}
                href={`/ielts/submitted-answers/${sub.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
