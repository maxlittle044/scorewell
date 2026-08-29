/**
 * Platform announcements (site-build-prompt.md section 4b: "announcements / platform news
 * feed").
 *
 * Every entry describes something that actually shipped and links to it. The honesty rules
 * forbid invented community activity, so this feed does not open with fabricated milestones
 * or user numbers — it opens with the features that genuinely exist, and stays empty of
 * anything we cannot point at.
 *
 * Stored as ARTICLEs split off by taskType "announcement", the pattern tips, topic banks
 * and grammar points already use.
 */

export type AnnouncementSeed = {
  slug: string;
  title: string;
  /** ISO date. Ordering key for the feed, and shown on each entry. */
  date: string;
  /** Short label: what kind of change this is. */
  kind: "New" | "Improved" | "Fixed";
  body: string[];
  link?: { href: string; label: string };
  tags: string[];
};

export const ANNOUNCEMENTS: AnnouncementSeed[] = [
  {
    slug: "announcing-grammar-library",
    title: "A grammar library, organised by point",
    date: "2026-08-29",
    kind: "New",
    body: [
      "Grammar used to live here only as quizzes, which tell you whether you got something right but never explain the rule. There is now a page for each grammar point: what the rule is, the mistake it usually causes, and what it costs you against the band descriptors.",
      "Ten points to start with, covering tenses, articles, conditionals, prepositions, relative clauses, the passive, subject–verb agreement, countable nouns, cohesion and comparatives. Where a quiz already exists for a point, the page links to it as practice.",
    ],
    link: { href: "/ielts/grammar", label: "Browse the grammar library" },
    tags: ["grammar", "content"],
  },
  {
    slug: "announcing-learning-path",
    title: "Learning Path: a study plan built from your own results",
    date: "2026-08-29",
    kind: "New",
    body: [
      "Take a short placement diagnostic, tell us the band you are aiming for, and get an ordered plan for what to do next. It is built from your actual results rather than a generic checklist, and it rebuilds every time you open it, so it never recommends something you have already done.",
      "The diagnostic measures reading comprehension and your grasp of grammar and vocabulary. It says plainly what it did not measure — listening, writing and speaking each get their own step in the plan instead of being guessed at.",
    ],
    link: { href: "/learning-path", label: "Start your Learning Path" },
    tags: ["learning-path", "feature"],
  },
  {
    slug: "announcing-full-simulations",
    title: "Full four-skill simulation sittings",
    date: "2026-08-29",
    kind: "New",
    body: [
      "You can now sit all four skills back to back under a single clock, in the order the real exam runs them. Sections are handed in one at a time and cannot be reopened, and the clock is wall-clock: closing the tab does not pause the exam, and reopening it does not buy you time.",
      "Listening and Reading are marked automatically. Writing and Speaking are saved with the sitting and carry no band until you choose to have them evaluated — an overall band appears only once all four skills have one, because averaging two of them and calling it an overall would overstate what was measured.",
    ],
    link: { href: "/simulation", label: "Choose a sitting" },
    tags: ["simulation", "feature"],
  },
  {
    slug: "dashboard-band-trend-and-study-time",
    title: "Band trends and study time on your dashboard",
    date: "2026-08-29",
    kind: "Improved",
    body: [
      "The dashboard showed your latest band per skill, which tells you where you are but not whether you are improving. It now charts each skill over time, one line per skill, so a gain in reading is not hidden by a flat month in listening.",
      "Total study time is measured alongside it, counted from opening an exercise to submitting it. Attempts taken before we started measuring are left out of the total and counted separately rather than estimated.",
    ],
    link: { href: "/dashboard", label: "Open your dashboard" },
    tags: ["dashboard", "progress"],
  },
  {
    slug: "install-scorewell-to-your-home-screen",
    title: "ScoreWell installs to your home screen",
    date: "2026-08-29",
    kind: "New",
    body: [
      "ScoreWell can now be installed like an app: it opens full screen from your home screen with its own icon, without going through an app store. On Android and desktop Chrome your browser will offer to install it; on iPhone, use Share, then Add to Home Screen.",
      "Pages you have already opened on that device will load again without a connection, so a passage you were reading on the train stays readable when the signal goes. Submitting still needs a connection — a test, a written answer or a sitting cannot be saved offline, and the app tells you so rather than letting you start one you would lose.",
    ],
    tags: ["app", "feature"],
  },
];
