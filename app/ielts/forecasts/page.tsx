import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { countThemes, listTopicPools } from "@/lib/content/topic-pools";

export const metadata: Metadata = {
  title: "Recurring Exam Topics — ScoreWell",
  description:
    "The themes that recur most often across reported IELTS papers, and what to prepare for each — recurring patterns, not predictions.",
};

export default async function ForecastsPage() {
  const pools = await listTopicPools();

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Recurring exam topics"
          description="The themes that come up again and again across reported IELTS papers — and what to prepare so any question in the area is manageable."
        />

        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-1.5 text-sm font-semibold text-amber-900">
            These are patterns, not predictions
          </h2>
          <p className="text-sm leading-relaxed text-amber-900">
            Nobody outside the test boards knows what will be on your paper, and anyone selling you
            a &ldquo;guaranteed&rdquo; question list is guessing. What follows is the honest
            version: the themes that recur widely across reported past papers, why the boards
            favour that kind of theme, and the language worth preparing. Every example question
            below was written for this site to illustrate a type — none is a leaked or forecast
            question.
          </p>
        </div>

        {pools.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface-muted p-6 text-sm text-ink-muted">
            No topic pools have been published yet.
          </p>
        ) : (
          <>
            <p className="mb-10 text-sm text-ink-muted">
              {countThemes(pools)} themes across {pools.length} sections of the exam.
            </p>

            <div className="flex flex-col gap-12">
              {pools.map((pool) => (
                <section key={pool.slug}>
                  <h2 className="text-lg font-bold text-ink">{pool.section}</h2>
                  <p className="mb-5 mt-1.5 text-sm leading-relaxed text-ink-body">{pool.intro}</p>

                  <div className="flex flex-col gap-4">
                    {pool.themes.map((theme) => (
                      <article
                        key={theme.title}
                        className="rounded-2xl border border-line p-5"
                      >
                        <h3 className="text-sm font-semibold text-ink">{theme.title}</h3>

                        <p className="mt-2.5 border-l-2 border-brand-200 pl-3 text-sm italic leading-relaxed text-ink-body">
                          {theme.examplePrompt}
                        </p>
                        <p className="mt-1 pl-3 text-xs text-ink-muted">
                          Example of this type — not a predicted question.
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-ink-body">
                          <span className="font-medium text-ink">Why it recurs: </span>
                          {theme.whyItRecurs}
                        </p>

                        <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-muted">
                          What to prepare
                        </h4>
                        <ul className="mt-1.5 flex flex-col gap-1.5 text-sm leading-relaxed text-ink-body">
                          {theme.prepare.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>

                        {theme.relatedHref && (
                          <Link
                            href={theme.relatedHref}
                            className="mt-4 inline-block text-sm font-medium text-link hover:underline"
                          >
                            {theme.relatedLabel ?? "Practise this"} →
                          </Link>
                        )}
                      </article>
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
