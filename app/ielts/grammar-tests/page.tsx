import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { listQuizCards } from "@/lib/content/quiz-content";

export const metadata: Metadata = {
  title: "Grammar Tests — ScoreWell",
};

export default async function GrammarTestsIndexPage() {
  const tests = await listQuizCards("grammar-test");

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Grammar tests" description="Quick checks on the grammar points that trip learners up most." />
        <p className="mb-8 -mt-4 text-sm text-ink-muted">
          Want the rule explained before you test yourself?{" "}
          <Link href="/ielts/grammar" className="font-medium text-link hover:underline">
            Read the grammar library
          </Link>
          .
        </p>
        <div data-reveal-group className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {tests.map((test) => (
            <ContentCard
              key={test.slug}
              tag={test.tag}
              title={test.title}
              meta={test.meta}
              href={`/ielts/grammar-tests/${test.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
