import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Listening Tests — ScoreWell",
};

const TESTS = [
  { title: "Listening Practice Set 1", meta: "30 min · 4 sections · 40 questions", slug: "practice-set-1" },
  { title: "Listening Practice Set 2", meta: "30 min · 4 sections · 40 questions", slug: "practice-set-2" },
  { title: "Listening Practice Set 3", meta: "30 min · 4 sections · 40 questions", slug: "practice-set-3" },
  { title: "Listening Practice Set 4", meta: "30 min · 4 sections · 40 questions", slug: "practice-set-4" },
];

export default function ListeningIndexPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Listening tests"
          description="Real exam-style audio sections with transcripts and instant scoring."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((test) => (
            <ContentCard
              key={test.slug}
              tag="Sections 1–4"
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
