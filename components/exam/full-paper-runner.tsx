"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { nextBandStep, rawScoreToBand } from "@/lib/band-conversion";
import { gradeAll, isAnswered } from "@/lib/exam/grading";
import { allQuestions, toGroups } from "@/lib/exam/schema";
import type { AnswerValue, QuestionGroup } from "@/lib/exam/schema";
import { saveQuizProgressAction } from "@/lib/progress-actions";
import { useElapsedSeconds } from "@/lib/use-elapsed-seconds";
import { PassageText, QuestionGroups, QuestionNavigator } from "./question-list";
import type { ReadingPaper } from "@/lib/content/full-paper";

/**
 * A bundled Reading paper: every passage under one 60-minute clock instead of three
 * disconnected short tests, matching how the real exam and reference test-library sites
 * present a full paper. Passages are freely switchable — unlike the four-skill simulation's
 * forced-forward legs, the real Reading paper lets a candidate move between passages at will.
 *
 * No new persistence: each passage keeps working as its own standalone test elsewhere, and
 * this only adds one combined Progress row on finish (Progress.contentItemId is nullable
 * already, so a paper-level attempt needs no schema change).
 */

const READING_PAPER_MINUTES = 60;

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function FullPaperRunner({ paper }: { paper: ReadingPaper }) {
  const partGroups = useMemo(
    () => paper.parts.map((part) => toGroups(part.questionSet)),
    [paper],
  );
  const partQuestions = useMemo(
    () => partGroups.map((groups) => allQuestions(groups)),
    [partGroups],
  );
  const startNumbers = useMemo(() => {
    const starts: number[] = [];
    let running = 0;
    for (const questions of partQuestions) {
      starts.push(running);
      running += questions.length;
    }
    return starts;
  }, [partQuestions]);
  const totalQuestions = partQuestions.reduce((sum, qs) => sum + qs.length, 0);

  const [activePart, setActivePart] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saved" | "not-logged-in">("idle");
  const [secondsLeft, setSecondsLeft] = useState(READING_PAPER_MINUTES * 60);
  const [isPending, startTransition] = useTransition();
  const elapsedSeconds = useElapsedSeconds();

  // Read inside the timer, which must not restart when answers change — see exam-runner.tsx
  // for why this has to be a ref rather than reading `answers` directly from the closure.
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const submittedRef = useRef(false);

  const submit = useCallback(() => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitted(true);

    const allGroups: QuestionGroup[] = partGroups.flat();
    const graded = gradeAll(allGroups, answersRef.current);
    const correctCount = graded.filter((g) => g.correct).length;

    startTransition(async () => {
      const result = await saveQuizProgressAction({
        skill: "READING",
        title: paper.title,
        correctCount,
        totalCount: graded.length,
        details: graded.map((g) => ({ id: g.id, type: g.type, correct: g.correct })),
        durationSeconds: elapsedSeconds(),
      });
      setSaveState(result.saved ? "saved" : "not-logged-in");
    });
  }, [partGroups, paper.title, elapsedSeconds]);

  // Countdown, ticking client-side only — a fresh page load resets it, same trade-off the
  // standalone single-passage tests already make (no wall-clock persistence for those either).
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          submit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [submit]);

  if (submitted) {
    const allGroups: QuestionGroup[] = partGroups.flat();
    const graded = gradeAll(allGroups, answers);
    const correctCount = graded.filter((g) => g.correct).length;
    const scaledCorrect = Math.round((correctCount / graded.length) * 40);
    const band = rawScoreToBand(scaledCorrect);
    const step = nextBandStep(scaledCorrect);

    return (
      <div className="rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 to-pop-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-link">Paper complete</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink">{paper.title}</h2>
        <p className="mt-4 text-sm text-ink-body">
          Score <span className="font-bold text-link">{correctCount}</span> / {graded.length}
        </p>
        <p className="mt-1 text-sm text-ink-body">
          That scales to about <span className="font-semibold text-link">band {band}</span> on
          the 40-question paper.{" "}
          {step && (
            <>
              {step.needed} more correct {step.needed === 1 ? "answer" : "answers"} would reach
              band {step.band}.
            </>
          )}
        </p>
        {saveState === "not-logged-in" && (
          <p className="mt-3 text-sm text-ink-muted">
            <Link href="/login" className="font-medium text-link hover:underline">
              Log in
            </Link>{" "}
            to save your progress and track your bands over time.
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <Button href="/ielts/reading" size="sm">
            All reading tests
          </Button>
          <Button href="/dashboard" variant="outline" size="sm">
            Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const timeIsShort = secondsLeft <= 300;
  const activeQuestions = partQuestions[activePart];
  const answeredInPart = activeQuestions.filter((q) => isAnswered(q, answers[q.id])).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-16 z-30 -mx-4 flex flex-wrap items-center justify-between gap-3 border-y border-line bg-surface/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <div className="flex flex-wrap items-center gap-1.5">
          {paper.parts.map((part, index) => {
            const questions = partQuestions[index];
            const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length;
            return (
              <button
                key={part.contentItemId}
                type="button"
                onClick={() => setActivePart(index)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-colors",
                  index === activePart
                    ? "bg-brand-600 text-white"
                    : answeredCount === questions.length
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-surface-sunken text-ink-muted hover:bg-line",
                )}
              >
                Passage {part.partNumber} · {answeredCount}/{questions.length}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-sm font-semibold tabular-nums",
              timeIsShort ? "bg-rose-100 text-rose-700" : "bg-surface-sunken text-ink-body",
            )}
            aria-live={timeIsShort ? "polite" : "off"}
          >
            {formatClock(secondsLeft)}
          </span>
          <Button size="sm" onClick={submit} disabled={isPending}>
            {isPending ? "Saving…" : "Finish paper"}
          </Button>
        </div>
      </div>

      {timeIsShort && (
        <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
          Under 5 minutes left for the whole paper. It submits automatically at zero.
        </p>
      )}

      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Passage {paper.parts[activePart].partNumber} of {paper.parts.length}
        </p>
        <h2 className="mt-1 text-lg font-bold text-ink">{paper.parts[activePart].title}</h2>
        <p className="mt-1 text-sm text-ink-muted">
          {answeredInPart} of {activeQuestions.length} answered in this passage ·{" "}
          {totalQuestions} questions across the whole paper
        </p>
      </div>

      <QuestionNavigator
        questions={activeQuestions}
        answers={answers}
        flagged={flagged}
        resultById={{}}
        startNumber={startNumbers[activePart]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-36 lg:max-h-[calc(100vh-11rem)] lg:self-start lg:overflow-y-auto">
          <div className="rounded-xl border border-line bg-surface p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
              Reading passage
            </p>
            <PassageText passage={paper.parts[activePart].passage} />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <QuestionGroups
            groups={partGroups[activePart]}
            answers={answers}
            flagged={flagged}
            resultById={{}}
            showInstructions
            startNumber={startNumbers[activePart]}
            onChange={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))}
            onToggleFlag={(id) => setFlagged((prev) => ({ ...prev, [id]: !prev[id] }))}
          />
        </div>
      </div>

      <Button onClick={submit} size="lg" className="self-start" disabled={isPending}>
        {isPending ? "Saving…" : "Finish paper"}
      </Button>
    </div>
  );
}
