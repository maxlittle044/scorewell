export type Lesson = {
  title: string;
  summary: string;
  /** Optional link to real content elsewhere on the site. */
  href?: string;
  /**
   * Slug of a VIDEO_LESSON to play inside the track. Must name a lesson that exists in
   * `video-lessons.ts` or `video-lessons-voa.ts` — an unknown slug degrades to a plain
   * lesson row rather than erroring, so a typo here fails quietly.
   *
   * Set this or `href`, not both: a lesson with a video already links to that lesson's own
   * page for the transcript, and `href` is ignored on those rows.
   */
  videoSlug?: string;
};

export type CourseSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    description: string;
    level: string;
    gradient: string;
    lessons: Lesson[];
  };
};

export const COURSES: CourseSeed[] = [
  {
    slug: "writing-task-2-foundations",
    title: "Writing Task 2 Foundations",
    topic: "Writing",
    tags: ["course", "writing", "task-2"],
    data: {
      description:
        "Build a repeatable essay method: structure first, then development, then the language that lifts a band 6.5 to a 7.5.",
      level: "Band 5.5 → 7.5",
      gradient: "from-brand-500 to-brand-700",
      lessons: [
        {
          title: "How Task 2 is actually marked",
          summary:
            "The four criteria, what each one rewards, and why Task 2 counts for twice as much as Task 1.",
          href: "/ielts/tips/how-band-scores-are-calculated",
        },
        {
          title: "A structure that works for every question type",
          summary:
            "The four-paragraph shape for opinion and discussion essays, and how to decide which you've been given.",
          href: "/ielts/tips/task-2-essay-structure",
        },
        {
          title: "Writing an introduction that states a position",
          summary:
            "Paraphrase the question, state your view in one sentence, and avoid the padding that wastes your word count.",
          videoSlug: "writing-task-2-strong-thesis",
        },
        {
          title: "Developing a body paragraph properly",
          summary:
            "The 'so what?' test — moving from stating a reason to explaining its mechanism and consequence.",
        },
        {
          title: "Cohesion without mechanical linking",
          summary:
            "Why adding more connectives usually lowers your score, and what earns marks instead.",
          href: "/ielts/tips/linking-words-that-raise-score",
        },
        {
          title: "Study a band-9 answer",
          summary:
            "Read a full band-9 response with examiner notes explaining what each criterion is rewarding.",
          href: "/ielts/band-9-samples/public-transport-vs-roads",
        },
        {
          title: "Write one under exam conditions",
          summary: "A full 40-minute Task 2 with a countdown timer, then AI feedback on your answer.",
          href: "/ielts/writing/task2-free-university-education",
        },
        {
          title: "Review and target your weakest criterion",
          summary:
            "Use your feedback to identify which of the four criteria is holding your band down, and what to do about it.",
          href: "/dashboard",
        },
      ],
    },
  },
  {
    slug: "speaking-fluency-bootcamp",
    title: "Speaking Fluency Bootcamp",
    topic: "Speaking",
    tags: ["course", "speaking", "fluency"],
    data: {
      description:
        "Six sessions of guided speaking practice, from short Part 1 answers through to developed Part 3 argument.",
      level: "Band 5.5 → 7.5",
      gradient: "from-rose-500 to-rose-700",
      lessons: [
        {
          title: "What fluency actually means in IELTS",
          summary:
            "Why hesitation isn't automatically penalised, and what examiners are really listening for.",
          videoSlug: "how-examiners-score-speaking",
        },
        {
          title: "Part 1: extending without rambling",
          summary: "Turning one-sentence answers into natural two-to-four sentence responses.",
          href: "/ielts/speaking/part1-everyday-topics",
        },
        {
          title: "Part 2: surviving the long turn",
          summary:
            "How to use the preparation minute, and the four mistakes that cost the most marks.",
          href: "/ielts/tips/speaking-part2-mistakes",
        },
        {
          title: "Part 2 practice: a cue card end to end",
          summary: "Record a full 1–2 minute answer against a real cue card.",
          href: "/ielts/speaking/part2-place-to-visit",
        },
        {
          title: "Part 3: developing and justifying",
          summary:
            "The argumentative shape that separates band 9 from band 7 — challenge, support, concede, resolve.",
          href: "/ielts/band-9-samples/speaking-part3-lifelong-learning",
        },
        {
          title: "Get feedback on a recorded answer",
          summary:
            "Use the speaking checker to score your fluency, vocabulary and grammar against the band descriptors.",
          href: "/tools/speaking-part1-checker",
        },
      ],
    },
  },
  {
    slug: "academic-reading-speed-accuracy",
    title: "Academic Reading: Speed & Accuracy",
    topic: "Reading",
    tags: ["course", "reading", "academic"],
    data: {
      description:
        "Finish all three passages in time without sacrificing accuracy — pacing, technique, and question-type strategy.",
      level: "Band 6 → 8",
      gradient: "from-emerald-500 to-emerald-700",
      lessons: [
        {
          title: "Build a pacing plan",
          summary:
            "Budgeting by passage rather than by question, and why an unfinished Passage 3 costs the most.",
          href: "/ielts/tips/reading-time-management",
        },
        {
          title: "Skimming for the main idea",
          summary: "Reading topic sentences and structure rather than every word.",
          href: "/ielts/mini-exercises/skimming-main-idea",
        },
        {
          title: "Practice: a full Academic passage",
          summary: "Apply skimming and scanning to a complete timed passage.",
          href: "/ielts/reading/academic-test-1",
        },
        {
          title: "Handling the slow question types",
          summary:
            "True/False/Not Given and matching headings — why they take longer and when to guess and move on.",
        },
        {
          title: "A harder passage under time pressure",
          summary: "A denser academic text to test whether your pacing plan holds up.",
          href: "/ielts/reading/academic-test-3",
        },
      ],
    },
  },
  {
    slug: "general-training-complete-prep",
    title: "General Training Complete Prep",
    topic: "General Training",
    tags: ["course", "general-training", "all-skills"],
    data: {
      description:
        "A full path through all four skills for General Training candidates, including the letter task that GT candidates most often lose marks on.",
      level: "Band 5 → 7",
      gradient: "from-accent-500 to-accent-600",
      lessons: [
        {
          title: "How GT differs from Academic",
          summary:
            "Different Reading texts, a different conversion table, and a letter instead of a report in Task 1.",
          href: "/ielts/tips/how-band-scores-are-calculated",
        },
        {
          title: "GT Reading: everyday texts",
          summary: "Notices, advertisements and workplace documents — and how the question types differ.",
          href: "/ielts/reading/gt-test-1",
        },
        {
          title: "GT Reading: workplace texts",
          summary: "A second GT passage focused on the longer work-related section.",
          href: "/ielts/reading/gt-test-2",
        },
        {
          title: "Task 1: getting the register right",
          summary:
            "Formal, semi-formal and informal letters — choosing correctly is worth more than vocabulary here.",
          href: "/ielts/band-9-samples/letter-colleague-delayed-project",
        },
        {
          title: "Write a formal letter",
          summary: "A full timed Task 1 letter, then AI feedback.",
          href: "/ielts/writing/task1-letter-refund-request",
        },
        {
          title: "Task 2 for GT candidates",
          summary: "The essay is the same task as Academic — structure it the same way.",
          href: "/ielts/tips/task-2-essay-structure",
        },
        {
          title: "Listening: Sections 1 and 2",
          summary: "Everyday conversations and monologues — the most accessible marks in the paper.",
          href: "/ielts/listening/practice-set-1",
        },
        {
          title: "Listening: the harder sections",
          summary: "Why Section 4 catches people out, and how to stay in position when you miss an answer.",
          href: "/ielts/tips/listening-section-4-mistakes",
        },
        {
          title: "Speaking: all three parts",
          summary: "A run through the full speaking test format.",
          href: "/ielts/speaking/part1-everyday-topics",
        },
        {
          title: "Final check and exam-day planning",
          summary:
            "Review your saved results, work out which skill to push, and confirm what to bring on the day.",
          href: "/dashboard",
        },
      ],
    },
  },
  {
    // A recorded-lesson package (site-build-prompt.md section 4b). Every step here is one of
    // the VOA-backed video lessons — real public-domain footage, credited by the player —
    // so the whole track can be watched through without leaving the page. It closes on a
    // practice step, because watching grammar explained is not the same as getting it right.
    slug: "grammar-and-usage-on-video",
    title: "Grammar & Usage on Video",
    topic: "Grammar",
    tags: ["course", "grammar", "video", "writing", "speaking"],
    data: {
      description:
        "Six recorded lessons on the structures that decide your accuracy band — watched in order, each with its written lesson, then tested.",
      level: "Band 5.5 → 7.5",
      gradient: "from-violet-500 to-violet-700",
      lessons: [
        {
          title: "The passive voice, and when it earns its place",
          summary:
            "Start with the structure most often used for the wrong reason. Watch, then check your last Task 1 for passives that add nothing.",
          videoSlug: "passive-voice-in-reports-and-news",
        },
        {
          title: "The past perfect continuous",
          summary:
            "A tense worth one accurate use in an essay. This lesson is about where it belongs, not about using it more.",
          videoSlug: "past-perfect-continuous",
        },
        {
          title: "Dangling participles",
          summary:
            "The error that turns up in exactly the sentences you wrote to show range — and the two ways to fix it.",
          videoSlug: "dangling-participles",
        },
        {
          title: "Register: polite requests in a formal letter",
          summary:
            "Grammar that is correct can still be socially wrong. The request forms General Training Task 1 is really marking.",
          videoSlug: "polite-requests-in-formal-letters",
        },
        {
          title: "Saying past tenses out loud: -ed endings",
          summary:
            "Written accuracy you already have can still be lost in Speaking. Three pronunciations, one spelling.",
          videoSlug: "pronouncing-ed-endings",
        },
        {
          title: "Hedging and trade-offs on a common topic",
          summary:
            "Grammar in service of an argument — the hedged, two-sided language Part 3 and Task 2 reward.",
          videoSlug: "discussing-technology-and-ai",
        },
        {
          title: "Test what you've watched",
          summary:
            "Grammar tests with per-question explanations. Watching an explanation and applying it under time are different skills.",
          href: "/ielts/grammar-tests",
        },
      ],
    },
  },
];
