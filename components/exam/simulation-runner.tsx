"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { AudioPlaceholder } from "@/components/content/audio-placeholder";
import { SpeakingRecorder } from "@/components/content/speaking-recorder";
import { countWords, gradeAll, isAnswered } from "@/lib/exam/grading";
import { allQuestions, toGroups } from "@/lib/exam/schema";
import type { AnswerValue } from "@/lib/exam/schema";
// Types module, not the loader — importing the loader would pull Prisma and `pg` into
// the browser bundle.
import { LEG_ORDER } from "@/lib/exam/simulation-types";
import type { LegSkill, SimulationSet } from "@/lib/exam/simulation-types";
import {
  evaluateSimulationLegAction,
  finishSimulationAction,
  saveObjectiveLegAction,
  saveProducedLegAction,
  startSimulationAction,
} from "@/lib/simulation-actions";
import {
  CriterionFeedback,
  TRANSCRIPT_PRONUNCIATION_NOTE,
  type CriterionResult,
} from "@/components/tools/criterion-feedback";
import { PassageText, QuestionGroups, QuestionNavigator } from "./question-list";

/**
 * A full four-skill sitting under one global clock (spec section 4b), styled closer to a
 * real computer-delivered test than to the rest of the site (section 7.2).
 *
 * Two properties make it a simulation rather than four tests in a row:
 *
 * - **The clock is wall-clock, not a tick counter.** It is derived from the attempt's
 *   `startedAt` on every render, so closing the tab doesn't pause the exam and reopening
 *   it can't buy back time.
 * - **Sections are forward-only.** Once a section is handed in it can't be reopened,
 *   which is what the real exam does and what makes the timing decision matter.
 */

export type AttemptState = {
  id: string;
  startedAt: number;
  listeningBand: number | null;
  readingBand: number | null;
  writingBand: number | null;
  speakingBand: number | null;
  overallBand: number | null;
  writingResponse: string | null;
  speakingTranscript: string | null;
  writingFeedback: CriterionResult | null;
  speakingFeedback: CriterionResult | null;
  completed: boolean;
};

type ProducedSkill = "WRITING" | "SPEAKING";

const SKILL_LABELS: Record<LegSkill, string> = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

