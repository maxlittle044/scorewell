import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { countGrammarPoints, listGrammarPoints } from "@/lib/content/grammar-library";

export const metadata: Metadata = {
  title: "Grammar Library — ScoreWell",
  description:
    "IELTS grammar explained point by point: what the rule is, the mistake it causes, and why it costs marks.",
};

export default async function GrammarLibraryPage() {
  const categories = await listGrammarPoints();
  const total = countGrammarPoints(categories);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Grammar library"
          description="One page per grammar point: the rule, the mistake it usually causes, and what it costs you in the band descriptors."
        />

        {total === 0 ? (
          <p className="rounded-2xl border border-line bg-surface p-6 text-center text-sm text-ink-muted">
            Nothing here yet.
          </p>
        ) : (
          <>
            <p className="mb-8 text-sm text-ink-muted">
              {total} {total === 1 ? "point" : "points"} across {categories.length}{" "}
              {categories.length === 1 ? "category" : "categories"}. Prefer to test yourself
              first?{" "}
              <Link
                href="/ielts/grammar-tests"
                className="font-medium text-link hover:underline"
              >
                Take a grammar test
              </Link>
              .
            </p>

            <div className="flex flex-col gap-8">
              {categories.map((category) => (
                <section key={category.name}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {category.points.map((point) => (
                      <Link
                        key={point.slug}
                        href={`/ielts/grammar/${point.slug}`}
                        className="group rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand-400 hover:bg-brand-50/40"
                      >
                        <p className="text-sm font-semibold text-ink group-hover:text-link">
                          {point.title}
                        </p>
                        <p className="mt-1 text-sm text-ink-body">{point.summary}</p>
                        {point.hasPractice && (
                          <span className="mt-2 inline-block rounded-full bg-pop-50 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-pop-700">
                            Practice test
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
