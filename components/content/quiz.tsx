"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { SpeakButton } from "./speak-button";
import { saveQuizProgressAction } from "@/lib/progress-actions";
import type { Skill } from "@/generated/prisma/enums";
import { useElapsedSeconds } from "@/lib/use-elapsed-seconds";
import { useAttemptDraft } from "@/lib/use-attempt-draft";

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** IELTS sub-skill, used for Premium mistake analytics. */
  type?: string;
  /** Where the answer came from and why it's right — shown once the answers are locked. */
  evidence?: { quote?: string; explanation: string };
  /** Why a particular wrong option is wrong, keyed by option index. */
  distractorNotes?: Record<string, string>;
};

/**
 * The post-submission explanation for one question — the same "Locate & Explain" treatment
 * the full exam runner gives, which every Quiz-based paper (listening, mini exercises,
 * grammar) previously went without: they marked the answer right or wrong and said no more.
 *
 * Renders nothing when the question carries no explanation, rather than an empty box
 * promising review that was never written.
 */
function Review({
  question,
  chosen,
  speak,
}: {
  question: QuizQuestion;
  chosen: number | undefined;
  speak: boolean;
}) {
  const gotItWrong = chosen !== undefined && chosen !== question.correctIndex;
  const distractorNote = gotItWrong ? question.distractorNotes?.[String(chosen)] : undefined;
  if (!question.evidence && !distractorNote) return null;

  return (
    <div className="mt-4 rounded-lg bg-surface-muted px-4 py-3 text-sm">
      {distractorNote && (
        <p className="text-ink-body">
          <span className="font-semibold">Why that one tempts:</span> {distractorNote}
        </p>
      )}

      {question.evidence && (
        <div className={distractorNote ? "mt-2" : undefined}>
          {question.evidence.quote ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="text-ink-body">
                <span className="font-semibold">
                  {speak ? "Where you heard it:" : "Where it says so:"}
                </span>{" "}
                <span className="bg-accent-100 px-1">“{question.evidence.quote}”</span>
              </p>
              {speak && <SpeakButton text={question.evidence.quote} variant="chip">Replay</SpeakButton>}
            </div>
          ) : (
            <p className="font-semibold text-ink-body">Why:</p>
          )}
          <p className="mt-1.5 text-ink-body">{question.evidence.explanation}</p>
        </div>
      )}
    </div>
  );
}

export function Quiz({
  questions,
  skill,
  title,
  contentItemId,
  onSubmitted,
  speakEvidence = false,
}: {
  questions: QuizQuestion[];
  skill?: Skill;
  title: string;
  contentItemId?: string;
  /** Lets a listening test reveal its transcript only once the answers are locked in. */
  onSubmitted?: () => void;
  /**
   * Offers to replay the quoted line. Only meaningful where the passage was heard rather
   * than read — on a reading test the quote is already on screen.
   */
  speakEvidence?: boolean;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "not-logged-in">("idle");
  const [isPending, startTransition] = useTransition();

  const elapsedSeconds = useElapsedSeconds();

  // Autosave, so an unfinished exercise survives a closed tab.
  const { restored: restoredDraft, clear: clearDraft } = useAttemptDraft({
    contentItemId,
    answers,
    enabled: !submitted,
  });

  // Applied once, and never over answers the learner has already given.
  const appliedDraftRef = useRef(false);
  useEffect(() => {
    if (!restoredDraft || appliedDraftRef.current) return;
    appliedDraftRef.current = true;
    setAnswers((current) =>
      Object.keys(current).length === 0 ? (restoredDraft as Record<string, number>) : current,
    );
  }, [restoredDraft]);

  const score = questions.filter((q) => answers[q.id] === q.correctIndex).length;
  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  function handleSubmit() {
    setSubmitted(true);
    onSubmitted?.();
    // Superseded by the Progress row this is about to write.
    clearDraft();
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
        <fieldset key={q.id} className="rounded-xl border border-line p-5">
          <legend className="mb-3 px-1 text-sm font-medium text-ink">
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
                          ? "border-brand-400 bg-brand-50 text-heading"
                          : "border-line hover:border-line-strong"
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

          {submitted && <Review question={q} chosen={answers[q.id]} speak={speakEvidence} />}
        </fieldset>
      ))}

      {submitted ? (
        <div className="rounded-xl bg-brand-50 px-5 py-4 text-center">
          <p className="text-lg font-semibold text-link">
            You scored {score} / {questions.length}
          </p>
          {isPending && <p className="mt-2 text-sm text-ink-muted">Saving your result…</p>}
          {saveState === "saved" && (
            <p className="mt-2 text-sm text-emerald-600">Saved to your dashboard.</p>
          )}
          {saveState === "not-logged-in" && (
            <p className="mt-2 text-sm text-ink-muted">
              <Link href="/login" className="font-medium text-link hover:underline">
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
          className="self-start rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
        >
          Submit answers
        </button>
      )}
    </div>
  );
}
