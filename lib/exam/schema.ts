import { z } from "zod";

/**
 * Real IELTS Reading/Listening question formats.
 *
 * `kind` is the question *format* (how it's rendered and graded). It is deliberately
 * separate from `type`, which stays the IELTS sub-skill ("Specific detail", "Inference", …)
 * that Premium mistake analytics groups on — renaming that would break existing Progress rows.
 *
 * Fourteen official question types collapse into six renderers, because several of them are
 * the same interaction with different instructions (matching headings / features / sentence
 * endings are all "pick one option from a shared bank"; sentence / summary / note / table /
 * form / diagram completion are all "type a word, respecting a word limit").
 */

/** Locate & Explain data: where the answer lives and why it's right. */
const EvidenceSchema = z.object({
  /**
   * Verbatim sentence from the passage/transcript, highlighted in place during review.
   * Optional because NOT GIVEN / NO answers are correct precisely *because* no such
   * sentence exists — those carry an explanation alone.
   */
  quote: z.string().optional(),
  explanation: z.string(),
  /** Listening only: seconds into the audio, so review can jump the playhead. */
  audioSeconds: z.number().optional(),
});

const BaseFields = {
  id: z.string(),
  /** IELTS sub-skill, for analytics. Not the question format — that's `kind`. */
  type: z.string().optional(),
  evidence: EvidenceSchema.optional(),
};

const MultipleChoiceSchema = z.object({
  ...BaseFields,
  kind: z.literal("multiple-choice"),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  /** Why each wrong option is wrong, keyed by option index. Our differentiator. */
  distractorNotes: z.record(z.string(), z.string()).optional(),
});

const MultipleSelectSchema = z.object({
  ...BaseFields,
  kind: z.literal("multiple-select"),
  question: z.string(),
  options: z.array(z.string()),
  correctIndexes: z.array(z.number()),
  distractorNotes: z.record(z.string(), z.string()).optional(),
});

const TrueFalseNotGivenSchema = z.object({
  ...BaseFields,
  kind: z.literal("true-false-not-given"),
  statement: z.string(),
  answer: z.enum(["TRUE", "FALSE", "NOT GIVEN"]),
});

const YesNoNotGivenSchema = z.object({
  ...BaseFields,
  kind: z.literal("yes-no-not-given"),
  statement: z.string(),
  answer: z.enum(["YES", "NO", "NOT GIVEN"]),
});

/** Matching headings / features / names / sentence endings — options come from the group bank. */
const MatchingSchema = z.object({
  ...BaseFields,
  kind: z.literal("matching"),
  prompt: z.string(),
  /** Must be one of the group bank's keys. */
  answer: z.string(),
});

/**
 * Sentence / summary / note / table / form / diagram completion, and short answer.
 * Free text, graded against `accept` after normalisation.
 */
const CompletionSchema = z.object({
  ...BaseFields,
  kind: z.literal("completion"),
  prompt: z.string(),
  /** All answers counted correct. Include genuine alternates; spelling variants are automatic. */
  accept: z.array(z.string()).min(1),
});

export const QuestionSchema = z.preprocess(
  // Content seeded before v2 has no `kind` and is always multiple choice.
  (value) =>
    typeof value === "object" && value !== null && !("kind" in value)
      ? { ...(value as object), kind: "multiple-choice" }
      : value,
  z.discriminatedUnion("kind", [
    MultipleChoiceSchema,
    MultipleSelectSchema,
    TrueFalseNotGivenSchema,
    YesNoNotGivenSchema,
    MatchingSchema,
    CompletionSchema,
  ]),
);

export const QuestionGroupSchema = z.object({
  id: z.string(),
  /** The rubric line, e.g. "Choose NO MORE THAN TWO WORDS from the passage." */
  instructions: z.string(),
  /** Enforced for completion questions; also drives the on-screen word counter. */
  wordLimit: z.number().optional(),
  /** Shared option bank for `matching` questions in this group. */
  bank: z.array(z.object({ key: z.string(), label: z.string() })).optional(),
  questions: z.array(QuestionSchema).min(1),
});

/** A test's questions: either legacy flat MCQs, or v2 groups. At least one must be present. */
export const QuestionSetSchema = z
  .object({
    questions: z.array(QuestionSchema).optional(),
    groups: z.array(QuestionGroupSchema).optional(),
  })
  .refine((d) => (d.questions?.length ?? 0) + (d.groups?.length ?? 0) > 0, {
    message: "A test needs either `questions` or `groups`.",
  });

export type Question = z.infer<typeof QuestionSchema>;
export type QuestionGroup = z.infer<typeof QuestionGroupSchema>;
export type QuestionSet = z.infer<typeof QuestionSetSchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;

/** What the learner has entered. Shape depends on the question kind. */
export type AnswerValue = number | number[] | string;

/**
 * Collapse either representation into groups, so the renderer only handles one shape.
 * Legacy flat questions become a single untitled group with no rubric.
 */
export function toGroups(set: QuestionSet): QuestionGroup[] {
  const groups = [...(set.groups ?? [])];
  if (set.questions?.length) {
    groups.unshift({
      id: "default",
      instructions: "Choose the correct answer.",
      questions: set.questions,
    });
  }
  return groups;
}

export function allQuestions(groups: QuestionGroup[]): Question[] {
  return groups.flatMap((g) => g.questions);
}
