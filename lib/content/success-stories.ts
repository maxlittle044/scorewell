import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Learner success stories (site-build-prompt.md section 3 item 18, section 3a).
 *
 * The loader is written for real stories and returns an empty list until one exists.
 * Nothing here fabricates a placeholder to fill the space — the pages render an honest
 * empty state instead, per section 7a.
 *
 * ARTICLEs split off by taskType "success-story", the pattern the other article-shaped
 * content already uses.
 */

export const SUCCESS_STORY_TASK_TYPE = "success-story";

const SuccessStoryDataSchema = z.object({
  name: z.string(),
  startingBand: z.number().optional(),
  achievedBand: z.number(),
  goal: z.string(),
  date: z.string(),
  quote: z.array(z.string()).min(1),
});

export type SuccessStory = z.infer<typeof SuccessStoryDataSchema> & {
  slug: string;
  title: string;
  tags: string[];
};

/** Newest first. Sorted on the stored date, not createdAt, which reseeding rewrites. */
export async function listSuccessStories(limit?: number): Promise<SuccessStory[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "ARTICLE",
      taskType: SUCCESS_STORY_TASK_TYPE,
      published: true,
    },
    select: { slug: true, title: true, tags: true, data: true },
  });

  const stories = items.flatMap((item) => {
    const parsed = SuccessStoryDataSchema.safeParse(item.data);
    if (!parsed.success) return [];
    return [{ slug: item.slug, title: item.title, tags: item.tags, ...parsed.data }];
  });

  stories.sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name));
  return limit ? stories.slice(0, limit) : stories;
}
