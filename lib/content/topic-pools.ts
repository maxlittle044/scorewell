import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Topic pools share the ARTICLE content type with tips and are distinguished
 * by taskType, the same way grammar tests and mini exercises share
 * MINI_EXERCISE — so no schema migration was needed.
 */
export const TOPIC_POOL_TASK_TYPE = "topic-pool";

const TopicPoolDataSchema = z.object({
  order: z.number(),
  section: z.string(),
  intro: z.string(),
  themes: z.array(
    z.object({
      title: z.string(),
      examplePrompt: z.string(),
      whyItRecurs: z.string(),
      prepare: z.array(z.string()),
      relatedHref: z.string().optional(),
      relatedLabel: z.string().optional(),
    }),
  ),
});

export type TopicPool = z.infer<typeof TopicPoolDataSchema> & {
  id: string;
  slug: string;
  title: string;
  topic: string | null;
  tags: string[];
};

export async function listTopicPools(): Promise<TopicPool[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "ARTICLE", taskType: TOPIC_POOL_TASK_TYPE, published: true },
  });

  return items
    .flatMap((item) => {
      const parsed = TopicPoolDataSchema.safeParse(item.data);
      if (!parsed.success) return [];
      return [
        {
          id: item.id,
          slug: item.slug,
          title: item.title,
          topic: item.topic,
          tags: item.tags,
          ...parsed.data,
        },
      ];
    })
    .sort((a, b) => a.order - b.order);
}

export function countThemes(pools: TopicPool[]): number {
  return pools.reduce((sum, pool) => sum + pool.themes.length, 0);
}
