import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { listFullListeningPapers } from "@/lib/content/full-paper";

export const metadata: Metadata = {
  title: "Listening Tests — ScoreWell",
};

// Meta reflects each test's actual content — a single section, not the full 4-section/
// 40-question paper the real exam uses. Claiming otherwise would violate the site's own
// honesty rule (CLAUDE.md), so these stay short single-section practice items — the full
// 4-section papers are listed separately below.
const TESTS = [
  { title: "Listening Practice Set 1", meta: "10 min · 1 section · 4 questions", slug: "practice-set-1" },
  { title: "Listening Practice Set 2", meta: "10 min · 1 section · 4 questions", slug: "practice-set-2" },
  { title: "Listening Practice Set 3", meta: "10 min · 1 section · 4 questions", slug: "practice-set-3" },
  { title: "Listening Practice Set 4", meta: "10 min · 1 section · 4 questions", slug: "practice-set-4" },
];

export default async function ListeningIndexPage() {
  const fullPapers = await listFullListeningPapers();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Listening tests"
          description="Real exam-style audio, from single sections to full-length papers, with instant scoring."
        />

        {fullPapers.length > 0 && (
          <div className="mb-12">
            <SectionHeading
              title="Full-length papers"
              description="Every section under one 30-minute clock, the way the real exam runs it."
            />
            <div data-reveal-group className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fullPapers.map((paper) => (
                <ContentCard
                  headingLevel={2}
                  key={paper.slug}
                  tag="Full paper"
                  title={paper.title}
                  meta={`30 min · ${paper.partCount} sections · ${paper.questionCount} questions`}
                  href={`/ielts/listening/full/${paper.slug}`}
                />
              ))}
            </div>
          </div>
        )}

        <SectionHeading
          title="Single-section practice"
          description="Shorter, lower-commitment practice — one section at a time."
        />
        <div data-reveal-group className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((test) => (
            <ContentCard
              headingLevel={2}
              key={test.slug}
              tag="Practice set"
              title={test.title}
              meta={test.meta}
              href={`/ielts/listening/${test.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
