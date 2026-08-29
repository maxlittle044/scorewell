"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { saveQuizProgressAction } from "@/lib/progress-actions";
import type { Skill } from "@/generated/prisma/enums";
import { useElapsedSeconds } from "@/lib/use-elapsed-seconds";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** IELTS sub-skill, used for Premium mistake analytics. */
  type?: string;
};

export function Quiz({
  questions,
  skill,
  title,
  contentItemId,
}: {
  questions: QuizQuestion[];
  skill?: Skill;
  title: string;
  contentItemId?: string;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "not-logged-in">("idle");
  const [isPending, startTransition] = useTransition();

  const elapsedSeconds = useElapsedSeconds();

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function handleSubmit() {
    setSubmitted(true);
    startTransition(async () => {
      const result = await saveQuizProgressAction({
        skill,
        title,
        contentItemId,
        correctCount: score,
        totalCount: questions.length,
        details: questions.map((q) => ({
          id: q.id,
          type: q.type,
          correct: answers[q.id] === q.correctIndex,
        })),
        durationSeconds: elapsedSeconds(),
      });
      setSaveState(result.saved ? "saved" : "not-logged-in");
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {questions.map((q, i) => (
        <fieldset key={q.id} className="rounded-xl border border-zinc-200 p-5">
          <legend className="mb-3 px-1 text-sm font-medium text-zinc-800">
            {i + 1}. {q.question}
          </legend>
          <div className="flex flex-col gap-2">
            {q.options.map((option, optionIndex) => {
              const isSelected = answers[q.id] === optionIndex;
              const isCorrect = submitted && optionIndex === q.correctIndex;
              const isWrongSelected = submitted && isSelected && optionIndex !== q.correctIndex;

              return (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
                    isCorrect
                      ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                      : isWrongSelected
                        ? "border-rose-400 bg-rose-50 text-rose-800"
                        : isSelected
                          ? "border-brand-400 bg-brand-50 text-brand-800"
                          : "border-zinc-200 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted}
                    checked={isSelected}
                    onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }))}
                    className="accent-brand-600"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      {submitted ? (
        <div className="rounded-xl bg-brand-50 px-5 py-4 text-center">
          <p className="text-lg font-semibold text-brand-700">
            You scored {score} / {questions.length}
          </p>
          {isPending && <p className="mt-2 text-sm text-zinc-500">Saving your result…</p>}
          {saveState === "saved" && (
            <p className="mt-2 text-sm text-emerald-600">Saved to your dashboard.</p>
          )}
          {saveState === "not-logged-in" && (
            <p className="mt-2 text-sm text-zinc-500">
              <Link href="/login" className="font-medium text-brand-600 hover:underline">
                Log in
              </Link>{" "}
              to save your progress and see it on your dashboard.
            </p>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="self-start rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
        >
          Submit answers
        </button>
      )}
    </div>
  );
}
