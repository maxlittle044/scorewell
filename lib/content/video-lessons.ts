import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { LIVE_LESSON_TASK_TYPE } from "@/lib/content/live-lessons";

/**
 * Live lessons share the VIDEO_LESSON content type and are told apart by
 * taskType. The explicit null branch is required: `{ not: "live-lesson" }`
 * alone compiles to a comparison that is NULL — and therefore false — for every
 * ordinary video lesson, since those carry no taskType, which would silently
 * empty this index.
 */
const IS_A_VIDEO_LESSON = {
  OR: [{ taskType: null }, { taskType: { not: LIVE_LESSON_TASK_TYPE } }],
};

const VideoSchema = z.object({
  kind: z.enum(["mp4", "youtube"]),
  src: z.string(),
  credit: z.string(),
  placeholder: z.boolean(),
  captionsUrl: z.string().optional(),
});

const VideoLessonDataSchema = z.object({
  summary: z.string(),
  lessonMinutes: z.number(),
  keyPoints: z.array(z.string()),
  transcript: z.array(z.string()),
  video: VideoSchema,
});

export type LessonVideo = z.infer<typeof VideoSchema>;

export type VideoLesson = z.infer<typeof VideoLessonDataSchema> & {
  id: string;
  slug: string;
  title: string;
  topic: string | null;
  tags: string[];
};

export async function getVideoLesson(slug: string): Promise<VideoLesson | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "VIDEO_LESSON", published: true, ...IS_A_VIDEO_LESSON },
  });
  if (!item) return null;

  const parsed = VideoLessonDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    topic: item.topic,
    tags: item.tags,
    ...parsed.data,
  };
}

export type VideoLessonSummary = {
  slug: string;
  title: string;
  topic: string | null;
  summary: string;
  lessonMinutes: number;
  isPlaceholderVideo: boolean;
};

/**
 * Resolves the video lessons a course track embeds, keyed by slug.
 *
 * A course names its videos by slug in seed data, so a slug can point at a lesson that was
 * never published or has since been unpublished. Those slugs are simply absent from the map
 * and the course row falls back to a plain lesson — a course must not render an empty player
 * frame for a lesson that does not exist.
 */
export async function getCourseVideos(
  slugs: string[],
): Promise<Map<string, VideoLessonSummary & { video: LessonVideo }>> {
  if (slugs.length === 0) return new Map();

  const items = await prisma.contentItem.findMany({
    where: { slug: { in: slugs }, contentType: "VIDEO_LESSON", published: true, ...IS_A_VIDEO_LESSON },
    select: { slug: true, title: true, topic: true, data: true },
  });

  const map = new Map<string, VideoLessonSummary & { video: LessonVideo }>();
  for (const item of items) {
    const parsed = VideoLessonDataSchema.safeParse(item.data);
    if (!parsed.success) continue;
    map.set(item.slug, {
      slug: item.slug,
      title: item.title,
      topic: item.topic,
      summary: parsed.data.summary,
      lessonMinutes: parsed.data.lessonMinutes,
      isPlaceholderVideo: parsed.data.video.placeholder,
      video: parsed.data.video,
    });
  }
  return map;
}

export async function listVideoLessons(): Promise<VideoLessonSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "VIDEO_LESSON", published: true, ...IS_A_VIDEO_LESSON },
    select: { slug: true, title: true, topic: true, data: true },
  });

  return items
    .flatMap((item) => {
      const parsed = VideoLessonDataSchema.safeParse(item.data);
      if (!parsed.success) return [];
      return [
        {
          slug: item.slug,
          title: item.title,
          topic: item.topic,
          summary: parsed.data.summary,
          lessonMinutes: parsed.data.lessonMinutes,
          isPlaceholderVideo: parsed.data.video.placeholder,
        },
      ];
    })
    // Lessons with real footage lead; the ones still on a stand-in clip sort to the
    // end rather than being hidden, since their written lesson is genuine. The
    // placeholder flag lives inside the JSONB column, so this can't be an orderBy.
    .sort(
      (a, b) =>
        Number(a.isPlaceholderVideo) - Number(b.isPlaceholderVideo) ||
        a.title.localeCompare(b.title),
    );
}
