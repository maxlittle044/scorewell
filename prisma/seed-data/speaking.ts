export type SpeakingSeed = {
  slug: string;
  title: string;
  part: "part1" | "part2" | "part3";
  topic: string;
  tags: string[];
  data: {
    /** Part 1/3: a set of questions. Part 2: a single cue card. */
    questions: string[];
    /** Part 2 only — the bullet points on the cue card. */
    cueCardPoints?: string[];
    guidance: string;
  };
};

export const SPEAKING_TESTS: SpeakingSeed[] = [
  {
    slug: "part1-everyday-topics",
    title: "Part 1: Everyday topics",
    part: "part1",
    topic: "Everyday life",
    tags: ["speaking", "part-1", "everyday-life"],
    data: {
      questions: [
        "Do you work, or are you a student?",
        "What do you usually do at the weekend?",
        "Do you prefer mornings or evenings? Why?",
        "How often do you use public transport?",
        "Has the area where you live changed much in recent years?",
      ],
      guidance:
        "Answer each question naturally, extending your response beyond a single sentence where you can. Aim for two to four sentences per answer — long enough to show your range, short enough to stay conversational.",
    },
  },
  {
    slug: "part2-place-to-visit",
    title: "Part 2: A place you would like to visit",
    part: "part2",
    topic: "Travel",
    tags: ["speaking", "part-2", "travel"],
    data: {
      questions: ["Describe a place you would like to visit."],
      cueCardPoints: [
        "where it is",
        "how you first heard about it",
        "what you would do there",
        "and explain why you want to visit it",
      ],
      guidance:
        "You have 1 minute to prepare and should speak for 1–2 minutes. Use the preparation time to note four or five points, not one — running out early is a common way to lose marks.",
    },
  },
  {
    slug: "part2-skill-to-learn",
    title: "Part 2: A skill you would like to learn",
    part: "part2",
    topic: "Learning",
    tags: ["speaking", "part-2", "learning"],
    data: {
      questions: ["Describe a skill you would like to learn."],
      cueCardPoints: [
        "what the skill is",
        "how you would learn it",
        "how difficult you think it would be",
        "and explain why you want to learn it",
      ],
      guidance:
        "You have 1 minute to prepare and should speak for 1–2 minutes. Try to let the answer flow as one connected account rather than announcing each bullet point in turn.",
    },
  },
  {
    slug: "part3-travel-and-tourism",
    title: "Part 3: Travel and tourism",
    part: "part3",
    topic: "Travel",
    tags: ["speaking", "part-3", "travel"],
    data: {
      questions: [
        "How has tourism changed in your country over the last twenty years?",
        "Do you think tourism always benefits the places people visit?",
        "Some people argue that travel is overrated. What would you say to that?",
        "Should governments limit visitor numbers at popular sites?",
      ],
      guidance:
        "Part 3 answers should be developed and justified, not just stated. Give your view, explain the reasoning behind it, and where you can, acknowledge the counter-argument before resolving it.",
    },
  },
];
