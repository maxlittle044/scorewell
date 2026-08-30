import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCourseVideos, type LessonVideo } from "@/lib/content/video-lessons";

const CourseDataSchema = z.object({
  description: z.string(),
  level: z.string(),
  gradient: z.string(),
  lessons: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
      href: z.string().optional(),
      /**
       * A recorded lesson to play inside the track (site-build-prompt.md section 4b,
       * "recorded-lesson packages" / "multi-lesson video courses"). Takes precedence over
       * `href`: a lesson with a video links to that video lesson's own page for the
       * transcript, so setting both in seed data is redundant rather than additive.
       */
      videoSlug: z.string().optional(),
    }),
  ),
});

/** A lesson with its recorded video resolved, if it names one that is actually published. */
export type CourseLessonVideo = {
  slug: string;
  lessonMinutes: number;
  video: LessonVideo;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  level: string;
  gradient: string;
  lessons: {
    title: string;
    summary: string;
    href?: string;
    video?: CourseLessonVideo;
  }[];
  /** How many lessons in this track actually play a video. */
  videoCount: number;
};

export async function getCourse(slug: string): Promise<Course | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "COURSE", published: true },
  });
  if (!item) return null;

  const parsed = CourseDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  const { lessons, ...rest } = parsed.data;
  const videos = await getCourseVideos(
    lessons.flatMap((lesson) => (lesson.videoSlug ? [lesson.videoSlug] : [])),
  );

  const resolved: Course["lessons"] = lessons.map(({ videoSlug, ...lesson }) => {
    const found = videoSlug ? videos.get(videoSlug) : undefined;
    return found
      ? {
          ...lesson,
          video: { slug: found.slug, lessonMinutes: found.lessonMinutes, video: found.video },
        }
      : lesson;
  });

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    tags: item.tags,
    ...rest,
    lessons: resolved,
    videoCount: resolved.filter((lesson) => lesson.video).length,
  };
}

export async function listCourses() {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "COURSE", published: true },
    orderBy: { slug: "asc" },
    select: { slug: true, title: true, data: true },
  });

  const parsedItems = items.map((item) => ({ item, parsed: CourseDataSchema.safeParse(item.data) }));

  // Counted against published video lessons rather than against the slugs the seed names, so
  // a card can't advertise videos a learner would not actually get. One query for the page.
  const videos = await getCourseVideos([
    ...new Set(
      parsedItems.flatMap(({ parsed }) =>
        parsed.success
          ? parsed.data.lessons.flatMap((lesson) => (lesson.videoSlug ? [lesson.videoSlug] : []))
          : [],
      ),
    ),
  ]);

  return parsedItems.map(({ item, parsed }) => ({
    slug: item.slug,
    title: item.title,
    description: parsed.success ? parsed.data.description : "",
    gradient: parsed.success ? parsed.data.gradient : "from-zinc-500 to-zinc-700",
    lessonCount: parsed.success ? parsed.data.lessons.length : 0,
    videoCount: parsed.success
      ? parsed.data.lessons.filter((lesson) => lesson.videoSlug && videos.has(lesson.videoSlug))
          .length
      : 0,
  }));
}

/**
 * Self-study track state (site-build-prompt.md section 4b, "self-study course track").
 *
 * A course was a reading list; these turn it into something you work through, can leave,
 * and can come back to. Completion lives in its own table rather than in Progress — see
 * the CourseLessonCompletion comment in schema.prisma for why.
 */

export type CourseProgress = {
  /** Indexes of the lessons this learner has ticked off. */
  completed: number[];
  total: number;
  /** The first unfinished lesson, or null once the track is done. */
  nextIndex: number | null;
};

export async function getCourseProgress(
  userId: string,
  courseSlug: string,
  lessonCount: number,
): Promise<CourseProgress> {
  const rows = await prisma.courseLessonCompletion.findMany({
    where: { userId, courseSlug },
    select: { lessonIndex: true },
  });

  // A lesson removed from the seed since it was ticked would otherwise count towards a
  // total it no longer belongs to, and could push progress past 100%.
  const completed = rows
    .map((row) => row.lessonIndex)
    .filter((index) => index < lessonCount)
    .sort((a, b) => a - b);

  const done = new Set(completed);
  let nextIndex: number | null = null;
  for (let i = 0; i < lessonCount; i += 1) {
    if (!done.has(i)) {
      nextIndex = i;
      break;
    }
  }

  return { completed, total: lessonCount, nextIndex };
}

/** Completed-lesson counts for several courses at once, for the index page. */
export async function getCourseProgressCounts(
  userId: string,
  slugs: string[],
): Promise<Map<string, number>> {
  if (slugs.length === 0) return new Map();

  const rows = await prisma.courseLessonCompletion.groupBy({
    by: ["courseSlug"],
    where: { userId, courseSlug: { in: slugs } },
    _count: { _all: true },
  });

  return new Map(rows.map((row) => [row.courseSlug, row._count._all]));
}
