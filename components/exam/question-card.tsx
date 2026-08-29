"use client";

import { cn } from "@/lib/cn";
import { countWords, exceedsWordLimit } from "@/lib/exam/grading";
import type { AnswerValue, Question, QuestionGroup } from "@/lib/exam/schema";

const TFNG_OPTIONS = ["TRUE", "FALSE", "NOT GIVEN"] as const;
const YNNG_OPTIONS = ["YES", "NO", "NOT GIVEN"] as const;

type Props = {
  question: Question;
  group: QuestionGroup;
  number: number;
  answer: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  /** Set once submitted: locks input and reveals correctness. */
  result?: { correct: boolean; correctAnswer: string };
  flagged: boolean;
  onToggleFlag: () => void;
};

/** Shared option-button styling for the pick-one formats. */
function optionClasses(state: "idle" | "selected" | "correct" | "wrong") {
  return cn(
    "flex w-full cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
    state === "correct" && "border-emerald-400 bg-emerald-50 text-emerald-900",
    state === "wrong" && "border-rose-400 bg-rose-50 text-rose-900",
    state === "selected" && "border-brand-400 bg-brand-50 text-heading",
    state === "idle" && "border-line hover:border-brand-300 hover:bg-brand-50/40",
  );
}

function FlagButton({ flagged, onToggle }: { flagged: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={flagged}
      className={cn(
        "shrink-0 rounded-full p-1.5 transition-colors",
        flagged ? "bg-accent-100 text-accent-600" : "text-zinc-300 hover:bg-surface-sunken hover:text-ink-muted",
      )}
      title={flagged ? "Remove flag" : "Flag for review"}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M3 1v12M3 2h8l-1.5 2.5L11 7H3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill={flagged ? "currentColor" : "none"}
        />
      </svg>
      <span className="sr-only">{flagged ? "Flagged for review" : "Flag for review"}</span>
    </button>
  );
}

