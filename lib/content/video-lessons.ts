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

export async function listVideoLessons(): Promise<VideoLessonSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "VIDEO_LESSON", published: true, ...IS_A_VIDEO_LESSON },
    select: { slug: true, title: true, topic: true, data: true },
  });

  return items.flatMap((item) => {
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
  });
}
