import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TagList } from "@/components/content/tag-list";
import { PageHeader } from "@/components/layout/page-header";
import { getGrammarPoint } from "@/lib/content/grammar-library";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/ielts/grammar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const point = await getGrammarPoint(slug);
  return {
    title: `${point?.title ?? titleFromSlug(slug)} — Grammar Library | ScoreWell`,
    description: point?.summary,
  };
}

export default async function GrammarPointPage({
  params,
}: PageProps<"/ielts/grammar/[slug]">) {
  const { slug } = await params;
  const point = await getGrammarPoint(slug);

  if (!point) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            That grammar point isn&apos;t here.{" "}
            <Link href="/ielts/grammar" className="font-medium text-link hover:underline">
              Browse the grammar library
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-ink-muted">
          <Link href="/ielts/grammar" className="hover:text-link">
            Grammar library
          </Link>{" "}
          · {point.category}
        </p>
        <PageHeader title={point.title} description={point.summary} />

        <div className="flex flex-col gap-4 text-ink-body">
          {point.explanation.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-ink">In practice</h2>
          <div className="flex flex-col gap-4">
            {point.examples.map((example, index) => (
              <div key={index} className="rounded-xl border border-line p-4">
                {example.wrong && (
                  <p className="flex gap-2 text-sm text-rose-800">
                    <span aria-hidden="true" className="font-bold">
                      ✗
                    </span>
                    <span>
                      <span className="sr-only">Incorrect: </span>
                      {example.wrong}
                    </span>
                  </p>
                )}
                <p
                  className={`flex gap-2 text-sm text-emerald-800 ${example.wrong ? "mt-1.5" : ""}`}
                >
                  <span aria-hidden="true" className="font-bold">
                    ✓
                  </span>
                  <span>
                    <span className="sr-only">Correct: </span>
                    {example.right}
                  </span>
                </p>
                {example.note && (
                  <p className="mt-2 text-sm text-ink-muted">{example.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-brand-200 bg-brand-50/60 p-5">
          <h2 className="mb-1.5 text-sm font-semibold text-heading">Why it matters in IELTS</h2>
          <p className="text-sm leading-relaxed text-heading/90">{point.ieltsNote}</p>
        </section>

        {/* Only rendered when the linked quiz was confirmed to still exist. */}
        {point.practice && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={`/ielts/grammar-tests/${point.practice.slug}`} size="sm">
              Practise: {point.practice.title}
            </Button>
            <span className="text-sm text-ink-muted">Five questions, about five minutes.</span>
          </div>
        )}

        <TagList tags={point.tags} />
      </div>
    </main>
  );
}
