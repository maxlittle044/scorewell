/**
 * Scheduled live lessons / webinars.
 *
 * Every session below is seeded with `placeholder: true` and an instructor
 * *role* rather than a person's name. Listing an invented teacher — with a
 * portrait, a biography and an attendee count — would be exactly the fabricated
 * community activity the project's honesty rules forbid, and it is the thing a
 * learner would most reasonably feel misled by if they registered and nobody
 * turned up. The pages state plainly that these are example listings.
 *
 * To publish a real session: set `placeholder: false`, put the actual teacher's
 * name in `instructor.name`, and add the real `joinUrl`.
 */
export type LiveLessonSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    summary: string;
    startsAt: string;
    durationMinutes: number;
    skillFocus:
      | "listening"
      | "reading"
      | "writing"
      | "speaking"
      | "vocabulary"
      | "study-abroad";
    level: string;
    instructor: { name: string; role: string };
    agenda: string[];
    joinUrl?: string;
    recordingSlug?: string;
    placeholder: boolean;
  };
};

const TEAM = { name: "ScoreWell teaching team", role: "Live session" };

export const LIVE_LESSONS: LiveLessonSeed[] = [
  {
    slug: "live-task-2-planning-clinic",
    title: "Task 2 planning clinic: five minutes that decide your band",
    topic: "Writing",
    tags: ["live-lesson", "writing", "task-2"],
    data: {
      summary:
        "Most Task 2 essays lose marks before a word is written. This session works through planning a full essay live, from reading the question to a paragraph map.",
      startsAt: "2026-09-05T13:00:00.000Z",
      durationMinutes: 60,
      skillFocus: "writing",
      level: "Band 5.5–7",
      instructor: TEAM,
      agenda: [
        "Reading the question properly: what the essay type commits you to",
        "Turning a position into three paragraphs that actually differ",
        "Planning live against a question taken from the topic bank",
        "Open questions",
      ],
      placeholder: true,
    },
  },
  {
    slug: "live-reading-true-false-not-given",
    title: "True / False / Not Given without the guesswork",
    topic: "Reading",
    tags: ["live-lesson", "reading", "true-false-not-given"],
    data: {
      summary:
        "The question type candidates most often get wrong, worked through slowly — including why Not Given is a statement about the passage, not about the world.",
      startsAt: "2026-09-09T12:00:00.000Z",
      durationMinutes: 45,
      skillFocus: "reading",
      level: "Band 5–7",
      instructor: TEAM,
      agenda: [
        "What False and Not Given actually mean, with the trap between them",
        "Locating the sentence the statement is testing",
        "Six live items, worked one at a time",
      ],
      placeholder: true,
    },
  },
  {
    slug: "live-speaking-part-2-fluency",
    title: "Speaking Part 2: filling two minutes without padding",
    topic: "Speaking",
    tags: ["live-lesson", "speaking", "part-2"],
    data: {
      summary:
        "How to turn a cue card into two minutes of natural speech using one story rather than a memorised list of adjectives.",
      startsAt: "2026-09-12T14:30:00.000Z",
      durationMinutes: 60,
      skillFocus: "speaking",
      level: "Band 5.5–7.5",
      instructor: TEAM,
      agenda: [
        "The one-minute plan: what to write and what to ignore",
        "Why a story beats a description for fluency marks",
        "Handling the follow-up question",
      ],
      placeholder: true,
    },
  },
  {
    slug: "live-listening-section-4-strategies",
    title: "Listening Section 4: keeping up with the lecture",
    topic: "Listening",
    tags: ["live-lesson", "listening", "section-4"],
    data: {
      summary:
        "Section 4 runs without a break and rewards prediction. This session drills reading ahead, spotting paraphrase, and recovering after a missed answer.",
      startsAt: "2026-09-17T12:00:00.000Z",
      durationMinutes: 45,
      skillFocus: "listening",
      level: "Band 6–8",
      instructor: TEAM,
      agenda: [
        "Predicting the word class before the audio starts",
        "Paraphrase: hearing the answer when the wording changes",
        "What to do in the ten seconds after you lose your place",
      ],
      placeholder: true,
    },
  },
  {
    slug: "live-academic-collocations",
    title: "Academic collocations that raise lexical resource",
    topic: "Vocabulary",
    tags: ["live-lesson", "vocabulary", "lexical-resource"],
    data: {
      summary:
        "Lexical resource is not about rare words. This session covers the ordinary academic pairings that examiners actually reward, and the ones that read as memorised.",
      startsAt: "2026-09-24T13:00:00.000Z",
      durationMinutes: 45,
      skillFocus: "vocabulary",
      level: "Band 6–8",
      instructor: TEAM,
      agenda: [
        "Why 'plethora' costs you marks and 'widely regarded' does not",
        "Twenty pairings worth owning, by essay type",
        "Rewriting a paragraph live",
      ],
      placeholder: true,
    },
  },
  {
    slug: "live-study-abroad-application-timeline",
    title: "Study abroad: what to do, and when",
    topic: "Study abroad",
    tags: ["live-lesson", "study-abroad", "applications"],
    data: {
      summary:
        "A practical calendar for applying overseas — when your IELTS result needs to exist by, and what else has to be ready around it.",
      startsAt: "2026-09-30T15:00:00.000Z",
      durationMinutes: 60,
      skillFocus: "study-abroad",
      level: "All levels",
      instructor: TEAM,
      agenda: [
        "Working backwards from an intake date",
        "How long results, references and documents actually take",
        "Common timing mistakes",
      ],
      placeholder: true,
    },
  },
  {
    slug: "live-writing-task-1-trends",
    title: "Task 1: describing a trend in three sentences",
    topic: "Writing",
    tags: ["live-lesson", "writing", "task-1-academic"],
    data: {
      summary:
        "An overview, a comparison, and a detail — the structure that covers a line graph without listing every number on it.",
      startsAt: "2026-08-20T13:00:00.000Z",
      durationMinutes: 45,
      skillFocus: "writing",
      level: "Band 5.5–7",
      instructor: TEAM,
      agenda: [
        "What belongs in the overview and what does not",
        "Comparing rather than listing",
        "The language of change, ranked by usefulness",
      ],
      recordingSlug: "writing-task-2-strong-thesis",
      placeholder: true,
    },
  },
  {
    slug: "live-how-examiners-mark-speaking",
    title: "How examiners actually mark Speaking",
    topic: "Speaking",
    tags: ["live-lesson", "speaking", "band-descriptors"],
    data: {
      summary:
        "A walk through the four Speaking criteria and what separates one band from the next in each of them.",
      startsAt: "2026-08-13T14:00:00.000Z",
      durationMinutes: 60,
      skillFocus: "speaking",
      level: "All levels",
      instructor: TEAM,
      agenda: [
        "The four criteria, in the examiner's order",
        "What a band 6 answer sounds like next to a band 7",
        "The habits that cap you at 6.5",
      ],
      recordingSlug: "how-examiners-score-speaking",
      placeholder: true,
    },
  },
];
