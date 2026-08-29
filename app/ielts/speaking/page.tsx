import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { listSpeakingTests } from "@/lib/content/speaking";

export const metadata: Metadata = {
  title: "Speaking Tests — ScoreWell",
};

/**
 * Timing and format are properties of the IELTS part itself, not of an
 * individual test, so they are derived here rather than stored per item.
 */
const PART_LABELS: Record<string, { tag: string; meta: string }> = {
  part1: { tag: "Part 1", meta: "4–5 min · Introduction & interview" },
  part2: { tag: "Part 2", meta: "3–4 min · Cue card" },
  part3: { tag: "Part 3", meta: "4–5 min · Two-way discussion" },
};

export default async function SpeakingIndexPage() {
  const tests = await listSpeakingTests();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Speaking tests"
          description="Practice Parts 1–3 and record your own spoken answers."
        />

        {tests.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
            No speaking tests have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {tests.map((test) => {
              const label = PART_LABELS[test.part];
              return (
                <ContentCard
                  key={test.slug}
                  tag={label?.tag ?? "Speaking"}
                  title={test.title}
                  meta={[label?.meta, test.topic].filter(Boolean).join(" · ")}
                  href={`/ielts/speaking/${test.slug}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
