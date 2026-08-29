export type NavLink = {
  label: string;
  href: string;
};

export type NavColumn = {
  heading: string;
  links: NavLink[];
};

export type NavItem =
  | { type: "link"; label: string; href: string }
  | { type: "mega"; label: string; columns: NavColumn[] };

export const NAV_ITEMS: NavItem[] = [
  {
    type: "mega",
    label: "Exam Library",
    columns: [
      {
        heading: "Test collection",
        links: [
          { label: "All tests", href: "/exam-library" },
          { label: "Listening tests", href: "/exam-library?skill=listening" },
          { label: "Reading tests", href: "/exam-library?skill=reading" },
          { label: "Writing tests", href: "/exam-library?skill=writing" },
          { label: "Speaking tests", href: "/exam-library?skill=speaking" },
        ],
      },
      {
        heading: "By variant",
        links: [
          { label: "Academic tests", href: "/exam-library?variant=academic" },
          { label: "General Training tests", href: "/exam-library?variant=general-training" },
        ],
      },
    ],
  },
  {
    type: "mega",
    label: "Tips",
    columns: [
      {
        heading: "Tips by skill",
        links: [
          { label: "All tips", href: "/ielts/tips" },
          { label: "Listening tips", href: "/ielts/tips/skill/listening" },
          { label: "Reading tips", href: "/ielts/tips/skill/reading" },
          { label: "Writing tips", href: "/ielts/tips/skill/writing" },
          { label: "Speaking tips", href: "/ielts/tips/skill/speaking" },
        ],
      },
      {
        heading: "Sample answers",
        links: [
          { label: "Band-9 samples", href: "/ielts/band-9-samples" },
          { label: "User-submitted answers", href: "/ielts/submitted-answers" },
        ],
      },
      {
        heading: "Reference",
        links: [
          { label: "Reading & listening answer keys", href: "/ielts/answer-keys" },
          { label: "Recurring exam topics", href: "/ielts/forecasts" },
        ],
      },
    ],
  },
  {
    type: "mega",
    label: "Practice",
    columns: [
      {
        heading: "Skills practice",
        links: [
          { label: "Writing exercises", href: "/writing-exercises" },
          { label: "AI conversations", href: "/ai-conversations" },
          { label: "Pronunciation", href: "/pronunciation" },
          { label: "Dictation & shadowing", href: "/dictation-shadowing" },
          { label: "Video lessons", href: "/video-lessons" },
        ],
      },
      {
        heading: "Quick practice",
        links: [
          { label: "Flashcards", href: "/flashcards" },
          { label: "Mini exercises", href: "/ielts/mini-exercises" },
          { label: "Grammar tests", href: "/ielts/grammar-tests" },
          { label: "Daily exam & leaderboard", href: "/ielts/daily-challenge" },
        ],
      },
    ],
  },
  { type: "link", label: "Live Lessons", href: "/live-lessons" },
  { type: "link", label: "Topic Banks", href: "/topics" },
  { type: "link", label: "Courses", href: "/courses" },
  {
    type: "mega",
    label: "Tools",
    columns: [
      {
        heading: "Writing tools",
        links: [
          { label: "Task 1 Academic report checker", href: "/tools/writing-task1-academic-checker" },
          { label: "Task 1 General letter checker", href: "/tools/writing-task1-general-checker" },
          { label: "Task 2 essay checker", href: "/tools/writing-task2-checker" },
          { label: "Text improver", href: "/tools/text-improver" },
        ],
      },
      {
        heading: "Speaking tools",
        links: [
          // One page covers Parts 1-3 via its own selector, so this is a single
          // entry — the per-part hrefs it used to list were never routes.
          { label: "Speaking answer checker", href: "/tools/speaking-part1-checker" },
          { label: "Text-to-speech generator", href: "/tools/text-to-speech" },
        ],
      },
      {
        heading: "Language tools",
        links: [
          { label: "Paraphraser", href: "/tools/paraphraser" },
          { label: "Sentence explainer", href: "/tools/sentence-explainer" },
          { label: "Summarizer", href: "/tools/summarizer" },
          { label: "Translator", href: "/tools/translator" },
          { label: "Grammar checker", href: "/tools/grammar-checker" },
        ],
      },
      {
        heading: "Band calculators",
        links: [
          { label: "Overall band calculator", href: "/tools/band-calculator/overall" },
          { label: "Listening band calculator", href: "/tools/band-calculator/listening" },
          { label: "Reading band calculator", href: "/tools/band-calculator/reading" },
          { label: "Writing band calculator", href: "/tools/band-calculator/writing" },
          { label: "Speaking band calculator", href: "/tools/band-calculator/speaking" },
        ],
      },
    ],
  },
];
