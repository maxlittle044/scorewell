import { prisma } from "@/lib/prisma";
import { getReadingTest } from "./reading";
import { getListeningTest } from "./listening";
import { getWritingItem } from "./writing";
import { getSpeakingTest } from "./speaking";
import { QuestionSetSchema, toGroups } from "@/lib/exam/schema";
import type { QuestionGroup } from "@/lib/exam/schema";

/**
 * Printable versions of practice tests.
 *
 * IELTS is still sat on paper by a large share of candidates, and a passage is easier to
 * annotate in print than on screen. This resolves any published practice test to a shape a
 * print layout can render, whatever its skill.
 *
 * Nothing new is authored here — it is the same content the on-screen test uses, which is
 * also why the answer key can be included honestly: it already exists in the seed data.
 */

export type PrintableQuestion = {
  number: number;
  prompt: string;
  /** Rendered as lettered choices where the format has them. */
  options?: string[];
  /** The correct answer, for the key page. */
  answer: string;
};

export type PrintableGroup = {
  instructions: string;
  bank?: { key: string; label: string }[];
  questions: PrintableQuestion[];
};

export type PrintableDoc = {
  slug: string;
  title: string;
  skill: "READING" | "LISTENING" | "WRITING" | "SPEAKING";
  /** Rubric shown under the title. */
  instructions: string;
  /** Reading passage or listening transcript, where the skill has one. */
  passage?: string;
  passageLabel?: string;
  /**
   * Questions stay grouped rather than flattened: a matching question is unanswerable
   * without its shared option bank, and the rubric ("choose NO MORE THAN TWO WORDS")
   * belongs with the questions it governs. An earlier version printed the questions alone
   * and the matching items had no headings to choose from.
   */
  groups: PrintableGroup[];
  /** Flat list, used for the answer key. */
  questions: PrintableQuestion[];
  /** Writing and Speaking print as a prompt with ruled space rather than questions. */
  prompt?: string;
  promptPoints?: string[];
  minWords?: number;
};

/** The answer a key should show, derived from the same data the grader uses. */
function answerFor(question: QuestionGroup["questions"][number], group: QuestionGroup): string {
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

function promptFor(question: QuestionGroup["questions"][number]): string {
  switch (question.kind) {
    case "multiple-choice":
    case "multiple-select":
      return question.question;
    case "true-false-not-given":
    case "yes-no-not-given":
      return question.statement;
    default:
      return question.prompt;
  }
}

function fromGroups(groups: QuestionGroup[]) {
  const flat: PrintableQuestion[] = [];
  let number = 0;

  const printableGroups: PrintableGroup[] = groups.map((group) => {
    const questions = group.questions.map((question) => {
      number += 1;
      const entry: PrintableQuestion = {
        number,
        prompt: promptFor(question),
        options:
          question.kind === "multiple-choice" || question.kind === "multiple-select"
            ? question.options
            : undefined,
        answer: answerFor(question, group),
      };
      flat.push(entry);
      return entry;
    });
    return { instructions: group.instructions, bank: group.bank, questions };
  });

  return { questions: flat, groups: printableGroups };
}

export async function getPrintable(slug: string): Promise<PrintableDoc | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "PRACTICE_TEST", published: true },
    select: { skill: true },
  });
  if (!item?.skill) return null;

  if (item.skill === "READING") {
    const test = await getReadingTest(slug);
    if (!test) return null;
    const { questions, groups } = fromGroups(toGroups(test.questionSet));
    return {
      slug,
      title: test.title,
      skill: "READING",
      instructions:
        "Read the passage and answer the questions. Write your answers in the spaces provided.",
      passage: test.passage,
      passageLabel: "Reading passage",
      groups,
      questions,
    };
  }

  if (item.skill === "LISTENING") {
    const test = await getListeningTest(slug);
    if (!test) return null;
    // Listening stores flat multiple choice, which the shared schema normalises.
    const parsed = QuestionSetSchema.safeParse({ questions: test.questions });
    if (!parsed.success) return null;
    const { questions, groups } = fromGroups(toGroups(parsed.data));
    return {
      slug,
      title: test.title,
      skill: "LISTENING",
      // There is no audio on this site, so the honest print instruction is to read the
      // transcript — printing "listen to the recording" would describe something we do
      // not provide.
      instructions:
        "Audio is not available for this test. Read the transcript on the following page, then answer the questions.",
      passage: test.transcript,
      passageLabel: "Transcript",
      groups,
      questions,
    };
  }

  if (item.skill === "WRITING") {
    const test = await getWritingItem(slug, "test");
    if (!test) return null;
    return {
      slug,
      title: test.title,
      skill: "WRITING",
      instructions: test.instructions,
      prompt: test.prompt,
      minWords: test.minWords,
      groups: [],
      questions: [],
    };
  }

  const test = await getSpeakingTest(slug);
  if (!test) return null;
  return {
    slug,
    title: test.title,
    skill: "SPEAKING",
    instructions:
      test.part === "part2"
        ? "You have one minute to prepare, then speak for one to two minutes."
        : "Answer each question aloud, in full sentences.",
    prompt: test.questions[0],
    promptPoints: test.part === "part2" ? test.cueCardPoints : test.questions.slice(1),
    groups: [],
    questions: [],
  };
}
