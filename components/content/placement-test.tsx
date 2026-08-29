"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { submitPlacementAction } from "@/lib/learning-path-actions";
import { TARGET_BANDS } from "@/lib/learning-path-constants";
import type { PlacementQuestion } from "@/lib/learning-path";
import { useElapsedSeconds } from "@/lib/use-elapsed-seconds";

/**
 * The placement diagnostic. Two sections — reading comprehension against a passage, then
 * grammar and vocabulary — followed by the learner's target band, which is the "goal" the
 * Learning Path is built around.
 *
 * No timer: this is a placement, not a test of exam pacing, and rushing it would give the
 * plan a worse starting picture.
 */
export function PlacementTest({
  passage,
  questions,
}: {
  passage: string;
  questions: PlacementQuestion[];
}) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [targetBand, setTargetBand] = useState<number>(7);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const elapsedSeconds = useElapsedSeconds();

  const reading = useMemo(() => questions.filter((q) => q.section === "reading"), [questions]);
  const language = useMemo(() => questions.filter((q) => q.section === "language"), [questions]);
  const answeredCount = Object.keys(answers).length;
  const complete = answeredCount === questions.length;

  const submit = () => {
    setError(null);
    startTransition(async () => {
      const result = await submitPlacementAction({
        answers,
        targetBand,
        durationSeconds: elapsedSeconds(),
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push("/learning-path");
      router.refresh();
    });
  };

  const renderQuestion = (question: PlacementQuestion, number: number) => (
    <div key={question.id} className="rounded-xl border border-zinc-200 bg-white p-5">
      <p className="mb-3 text-sm font-medium text-zinc-900">
        <span className="mr-2 text-zinc-400">{number}.</span>
        {question.question}
      </p>
      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const selected = answers[question.id] === index;
          return (
            <label
              key={index}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-sm transition-colors",
                selected
                  ? "border-brand-400 bg-brand-50 text-brand-900"
                  : "border-zinc-200 hover:border-brand-300 hover:bg-brand-50/40",
              )}
            >
              <input
                type="radio"
                name={question.id}
                checked={selected}
                onChange={() => setAnswers((prev) => ({ ...prev, [question.id]: index }))}
                className="accent-brand-600"
              />
              {option}
            </label>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-16 z-30 -mx-4 flex items-center justify-between gap-3 border-y border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <p className="text-sm font-medium text-zinc-700">
          {answeredCount} of {questions.length} answered
        </p>
        <Button size="sm" onClick={submit} disabled={!complete || isPending}>
          {isPending ? "Scoring…" : "See my plan"}
        </Button>
      </div>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-zinc-900">
            Part 1 · Reading comprehension
          </h2>
          <p className="text-sm text-zinc-500">Read the passage, then answer the questions.</p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-5">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700">
            {passage.split(/\n\n+/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {reading.map((question, index) => renderQuestion(question, index + 1))}
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-display text-lg font-bold text-zinc-900">
            Part 2 · Grammar &amp; vocabulary
          </h2>
          <p className="text-sm text-zinc-500">Choose the option that best completes each sentence.</p>
        </div>
        {language.map((question, index) => renderQuestion(question, reading.length + index + 1))}
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <h2 className="font-display text-lg font-bold text-zinc-900">What are you aiming for?</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Your plan is built around the gap between where you are and the band you need.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {TARGET_BANDS.map((band) => (
            <button
              key={band}
              type="button"
              onClick={() => setTargetBand(band)}
              aria-pressed={targetBand === band}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                targetBand === band
                  ? "bg-brand-600 text-white"
                  : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-brand-50",
              )}
            >
              {band.toFixed(1)}
            </button>
          ))}
        </div>
      </section>

      {error && <p className="text-sm text-rose-700">{error}</p>}

      <div className="flex items-center gap-3">
        <Button size="lg" onClick={submit} disabled={!complete || isPending}>
          {isPending ? "Scoring…" : "See my plan"}
        </Button>
        {!complete && (
          <span className="text-sm text-zinc-500">
            {questions.length - answeredCount} question
            {questions.length - answeredCount === 1 ? "" : "s"} left.
          </span>
        )}
      </div>
    </div>
  );
}
