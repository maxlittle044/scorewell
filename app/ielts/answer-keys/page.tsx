import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getAnswerKeyGroups, totalQuestions } from "@/lib/content/answer-keys";

export const metadata: Metadata = {
  title: "Answer Keys — ScoreWell",
  description:
    "Every auto-marked test on ScoreWell, with correct answers and your score shown the moment you submit.",
};

export default async function AnswerKeysPage() {
  const groups = await getAnswerKeyGroups();
  const total = totalQuestions(groups);
  const testCount = groups.reduce((n, group) => n + group.entries.length, 0);

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Answer keys" />

        <p className="mb-8 text-sm leading-relaxed text-ink-body">
          Answer keys aren&apos;t a separate download. Every test below is marked automatically —
          submit it and you&apos;ll see your score, which questions you got wrong, and the correct
          answer for each one. Answers stay hidden until you submit, so the practice is worth
          something.
        </p>

        {groups.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface-muted p-6 text-sm text-ink-muted">
            No marked tests have been published yet.
          </p>
        ) : (
          <>
            <p className="mb-8 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-heading">
              {testCount} marked tests · {total} questions with answer keys
            </p>

            <div className="flex flex-col gap-10">
              {groups.map((group) => (
                <section key={group.key}>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
                    {group.heading}
                  </h2>
                  <p className="mb-4 mt-1 text-sm text-ink-muted">{group.description}</p>

                  <ul className="flex flex-col gap-2.5">
                    {group.entries.map((entry) => (
                      <li key={entry.slug}>
                        <Link
                          href={entry.href}
                          className="flex items-center justify-between gap-4 rounded-xl border border-line px-5 py-3.5 hover:border-brand-300"
                        >
                          <span>
                            <span className="block text-sm font-medium text-ink">
                              {entry.title}
                            </span>
                            {entry.topic && (
                              <span className="mt-0.5 block text-xs text-ink-muted">
                                {entry.topic}
                              </span>
                            )}
                          </span>
                          <span className="shrink-0 text-xs font-medium text-ink-muted">
                            {entry.questionCount} questions
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
