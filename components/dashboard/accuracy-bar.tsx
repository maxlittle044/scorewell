import type { Breakdown } from "@/lib/analytics";

/** Weak → strong, so a learner can see at a glance where to spend time. */
function toneFor(accuracy: number): string {
  if (accuracy < 0.5) return "bg-rose-500";
  if (accuracy < 0.75) return "bg-amber-500";
  return "bg-emerald-500";
}

export function AccuracyBar({ row }: { row: Breakdown }) {
  const percent = Math.round(row.accuracy * 100);

  return (
    <li className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-ink">{row.label}</span>
        <span className="shrink-0 text-xs text-ink-muted">
          {row.correct}/{row.total} · {percent}%
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken"
        role="img"
        aria-label={`${row.label}: ${row.correct} of ${row.total} correct, ${percent} percent`}
      >
        <div className={`h-full rounded-full ${toneFor(row.accuracy)}`} style={{ width: `${percent}%` }} />
      </div>
    </li>
  );
}

export function BreakdownSection({
  heading,
  description,
  rows,
  emptyNote,
}: {
  heading: string;
  description: string;
  rows: Breakdown[];
  emptyNote: string;
}) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="text-sm font-semibold text-ink">{heading}</h2>
      <p className="mb-4 mt-0.5 text-xs text-ink-muted">{description}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-ink-muted">{emptyNote}</p>
      ) : (
        <ul className="flex flex-col gap-3.5">
          {rows.map((row) => (
            <AccuracyBar key={row.label} row={row} />
          ))}
        </ul>
      )}
    </section>
  );
}
