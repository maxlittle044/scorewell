import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/content/print-button";
import { getPrintable } from "@/lib/content/printable";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/print/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getPrintable(slug);
  return {
    title: `${doc?.title ?? titleFromSlug(slug)} — print version | ScoreWell`,
    // A print sheet duplicates a test that is already indexed on its own page.
    robots: { index: false, follow: false },
  };
}

/** Answer lines for a written response, so the sheet is usable away from a screen. */
function Ruled({ lines }: { lines: number }) {
  return (
    <div className="mt-4 flex flex-col gap-6">
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="border-b border-line-strong" />
      ))}
    </div>
  );
}

export default async function PrintPage({ params }: PageProps<"/print/[slug]">) {
  const { slug } = await params;
  const doc = await getPrintable(slug);

  if (!doc) {
    return (
      <main className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
        <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
        <p className="mt-4 text-sm text-ink-muted">
          There&apos;s no printable version of that test.{" "}
          <Link href="/exam-library" className="font-medium text-link hover:underline">
            Browse the library
          </Link>
          .
        </p>
      </main>
    );
  }

  const isWritten = doc.skill === "WRITING" || doc.skill === "SPEAKING";

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-10 print:max-w-none print:px-0 print:py-0">
      {/* Screen-only controls; the print stylesheet drops them from the sheet. */}
      <div
        data-print-controls
        className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-surface-muted p-4 print:hidden"
      >
        <p className="text-sm text-ink-body">
          Print this test, or save it as a PDF from your browser&apos;s print dialog.
        </p>
        <PrintButton />
      </div>

      <header className="mb-6 border-b border-line-strong pb-4">
        <h1 className="font-display text-2xl font-bold text-ink">{doc.title}</h1>
        <p className="mt-1 text-sm text-ink-body">{doc.instructions}</p>
        <p className="mt-3 text-xs text-ink-muted">
          Name: ________________________ &nbsp;&nbsp; Date: ______________
        </p>
      </header>

      {doc.passage && (
        <section className="mb-8">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {doc.passageLabel}
          </h2>
          <div className="flex flex-col gap-3 text-sm leading-relaxed text-ink-body">
            {doc.passage.split(/\n\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {isWritten ? (
        <section>
          <div className="rounded-lg border border-line p-4">
            <p className="text-sm font-medium text-ink">{doc.prompt}</p>
            {doc.promptPoints && doc.promptPoints.length > 0 && (
              <ul className="mt-2 flex list-disc flex-col gap-1 pl-5 text-sm text-ink-body">
                {doc.promptPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {doc.minWords && (
              <p className="mt-3 text-xs text-ink-muted">Write at least {doc.minWords} words.</p>
            )}
          </div>
          {doc.skill === "WRITING" && <Ruled lines={24} />}
        </section>
      ) : (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Questions
          </h2>
          <div className="flex flex-col gap-6">
            {doc.groups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {group.instructions && (
                  <p className="mb-2 text-sm font-medium text-ink">{group.instructions}</p>
                )}

                {/* Matching questions are unanswerable on paper without their bank. */}
                {group.bank && group.bank.length > 0 && (
                  <ul className="mb-3 flex flex-col gap-0.5 rounded border border-line p-3 text-sm text-ink-body">
                    {group.bank.map((entry) => (
                      <li key={entry.key}>
                        <span className="font-semibold">{entry.key}.</span> {entry.label}
                      </li>
                    ))}
                  </ul>
                )}

                <ol className="flex flex-col gap-5">
                  {group.questions.map((question) => (
                    <li key={question.number} className="text-sm text-ink">
                      <p>
                        <span className="mr-2 font-semibold">{question.number}.</span>
                        {question.prompt}
                      </p>
                      {question.options ? (
                        <ul className="mt-1.5 flex flex-col gap-1 pl-6 text-ink-body">
                          {question.options.map((option, index) => (
                            <li key={option}>
                              {String.fromCharCode(65 + index)}. {option}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="ml-6 mt-2 border-b border-line-strong" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* The key starts a new sheet so the test can be attempted before it is seen. */}
      {doc.questions.length > 0 && (
        <section className="mt-12 break-before-page border-t border-line-strong pt-6">
          <h2 className="mb-1 font-display text-lg font-bold text-ink">Answer key</h2>
          <p className="mb-4 text-xs text-ink-muted">
            {doc.title} — keep this page aside until you have finished.
          </p>
          <ol className="grid grid-cols-1 gap-1.5 text-sm text-ink-body sm:grid-cols-2">
            {doc.questions.map((question) => (
              <li key={question.number}>
                <span className="font-semibold text-ink">{question.number}.</span>{" "}
                {question.answer}
              </li>
            ))}
          </ol>
        </section>
      )}

      <p className="mt-10 text-xs text-ink-muted print:mt-6">
        ScoreWell · scorewell.app — for personal study use.
      </p>
    </main>
  );
}
