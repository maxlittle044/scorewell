import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Reading Tests — ScoreWell",
};

const TESTS = [
  { title: "Academic Reading Test 1", tag: "Academic", meta: "60 min · 3 passages · 40 questions", slug: "academic-test-1" },
  { title: "Academic Reading Test 2", tag: "Academic", meta: "60 min · 3 passages · 40 questions", slug: "academic-test-2" },
  { title: "Academic Reading Test 3", tag: "Academic", meta: "60 min · 3 passages · 40 questions", slug: "academic-test-3" },
  { title: "General Training Reading Test 1", tag: "General Training", meta: "60 min · 3 sections · 40 questions", slug: "gt-test-1" },
  { title: "General Training Reading Test 2", tag: "General Training", meta: "60 min · 3 sections · 40 questions", slug: "gt-test-2" },
  { title: "Academic Reading Test 4", tag: "Academic", meta: "60 min · 3 passages · 40 questions", slug: "academic-test-4" },
];

export default function ReadingIndexPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Reading tests"
          description="Full-length, timed reading tests with instant scoring."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTS.map((test) => (
            <ContentCard
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
