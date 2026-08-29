"use client";

import { useActionState } from "react";
import { requestReviewAction } from "@/lib/review-actions";
import {
  HUMAN_REVIEW_ENABLED,
  REVIEW_COST_CREDITS,
  REVIEW_MIN_WORDS,
  REVIEW_TURNAROUND_HOURS,
} from "@/lib/review";

const TASK_TYPES = [
  { value: "task2", label: "Writing Task 2 (essay)" },
  { value: "task1-academic", label: "Writing Task 1 (Academic)" },
  { value: "task1-general", label: "Writing Task 1 (General)" },
  { value: "speaking", label: "Speaking (transcript)" },
];

export function ReviewRequestForm({ credits }: { credits: number }) {
  const [state, formAction, pending] = useActionState(requestReviewAction, {});

  if (state.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h2 className="font-semibold text-emerald-900">Review requested</h2>
        <p className="mt-2 text-sm text-emerald-700">
          Your answer is in the queue. You will see the feedback on this page once a reviewer has
          finished with it.
        </p>
      </div>
    );
  }

  const affordable = credits >= REVIEW_COST_CREDITS;

  return (
    <form action={formAction} className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h2 className="text-lg font-bold text-zinc-900">Request a review</h2>
      <p className="mt-1.5 text-sm text-zinc-600">
        A real examiner reads your answer and writes back — slower than the instant AI score, and
        more specific. Costs {REVIEW_COST_CREDITS} credits, with feedback within{" "}
        {REVIEW_TURNAROUND_HOURS} hours of a reviewer picking it up.
      </p>

      {!HUMAN_REVIEW_ENABLED && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">Not accepting requests yet</p>
          <p className="mt-1 text-sm leading-relaxed text-amber-900">
            We have not put an examiner behind this queue, so requests are closed. Nothing here
            will take your credits. The AI writing and speaking checkers are working now and are
            free within your monthly allowance.
          </p>
        </div>
      )}

      <fieldset disabled={!HUMAN_REVIEW_ENABLED || pending} className="mt-5 flex flex-col gap-4">
        <div>
          <label htmlFor="taskType" className="mb-1.5 block text-sm font-medium text-zinc-700">
            What is this?
          </label>
          <select
            id="taskType"
            name="taskType"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 disabled:bg-zinc-50 disabled:text-zinc-400"
          >
            {TASK_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Question or title <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Some people think university should be free…"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 disabled:bg-zinc-50"
          />
        </div>

        <div>
          <label htmlFor="answerText" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Your answer
          </label>
          <textarea
            id="answerText"
            name="answerText"
            rows={10}
            required
            placeholder={`Paste your full answer — at least ${REVIEW_MIN_WORDS} words.`}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 disabled:bg-zinc-50"
          />
        </div>

        {state.error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : `Request review (${REVIEW_COST_CREDITS} credits)`}
        </button>
      </fieldset>

      {HUMAN_REVIEW_ENABLED && !affordable && (
        <p className="mt-3 text-sm text-zinc-500">
          You have {credits} credits. A review costs {REVIEW_COST_CREDITS}.
        </p>
      )}
    </form>
  );
}
