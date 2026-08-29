/**
 * The placement diagnostic behind the Learning Path (site-build-prompt.md section 5,
 * "short adaptive test that scores the learner and generates a Learning Path").
 *
 * Deliberately reading comprehension plus grammar and vocabulary, and nothing else.
 * Listening audio isn't wired up on this site (the tests carry a transcript and say so),
 * so a "listening" diagnostic would really be measuring reading; Writing and Speaking
 * can't be scored without an AI evaluation, which the diagnostic must not depend on.
 * What this measures it measures honestly, and the plan is explicit about the rest.
 *
 * Stored as a MINI_EXERCISE with taskType "placement", so it needs no new content type.
 */

export type PlacementQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  /** Sub-skill, carried into Progress.details so it joins the existing analytics. */
  type: string;
  /** Which half of the diagnostic this belongs to, for the per-section breakdown. */
  section: "reading" | "language";
};

export const PLACEMENT_PASSAGE = `Night Shift

For most of human history, the working day ended when the light did. Artificial lighting
changed that, and by the middle of the twentieth century a substantial minority of workers
in industrialised countries were doing at least part of their work after dark. Today
somewhere around one in five employees in such economies works outside standard daytime
hours.

The appeal to employers is obvious: expensive equipment sits idle overnight, and demand for
services such as healthcare and transport does not stop at six in the evening. The appeal to
workers is more mixed. Night shifts usually pay a premium, and for people with caring
responsibilities during the day they can be the only practical option. Yet the costs are
becoming harder to ignore.

The human body runs on an internal clock that is set largely by exposure to light. Working
against that clock does not simply make people tired; it appears to disturb the timing of
processes as varied as digestion, hormone release and the repair of damaged cells.
Researchers have repeatedly found higher rates of several chronic conditions among long-term
shift workers, though disentangling the effect of the shifts themselves from the effects of
the diet, stress and disrupted sleep that often accompany them has proved difficult.

Some employers have responded by redesigning rotas rather than abolishing them. Rotating
shifts forward — morning, then afternoon, then night — seems to be tolerated better than
rotating them backwards, and giving workers longer blocks of the same shift allows the body
clock at least a partial adjustment. Neither measure removes the problem. They do suggest,
however, that how a shift system is organised may matter nearly as much as whether it exists
at all.`;

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  {
    id: "p1",
    question: "What does the passage give as a reason employers value night working?",
    options: [
      "It is cheaper per hour than daytime work",
      "Costly equipment would otherwise stand unused overnight",
      "Workers concentrate better after dark",
      "It reduces the total number of staff required",
    ],
    correctIndex: 1,
    type: "Specific detail",
    section: "reading",
  },
  {
    id: "p2",
    question: "According to the passage, what mainly sets the body's internal clock?",
    options: ["Meal times", "Physical activity", "Exposure to light", "Air temperature"],
    correctIndex: 2,
    type: "Specific detail",
    section: "reading",
  },
  {
    id: "p3",
    question:
      "Why does the passage say researchers have found it hard to prove night work causes chronic illness?",
    options: [
      "Too few people work night shifts to study",
      "Shift workers rarely agree to take part in research",
      "Other factors that travel with shift work are difficult to separate out",
      "The illnesses concerned appear only after retirement",
    ],
    correctIndex: 2,
    type: "Inference",
    section: "reading",
  },
  {
    id: "p4",
    question: "In the final paragraph, 'Neither measure removes the problem' suggests that:",
    options: [
      "The two rota changes described help but do not solve the underlying issue",
      "Both rota changes have been abandoned by employers",
      "Rotating shifts forward is no better than rotating them backwards",
      "The problem has been overstated by researchers",
    ],
    correctIndex: 0,
    type: "Inference",
    section: "reading",
  },
  {
    id: "p5",
    question: "Which best states the overall purpose of the passage?",
    options: [
      "To argue that night shifts should be banned",
      "To describe why night work persists and what is known about its effects",
      "To compare shift patterns in different countries",
      "To advise workers on how to sleep better",
    ],
    correctIndex: 1,
    type: "Main idea",
    section: "reading",
  },
  {
    id: "p6",
    question: "In this passage, 'disentangling' is closest in meaning to:",
    options: ["measuring precisely", "separating out", "exaggerating", "ignoring"],
    correctIndex: 1,
    type: "Vocabulary in context",
    section: "reading",
  },
  {
    id: "p7",
    question: "By the time the results were published, the research team ___ for six years.",
    options: ["works", "has worked", "had been working", "is working"],
    correctIndex: 2,
    type: "Tenses",
    section: "language",
  },
  {
    id: "p8",
    question: "The council refused to grant permission, ___ delayed the project by a year.",
    options: ["which", "that", "what", "who"],
    correctIndex: 0,
    type: "Relative clauses",
    section: "language",
  },
  {
    id: "p9",
    question: "___ the cost, the scheme would almost certainly have gone ahead.",
    options: ["Except", "Despite", "Had it not been for", "Unless"],
    correctIndex: 2,
    type: "Conditionals",
    section: "language",
  },
  {
    id: "p10",
    question: "The government has come under increasing ___ to reverse the decision.",
    options: ["pressure", "force", "strength", "weight"],
    correctIndex: 0,
    type: "Collocation",
    section: "language",
  },
  {
    id: "p11",
    question:
      "The trial was halted early. ___, the drug is now unlikely to reach the market this decade.",
    options: ["Nevertheless", "Consequently", "Similarly", "Meanwhile"],
    correctIndex: 1,
    type: "Linking words",
    section: "language",
  },
  {
    id: "p12",
    question: "Little ___ that the decision would prove so controversial.",
    options: [
      "the committee expected",
      "did the committee expect",
      "the committee did expect",
      "expected the committee",
    ],
    correctIndex: 1,
    type: "Inversion",
    section: "language",
  },
];

export const PLACEMENT_SEED = {
  slug: "placement-diagnostic",
  title: "Placement diagnostic",
  topic: "Placement",
  tags: ["placement", "diagnostic", "reading", "grammar", "vocabulary"],
  data: {
    passage: PLACEMENT_PASSAGE,
    questions: PLACEMENT_QUESTIONS,
  },
};
