/**
 * Per-criterion band breakdown, shared by every surface that shows an AI evaluation:
 * the writing editor, the speaking checker, and a simulation sitting's results.
 *
 * The Writing and Speaking checkers return the same shape (`overallBand`, `criteria`,
 * `strengths`, `improvements`) — they differ only in how many criteria come back, since
 * Pronunciation can't be judged from a transcript. That difference is the caller's to
 * explain via `note`, not something this component should guess at.
 */

import { AnnotatedAnswer, type WritingError } from "./annotated-answer";

export type CriterionResult = {
  overallBand: number;
  criteria: { name: string; band: number; feedback: string }[];
  strengths: string[];
  improvements: string[];
  /** Optional because results scored before inline marking existed have none. */
  errors?: WritingError[];
};

export function CriterionFeedback({
  result,
  bandLabel = "Overall band",
  note,
  answerText,
}: {
  result: CriterionResult;
  bandLabel?: string;
  /** Caveat shown under the criteria, e.g. that Pronunciation is excluded. */
  note?: string;
  /**
   * The text that was scored. Without it the corrections have nothing to attach to, so the
   * marked-up copy is simply omitted — which is also what happens for a result stored before
   * this existed.
   */
  answerText?: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface-muted p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-body">{bandLabel}</span>
        <span className="text-2xl font-bold text-link">{result.overallBand}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {result.criteria.map((criterion) => (
          <div key={criterion.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-ink">{criterion.name}</span>
              <span className="font-semibold text-ink">{criterion.band}</span>
            </div>
            <p className="mt-0.5 text-sm text-ink-body">{criterion.feedback}</p>
          </div>
        ))}
      </div>

      {note && (
        <p className="mt-4 rounded-lg bg-surface px-3 py-2 text-xs text-ink-muted">{note}</p>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Strengths</p>
          <ul className="mt-1.5 list-inside list-disc text-sm text-ink-body">
            {result.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-700">Improvements</p>
          <ul className="mt-1.5 list-inside list-disc text-sm text-ink-body">
            {result.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {answerText && result.errors && result.errors.length > 0 && (
        <AnnotatedAnswer text={answerText} errors={result.errors} />
      )}
    </div>
  );
}

/** The standing caveat for any band estimated from a speech transcript. */
export const TRANSCRIPT_PRONUNCIATION_NOTE =
  "Pronunciation is one of the four official IELTS speaking criteria, but it can't be judged from a transcript — this estimate covers the other three only.";
