/**
 * The grammar library (site-build-prompt.md section 4b: "grammar library organised by
 * point rather than as tests").
 *
 * Grammar already existed here only as quizzes, which test whether you know a rule but
 * never state it. Each entry below explains one point, shows the mistake it actually
 * causes, and — where a quiz exists for it — links to that quiz as practice.
 *
 * Stored as ARTICLE with taskType "grammar-point", the same split-by-taskType pattern
 * topic pools and topic banks already use, so no schema change is needed.
 *
 * `practiceSlug` must match a slug in GRAMMAR_TESTS; the loader drops it if the quiz has
 * gone, so a renamed test degrades to "no practice link" rather than a dead link.
 */

export type GrammarExample = {
  /** The version a learner typically writes. Omitted where there's no single common error. */
  wrong?: string;
  right: string;
  note?: string;
};

export type GrammarPointSeed = {
  slug: string;
  title: string;
  category: string;
  /** One line, used on the index cards. */
  summary: string;
  explanation: string[];
  examples: GrammarExample[];
  /** Why this costs marks, tied to a real IELTS criterion. */
  ieltsNote: string;
  practiceSlug?: string;
  tags: string[];
};

export const GRAMMAR_POINTS: GrammarPointSeed[] = [
  {
    slug: "present-perfect-and-past-simple",
    title: "Present perfect and past simple",
    category: "Tenses",
    summary: "Finished time takes the past simple; unfinished or unstated time takes the present perfect.",
    explanation: [
      "The past simple places an action inside a finished period of time: yesterday, in 2019, last summer. If the time period is over, the past simple is the only correct choice.",
      "The present perfect connects the past to now. Use it when the time period is still open (this year, since April), when the time is not stated at all, or when the result rather than the event is the point.",
      "The clue is usually the time expression, not the action. 'I lived in Rome' and 'I have lived in Rome' are both correct English — they answer different questions.",
    ],
    examples: [
      {
        wrong: "I have visited Paris last year.",
        right: "I visited Paris last year.",
        note: "'Last year' is finished, so the present perfect cannot be used with it.",
      },
      {
        wrong: "I am living here since 2020.",
        right: "I have lived here since 2020.",
        note: "'Since' marks a period running up to now — present perfect, not present continuous.",
      },
      {
        right: "The government has introduced three reforms this decade.",
        note: "The decade is still running, so the period is open.",
      },
    ],
    ieltsNote:
      "This is the single most common tense error in Task 2 essays. Because it recurs across a whole essay rather than appearing once, it reads as a systematic error and pulls down Grammatical Range and Accuracy.",
    practiceSlug: "present-perfect-vs-past-simple",
    tags: ["grammar", "tenses", "writing"],
  },
  {
    slug: "articles-a-an-the-and-zero",
    title: "Articles: a, an, the, and none at all",
    category: "Articles",
    summary: "Use 'a/an' to introduce, 'the' to refer back or to something unique, and no article for general plurals and uncountables.",
    explanation: [
      "Use 'a' or 'an' the first time you mention a countable singular noun: the reader does not yet know which one you mean.",
      "Use 'the' once it is clear which one you mean — because you have already mentioned it, because there is only one, or because the phrase itself narrows it down ('the cost of housing').",
      "Use no article at all to talk about things in general with plural or uncountable nouns. This is the rule most often missed, because many languages use a definite article here.",
    ],
    examples: [
      {
        wrong: "The children learn faster than the adults.",
        right: "Children learn faster than adults.",
        note: "A general statement about all children takes no article.",
      },
      {
        wrong: "Government should invest in education.",
        right: "The government should invest in education.",
        note: "A specific government, known from context — 'the' is required.",
      },
      {
        right: "A study found that the results were inconclusive.",
        note: "'A study' introduces it; 'the results' refers back to that study's results.",
      },
    ],
    ieltsNote:
      "Article errors rarely stop an examiner understanding you, so they don't hurt Task Response — but a band 7 descriptor asks for frequent error-free sentences, and articles are what usually stop a sentence being error-free.",
    practiceSlug: "definite-indefinite-articles",
    tags: ["grammar", "articles", "writing"],
  },
  {
    slug: "conditionals",
    title: "Conditionals",
    category: "Conditionals",
    summary: "First for real future possibilities, second for hypothetical ones, third for the unchangeable past.",
    explanation: [
      "First conditional — 'if' + present simple, then 'will': a realistic future possibility. 'If governments act now, emissions will fall.'",
      "Second conditional — 'if' + past simple, then 'would': hypothetical or unlikely. 'If governments acted now, emissions would fall.' The past tense signals distance from reality, not past time.",
      "Third conditional — 'if' + past perfect, then 'would have': a past that cannot now be changed. 'If governments had acted, emissions would have fallen.'",
      "The most frequent error is mixing the halves — putting 'will' in the 'if' clause.",
    ],
    examples: [
      {
        wrong: "If the policy will succeed, unemployment will fall.",
        right: "If the policy succeeds, unemployment will fall.",
        note: "The 'if' clause takes the present simple even though it refers to the future.",
      },
      {
        wrong: "If I would have more time, I would study abroad.",
        right: "If I had more time, I would study abroad.",
      },
    ],
    ieltsNote:
      "Conditionals are one of the cheapest ways to show grammatical range in Task 2 and Speaking Part 3, because hypothetical questions invite them naturally. Using one correctly is worth more than using three shakily.",
    practiceSlug: "first-second-conditionals",
    tags: ["grammar", "conditionals", "speaking", "writing"],
  },
  {
    slug: "prepositions-of-time-and-place",
    title: "Prepositions of time and place",
    category: "Prepositions",
    summary: "In for the large and enclosed, on for surfaces and days, at for points.",
    explanation: [
      "Time: 'at' for clock times, 'on' for days and dates, 'in' for months, years, seasons and centuries. The unit gets larger as you move at → on → in.",
      "Place: 'at' for a point or an address, 'on' for a surface or a line, 'in' for an enclosed area or a volume.",
      "Many prepositions in English are fixed by the word before them rather than by logic — 'depend on', 'interested in', 'an increase in'. These have to be learned as pairs.",
    ],
    examples: [
      {
        wrong: "There was a sharp increase of unemployment.",
        right: "There was a sharp increase in unemployment.",
        note: "'Increase' takes 'in' for what rose, and 'of' only for the amount: an increase of 5%.",
      },
      {
        wrong: "I will meet you in Monday morning.",
        right: "I will meet you on Monday morning.",
      },
    ],
    ieltsNote:
      "Task 1 leans heavily on a small set of these: an increase in, a fall of, compared with, between X and Y. Getting that handful right removes most preposition errors from a Task 1 report.",
    practiceSlug: "prepositions-time-place",
    tags: ["grammar", "prepositions", "task1"],
  },
  {
    slug: "relative-clauses",
    title: "Relative clauses",
    category: "Sentence structure",
    summary: "Join two ideas into one sentence with who, which, that, whose or where.",
    explanation: [
      "A defining relative clause identifies which one you mean and takes no commas: 'Students who study abroad often adapt quickly.' Remove it and the sentence changes meaning.",
      "A non-defining clause adds extra information about something already identified, and needs commas: 'My university, which was founded in 1890, is small.' 'That' cannot be used here.",
      "Use 'which' to refer to a whole preceding idea: 'Fees have risen sharply, which has priced out poorer applicants.'",
    ],
    examples: [
      {
        wrong: "The report, that was published in May, criticised the scheme.",
        right: "The report, which was published in May, criticised the scheme.",
        note: "'That' is not used in non-defining clauses.",
      },
      {
        right: "People who cycle to work report lower stress levels.",
        note: "Defining — it specifies which people, so no commas.",
      },
    ],
    ieltsNote:
      "Complex sentences are explicitly named in the band 6+ descriptors for Grammatical Range. A relative clause is the most natural way to produce one without the sentence becoming hard to follow.",
    tags: ["grammar", "sentence-structure", "writing"],
  },
  {
    slug: "the-passive-voice",
    title: "The passive voice",
    category: "Sentence structure",
    summary: "Use it when the action matters more than who performed it.",
    explanation: [
      "Form the passive with 'be' plus the past participle: 'The data were collected in March.'",
      "Use it when the doer is unknown, obvious, or unimportant — which is often the case in academic and process writing.",
      "Do not use it everywhere. A whole essay in the passive becomes vague and harder to read, and examiners notice the padding.",
    ],
    examples: [
      {
        right: "The bottles are then washed and sterilised.",
        note: "Task 1 process diagrams are the clearest legitimate use: nobody cares who washes them.",
      },
      {
        wrong: "It is believed by me that fees should be abolished.",
        right: "I believe fees should be abolished.",
        note: "Passivising your own opinion adds words and removes clarity.",
      },
    ],
    ieltsNote:
      "In Task 1 process questions the passive is close to required. In Task 2 it is a tool, not a style — overusing it costs you on Coherence rather than gaining you anything on Range.",
    tags: ["grammar", "sentence-structure", "task1"],
  },
  {
    slug: "subject-verb-agreement",
    title: "Subject–verb agreement",
    category: "Accuracy",
    summary: "The verb agrees with the real subject, not with the nearest noun.",
    explanation: [
      "When a phrase separates the subject from its verb, the verb still agrees with the subject: 'The number of students has risen', not 'have risen'.",
      "'Each', 'every', 'one of' and 'neither' take a singular verb, however plural the following noun looks.",
      "Uncountable nouns that are plural in many other languages — information, advice, research, equipment — are singular in English.",
    ],
    examples: [
      {
        wrong: "The range of options available to students are limited.",
        right: "The range of options available to students is limited.",
        note: "The subject is 'the range', not 'students'.",
      },
      {
        wrong: "Researches show that sleep affects memory.",
        right: "Research shows that sleep affects memory.",
      },
    ],
    ieltsNote:
      "These errors cluster in exactly the long, complex sentences learners write to show range — so the attempt to reach band 7 is what produces them. Reread long sentences and check the verb against the head noun.",
    tags: ["grammar", "accuracy", "writing"],
  },
  {
    slug: "countable-and-uncountable-nouns",
    title: "Countable and uncountable nouns",
    category: "Nouns",
    summary: "Uncountable nouns take no plural -s and no 'a', and use much/less rather than many/fewer.",
    explanation: [
      "Uncountable nouns name a mass rather than separate items: information, advice, knowledge, traffic, equipment, homework, research, money.",
      "They take a singular verb, never 'a/an', and never a plural -s. To count them, use a unit: 'a piece of advice', 'two items of equipment'.",
      "Use 'much', 'little' and 'less' with uncountables; 'many', 'few' and 'fewer' with countables.",
    ],
    examples: [
      {
        wrong: "He gave me some useful advices.",
        right: "He gave me some useful advice.",
      },
      {
        wrong: "There were less applicants this year.",
        right: "There were fewer applicants this year.",
        note: "'Applicants' is countable, so 'fewer'.",
      },
    ],
    ieltsNote:
      "This is a Lexical Resource issue as much as a grammar one: 'informations' signals a learner reaching for academic vocabulary without control of it, which is precisely what the band 6 descriptor describes.",
    tags: ["grammar", "nouns", "vocabulary"],
  },
  {
    slug: "linking-words-and-cohesion",
    title: "Linking words and cohesion",
    category: "Cohesion",
    summary: "Link ideas because they are related, not to decorate the sentence.",
    explanation: [
      "Linking words signal a relationship: contrast (however, whereas), addition (moreover, in addition), result (therefore, consequently), example (for instance).",
      "'However' and 'although' are not interchangeable. 'However' joins two sentences and takes a comma; 'although' joins two clauses inside one sentence.",
      "Cohesion is not only linking words. Pronouns, synonyms and repeated key nouns hold a paragraph together at least as much, and read far more naturally.",
    ],
    examples: [
      {
        wrong: "Although, the policy was expensive. However it worked.",
        right: "Although the policy was expensive, it worked.",
        note: "'Although' joins two clauses in one sentence and takes no comma after it.",
      },
      {
        wrong: "Firstly, moreover, in addition, finally, the cost is high.",
        right: "The cost is also high.",
        note: "Stacking connectives is a band 5–6 marker, not a band 7 one.",
      },
    ],
    ieltsNote:
      "The Coherence and Cohesion descriptors penalise mechanical overuse explicitly. Fewer, better-chosen links score higher than one at the start of every sentence.",
    tags: ["grammar", "cohesion", "writing"],
  },
  {
    slug: "comparatives-and-superlatives",
    title: "Comparatives and superlatives",
    category: "Comparison",
    summary: "The language Task 1 runs on — bigger than, the largest, twice as many as.",
    explanation: [
      "Short adjectives add -er/-est; longer ones take more/most. Never both: 'more bigger' is a common and very visible error.",
      "Comparatives take 'than'; superlatives take 'the' and usually a group: 'the highest of the four countries'.",
      "For proportions, 'twice as many as' and 'half as many as' are more precise than 'much more', and Task 1 rewards precision.",
    ],
    examples: [
      {
        wrong: "The figure for China was more higher than India.",
        right: "The figure for China was higher than that for India.",
        note: "Two errors: doubled comparative, and comparing a figure to a country.",
      },
      {
        right: "Spain recorded the steepest decline of the five countries.",
      },
    ],
    ieltsNote:
      "Task 1 is comparison from start to finish. Comparing the wrong things — a figure with a country, one year with a category — is a Task Achievement problem, not just a grammar one.",
    tags: ["grammar", "comparison", "task1"],
  },
];
