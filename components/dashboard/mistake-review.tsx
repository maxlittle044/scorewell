"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { MistakeQuestion } from "@/lib/content/mistakes";
import { describeInterval } from "@/lib/flashcards";
import { reviewMistakeAction } from "@/lib/mistake-actions";

/**
 * Re-serves questions the learner has already got wrong (site-build-prompt.md section 6).
 *
 * The queue is fixed when the session starts, like the flashcard deck: a question answered
 * mid-session must not jump back to the front, and the counter should only ever go down.
 *
 * Feedback is marked locally so it appears the instant an option is picked, while the server
 * marks the same answer again for the schedule — see reviewMistakeAction for why the client's
 * verdict is not trusted with the scheduling.
 */
export function MistakeReview({ questions }: { questions: MistakeQuestion[] }) {
  const queue = useMemo(() => questions.filter((question) => question.isDue), [questions]);

  const [position, setPosition] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [scheduled, setScheduled] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const current = queue[position];

  function choose(index: number) {
    if (!current || chosen !== null) return;
    setChosen(index);
    setError(null);
    if (index === current.correctIndex) setRight((n) => n + 1);

    startTransition(async () => {
      const saved = await reviewMistakeAction({
        contentItemId: current.contentItemId,
        questionId: current.id,
        chosenIndex: index,
      });
      if (!saved.ok) {
        setError(saved.error ?? "Couldn't save that answer.");
        return;
      }
      setScheduled(saved.box ? describeInterval(saved.box) : null);
    });
  }

  function next() {
    setChosen(null);
    setScheduled(null);
    setPosition((p) => p + 1);
  }

  if (!current) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <p className="text-base font-semibold text-ink">
          {position === 0 ? "Nothing due right now." : "Session finished."}
        </p>
        <p className="mt-2 text-sm text-ink-body">
          {position === 0
            ? "Every question you've missed is scheduled for a later day."
            : `${right} of ${position} right this time. Each question comes back on its own schedule — the ones you missed again come back soonest.`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-ink-muted">
        <span>
          {queue.length - position} {queue.length - position === 1 ? "question" : "questions"} left
        </span>
        {current.box ? (
          <span className="text-xs">Box {current.box}</span>
        ) : (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            First review
          </span>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-surface p-6">
        <p className="mb-1 text-xs text-ink-muted">
          From{" "}
          <Link href={current.sourceHref} className="font-medium text-link hover:underline">
            {current.sourceTitle}
          </Link>
          {current.type && <> · {current.type}</>}
        </p>
        <p className="mb-5 text-base font-medium text-ink">{current.question}</p>

        <ul className="flex flex-col gap-2">
          {current.options.map((option, index) => {
            const isChosen = chosen === index;
            const isCorrect = index === current.correctIndex;
            const revealed = chosen !== null;

            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => choose(index)}
                  disabled={revealed}
                  className={cn(
                    "w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    !revealed && "border-line text-ink-body hover:border-brand-400 hover:bg-brand-50",
                    revealed && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-900",
                    revealed &&
                      isChosen &&
                      !isCorrect &&
                      "border-rose-400 bg-rose-50 text-rose-900",
                    revealed && !isChosen && !isCorrect && "border-line text-ink-muted",
                  )}
                >
                  {option}
                  {revealed && isCorrect && <span className="ml-2 font-semibold">✓</span>}
                  {revealed && isChosen && !isCorrect && <span className="ml-2 font-semibold">✗</span>}
                </button>
              </li>
            );
          })}
        </ul>

        {error && <p className="mt-4 text-sm text-rose-700">{error}</p>}

        {chosen !== null && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <p className="text-sm text-ink-muted">
              {scheduled
                ? `Back ${scheduled}.`
                : pending
                  ? "Saving…"
                  : "Answer recorded."}
            </p>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {position + 1 === queue.length ? "Finish" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
