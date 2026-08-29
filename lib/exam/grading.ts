import type { AnswerValue, Question, QuestionGroup } from "./schema";

/**
 * British → American spelling folding, applied to both sides of a comparison so either
 * spelling is accepted without seed data having to list both.
 *
 * These are suffix rules, not a dictionary, so they generalise (organise/organize,
 * colour/color, centre/center …). Rules are applied to whole words only.
 */
const SPELLING_RULES: [RegExp, string][] = [
  [/([a-z]{2,})our\b/g, "$1or"], // colour → color, behaviour → behavior
  [/([a-z]{2,})ise\b/g, "$1ize"], // organise → organize
  [/([a-z]{2,})isation\b/g, "$1ization"],
  [/([a-z]{2,})ised\b/g, "$1ized"],
  [/([a-z]{2,})ising\b/g, "$1izing"],
  [/([a-z]{2,})yse\b/g, "$1yze"], // analyse → analyze
  [/([a-z]{2,})ysed\b/g, "$1yzed"],
  [/([a-z]{2,})ysing\b/g, "$1yzing"],
  [/([a-z]{2,})tre\b/g, "$1ter"], // centre → center, metre → meter
  [/([a-z]{2,})ogue\b/g, "$1og"], // catalogue → catalog
  [/([a-z]{2,})lled\b/g, "$1led"], // travelled → traveled
  [/([a-z]{2,})lling\b/g, "$1ling"],
  [/([a-z]{2,})ence\b/g, "$1ense"], // defence → defense
  [/\bprogramme\b/g, "program"],
];

/**
 * Normalise a free-text answer for comparison: case, surrounding punctuation, curly quotes,
 * and collapsed whitespace are all ignored, since none of them are what's being tested.
 */
export function normaliseAnswer(input: string): string {
  return input
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^[.,!?;:"'()\-]+/, "")
    .replace(/[.,!?;:"'()\-]+$/, "");
}

function foldSpelling(input: string): string {
  return SPELLING_RULES.reduce((acc, [pattern, replacement]) => acc.replace(pattern, replacement), input);
}

/** True when the learner's text matches any accepted answer, ignoring spelling variant. */
export function matchesAccepted(input: string, accept: string[]): boolean {
  const normalised = normaliseAnswer(input);
  if (!normalised) return false;
  const folded = foldSpelling(normalised);
  return accept.some((candidate) => {
    const target = normaliseAnswer(candidate);
    return normalised === target || folded === foldSpelling(target);
  });
}

export function countWords(input: string): number {
  return input.trim().split(/\s+/).filter(Boolean).length;
}

/** IELTS marks an over-length answer wrong even when the wording is right. */
export function exceedsWordLimit(input: string, wordLimit?: number): boolean {
  return wordLimit !== undefined && countWords(input) > wordLimit;
}

export function isAnswered(question: Question, answer: AnswerValue | undefined): boolean {
  if (answer === undefined) return false;
  if (question.kind === "multiple-select") return Array.isArray(answer) && answer.length > 0;
  if (typeof answer === "string") return answer.trim().length > 0;
  return true;
}

export type GradedQuestion = {
  id: string;
  correct: boolean;
  /** IELTS sub-skill, carried through to Progress.details for analytics. */
  type?: string;
  yourAnswer: string;
  correctAnswer: string;
};

function labelFor(question: Question, group: QuestionGroup, answer: AnswerValue | undefined): string {
  if (answer === undefined) return "Not answered";

  switch (question.kind) {
    case "multiple-choice":
      return typeof answer === "number" ? (question.options[answer] ?? "Not answered") : "Not answered";
    case "multiple-select":
      return Array.isArray(answer) && answer.length
        ? answer.map((i) => question.options[i]).filter(Boolean).join(", ")
        : "Not answered";
    case "matching": {
      const entry = group.bank?.find((b) => b.key === answer);
      return entry ? `${entry.key}. ${entry.label}` : String(answer);
    }
    default:
      return typeof answer === "string" && answer.trim() ? answer : "Not answered";
  }
}

function correctLabelFor(question: Question, group: QuestionGroup): string {
  switch (question.kind) {
    case "multiple-choice":
      return question.options[question.correctIndex] ?? "";
    case "multiple-select":
      return question.correctIndexes.map((i) => question.options[i]).filter(Boolean).join(", ");
    case "true-false-not-given":
    case "yes-no-not-given":
      return question.answer;
    case "matching": {
      const entry = group.bank?.find((b) => b.key === question.answer);
      return entry ? `${entry.key}. ${entry.label}` : question.answer;
    }
    case "completion":
      return question.accept.join(" / ");
  }
}

export function gradeQuestion(
  question: Question,
  group: QuestionGroup,
  answer: AnswerValue | undefined,
): GradedQuestion {
  let correct = false;

  switch (question.kind) {
    case "multiple-choice":
      correct = answer === question.correctIndex;
      break;
    case "multiple-select": {
      // Order-independent, and partial selections don't count.
      const chosen = Array.isArray(answer) ? [...answer].sort() : [];
      const expected = [...question.correctIndexes].sort();
      correct = chosen.length === expected.length && chosen.every((v, i) => v === expected[i]);
      break;
    }
    case "true-false-not-given":
    case "yes-no-not-given":
      correct = answer === question.answer;
      break;
    case "matching":
      correct = answer === question.answer;
      break;
    case "completion":
      correct =
        typeof answer === "string" &&
        !exceedsWordLimit(answer, group.wordLimit) &&
        matchesAccepted(answer, question.accept);
      break;
  }

  return {
    id: question.id,
    correct,
    type: question.type,
    yourAnswer: labelFor(question, group, answer),
    correctAnswer: correctLabelFor(question, group),
  };
}

export function gradeAll(
  groups: QuestionGroup[],
  answers: Record<string, AnswerValue>,
): GradedQuestion[] {
  return groups.flatMap((group) =>
    group.questions.map((question) => gradeQuestion(question, group, answers[question.id])),
  );
}
