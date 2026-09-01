import type { PrintableDoc } from "@/lib/content/printable";

/**
 * The print rendering of one practice test, lifted out of app/print/[slug]/page.tsx so a
 * practice pack can lay several tests into a single sheet without duplicating any of it.
 *
 * The body and the answer key are separate exports on purpose: a single-test sheet puts the
 * key straight after the test, while a pack collects every key at the back, so a learner can
 * work through the whole pack before seeing any answers.
 */

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

export function PrintableDocBody({ doc }: { doc: PrintableDoc }) {
  const isWritten = doc.skill === "WRITING" || doc.skill === "SPEAKING";

  return (
    <>
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
    </>
  );
}

export function PrintableAnswerKey({
  doc,
  /**
   * The first key starts a fresh sheet so the test can be attempted before it is seen. In a
   * pack the rest flow on behind it — one sheet per key would add a dozen near-empty pages.
   */
  startsNewSheet = true,
}: {
  doc: PrintableDoc;
  startsNewSheet?: boolean;
}) {
  if (doc.questions.length === 0) return null;

  return (
    <section
      className={`mt-12 border-t border-line-strong pt-6 ${startsNewSheet ? "break-before-page" : ""}`}
    >
      <h2 className="mb-1 font-display text-lg font-bold text-ink">Answer key</h2>
      <p className="mb-4 text-xs text-ink-muted">
        {doc.title} — keep this page aside until you have finished.
      </p>
      <ol className="grid grid-cols-1 gap-1.5 text-sm text-ink-body sm:grid-cols-2">
        {doc.questions.map((question) => (
          <li key={question.number}>
            <span className="font-semibold text-ink">{question.number}.</span> {question.answer}
          </li>
        ))}
      </ol>
    </section>
  );
}
