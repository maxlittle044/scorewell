"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { nextBandStep, rawScoreToBand } from "@/lib/band-conversion";
import { gradeAll, isAnswered } from "@/lib/exam/grading";
import { allQuestions, toGroups } from "@/lib/exam/schema";
import type { AnswerValue, QuestionSet } from "@/lib/exam/schema";
import { saveQuizProgressAction } from "@/lib/progress-actions";
import type { Skill } from "@/generated/prisma/enums";
import { QuestionCard } from "./question-card";

type Props = {
  questionSet: QuestionSet;
  title: string;
  /** Reading passage or listening transcript. Omitted for tests with no source text. */
  passage?: string;
  /** Hidden until the learner submits — revealing it upfront would defeat a listening test. */
  passageHiddenUntilSubmit?: boolean;
  passageLabel?: string;
  skill?: Skill;
  contentItemId?: string;
  durationMinutes?: number;
};

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Renders the passage, marking the sentence a question's answer came from.
 * Falls back to plain text when the quote isn't found verbatim, so a seed-data typo
 * degrades to "no highlight" rather than breaking the passage.
 */
function PassageText({ passage, highlight }: { passage: string; highlight?: string }) {
  return (
    <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700">
      {passage.split(/\n\n+/).map((paragraph, index) => {
        const at = highlight ? paragraph.indexOf(highlight) : -1;
        if (at === -1) return <p key={index}>{paragraph}</p>;

        return (
          <p key={index}>
            {paragraph.slice(0, at)}
            <mark className="rounded bg-accent-200 px-0.5 py-px text-zinc-900">
              {paragraph.slice(at, at + highlight!.length)}
            </mark>
            {paragraph.slice(at + highlight!.length)}
          </p>
        );
      })}
    </div>
  );
}

