/**
 * The learner's own answer with the model's corrections marked in place — the "inline error
 * highlighting" half of section 5's scoring requirement. The band breakdown says how well the
 * piece did; this says where.
 *
 * **Quotes are located, not trusted.** The model returns a verbatim span rather than character
 * offsets, and this file finds it in the text. Anything that cannot be found, or that overlaps
 * a mark already placed, is listed underneath instead of being forced into the passage — a
 * correction shown against the wrong words is worse than one shown without them, because the
 * learner would go and "fix" a sentence that was fine.
 */

export type WritingError = {
  quote: string;
  issue: string;
  suggestion: string;
};

type Placed = { start: number; end: number; error: WritingError };

/**
 * Finds each quote in the answer. Searching forward from the last match keeps repeated
 * phrases in the order the model reported them; the second pass from the start catches a
 * quote reported out of order rather than dropping it.
 */
function place(text: string, errors: WritingError[]) {
  const placed: Placed[] = [];
  const unplaced: WritingError[] = [];
  let cursor = 0;

  for (const error of errors) {
    const quote = error.quote?.trim();
    if (!quote) {
      unplaced.push(error);
      continue;
    }

    let start = text.indexOf(quote, cursor);
    if (start === -1) start = text.indexOf(quote);
    if (start === -1) {
      unplaced.push(error);
      continue;
    }

    const end = start + quote.length;
    // Two marks over the same words would nest badly and double-count the correction.
    if (placed.some((p) => start < p.end && end > p.start)) {
      unplaced.push(error);
      continue;
    }

    placed.push({ start, end, error });
    cursor = Math.max(cursor, end);
  }

  placed.sort((a, b) => a.start - b.start);
  return { placed, unplaced };
}

export function AnnotatedAnswer({ text, errors }: { text: string; errors: WritingError[] }) {
  if (errors.length === 0) return null;

  const { placed, unplaced } = place(text, errors);

  const pieces: React.ReactNode[] = [];
  let at = 0;
  placed.forEach((mark, index) => {
    if (mark.start > at) pieces.push(text.slice(at, mark.start));
    pieces.push(
      <mark
        key={`${mark.start}-${index}`}
        // `mark` rather than a styled span: this is literally marked-up text, and it keeps
        // the highlight meaningful to a screen reader instead of being colour alone.
        title={`${mark.error.issue}: ${mark.error.suggestion}`}
        className="rounded-sm bg-amber-100 px-0.5 text-ink"
      >
        {text.slice(mark.start, mark.end)}
        <sup className="ml-0.5 font-semibold text-amber-700">{index + 1}</sup>
      </mark>,
    );
    at = mark.end;
  });
  if (at < text.length) pieces.push(text.slice(at));

  return (
    <div className="mt-5">
      <p className="text-sm font-semibold text-ink">Your answer, marked</p>

      <div className="mt-2 whitespace-pre-wrap rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink-body">
        {pieces}
      </div>

      <ol className="mt-3 flex flex-col gap-2">
        {placed.map((mark, index) => (
          <li key={`${mark.start}-${index}`} className="flex gap-2 text-sm">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
              {index + 1}
            </span>
            <span className="text-ink-body">
              <span className="font-medium text-ink">{mark.error.issue}</span> —{" "}
              {mark.error.suggestion}
            </span>
          </li>
        ))}
      </ol>

      {unplaced.length > 0 && (
        /* Kept, but not pinned to any words. The advice is still worth reading; claiming a
           location we could not find is what would not be. */
        <div className="mt-3">
          <p className="text-xs font-semibold text-ink-muted">
            Also worth fixing, though we couldn&apos;t pinpoint where:
          </p>
          <ul className="mt-1.5 flex flex-col gap-1.5">
            {unplaced.map((error, index) => (
              <li key={index} className="text-sm text-ink-body">
                <span className="font-medium text-ink">{error.issue}</span> — {error.suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
