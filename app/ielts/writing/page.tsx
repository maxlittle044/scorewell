import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Writing Tests — ScoreWell",
};

const TESTS = [
  { title: "Task 1: Bar chart — renewable energy use by country", tag: "Task 1 (Academic)", meta: "20 min · 150 words min", slug: "task1-renewable-energy-bar-chart" },
  { title: "Task 1: Letter requesting a refund", tag: "Task 1 (General)", meta: "20 min · 150 words min", slug: "task1-letter-refund-request" },
  { title: "Task 2: Should university education be free?", tag: "Task 2", meta: "40 min · 250 words min", slug: "task2-free-university-education" },
  { title: "Task 2: The impact of AI on the job market", tag: "Task 2", meta: "40 min · 250 words min", slug: "task2-ai-job-market" },
];

export default function WritingIndexPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Writing tests"
          description="Task 1 and Task 2 prompts, checked by AI in seconds."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TESTS.map((test) => (
            <ContentCard
              key={test.slug}
              tag={test.tag}
              title={test.title}
              meta={test.meta}
              href={`/ielts/writing/${test.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