export function ExamRunner({
  questionSet,
  title,
  passage,
  passageHiddenUntilSubmit = false,
  passageLabel = "Reading passage",
  skill,
  contentItemId,
  durationMinutes,
}: Props) {
  const groups = useMemo(() => toGroups(questionSet), [questionSet]);
  const questions = useMemo(() => allQuestions(groups), [groups]);

  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "not-logged-in">("idle");
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes ? durationMinutes * 60 : null);
  const [activeQuote, setActiveQuote] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  // Read inside the timer effect, which must not restart when answers change.
  const answersRef = useRef(answers);
  answersRef.current = answers;

  // Guards against double submission (manual click racing the timer's auto-submit).
  // A ref, not the `submitted` state, because the check has to happen outside render —
  // a state updater callback runs *during* render, where side effects aren't allowed.
  const submittedRef = useRef(false);

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitted(true);

    const graded = gradeAll(groups, answersRef.current);
    const correctCount = graded.filter((g) => g.correct).length;

    startTransition(async () => {
      const result = await saveQuizProgressAction({
        skill,
        title,
        contentItemId,
        correctCount,
        totalCount: graded.length,
        details: graded.map((g) => ({ id: g.id, type: g.type, correct: g.correct })),
      });
      setSaveState(result.saved ? "saved" : "not-logged-in");
    });
  }, [groups, skill, title, contentItemId]);

  // Countdown. Auto-submits at zero, like the real exam.
  useEffect(() => {
    if (secondsLeft === null || submitted) return;
    if (secondsLeft <= 0) {
      submit();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft, submitted, submit]);

  const results = useMemo(
    () => (submitted ? gradeAll(groups, answers) : null),
    [submitted, groups, answers],
  );
  const resultById = useMemo(
    () => Object.fromEntries((results ?? []).map((r) => [r.id, r])),
    [results],
  );

  const score = results?.filter((r) => r.correct).length ?? 0;
  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length;

  // Scale to the standard 40-question paper so the band estimate is comparable across tests.
  const scaledCorrect = Math.round((score / questions.length) * 40);
  const band = rawScoreToBand(scaledCorrect);
  const step = nextBandStep(scaledCorrect);

  const showPassage = passage && (!passageHiddenUntilSubmit || submitted);
  const timeIsShort = secondsLeft !== null && secondsLeft <= 300;

  let questionNumber = 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Sticky status bar: progress, timer, submit */}
      <div className="sticky top-16 z-30 -mx-4 flex flex-wrap items-center justify-between gap-3 border-y border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <p className="text-sm font-medium text-zinc-700">
          {submitted ? (
            <>
              Score <span className="font-bold text-brand-700">{score}</span> / {questions.length}
            </>
          ) : (
            <>
              {answeredCount} of {questions.length} answered
            </>
          )}
        </p>

        <div className="flex items-center gap-3">
          {secondsLeft !== null && !submitted && (
            <span
              className={cn(
                "rounded-full px-3 py-1 font-mono text-sm font-semibold tabular-nums",
                timeIsShort ? "bg-rose-100 text-rose-700" : "bg-zinc-100 text-zinc-700",
              )}
              aria-live={timeIsShort ? "polite" : "off"}
            >
              {formatClock(secondsLeft)}
            </span>
          )}
          {!submitted && (
            <Button size="sm" onClick={submit}>
              Submit
            </Button>
          )}
        </div>
      </div>

      {timeIsShort && !submitted && (
        <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
          Under 5 minutes left. The test submits automatically when the timer reaches zero.
        </p>
      )}

      {/* Question navigator */}
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Questions
        </p>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, index) => {
            const done = isAnswered(q, answers[q.id]);
            const result = resultById[q.id];
            return (
              <a
                key={q.id}
                href={`#question-${q.id}`}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                  result
                    ? result.correct
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                    : flagged[q.id]
                      ? "bg-accent-100 text-accent-600 ring-1 ring-accent-400"
                      : done
                        ? "bg-brand-600 text-white"
                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200",
                )}
              >
                {index + 1}
              </a>
            );
          })}
        </div>
      </div>

      {/* Split screen: source text left, questions right */}
      <div className={cn("grid gap-6", showPassage && "lg:grid-cols-2")}>
        {showPassage && (
          <div className="lg:sticky lg:top-36 lg:max-h-[calc(100vh-11rem)] lg:self-start lg:overflow-y-auto">
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {passageLabel}
              </p>
              <PassageText passage={passage} highlight={activeQuote} />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {passage && passageHiddenUntilSubmit && !submitted && (
            <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">
              The transcript stays hidden until you submit — reading along would defeat the
              listening practice.
            </p>
          )}

          {groups.map((group) => (
            <div key={group.id} className="flex flex-col gap-4">
              {group.instructions && groups.length > 1 && (
                <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50/60 px-4 py-2.5">
                  <p className="text-sm font-medium text-brand-900">{group.instructions}</p>
                  {group.bank && (
                    <ul className="mt-2 flex flex-col gap-0.5 text-sm text-brand-800">
                      {group.bank.map((entry) => (
                        <li key={entry.key}>
                          <span className="font-semibold">{entry.key}.</span> {entry.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {group.questions.map((question) => {
                questionNumber += 1;
                return (
                  <div
                    key={question.id}
                    onMouseEnter={() => submitted && setActiveQuote(question.evidence?.quote)}
                    onFocus={() => submitted && setActiveQuote(question.evidence?.quote)}
                  >
                    <QuestionCard
                      question={question}
                      group={group}
                      number={questionNumber}
                      answer={answers[question.id]}
                      onChange={(value) =>
                        setAnswers((prev) => ({ ...prev, [question.id]: value }))
                      }
                      result={resultById[question.id]}
                      flagged={Boolean(flagged[question.id])}
                      onToggleFlag={() =>
                        setFlagged((prev) => ({ ...prev, [question.id]: !prev[question.id] }))
                      }
                    />
                  </div>
                );
              })}
            </div>
          ))}

          {!submitted ? (
            <Button onClick={submit} size="lg" className="self-start">
              Submit answers
            </Button>
          ) : (
            <div className="rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 to-pop-50 p-6">
              <p className="text-2xl font-bold text-zinc-900">
                You scored {score} / {questions.length}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                That scales to about <span className="font-semibold text-brand-700">band {band}</span>{" "}
                on a full 40-question paper ({scaledCorrect}/40).
              </p>
              {step && step.needed > 0 && (
                <p className="mt-1 text-sm text-zinc-600">
                  {step.needed} more correct {step.needed === 1 ? "answer" : "answers"} would reach
                  band {step.band}.
                </p>
              )}

              {isPending && <p className="mt-3 text-sm text-zinc-500">Saving your result…</p>}
              {saveState === "saved" && (
                <p className="mt-3 text-sm text-emerald-700">Saved to your dashboard.</p>
              )}
              {saveState === "not-logged-in" && (
                <p className="mt-3 text-sm text-zinc-600">
                  <Link href="/login" className="font-semibold text-brand-600 hover:underline">
                    Log in
                  </Link>{" "}
                  to save your progress and track your bands over time.
                </p>
              )}

              <p className="mt-4 text-sm text-zinc-500">
                Hover a question to highlight where its answer appears in the {passageLabel.toLowerCase()}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