function formatClock(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`;
}

/** The first section this attempt hasn't handed in — so a refresh resumes where it left off. */
function firstUnfinishedLeg(attempt: AttemptState): number {
  if (attempt.listeningBand === null) return 0;
  if (attempt.readingBand === null) return 1;
  if (attempt.writingResponse === null) return 2;
  if (attempt.speakingTranscript === null) return 3;
  return LEG_ORDER.length;
}

export function SimulationRunner({
  set,
  initialAttempt,
}: {
  set: SimulationSet;
  initialAttempt: AttemptState | null;
}) {
  const [attempt, setAttempt] = useState<AttemptState | null>(initialAttempt);
  const [legIndex, setLegIndex] = useState(() =>
    initialAttempt ? firstUnfinishedLeg(initialAttempt) : 0,
  );
  const [finished, setFinished] = useState(Boolean(initialAttempt?.completed));
  const [isPending, startTransition] = useTransition();
  const [startError, setStartError] = useState<string | null>(null);

  // Per-leg working state.
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [writingResponse, setWritingResponse] = useState(initialAttempt?.writingResponse ?? "");
  const [speakingTranscript, setSpeakingTranscript] = useState(
    initialAttempt?.speakingTranscript ?? "",
  );

  // Post-sitting AI evaluation of the two legs that carry no automatic band.
  const [evaluating, setEvaluating] = useState<ProducedSkill | null>(null);
  const [evalErrors, setEvalErrors] = useState<Partial<Record<ProducedSkill, string>>>({});

  const totalSeconds = set.totalMinutes * 60;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!attempt || finished) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [attempt, finished]);

  const secondsLeft = attempt
    ? Math.max(0, totalSeconds - Math.floor((now - attempt.startedAt) / 1000))
    : totalSeconds;

  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current || !attempt) return;
    finishedRef.current = true;
    setFinished(true);
    startTransition(async () => {
      const result = await finishSimulationAction(attempt.id);
      if (result.saved) {
        setAttempt((prev) =>
          prev
            ? {
                ...prev,
                listeningBand: result.listeningBand ?? prev.listeningBand,
                readingBand: result.readingBand ?? prev.readingBand,
                overallBand: result.overallBand ?? null,
                completed: true,
              }
            : prev,
        );
      }
    });
  }, [attempt]);

  // Out of time ends the sitting wherever the learner had got to, like the real exam.
  useEffect(() => {
    if (attempt && !finished && secondsLeft <= 0) finish();
  }, [attempt, finished, secondsLeft, finish]);

  /** Starts a sitting, and doubles as "sit it again" from the results screen. */
  const begin = () => {
    setStartError(null);
    startTransition(async () => {
      const result = await startSimulationAction(set.name);
      if (!result.ok) {
        setStartError("Please log in to start a full sitting.");
        return;
      }
      setAttempt({
        id: result.attemptId,
        startedAt: result.startedAt,
        listeningBand: null,
        readingBand: null,
        writingBand: null,
        speakingBand: null,
        overallBand: null,
        writingResponse: null,
        speakingTranscript: null,
        writingFeedback: null,
        speakingFeedback: null,
        completed: false,
      });
      // Everything the previous sitting left behind, so a retake starts clean.
      finishedRef.current = false;
      setFinished(false);
      setAnswers({});
      setFlagged({});
      setWritingResponse("");
      setSpeakingTranscript("");
      setEvalErrors({});
      setNow(Date.now());
      setLegIndex(0);
    });
  };

  const evaluateLeg = (skill: ProducedSkill) => {
    if (!attempt) return;
    setEvaluating(skill);
    setEvalErrors((prev) => ({ ...prev, [skill]: undefined }));

    startTransition(async () => {
      const outcome = await evaluateSimulationLegAction({ attemptId: attempt.id, skill });
      setEvaluating(null);

      if (outcome.error || !outcome.result) {
        setEvalErrors((prev) => ({ ...prev, [skill]: outcome.error ?? "Evaluation failed." }));
        return;
      }

      const evaluated = outcome.result;
      setAttempt((prev) =>
        prev
          ? {
              ...prev,
              ...(skill === "WRITING"
                ? { writingBand: evaluated.overallBand, writingFeedback: evaluated }
                : { speakingBand: evaluated.overallBand, speakingFeedback: evaluated }),
              overallBand: outcome.overallBand ?? prev.overallBand,
            }
          : prev,
      );
    });
  };

  const currentSkill = LEG_ORDER[legIndex] as LegSkill | undefined;

  const objectiveLeg =
    currentSkill === "LISTENING" ? set.listening : currentSkill === "READING" ? set.reading : null;

  const groups = useMemo(
    () => (objectiveLeg ? toGroups(objectiveLeg.questionSet) : []),
    [objectiveLeg],
  );
  const questions = useMemo(() => allQuestions(groups), [groups]);

  /** Hands in the current section and moves on. There is no way back afterwards. */
  const handIn = () => {
    if (!attempt || !currentSkill) return;

    startTransition(async () => {
      if (currentSkill === "LISTENING" || currentSkill === "READING") {
        const graded = gradeAll(groups, answers);
        await saveObjectiveLegAction({
          attemptId: attempt.id,
          skill: currentSkill,
          correctCount: graded.filter((g) => g.correct).length,
          totalCount: graded.length,
          details: graded.map((g) => ({ id: g.id, type: g.type, correct: g.correct })),
        });
      } else {
        await saveProducedLegAction({
          attemptId: attempt.id,
          skill: currentSkill,
          text: currentSkill === "WRITING" ? writingResponse : speakingTranscript,
        });
      }

      // Cleared so the next objective section starts empty rather than inheriting answers.
      setAnswers({});
      setFlagged({});

      if (legIndex + 1 >= LEG_ORDER.length) {
        finish();
      } else {
        setLegIndex(legIndex + 1);
      }
    });
  };

  // ---------------------------------------------------------------- pre-flight

  if (!attempt) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-zinc-900">Before you begin</h2>
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-sm text-zinc-600">
          <li>
            One clock covers all four sections —{" "}
            <span className="font-semibold text-zinc-800">{set.totalMinutes} minutes</span> in
            total. It does not pause.
          </li>
          <li>Sections are handed in one at a time and cannot be reopened.</li>
          <li>The clock keeps running if you close the tab; reopening resumes where you were.</li>
          <li>
            Listening and Reading are marked automatically. Writing and Speaking are saved for
            evaluation — they carry no band on their own.
          </li>
        </ul>

        {startError && <p className="mt-4 text-sm text-rose-700">{startError}</p>}

        <div className="mt-5 flex items-center gap-3">
          <Button onClick={begin} size="lg" disabled={isPending}>
            {isPending ? "Starting…" : "Begin sitting"}
          </Button>
          <Link href="/simulation" className="text-sm text-zinc-500 hover:underline">
            Back to simulations
          </Link>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ results

  if (finished) {
    const scored = [
      { label: "Listening", band: attempt.listeningBand },
      { label: "Reading", band: attempt.readingBand },
      { label: "Writing", band: attempt.writingBand },
      { label: "Speaking", band: attempt.speakingBand },
    ];
    const unscored = scored.filter((row) => row.band === null).map((row) => row.label);

    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 to-pop-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
            Sitting complete
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold text-zinc-900">{set.name}</h2>

          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {scored.map((row) => (
              <div key={row.label} className="rounded-xl bg-white/70 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {row.label}
                </dt>
                <dd
                  className={cn(
                    "mt-1 font-bold",
                    row.band === null ? "text-sm text-zinc-400" : "text-2xl text-brand-700",
                  )}
                >
                  {row.band === null ? "Not scored" : row.band.toFixed(1)}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-xl bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Overall band
            </p>
            {attempt.overallBand !== null ? (
              <p className="mt-1 text-3xl font-bold text-brand-700">
                {attempt.overallBand.toFixed(1)}
              </p>
            ) : (
              <p className="mt-1 text-sm text-zinc-600">
                An IELTS overall band is the average of all four skills, so it stays unset while{" "}
                {unscored.join(" and ")} {unscored.length === 1 ? "is" : "are"} unscored. Your
                answers are saved — have them evaluated to complete the picture.
              </p>
            )}
          </div>

          {isPending && <p className="mt-3 text-sm text-zinc-500">Saving your sitting…</p>}
        </div>

        {/* Review: what the learner produced, plus the material that was hidden during the exam. */}
        {writingResponse.trim() && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="mb-1 text-sm font-bold text-zinc-900">Your writing response</h3>
            <p className="mb-3 text-xs text-zinc-500">
              {countWords(writingResponse)} words · {set.writing.title}
            </p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
              {writingResponse}
            </p>

            {attempt.writingFeedback ? (
              <div className="mt-5">
                <CriterionFeedback result={attempt.writingFeedback} />
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  size="sm"
                  onClick={() => evaluateLeg("WRITING")}
                  disabled={evaluating !== null}
                >
                  {evaluating === "WRITING" ? "Evaluating…" : "Evaluate with AI"}
                </Button>
                <span className="text-xs text-zinc-500">
                  Uses one of your AI credits. Or{" "}
                  <Link href="/reviews" className="font-medium text-brand-600 hover:underline">
                    request a human examiner review
                  </Link>
                  .
                </span>
              </div>
            )}
            {evalErrors.WRITING && (
              <p className="mt-3 text-sm text-rose-700">{evalErrors.WRITING}</p>
            )}
          </section>
        )}

        {speakingTranscript.trim() && (
          <section className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="mb-1 text-sm font-bold text-zinc-900">Your speaking transcript</h3>
            <p className="mb-3 text-xs text-zinc-500">{set.speaking.title}</p>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
              {speakingTranscript}
            </p>

            {attempt.speakingFeedback ? (
              <div className="mt-5">
                <CriterionFeedback
                  result={attempt.speakingFeedback}
                  bandLabel="Estimated band"
                  note={TRANSCRIPT_PRONUNCIATION_NOTE}
                />
              </div>
            ) : (
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Button
                  size="sm"
                  onClick={() => evaluateLeg("SPEAKING")}
                  disabled={evaluating !== null}
                >
                  {evaluating === "SPEAKING" ? "Evaluating…" : "Evaluate with AI"}
                </Button>
                <span className="text-xs text-zinc-500">
                  Uses one of your AI credits. Scored on three criteria — pronunciation can&apos;t
                  be judged from a transcript.
                </span>
              </div>
            )}
            {evalErrors.SPEAKING && (
              <p className="mt-3 text-sm text-rose-700">{evalErrors.SPEAKING}</p>
            )}
          </section>
        )}

        <details className="rounded-2xl border border-zinc-200 bg-white p-6">
          <summary className="cursor-pointer text-sm font-bold text-zinc-900">
            Listening transcript and reading passage
          </summary>
          <div className="mt-4 flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {set.listening.title}
              </p>
              <p className="text-sm leading-relaxed text-zinc-700">{set.listening.transcript}</p>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {set.reading.title}
              </p>
              <PassageText passage={set.reading.passage} />
            </div>
          </div>
        </details>

        <div className="flex flex-wrap gap-3">
          <Button onClick={begin} size="sm" disabled={isPending}>
            {isPending ? "Starting…" : "Sit it again"}
          </Button>
          <Button href="/simulation" variant="outline" size="sm">
            All simulations
          </Button>
          <Button href="/dashboard" variant="outline" size="sm">
            Dashboard
          </Button>
        </div>
        {startError && <p className="text-sm text-rose-700">{startError}</p>}
      </div>
    );
  }

  // ------------------------------------------------------------------ running

  const answeredCount = questions.filter((q) => isAnswered(q, answers[q.id])).length;
  const timeIsShort = secondsLeft <= 300;
  const wordCount = countWords(writingResponse);

  return (
    <div className="flex flex-col gap-6">
      {/* Exam chrome: section progress and the one clock that governs the whole sitting. */}
      <div className="sticky top-16 z-30 -mx-4 flex flex-wrap items-center justify-between gap-3 border-y border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
        <div className="flex flex-wrap items-center gap-1.5">
          {LEG_ORDER.map((skill, index) => (
            <span
              key={skill}
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-semibold",
                index < legIndex && "bg-emerald-100 text-emerald-700",
                index === legIndex && "bg-brand-600 text-white",
                index > legIndex && "bg-zinc-100 text-zinc-400",
              )}
            >
              {SKILL_LABELS[skill]}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 font-mono text-sm font-semibold tabular-nums",
              timeIsShort ? "bg-rose-100 text-rose-700" : "bg-zinc-100 text-zinc-700",
            )}
            aria-live={timeIsShort ? "polite" : "off"}
          >
            {formatClock(secondsLeft)}
          </span>
          <Button size="sm" onClick={handIn} disabled={isPending}>
            {isPending
              ? "Saving…"
              : legIndex + 1 >= LEG_ORDER.length
                ? "Finish sitting"
                : "Hand in section"}
          </Button>
        </div>
      </div>

      {timeIsShort && (
        <p className="rounded-lg bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700">
          Under 5 minutes left in the whole sitting. It ends automatically at zero.
        </p>
      )}

      {/* -------------------------------------------------------- objective legs */}
      {objectiveLeg && (
        <>
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Section {legIndex + 1} of {LEG_ORDER.length} · {SKILL_LABELS[currentSkill!]}
            </p>
            <h2 className="mt-1 text-lg font-bold text-zinc-900">{objectiveLeg.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Suggested time {objectiveLeg.minutes} minutes · {answeredCount} of{" "}
              {questions.length} answered
            </p>
          </div>

          {currentSkill === "LISTENING" && <AudioPlaceholder label={set.listening.audioLabel} />}

          <QuestionNavigator
            questions={questions}
            answers={answers}
            flagged={flagged}
            resultById={{}}
          />

          <div className={cn("grid gap-6", currentSkill === "READING" && "lg:grid-cols-2")}>
            {currentSkill === "READING" && (
              <div className="lg:sticky lg:top-36 lg:max-h-[calc(100vh-11rem)] lg:self-start lg:overflow-y-auto">
                <div className="rounded-xl border border-zinc-200 bg-white p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
                    Reading passage
                  </p>
                  <PassageText passage={set.reading.passage} />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-6">
              <QuestionGroups
                groups={groups}
                answers={answers}
                flagged={flagged}
                resultById={{}}
                showInstructions
                onChange={(id, value) => setAnswers((prev) => ({ ...prev, [id]: value }))}
                onToggleFlag={(id) => setFlagged((prev) => ({ ...prev, [id]: !prev[id] }))}
              />
            </div>
          </div>
        </>
      )}

      {/* ----------------------------------------------------------- writing leg */}
      {currentSkill === "WRITING" && (
        <>
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Section 3 of 4 · Writing
            </p>
            <h2 className="mt-1 text-lg font-bold text-zinc-900">{set.writing.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Suggested time {set.writing.minutes} minutes
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm leading-relaxed text-zinc-800">{set.writing.prompt}</p>
            <p className="mt-3 text-sm text-zinc-600">{set.writing.instructions}</p>
            <p className="mt-3 text-xs text-zinc-500">
              Write at least {set.writing.minWords} words.
            </p>
          </div>

          <div>
            <textarea
              value={writingResponse}
              onChange={(event) => setWritingResponse(event.target.value)}
              rows={18}
              placeholder="Type your response here…"
              className="w-full rounded-xl border border-zinc-200 p-4 text-sm leading-relaxed text-zinc-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <p
              className={cn(
                "mt-2 text-xs",
                wordCount < set.writing.minWords ? "text-zinc-500" : "text-emerald-700",
              )}
            >
              {wordCount} {wordCount === 1 ? "word" : "words"} · minimum {set.writing.minWords}
            </p>
          </div>
        </>
      )}

      {/* ---------------------------------------------------------- speaking leg */}
      {currentSkill === "SPEAKING" && (
        <>
          <div className="rounded-xl border border-zinc-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Section 4 of 4 · Speaking
            </p>
            <h2 className="mt-1 text-lg font-bold text-zinc-900">{set.speaking.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Suggested time {set.speaking.minutes} minutes
            </p>
          </div>

          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            {set.speaking.part === "part2" ? (
              <>
                <p className="mb-2 text-sm font-medium text-zinc-800">
                  {set.speaking.questions[0]}
                </p>
                {set.speaking.cueCardPoints && (
                  <>
                    <p className="mb-1 text-sm text-zinc-700">You should say:</p>
                    <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-zinc-700">
                      {set.speaking.cueCardPoints.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-zinc-800">
                {set.speaking.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ol>
            )}
            <p className="mt-4 text-sm text-zinc-600">{set.speaking.guidance}</p>
          </div>

          <SpeakingRecorder
            transcript={speakingTranscript}
            onTranscriptChange={setSpeakingTranscript}
          />
          <p className="text-xs text-zinc-500">
            The transcript is what gets saved with your sitting. Recording stays in your browser.
          </p>
        </>
      )}

      <Button onClick={handIn} size="lg" className="self-start" disabled={isPending}>
        {isPending
          ? "Saving…"
          : legIndex + 1 >= LEG_ORDER.length
            ? "Finish sitting"
            : `Hand in ${SKILL_LABELS[currentSkill!].toLowerCase()} and continue`}
      </Button>
    </div>
  );
}
