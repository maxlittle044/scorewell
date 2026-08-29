import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAnalytics, MIN_QUESTIONS_TO_JUDGE } from "@/lib/analytics";
import type { Skill } from "@/generated/prisma/enums";

/**
 * The goal-based Learning Path (site-build-prompt.md sections 2, 3a and 5).
 *
 * The plan is **derived on every visit**, never stored. Only the goal (User.targetBand)
 * and the diagnostic result (a Progress row) persist; everything else is recomputed from
 * live Progress, so the plan cannot recommend something the learner has already done or
 * keep asserting a weakness they have since fixed.
 *
 * Every step points at content proven to exist by a query — a plan full of dead links
 * would be worse than no plan.
 */

export const PLACEMENT_SLUG = "placement-diagnostic";
export const PLACEMENT_TASK_TYPE = "placement";

const PlacementQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number(),
  type: z.string(),
  section: z.enum(["reading", "language"]),
});

const PlacementDataSchema = z.object({
  passage: z.string(),
  questions: z.array(PlacementQuestionSchema).min(1),
});

export type PlacementQuestion = z.infer<typeof PlacementQuestionSchema>;

export type Placement = {
  id: string;
  title: string;
  passage: string;
  questions: PlacementQuestion[];
};

export async function getPlacement(): Promise<Placement | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug: PLACEMENT_SLUG,
      contentType: "MINI_EXERCISE",
      taskType: PLACEMENT_TASK_TYPE,
      published: true,
    },
  });
  if (!item) return null;

  const parsed = PlacementDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, title: item.title, ...parsed.data };
}

export type PlanStep = {
  id: string;
  title: string;
  /** Why this step is here, stated from the learner's own data. */
  reason: string;
  href: string;
  cta: string;
};

export type SkillState = { skill: Skill; band: number | null; attempts: number };

export type LearningPlan = {
  targetBand: number | null;
  placementBand: number | null;
  placementAt: Date | null;
  /** Correct-out-of-total for each half of the diagnostic. Empty without a result. */
  sections: { label: string; correct: number; total: number }[];
  perSkill: SkillState[];
  /** Target minus the weakest measured skill. Null when either end is unknown. */
  gap: number | null;
  steps: PlanStep[];
};

const SKILLS: Skill[] = ["LISTENING", "READING", "WRITING", "SPEAKING"];

const SKILL_LABELS: Record<Skill, string> = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

const SKILL_INDEX: Record<Skill, string> = {
  LISTENING: "/ielts/listening",
  READING: "/ielts/reading",
  WRITING: "/ielts/writing",
  SPEAKING: "/ielts/speaking",
};

const PlacementOutcomeSchema = z.array(
  z.object({ id: z.string(), type: z.string().optional(), correct: z.boolean() }),
);

/** A published test in this skill the learner hasn't attempted, else any published one. */
async function suggestTest(skill: Skill, attemptedIds: Set<string>) {
  const tests = await prisma.contentItem.findMany({
    where: { contentType: "PRACTICE_TEST", skill, published: true },
    select: { id: true, slug: true, title: true },
    orderBy: { slug: "asc" },
  });
  if (tests.length === 0) return null;
  return tests.find((test) => !attemptedIds.has(test.id)) ?? tests[0];
}

