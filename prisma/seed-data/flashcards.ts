/**
 * Flashcard decks (site-build-prompt.md section 5, "Flashcards system", and section 6,
 * "spaced-repetition prompts").
 *
 * The cards used to be a hard-coded array inside the deck component, which meant they could
 * not be scheduled, counted, or added to without a deploy. They are content now, seeded like
 * everything else.
 *
 * `key` is what a learner's review history is stored against, so it must never be reused for
 * a different card or changed once seeded — reordering a deck or inserting a card is then
 * free. Definitions are written here rather than pulled from the dictionary API: the API is
 * for looking a word up mid-passage, and a card wants one short exam-usable sense, not a
 * full entry.
 */

export type FlashcardSeed = {
  key: string;
  front: string;
  back: string;
  /** One sentence showing the word doing its job in an IELTS-style answer. */
  example: string;
};

export type FlashcardDeckSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    description: string;
    cards: FlashcardSeed[];
  };
};

export const FLASHCARD_DECKS: FlashcardDeckSeed[] = [
  {
    slug: "academic-vocabulary-essentials",
    title: "Academic vocabulary essentials",
    topic: "Vocabulary",
    tags: ["flashcards", "vocabulary", "writing", "speaking"],
    data: {
      description:
        "Words that carry weight in Task 2 essays and Part 3 answers, with the sense the exam actually rewards.",
      cards: [
        {
          key: "ubiquitous",
          front: "Ubiquitous",
          back: "Found everywhere; so common it is taken for granted.",
          example: "Smartphones have become ubiquitous, even in low-income households.",
        },
        {
          key: "ambiguous",
          front: "Ambiguous",
          back: "Open to more than one interpretation; not clearly one thing or the other.",
          example: "The evidence on screen time is ambiguous rather than damning.",
        },
        {
          key: "meticulous",
          front: "Meticulous",
          back: "Extremely careful about detail.",
          example: "Meticulous planning is what separates a finished essay from an unfinished one.",
        },
        {
          key: "pragmatic",
          front: "Pragmatic",
          back: "Guided by what works in practice rather than by theory.",
          example: "A pragmatic solution would be to fund buses before building railways.",
        },
        {
          key: "substantial",
          front: "Substantial",
          back: "Large enough to matter.",
          example: "There has been a substantial rise in remote working since 2020.",
        },
        {
          key: "inevitable",
          front: "Inevitable",
          back: "Certain to happen; impossible to prevent.",
          example: "Some job losses are inevitable when an industry automates.",
        },
        {
          key: "controversial",
          front: "Controversial",
          back: "Causing public disagreement.",
          example: "Charging tuition fees remains controversial in several countries.",
        },
        {
          key: "consensus",
          front: "Consensus",
          back: "General agreement across a group.",
          example: "There is no consensus among economists on the effect of the policy.",
        },
        {
          key: "feasible",
          front: "Feasible",
          back: "Possible to do with the resources available.",
          example: "Cycling to work is only feasible where the infrastructure exists.",
        },
        {
          key: "detrimental",
          front: "Detrimental",
          back: "Causing harm or damage.",
          example: "Long commutes are detrimental to both health and family life.",
        },
        {
          key: "prevalent",
          front: "Prevalent",
          back: "Widespread in a particular place or time.",
          example: "Obesity is more prevalent in countries where processed food is cheapest.",
        },
        {
          key: "compelling",
          front: "Compelling",
          back: "Convincing enough to be hard to argue against.",
          example: "There is a compelling case for teaching financial literacy in schools.",
        },
        {
          key: "mitigate",
          front: "Mitigate",
          back: "To make something bad less severe — not to remove it.",
          example: "Planting trees mitigates flooding; it does not prevent it.",
        },
        {
          key: "exacerbate",
          front: "Exacerbate",
          back: "To make a bad situation worse.",
          example: "Building more roads can exacerbate congestion rather than relieve it.",
        },
        {
          key: "undermine",
          front: "Undermine",
          back: "To weaken something gradually, often indirectly.",
          example: "Constant testing can undermine a child's confidence in the subject.",
        },
        {
          key: "advocate",
          front: "Advocate",
          back: "To publicly recommend something. (As a noun: someone who does.)",
          example: "Few economists advocate abolishing the tax outright.",
        },
        {
          key: "implement",
          front: "Implement",
          back: "To put a plan or policy into practice.",
          example: "The rule was announced in 2019 but not implemented until 2022.",
        },
        {
          key: "allocate",
          front: "Allocate",
          back: "To set aside a share of something for a purpose.",
          example: "Governments should allocate more funding to preventative healthcare.",
        },
        {
          key: "disparity",
          front: "Disparity",
          back: "A noticeable and usually unfair difference.",
          example: "The disparity between urban and rural schools has widened.",
        },
        {
          key: "incentive",
          front: "Incentive",
          back: "Something that makes a course of action worth taking.",
          example: "Tax breaks give companies an incentive to train their own staff.",
        },
        {
          key: "constraint",
          front: "Constraint",
          back: "A limit on what can be done.",
          example: "Time is the binding constraint in Task 2, not vocabulary.",
        },
        {
          key: "viable",
          front: "Viable",
          back: "Capable of working successfully over time.",
          example: "Nuclear power is a viable alternative where sunlight is scarce.",
        },
        {
          key: "arbitrary",
          front: "Arbitrary",
          back: "Decided by preference rather than by reason or rule.",
          example: "The age limit looks arbitrary, since no evidence supports that exact figure.",
        },
        {
          key: "credible",
          front: "Credible",
          back: "Believable enough to be taken seriously.",
          example: "The report is credible because its data can be checked independently.",
        },
        {
          key: "vulnerable",
          front: "Vulnerable",
          back: "Easily harmed, and usually least able to protect itself.",
          example: "Coastal communities are the most vulnerable to rising sea levels.",
        },
        {
          key: "sustainable",
          front: "Sustainable",
          back: "Able to continue at the same level without exhausting what it depends on.",
          example: "Tourism is only sustainable if the reef survives the visitors.",
        },
        {
          key: "negligible",
          front: "Negligible",
          back: "So small it can reasonably be ignored.",
          example: "The cost per household would be negligible — a few pounds a year.",
        },
        {
          key: "profound",
          front: "Profound",
          back: "Very great; reaching deep into something.",
          example: "The internet has had a profound effect on how people read.",
        },
        {
          key: "deteriorate",
          front: "Deteriorate",
          back: "To get worse over time.",
          example: "Air quality deteriorated sharply as the city grew.",
        },
        {
          key: "reinforce",
          front: "Reinforce",
          back: "To strengthen something that already exists.",
          example: "Advertising reinforces the stereotypes it claims merely to reflect.",
        },
      ],
    },
  },
];
