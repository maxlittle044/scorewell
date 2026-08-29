/**
 * Per-criterion band breakdown, shared by every surface that shows an AI evaluation:
 * the writing editor, the speaking checker, and a simulation sitting's results.
 *
 * The Writing and Speaking checkers return the same shape (`overallBand`, `criteria`,
 * `strengths`, `improvements`) — they differ only in how many criteria come back, since
 * Pronunciation can't be judged from a transcript. That difference is the caller's to
 * explain via `note`, not something this component should guess at.
 */

export type CriterionResult = {
  overallBand: number;
  criteria: { name: string; band: number; feedback: string }[];
  strengths: string[];
  improvements: string[];
};

export function CriterionFeedback({
  result,
  bandLabel = "Overall band",
  note,
}: {
  result: CriterionResult;
  bandLabel?: string;
  /** Caveat shown under the criteria, e.g. that Pronunciation is excluded. */
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-600">{bandLabel}</span>
        <span className="text-2xl font-bold text-brand-600">{result.overallBand}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {result.criteria.map((criterion) => (
          <div key={criterion.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-800">{criterion.name}</span>
              <span className="font-semibold text-zinc-900">{criterion.band}</span>
            </div>
            <p className="mt-0.5 text-sm text-zinc-600">{criterion.feedback}</p>
          </div>
        ))}
      </div>

      {note && (
        <p className="mt-4 rounded-lg bg-white px-3 py-2 text-xs text-zinc-500">{note}</p>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Strengths</p>
          <ul className="mt-1.5 list-inside list-disc text-sm text-zinc-600">
            {result.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-amber-700">Improvements</p>
          <ul className="mt-1.5 list-inside list-disc text-sm text-zinc-600">
            {result.improvements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/** The standing caveat for any band estimated from a speech transcript. */
export const TRANSCRIPT_PRONUNCIATION_NOTE =
  "Pronunciation is one of the four official IELTS speaking criteria, but it can't be judged from a transcript — this estimate covers the other three only.";
