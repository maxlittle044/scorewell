import { z } from "zod";
import { prisma } from "@/lib/prisma";

const TopicDataSchema = z.object({
  blurb: z.string(),
  opener: z.string(),
  followUpAreas: z.array(z.string()),
  targetLanguage: z.array(z.string()),
  part: z.enum(["Part 1", "Part 2", "Part 3"]),
});

export type ConversationTopic = z.infer<typeof TopicDataSchema> & {
  id: string;
  slug: string;
  title: string;
  tags: string[];
};

export async function getConversationTopic(slug: string): Promise<ConversationTopic | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "AI_CONVERSATION", published: true },
  });
  if (!item) return null;

  const parsed = TopicDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, slug: item.slug, title: item.title, tags: item.tags, ...parsed.data };
}

export type ConversationTopicSummary = {
  slug: string;
  title: string;
  blurb: string;
  part: string;
};

export async function listConversationTopics(): Promise<ConversationTopicSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "AI_CONVERSATION", published: true },
    select: { slug: true, title: true, data: true },
  });

  return items.flatMap((item) => {
    const parsed = TopicDataSchema.safeParse(item.data);
    if (!parsed.success) return [];
    return [
      {
        slug: item.slug,
        title: item.title,
        blurb: parsed.data.blurb,
        part: parsed.data.part,
      },
    ];
  });
}
