import type { Metadata } from "next";
import Link from "next/link";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Grammar Tests — ScoreWell",
};

const TESTS = [
  { tag: "Tenses", title: "Present perfect vs. past simple", meta: "5 min · 5 questions", slug: "present-perfect-vs-past-simple" },
  { tag: "Conditionals", title: "First and second conditionals", meta: "5 min · 5 questions", slug: "first-second-conditionals" },
  { tag: "Articles", title: "Definite and indefinite articles", meta: "5 min · 5 questions", slug: "definite-indefinite-articles" },
  { tag: "Prepositions", title: "Prepositions of time and place", meta: "5 min · 5 questions", slug: "prepositions-time-place" },
];

export default function GrammarTestsIndexPage() {
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TESTS.map((test) => (
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
