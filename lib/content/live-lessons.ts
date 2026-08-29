import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Live lessons / webinars (site-build-prompt.md section 4 and 4b).
 *
 * A live lesson is a scheduled video lesson, so it shares the VIDEO_LESSON
 * content type and is told apart by taskType — the same split used for topic
 * pools and topic banks, and the reason this needed no schema migration. Once a
 * session has happened its recording is archived as an ordinary video lesson,
 * which this model reaches through `recordingSlug`.
 */
export const LIVE_LESSON_TASK_TYPE = "live-lesson";

export const LESSON_SKILLS = [
  "listening",
  "reading",
  "writing",
  "speaking",
  "vocabulary",
  "study-abroad",
] as const;

export type LessonSkill = (typeof LESSON_SKILLS)[number];

export const LESSON_SKILL_LABELS: Record<LessonSkill, string> = {
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
  vocabulary: "Vocabulary",
  "study-abroad": "Study abroad",
};

export function isLessonSkill(value: string): value is LessonSkill {
  return (LESSON_SKILLS as readonly string[]).includes(value);
}

const LiveLessonDataSchema = z.object({
  summary: z.string(),
  /** ISO 8601 instant. Rendered in the viewer's own locale and zone. */
  startsAt: z.string(),
  durationMinutes: z.number(),
  skillFocus: z.enum(LESSON_SKILLS),
  level: z.string(),
  instructor: z.object({
    /**
     * A role or team label, not an invented individual. Replace with a real
     * person's name only when a real person is actually teaching the session.
     */
    name: z.string(),
    role: z.string(),
  }),
  agenda: z.array(z.string()),
  /** External meeting link. Absent while a session is only provisionally listed. */
  joinUrl: z.string().optional(),
  /** Slug of the archived recording, once the session has been run. */
  recordingSlug: z.string().optional(),
  /**
   * True while this is an example listing rather than a scheduled session with
   * a real instructor behind it. The UI says so plainly — same convention the
   * video lessons use for stand-in footage.
   */
  placeholder: z.boolean(),
});

export type LiveLesson = z.infer<typeof LiveLessonDataSchema> & {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  /** Derived at read time so a session moves to "past" on its own. */
  isPast: boolean;
};

function toLiveLesson(item: {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  data: unknown;
}): LiveLesson | null {
  const parsed = LiveLessonDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  const startsAt = new Date(parsed.data.startsAt);
  if (Number.isNaN(startsAt.getTime())) return null;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    tags: item.tags,
    isPast: startsAt.getTime() < Date.now(),
    ...parsed.data,
  };
}

export async function getLiveLesson(slug: string): Promise<LiveLesson | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "VIDEO_LESSON",
      taskType: LIVE_LESSON_TASK_TYPE,
      published: true,
    },
  });
  if (!item) return null;

  return toLiveLesson(item);
}

export type LiveLessonList = {
  upcoming: LiveLesson[];
  past: LiveLesson[];
};

/** `skill` narrows the listing; null returns every session (spec section 3a). */
export async function listLiveLessons(skill: LessonSkill | null): Promise<LiveLessonList> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "VIDEO_LESSON",
      taskType: LIVE_LESSON_TASK_TYPE,
      published: true,
    },
  });

  const lessons = items
    .flatMap((item) => {
      const lesson = toLiveLesson(item);
      return lesson ? [lesson] : [];
    })
    .filter((lesson) => !skill || lesson.skillFocus === skill);

  const byDate = (a: LiveLesson, b: LiveLesson) =>
    new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();

  return {
    upcoming: lessons.filter((lesson) => !lesson.isPast).sort(byDate),
    // Most recently finished first.
    past: lessons.filter((lesson) => lesson.isPast).sort((a, b) => byDate(b, a)),
  };
}

/** Fixed UTC rendering so the server and client agree — no hydration mismatch. */
export function formatLessonTime(startsAt: string, durationMinutes: number): string {
  const start = new Date(startsAt);
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(start);
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(start);

  return `${date} · ${time}–${endTime(start, durationMinutes)} UTC`;
}

function endTime(start: Date, durationMinutes: number): string {
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(end);
}

/**
 * Attendee counts, as one grouped query rather than a count per session.
 * A session with no registrations is simply absent from the map, and the UI
 * renders nothing rather than a decorative zero.
 */
export async function getAttendeeCounts(lessonIds: string[]): Promise<Map<string, number>> {
  if (lessonIds.length === 0) return new Map();

  const rows = await prisma.liveLessonRegistration.groupBy({
    by: ["contentItemId"],
    where: { contentItemId: { in: lessonIds } },
    _count: { _all: true },
  });

  return new Map(rows.map((row) => [row.contentItemId, row._count._all]));
}

/** Which of these sessions the signed-in learner has already registered for. */
export async function getRegisteredLessonIds(
  userId: string,
  lessonIds: string[],
): Promise<Set<string>> {
  if (lessonIds.length === 0) return new Set();

  const rows = await prisma.liveLessonRegistration.findMany({
    where: { userId, contentItemId: { in: lessonIds } },
    select: { contentItemId: true },
  });

  return new Set(rows.map((row) => row.contentItemId));
}
