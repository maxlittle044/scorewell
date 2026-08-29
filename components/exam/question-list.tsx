"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { isAnswered } from "@/lib/exam/grading";
import type { AnswerValue, Question, QuestionGroup } from "@/lib/exam/schema";
import { QuestionCard } from "./question-card";

/**
 * Presentation shared by the standalone exam runner and a simulation sitting's objective
 * legs. Both render the same passage, navigator and question groups; they differ only in
 * who owns the clock and where the result is written, which stays with each caller.
 */

export type QuestionResult = { correct: boolean; correctAnswer: string };

/**
 * Renders the passage, marking the sentence a question's answer came from.
 * Falls back to plain text when the quote isn't found verbatim, so a seed-data typo
 * degrades to "no highlight" rather than breaking the passage.
 */
export function PassageText({ passage, highlight }: { passage: string; highlight?: string }) {
  return (
    <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-body">
      {passage.split(/\n\n+/).map((paragraph, index) => {
        const at = highlight ? paragraph.indexOf(highlight) : -1;
        if (at === -1) return <p key={index}>{paragraph}</p>;

        return (
          <p key={index}>
            {paragraph.slice(0, at)}
            <mark className="rounded bg-accent-200 px-0.5 py-px text-ink">
              {paragraph.slice(at, at + highlight!.length)}
            </mark>
            {paragraph.slice(at + highlight!.length)}
          </p>
        );
      })}
    </div>
  );
}

export function QuestionNavigator({
  questions,
  answers,
  flagged,
  resultById,
}: {
  questions: Question[];
  answers: Record<string, AnswerValue>;
  flagged: Record<string, boolean>;
  resultById: Record<string, QuestionResult>;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Questions
      </p>
      <div className="flex flex-wrap gap-1.5">
        {questions.map((question, index) => {
          const done = isAnswered(question, answers[question.id]);
          const result = resultById[question.id];
          return (
            <a
              key={question.id}
              href={`#question-${question.id}`}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
                result
                  ? result.correct
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                  : flagged[question.id]
                    ? "bg-accent-100 text-accent-600 ring-1 ring-accent-400"
                    : done
                      ? "bg-brand-600 text-white"
                      : "bg-surface-sunken text-ink-muted hover:bg-line",
              )}
            >
              {index + 1}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export function QuestionGroups({
  groups,
  answers,
  flagged,
  resultById,
  onChange,
  onToggleFlag,
  onFocusQuestion,
  showInstructions,
}: {
  groups: QuestionGroup[];
  answers: Record<string, AnswerValue>;
  flagged: Record<string, boolean>;
  resultById: Record<string, QuestionResult>;
  onChange: (questionId: string, value: AnswerValue) => void;
  onToggleFlag: (questionId: string) => void;
  /** Fired on hover/focus so the caller can highlight the answer's source sentence. */
  onFocusQuestion?: (question: Question) => void;
  showInstructions: boolean;
}) {
  // Numbered up front rather than counted during the render, so the sequence can't depend
  // on render order. Numbering runs across groups, matching the printed paper.
  const numberById = useMemo(() => {
    const map = new Map<string, number>();
    let next = 0;
    for (const group of groups) {
      for (const question of group.questions) {
        next += 1;
        map.set(question.id, next);
      }
    }
    return map;
  }, [groups]);

  return (
    <>
      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-4">
          {group.instructions && showInstructions && (
            <div className="rounded-lg border-l-4 border-brand-500 bg-brand-50/60 px-4 py-2.5">
              <p className="text-sm font-medium text-heading">{group.instructions}</p>
              {group.bank && (
                <ul className="mt-2 flex flex-col gap-0.5 text-sm text-heading">
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
            return (
              <div
                key={question.id}
                onMouseEnter={() => onFocusQuestion?.(question)}
                onFocus={() => onFocusQuestion?.(question)}
              >
                <QuestionCard
                  question={question}
                  group={group}
                  number={numberById.get(question.id) ?? 0}
                  answer={answers[question.id]}
                  onChange={(value) => onChange(question.id, value)}
                  result={resultById[question.id]}
                  flagged={Boolean(flagged[question.id])}
                  onToggleFlag={() => onToggleFlag(question.id)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