export async function getLearningPlan(userId: string): Promise<LearningPlan> {
  const [user, placementRow, banded, attempted, analytics] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId }, select: { targetBand: true } }),
    prisma.progress.findFirst({
      where: { userId, taskType: PLACEMENT_TASK_TYPE },
      orderBy: { completedAt: "desc" },
    }),
    prisma.progress.findMany({
      where: { userId, skill: { not: null }, bandScore: { not: null } },
      orderBy: { completedAt: "desc" },
      distinct: ["skill"],
      select: { skill: true, bandScore: true },
    }),
    prisma.progress.findMany({
      where: { userId, contentItemId: { not: null } },
      select: { contentItemId: true, skill: true },
    }),
    getAnalytics(userId),
  ]);

  const targetBand = user?.targetBand ?? null;
  const latestBySkill = new Map(banded.map((row) => [row.skill as Skill, row.bandScore!]));
  const attemptsBySkill = new Map<Skill, number>();
  const attemptedIds = new Set<string>();
  for (const row of attempted) {
    if (row.contentItemId) attemptedIds.add(row.contentItemId);
    if (row.skill) attemptsBySkill.set(row.skill, (attemptsBySkill.get(row.skill) ?? 0) + 1);
  }

  const perSkill: SkillState[] = SKILLS.map((skill) => ({
    skill,
    band: latestBySkill.get(skill) ?? null,
    attempts: attemptsBySkill.get(skill) ?? 0,
  }));

  const measured = perSkill.filter((entry) => entry.band !== null);
  const weakestMeasured = [...measured].sort((a, b) => a.band! - b.band!)[0] ?? null;
  const gap =
    targetBand !== null && weakestMeasured
      ? Math.round((targetBand - weakestMeasured.band!) * 10) / 10
      : null;

  // Diagnostic breakdown, recovered from the per-question outcomes it stored.
  const sections: LearningPlan["sections"] = [];
  if (placementRow) {
    const outcomes = PlacementOutcomeSchema.safeParse(placementRow.details);
    const placement = await getPlacement();
    if (outcomes.success && placement) {
      const sectionOf = new Map(placement.questions.map((q) => [q.id, q.section]));
      for (const [key, label] of [
        ["reading", "Reading comprehension"],
        ["language", "Grammar & vocabulary"],
      ] as const) {
        const rows = outcomes.data.filter((outcome) => sectionOf.get(outcome.id) === key);
        if (rows.length) {
          sections.push({
            label,
            correct: rows.filter((row) => row.correct).length,
            total: rows.length,
          });
        }
      }
    }
  }

  const steps: PlanStep[] = [];

  // 1. Anything with no result at all comes first — a plan can't prioritise what it
  //    can't see, so establishing a baseline outranks refining a known weakness.
  for (const entry of perSkill) {
    if (entry.band !== null || steps.length >= 2) continue;
    if (entry.skill === "WRITING" || entry.skill === "SPEAKING") continue;

    const test = await suggestTest(entry.skill, attemptedIds);
    if (!test) continue;
    steps.push({
      id: `baseline-${entry.skill}`,
      title: `Set a ${SKILL_LABELS[entry.skill]} baseline`,
      reason: `You have no ${SKILL_LABELS[entry.skill].toLowerCase()} band recorded yet, so the plan can't tell whether it's holding you back.`,
      href: `${SKILL_INDEX[entry.skill]}/${test.slug}`,
      cta: `Take ${test.title}`,
    });
  }

  // 2. The diagnostic's two halves rarely score alike, and the weaker half says which
  //    kind of study helps: comprehension technique, or the language underneath it.
  const readingSection = sections.find((s) => s.label.startsWith("Reading"));
  const languageSection = sections.find((s) => s.label.startsWith("Grammar"));
  if (readingSection && languageSection) {
    const readingRate = readingSection.correct / readingSection.total;
    const languageRate = languageSection.correct / languageSection.total;

    if (languageRate < 0.7 && languageRate < readingRate) {
      steps.push({
        id: "diagnostic-language",
        title: "Shore up grammar and vocabulary",
        reason: `Your diagnostic split ${readingSection.correct}/${readingSection.total} on comprehension but ${languageSection.correct}/${languageSection.total} on grammar and vocabulary — the language is costing you more than the reading.`,
        href: "/ielts/grammar-tests",
        cta: "Practise grammar",
      });
    } else if (readingRate < 0.7 && readingRate < languageRate) {
      steps.push({
        id: "diagnostic-reading",
        title: "Work on reading technique",
        reason: `Your diagnostic split ${languageSection.correct}/${languageSection.total} on grammar and vocabulary but ${readingSection.correct}/${readingSection.total} on comprehension — the language is there, the technique needs work.`,
        href: "/ielts/tips/skill/reading",
        cta: "Read the technique guides",
      });
    }
  }

  // 3. The weakest question type, but only where enough questions have been answered
  //    for the figure to mean anything.
  const weakType = analytics.byQuestionType.find(
    (row) => row.total >= MIN_QUESTIONS_TO_JUDGE && row.accuracy < 0.7,
  );
  if (weakType) {
    steps.push({
      id: "weak-type",
      title: `Drill ${weakType.label.toLowerCase()} questions`,
      reason: `You've answered ${weakType.correct} of ${weakType.total} ${weakType.label.toLowerCase()} questions correctly — your weakest type so far.`,
      href: "/ielts/mini-exercises",
      cta: "Practise this type",
    });
  }

  // 4. Writing and Speaking carry no band without an evaluation, so the step is to
  //    produce something and have it marked, not to "improve" an unmeasured skill.
  for (const skill of ["WRITING", "SPEAKING"] as const) {
    const entry = perSkill.find((row) => row.skill === skill)!;
    if (entry.band !== null) continue;
    const test = await suggestTest(skill, attemptedIds);
    if (!test) continue;
    steps.push({
      id: `evaluate-${skill}`,
      title: `Get your ${SKILL_LABELS[skill]} marked`,
      reason: `${SKILL_LABELS[skill]} has no band because it can't be scored automatically — write or record an answer, then have it evaluated.`,
      href: `${SKILL_INDEX[skill]}/${test.slug}`,
      cta: `Start ${test.title}`,
    });
  }

  // 5. A wide gap is a content problem rather than a practice problem.
  if (gap !== null && gap >= 1 && weakestMeasured) {
    steps.push({
      id: "close-gap",
      title: `Work on ${SKILL_LABELS[weakestMeasured.skill]} technique`,
      reason: `Your weakest measured skill is ${SKILL_LABELS[weakestMeasured.skill].toLowerCase()} at band ${weakestMeasured.band}, ${gap} below your target of ${targetBand}.`,
      href: `/ielts/tips/skill/${weakestMeasured.skill.toLowerCase()}`,
      cta: "Read the technique guides",
    });
  }

  // 6. Once every skill has a band, the useful next move is a full sitting.
  if (measured.length === SKILLS.length) {
    steps.push({
      id: "simulation",
      title: "Sit a full simulation",
      reason: "All four skills have a band, so the next thing to test is stamina and timing across a whole sitting.",
      href: "/simulation",
      cta: "Choose a sitting",
    });
  }

  return {
    targetBand,
    placementBand: placementRow?.bandScore ?? null,
    placementAt: placementRow?.completedAt ?? null,
    sections,
    perSkill,
    gap,
    steps,
  };
}
