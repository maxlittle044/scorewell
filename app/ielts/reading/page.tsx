import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { listFullReadingPapers } from "@/lib/content/full-paper";

export const metadata: Metadata = {
  title: "Reading Tests — ScoreWell",
};

// Meta reflects each test's actual content — a single passage, not the full 3-passage/
// 40-question paper the real exam uses. Claiming otherwise would violate the site's own
// honesty rule (CLAUDE.md), so these stay short single-passage practice items until they're
// bundled into full-length papers.
const TESTS = [
  { title: "Academic Reading Test 1", tag: "Academic", meta: "20 min · 1 passage · 10 questions", slug: "academic-test-1" },
  { title: "Academic Reading Test 2", tag: "Academic", meta: "20 min · 1 passage · 4 questions", slug: "academic-test-2" },
  { title: "Academic Reading Test 3", tag: "Academic", meta: "20 min · 1 passage · 4 questions", slug: "academic-test-3" },
  { title: "General Training Reading Test 1", tag: "General Training", meta: "20 min · 1 passage · 4 questions", slug: "gt-test-1" },
  { title: "General Training Reading Test 2", tag: "General Training", meta: "20 min · 1 passage · 4 questions", slug: "gt-test-2" },
  { title: "Academic Reading Test 4", tag: "Academic", meta: "20 min · 1 passage · 4 questions", slug: "academic-test-4" },
];

export default async function ReadingIndexPage() {
  const fullPapers = await listFullReadingPapers();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Reading tests"
          description="Timed reading practice, from single passages to full-length papers, with instant scoring."
        />

        {fullPapers.length > 0 && (
          <div className="mb-12">
            <SectionHeading
              title="Full-length papers"
              description="Every passage under one 60-minute clock, the way the real exam runs it."
            />
            <div data-reveal-group className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fullPapers.map((paper) => (
                <ContentCard
                  headingLevel={2}
                  key={paper.slug}
                  tag={paper.variant === "general-training" ? "General Training" : "Academic"}
                  title={paper.title}
                  meta={`60 min · ${paper.partCount} ${paper.partLabel.toLowerCase()}s · ${paper.questionCount} questions`}
                  href={`/ielts/reading/full/${paper.slug}`}
                />
              ))}
            </div>
          </div>
        )}

        <SectionHeading
          title="Single-passage practice"
          description="Shorter, lower-commitment practice — one passage at a time."
        />
        <div data-reveal-group className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((test) => (
            <ContentCard
              headingLevel={2}
              key={test.slug}
              tag={test.tag}
              title={test.title}
              meta={test.meta}
              href={`/ielts/reading/${test.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
