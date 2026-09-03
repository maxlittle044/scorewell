"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { checkWritingAction } from "@/lib/ai/writing-checker-actions";
import type { WritingTaskType } from "@/lib/ai/writing-checker";
import { shareAnswerAction } from "@/lib/submission-actions";
import { CriterionFeedback } from "@/components/tools/criterion-feedback";

export function WritingEditor({
  minWords,
  taskType = "task2",
  examPrompt,
  title,
  contentItemId,
}: {
  minWords: number;
  taskType?: WritingTaskType;
  examPrompt?: string;
  /** Enables the "share with the community" option when provided. */
  title?: string;
  contentItemId?: string;
}) {
  const [text, setText] = useState("");
  const [state, formAction, pending] = useActionState(checkWritingAction, {});
  const [shareState, shareAction, sharing] = useActionState(shareAnswerAction, {});

  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Write your response here..."
        className="w-full rounded-xl border border-line-strong p-4 text-sm leading-relaxed text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      <form action={formAction}>
        <input type="hidden" name="essayText" value={text} />
        <input type="hidden" name="taskType" value={taskType} />
        {examPrompt && <input type="hidden" name="examPrompt" value={examPrompt} />}
        {/* Identify the test being sat, so the scored attempt is saved against it rather
            than as a loose "Writing Task 2" entry. Absent on the tool pages. */}
        {title && <input type="hidden" name="title" value={title} />}
        {contentItemId && <input type="hidden" name="contentItemId" value={contentItemId} />}

        <div className="mt-3 flex items-center justify-between">
          <span className={`text-sm ${wordCount < minWords ? "text-rose-600" : "text-emerald-600"}`}>
            {wordCount} words {wordCount < minWords && `(minimum ${minWords})`}
          </span>

          <button
            type="submit"
            disabled={wordCount === 0 || pending}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
          >
            {pending ? "Checking…" : "Check with AI"}
          </button>
        </div>
      </form>

      {title && (
        <form action={shareAction} className="mt-3 border-t border-line pt-3">
          <input type="hidden" name="answerText" value={text} />
          <input type="hidden" name="title" value={title} />
          <input type="hidden" name="taskType" value={taskType} />
          {contentItemId && <input type="hidden" name="contentItemId" value={contentItemId} />}

          {shareState.shared ? (
            <p className="text-sm text-emerald-600">
              Shared —{" "}
              <Link
                href="/ielts/submitted-answers"
                className="font-medium underline hover:no-underline"
              >
                see it in the community feed
              </Link>
              .
            </p>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={wordCount === 0 || sharing}
                className="text-sm font-medium text-link hover:underline disabled:cursor-not-allowed disabled:text-ink-muted disabled:no-underline"
              >
                {sharing ? "Sharing…" : "Share with the community"}
              </button>
              <span className="text-xs text-ink-muted">
                Your answer will be public, shown with your first name.
              </span>
            </div>
          )}
          {shareState.error && <p className="mt-2 text-sm text-red-600">{shareState.error}</p>}
        </form>
      )}

      {state.error && (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            state.limitReached
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : "border-red-200 bg-red-50 text-red-600"
          }`}
        >
          {state.error}
          {state.limitReached && (
            <Link href="/pricing" className="ml-1 font-semibold underline hover:no-underline">
              See plans
            </Link>
          )}
        </p>
      )}

      {state.result && (
        <div className="mt-4">
          <CriterionFeedback result={state.result} />
        </div>
      )}
    </div>
  );
}
