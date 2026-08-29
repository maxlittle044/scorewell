import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { PageHeader } from "@/components/layout/page-header";
import { countQuestions, type TopicBank } from "@/lib/content/topic-banks";

/**
 * Shared renderer for every topic bank — the three Speaking parts and the
 * essay-question bank all use the same `groups -> questions` shape, so the
 * routes differ only in which bank they load.
 */
export function TopicBankView({ bank }: { bank: TopicBank }) {
  const total = countQuestions(bank);

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title={bank.title} description={bank.intro} />

        <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="mb-1.5 text-sm font-semibold text-amber-900">
            Question types, not predicted questions
          </h2>
          <p className="text-sm leading-relaxed text-amber-900">
            Every question below was written for this site to illustrate a type that comes up
            regularly. None of them is a leaked or forecast exam question — nobody outside the test
            boards knows what will be on your paper. What transfers to the exam is the shape of the
            question and the language you prepare for it, not the exact wording.
          </p>
        </div>

        <p className="mb-10 text-sm text-zinc-500">
          {total} questions across {bank.groups.length} themes.
        </p>

        <div className="flex flex-col gap-12">
          {bank.groups.map((group) => (
            <section key={group.theme}>
              <h2 className="text-lg font-bold text-zinc-900">{group.theme}</h2>
              {group.note && (
                <p className="mb-5 mt-1.5 text-sm leading-relaxed text-zinc-600">{group.note}</p>
              )}

              <ol className={`flex flex-col gap-3 ${group.note ? "" : "mt-5"}`}>
                {group.questions.map((question, index) => (
                  <li
                    key={question.text}
                    className="flex gap-3 rounded-2xl border border-zinc-200 p-4"
                  >
                    <span className="shrink-0 text-sm font-semibold text-zinc-400">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm leading-relaxed text-zinc-800">{question.text}</p>
                      {question.label && (
                        <span className="mt-2 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-600">
                          {question.label}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              {group.relatedHref && group.relatedLabel && (
                <p className="mt-4 text-sm">
                  <Link
                    href={group.relatedHref}
                    className="font-medium text-brand-600 hover:underline"
                  >
                    {group.relatedLabel} →
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>

        <TagList tags={bank.tags} />
      </div>
    </main>
  );
}
