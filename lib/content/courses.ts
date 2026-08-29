import { z } from "zod";
import { prisma } from "@/lib/prisma";

const CourseDataSchema = z.object({
  description: z.string(),
  level: z.string(),
  gradient: z.string(),
  lessons: z.array(
    z.object({
      title: z.string(),
      summary: z.string(),
      href: z.string().optional(),
    }),
  ),
});

export type Course = {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  description: string;
  level: string;
  gradient: string;
  lessons: { title: string; summary: string; href?: string }[];
};

export async function getCourse(slug: string): Promise<Course | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "COURSE", published: true },
  });
  if (!item) return null;

  const parsed = CourseDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, slug: item.slug, title: item.title, tags: item.tags, ...parsed.data };
}

export async function listCourses() {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "COURSE", published: true },
    orderBy: { slug: "asc" },
    select: { slug: true, title: true, data: true },
  });

  return items.map((item) => {
    const parsed = CourseDataSchema.safeParse(item.data);
    return {
      slug: item.slug,
      title: item.title,
      description: parsed.success ? parsed.data.description : "",
      gradient: parsed.success ? parsed.data.gradient : "from-zinc-500 to-zinc-700",
      lessonCount: parsed.success ? parsed.data.lessons.length : 0,
    };
  });
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
