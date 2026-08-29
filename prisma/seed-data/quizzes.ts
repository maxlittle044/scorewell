import type { QuizQuestion } from "./reading";

export type QuizSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: { questions: QuizQuestion[] };
};

/** Stored as MINI_EXERCISE with taskType "grammar-test". */
export const GRAMMAR_TESTS: QuizSeed[] = [
  {
    slug: "present-perfect-vs-past-simple",
    title: "Present perfect vs. past simple",
    topic: "Tenses",
    tags: ["grammar", "tenses", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "I ___ in London since 2019.",
          options: ["live", "lived", "have lived", "am living"],
          correctIndex: 2,
        },
        {
          id: "q2",
          question: "She ___ to Japan three times this year.",
          options: ["went", "has gone", "goes", "was going"],
          correctIndex: 1,
        },
        {
          id: "q3",
          question: "We ___ the film last night and really enjoyed it.",
          options: ["have watched", "watched", "have been watching", "watch"],
          correctIndex: 1,
        },
        {
          id: "q4",
          question: "___ you ever ___ sushi?",
          options: ["Did / eat", "Have / eaten", "Do / eat", "Are / eating"],
          correctIndex: 1,
        },
        {
          id: "q5",
          question: "He ___ his keys, so he can't get into the flat.",
          options: ["lost", "has lost", "was losing", "loses"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    slug: "first-second-conditionals",
    title: "First and second conditionals",
    topic: "Conditionals",
    tags: ["grammar", "conditionals", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "If it ___ tomorrow, we'll cancel the picnic.",
          options: ["rains", "will rain", "rained", "would rain"],
          correctIndex: 0,
        },
        {
          id: "q2",
          question: "If I ___ rich, I would travel the world.",
          options: ["am", "was being", "were", "will be"],
          correctIndex: 2,
        },
        {
          id: "q3",
          question: "She ___ the job if she applies now.",
          options: ["would get", "will get", "got", "gets"],
          correctIndex: 1,
        },
        {
          id: "q4",
          question: "If you studied harder, you ___ better results.",
          options: ["will get", "get", "would get", "have got"],
          correctIndex: 2,
        },
        {
          id: "q5",
          question: "Which sentence describes a realistic future possibility?",
          options: [
            "If I won the lottery, I'd buy a house.",
            "If I finish early, I'll call you.",
            "If I were you, I'd apologise.",
            "If I had wings, I'd fly.",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    slug: "definite-indefinite-articles",
    title: "Definite and indefinite articles",
    topic: "Articles",
    tags: ["grammar", "articles", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "She works as ___ engineer at a tech company.",
          options: ["a", "an", "the", "no article"],
          correctIndex: 1,
        },
        {
          id: "q2",
          question: "___ Sun rises in the east.",
          options: ["A", "An", "The", "No article"],
          correctIndex: 2,
        },
        {
          id: "q3",
          question: "I love ___ music, especially jazz.",
          options: ["a", "an", "the", "no article"],
          correctIndex: 3,
        },
        {
          id: "q4",
          question: "We stayed at ___ hotel near the station. ___ hotel was excellent.",
          options: ["the / A", "a / The", "an / A", "the / The"],
          correctIndex: 1,
        },
        {
          id: "q5",
          question: "He is ___ most experienced candidate we interviewed.",
          options: ["a", "an", "the", "no article"],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    slug: "prepositions-time-place",
    title: "Prepositions of time and place",
    topic: "Prepositions",
    tags: ["grammar", "prepositions", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "The meeting is ___ Monday morning.",
          options: ["in", "on", "at", "by"],
          correctIndex: 1,
        },
        {
          id: "q2",
          question: "She was born ___ 1998.",
          options: ["on", "at", "in", "since"],
          correctIndex: 2,
        },
        {
          id: "q3",
          question: "I'll meet you ___ the entrance to the museum.",
          options: ["in", "at", "on", "to"],
          correctIndex: 1,
        },
        {
          id: "q4",
          question: "The report must be submitted ___ Friday at the latest.",
          options: ["until", "by", "since", "during"],
          correctIndex: 1,
        },
        {
          id: "q5",
          question: "There's a supermarket ___ the corner of my street.",
          options: ["in", "at", "on", "by"],
          correctIndex: 2,
        },
      ],
    },
  },
];

/** Stored as MINI_EXERCISE with taskType "mini-exercise". */
export const MINI_EXERCISES: QuizSeed[] = [
  {
    slug: "formal-vs-informal-register",
    title: "Word choice: formal vs informal register",
    topic: "Vocabulary",
    tags: ["vocabulary", "register", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: 'Choose the more formal option: "I reckon we should postpone the meeting."',
          options: ["I reckon", "I believe", "I'm thinking"],
          correctIndex: 1,
        },
        {
          id: "q2",
          question: "Which sentence is written in a formal register?",
          options: [
            "Gonna need that report by Friday.",
            "We would appreciate receiving the report by Friday.",
            "Send the report, yeah?",
          ],
          correctIndex: 1,
        },
        {
          id: "q3",
          question: "Choose the informal option.",
          options: [
            "I would like to enquire about...",
            "Just wondering about...",
            "I am writing to enquire about...",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    slug: "articles-practice",
    title: "Articles: a, an, the, or nothing?",
    topic: "Grammar",
    tags: ["grammar", "articles", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: "She bought ___ umbrella because it was raining.",
          options: ["a", "an", "the"],
          correctIndex: 1,
        },
        {
          id: "q2",
          question: "___ water in this bottle tastes strange.",
          options: ["A", "The", "No article"],
          correctIndex: 1,
        },
        {
          id: "q3",
          question: "I enjoy ___ long walks on the beach.",
          options: ["a", "the", "no article"],
          correctIndex: 2,
        },
      ],
    },
  },
  {
    slug: "catch-the-number",
    title: "Catch the number: prices and dates",
    topic: "Listening",
    tags: ["listening", "numbers", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question: 'You hear: "That comes to fifteen pounds fifty." What is the price?',
          options: ["£15.15", "£15.50", "£50.15"],
          correctIndex: 1,
        },
        {
          id: "q2",
          question: 'You hear: "The course starts on the thirtieth of April." What is the date?',
          options: ["13 April", "30 April", "3 April"],
          correctIndex: 1,
        },
        {
          id: "q3",
          question: 'You hear: "Call me on oh-double-seven-one, four-two-three." What is the number?',
          options: ["07714 23", "0771 423", "0774 123"],
          correctIndex: 1,
        },
      ],
    },
  },
  {
    slug: "skimming-main-idea",
    title: "Skimming for the main idea",
    topic: "Reading",
    tags: ["reading", "skimming", "multiple-choice"],
    data: {
      questions: [
        {
          id: "q1",
          question:
            'A paragraph begins: "Although electric vehicles produce no exhaust emissions, the picture is more complicated than it first appears." What will the paragraph most likely go on to discuss?',
          options: [
            "Reasons electric vehicles are entirely emission-free",
            "Hidden environmental costs of electric vehicles",
            "How to buy an electric vehicle cheaply",
          ],
          correctIndex: 1,
        },
        {
          id: "q2",
          question: "When skimming a passage for the main idea, what should you focus on?",
          options: [
            "Every word, in order",
            "Topic sentences and the opening and closing lines of paragraphs",
            "Only the numbers and dates",
          ],
          correctIndex: 1,
        },
        {
          id: "q3",
          question:
            'A paragraph ends: "The results, however, have proved difficult to replicate." What does this suggest about the findings?',
          options: [
            "They are firmly established",
            "Their reliability is in question",
            "They were never published",
          ],
          correctIndex: 1,
        },
      ],
    },
  },
];