export function QuestionCard({
  question,
  group,
  number,
  answer,
  onChange,
  result,
  flagged,
  onToggleFlag,
}: Props) {
  const locked = result !== undefined;

  function pickOne(options: readonly string[], selected: string | undefined, correctValue?: string) {
    return (
      <div className="flex flex-col gap-2">
        {options.map((option) => {
          const isSelected = selected === option;
          const state = locked
            ? option === correctValue
              ? "correct"
              : isSelected
                ? "wrong"
                : "idle"
            : isSelected
              ? "selected"
              : "idle";

          return (
            <label key={option} className={optionClasses(state)}>
              <input
                type="radio"
                name={question.id}
                disabled={locked}
                checked={isSelected}
                onChange={() => onChange(option)}
                className="accent-brand-600"
              />
              {option}
            </label>
          );
        })}
      </div>
    );
  }

  return (
    <div
      id={`question-${question.id}`}
      className="scroll-mt-24 rounded-xl border border-line bg-surface p-5"
    >
      <div className="mb-3 flex items-start gap-3">
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            locked
              ? result.correct
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
              : "bg-brand-100 text-link",
          )}
        >
          {number}
        </span>

        <div className="flex-1 text-sm font-medium text-ink">
          {question.kind === "true-false-not-given" || question.kind === "yes-no-not-given"
            ? question.statement
            : question.kind === "matching"
              ? question.prompt
              : question.kind === "completion"
                ? question.prompt
                : question.question}
        </div>

        {!locked && <FlagButton flagged={flagged} onToggle={onToggleFlag} />}
      </div>

      {question.kind === "multiple-choice" && (
        <div className="flex flex-col gap-2">
          {question.options.map((option, index) => {
            const isSelected = answer === index;
            const state = locked
              ? index === question.correctIndex
                ? "correct"
                : isSelected
                  ? "wrong"
                  : "idle"
              : isSelected
                ? "selected"
                : "idle";

            return (
              <div key={option}>
                <label className={optionClasses(state)}>
                  <input
                    type="radio"
                    name={question.id}
                    disabled={locked}
                    checked={isSelected}
                    onChange={() => onChange(index)}
                    className="accent-brand-600"
                  />
                  {option}
                </label>
                {/* Why this wrong option is wrong — shown only after submitting. */}
                {locked && index !== question.correctIndex && question.distractorNotes?.[String(index)] && (
                  <p className="mt-1 pl-3 text-xs text-ink-muted">
                    {question.distractorNotes[String(index)]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {question.kind === "multiple-select" && (
        <>
          <p className="mb-2 text-xs font-medium text-pop-600">
            Choose {question.correctIndexes.length}.
          </p>
          <div className="flex flex-col gap-2">
            {question.options.map((option, index) => {
              const chosen = Array.isArray(answer) ? answer : [];
              const isSelected = chosen.includes(index);
              const state = locked
                ? question.correctIndexes.includes(index)
                  ? "correct"
                  : isSelected
                    ? "wrong"
                    : "idle"
                : isSelected
                  ? "selected"
                  : "idle";

              return (
                <label key={option} className={optionClasses(state)}>
                  <input
                    type="checkbox"
                    disabled={locked}
                    checked={isSelected}
                    onChange={() =>
                      onChange(
                        isSelected ? chosen.filter((i) => i !== index) : [...chosen, index],
                      )
                    }
                    className="accent-brand-600"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </>
      )}

      {question.kind === "true-false-not-given" &&
        pickOne(TFNG_OPTIONS, typeof answer === "string" ? answer : undefined, question.answer)}

      {question.kind === "yes-no-not-given" &&
        pickOne(YNNG_OPTIONS, typeof answer === "string" ? answer : undefined, question.answer)}

      {question.kind === "matching" && (
        <select
          disabled={locked}
          value={typeof answer === "string" ? answer : ""}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full rounded-lg border px-3 py-2 text-sm",
            locked
              ? result.correct
                ? "border-emerald-400 bg-emerald-50"
                : "border-rose-400 bg-rose-50"
              : "border-line focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100",
          )}
        >
          <option value="">Select…</option>
          {group.bank?.map((entry) => (
            <option key={entry.key} value={entry.key}>
              {entry.key}. {entry.label}
            </option>
          ))}
        </select>
      )}

      {question.kind === "completion" && (
        <CompletionInput
          value={typeof answer === "string" ? answer : ""}
          onChange={onChange}
          wordLimit={group.wordLimit}
          locked={locked}
          correct={result?.correct}
        />
      )}

      {locked && (
        <div className="mt-4 rounded-lg bg-surface-muted px-4 py-3 text-sm">
          {!result.correct && (
            <p className="text-ink-body">
              <span className="font-semibold">Correct answer:</span> {result.correctAnswer}
            </p>
          )}
          {question.evidence && (
            <div className={cn(!result.correct && "mt-2")}>
              {question.evidence.quote ? (
                <p className="text-ink-body">
                  <span className="font-semibold">Where it says so:</span>{" "}
                  <span className="bg-accent-100 px-1">“{question.evidence.quote}”</span>
                </p>
              ) : (
                <p className="font-semibold text-ink-body">Why:</p>
              )}
              <p className="mt-1.5 text-ink-body">{question.evidence.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CompletionInput({
  value,
  onChange,
  wordLimit,
  locked,
  correct,
}: {
  value: string;
  onChange: (value: string) => void;
  wordLimit?: number;
  locked: boolean;
  correct?: boolean;
}) {
  const over = exceedsWordLimit(value, wordLimit);
  const words = countWords(value);

  return (
    <div>
      <input
        type="text"
        value={value}
        disabled={locked}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your answer"
        className={cn(
          "w-full rounded-lg border px-3 py-2 text-sm",
          locked
            ? correct
              ? "border-emerald-400 bg-emerald-50"
              : "border-rose-400 bg-rose-50"
            : over
              ? "border-rose-400 focus:outline-none focus:ring-4 focus:ring-rose-100"
              : "border-line focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100",
        )}
      />
      {wordLimit !== undefined && !locked && (
        <p className={cn("mt-1 text-xs", over ? "font-medium text-rose-600" : "text-ink-muted")}>
          {over
            ? `${words} words — over the ${wordLimit}-word limit, this would be marked wrong.`
            : `${words}/${wordLimit} words`}
        </p>
      )}
    </div>
  );
}
