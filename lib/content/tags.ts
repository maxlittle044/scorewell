import { prisma } from "@/lib/prisma";
import { TOPIC_BANK_TASK_TYPE, hrefForTopicBank } from "@/lib/content/topic-banks";
import { LIVE_LESSON_TASK_TYPE } from "@/lib/content/live-lessons";

const SKILL_PATHS: Record<string, string> = {
  READING: "/ielts/reading",
  LISTENING: "/ielts/listening",
  WRITING: "/ielts/writing",
  SPEAKING: "/ielts/speaking",
};

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  PRACTICE_TEST: "Practice test",
  SAMPLE_ANSWER: "Sample answer",
  USER_SUBMISSION: "User submission",
  ARTICLE: "Article",
  COURSE: "Course",
  AI_CONVERSATION: "AI conversation",
  WRITING_EXERCISE: "Writing exercise",
  PRONUNCIATION_DRILL: "Pronunciation drill",
  DICTATION_SHADOWING: "Dictation / shadowing",
  VIDEO_LESSON: "Video lesson",
  MINI_EXERCISE: "Mini exercise",
};

/** Where each content type's [slug] page actually lives. */
const CONTENT_TYPE_PATHS: Record<string, string> = {
  SAMPLE_ANSWER: "/ielts/band-9-samples",
  USER_SUBMISSION: "/ielts/submitted-answers",
  ARTICLE: "/ielts/tips",
  COURSE: "/courses",
  AI_CONVERSATION: "/ai-conversations",
  WRITING_EXERCISE: "/writing-exercises",
  PRONUNCIATION_DRILL: "/pronunciation",
  DICTATION_SHADOWING: "/dictation-shadowing",
  VIDEO_LESSON: "/video-lessons",
};

export function hrefForContentItem(item: {
  slug: string;
  skill: string | null;
  contentType: string;
  taskType?: string | null;
}): string {
  if (item.contentType === "PRACTICE_TEST" && item.skill && SKILL_PATHS[item.skill]) {
    return `${SKILL_PATHS[item.skill]}/${item.slug}`;
  }
  // Topic pools share ARTICLE with tips but live on one combined page.
  if (item.contentType === "ARTICLE" && item.taskType === "topic-pool") {
    return "/ielts/forecasts";
  }
  // Topic banks also share ARTICLE, but each one has its own fixed route.
  if (item.contentType === "ARTICLE" && item.taskType === TOPIC_BANK_TASK_TYPE) {
    return hrefForTopicBank(item.slug);
  }
  // Live lessons share VIDEO_LESSON and split on taskType.
  if (item.contentType === "VIDEO_LESSON" && item.taskType === LIVE_LESSON_TASK_TYPE) {
    return `/live-lessons/${item.slug}`;
  }
  // Grammar tests and mini exercises share MINI_EXERCISE and split on taskType.
  if (item.contentType === "MINI_EXERCISE") {
    const base = item.taskType === "grammar-test" ? "/ielts/grammar-tests" : "/ielts/mini-exercises";
    return `${base}/${item.slug}`;
  }
  const base = CONTENT_TYPE_PATHS[item.contentType];
  return base ? `${base}/${item.slug}` : `/ielts/${item.slug}`;
}

/** Turns a stored tag slug into a display label ("general-training" → "General training"). */
export function tagLabel(tag: string): string {
  const spaced = tag.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export type TagCount = { tag: string; count: number };

/** All distinct tags across published content, with usage counts. */
export async function getAllTags(): Promise<TagCount[]> {
  const items = await prisma.contentItem.findMany({
    where: { published: true },
    select: { tags: true },
  });

  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export type TaggedItem = {
  id: string;
  title: string;
  href: string;
  kind: string;
  meta?: string;
  tags: string[];
};

export async function getItemsByTag(tag: string): Promise<TaggedItem[]> {
  const items = await prisma.contentItem.findMany({
    where: { published: true, tags: { has: tag } },
    orderBy: { updatedAt: "desc" },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    href: hrefForContentItem(item),
    kind: CONTENT_TYPE_LABELS[item.contentType] ?? "Content",
    meta: [item.sourceTestSet, item.topic].filter(Boolean).join(" · ") || undefined,
    tags: item.tags,
  }));
}
