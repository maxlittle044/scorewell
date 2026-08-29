import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Topic banks are browsable question lists — every Speaking topic we publish
 * and the full essay-question list — readable without starting a timed test.
 *
 * Like topic pools they share the ARTICLE content type and are told apart by
 * taskType, so no schema migration was needed. One ContentItem holds one whole
 * bank rather than one question: these are list pages, and a page per question
 * would be dozens of near-empty URLs.
 */
export const TOPIC_BANK_TASK_TYPE = "topic-bank";

/**
 * Banks live on fixed routes rather than a `[slug]` page, so the slug -> URL
 * mapping is explicit here and reused by `hrefForContentItem` (search results
 * and tag archives) instead of being duplicated there.
 */
export const TOPIC_BANK_ROUTES: Record<string, string> = {
  "speaking-topics-part-1": "/topics/speaking/part-1",
  "speaking-topics-part-2": "/topics/speaking/part-2",
  "speaking-topics-part-3": "/topics/speaking/part-3",
  "essay-question-bank": "/topics/essay-questions",
};

export const SPEAKING_BANK_SLUGS = {
  "part-1": "speaking-topics-part-1",
  "part-2": "speaking-topics-part-2",
  "part-3": "speaking-topics-part-3",
} as const;

export type SpeakingPartSegment = keyof typeof SPEAKING_BANK_SLUGS;

export function isSpeakingPartSegment(value: string): value is SpeakingPartSegment {
  return value in SPEAKING_BANK_SLUGS;
}

export function hrefForTopicBank(slug: string): string {
  return TOPIC_BANK_ROUTES[slug] ?? "/topics";
}

/**
 * One shape covers both bank kinds. `label` carries the essay type on the
 * essay bank ("Discuss both views") and stays unset on the Speaking banks,
 * which need no per-question annotation.
 */
const TopicBankDataSchema = z.object({
  order: z.number(),
  /** Shown under the page title — what this bank is and how to work through it. */
  intro: z.string(),
  groups: z.array(
    z.object({
      theme: z.string(),
      note: z.string().optional(),
      questions: z.array(
        z.object({
          text: z.string(),
          label: z.string().optional(),
        }),
      ),
      relatedHref: z.string().optional(),
      relatedLabel: z.string().optional(),
    }),
  ),
});

export type TopicBank = z.infer<typeof TopicBankDataSchema> & {
  id: string;
  slug: string;
  title: string;
  topic: string | null;
  tags: string[];
  href: string;
};

function toTopicBank(item: {
  id: string;
  slug: string;
  title: string;
  topic: string | null;
  tags: string[];
  data: unknown;
}): TopicBank | null {
  const parsed = TopicBankDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    topic: item.topic,
    tags: item.tags,
    href: hrefForTopicBank(item.slug),
    ...parsed.data,
  };
}

export async function getTopicBank(slug: string): Promise<TopicBank | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "ARTICLE",
      taskType: TOPIC_BANK_TASK_TYPE,
      published: true,
    },
  });
  if (!item) return null;

  return toTopicBank(item);
}

export async function listTopicBanks(): Promise<TopicBank[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "ARTICLE", taskType: TOPIC_BANK_TASK_TYPE, published: true },
  });

  return items
    .flatMap((item) => {
      const bank = toTopicBank(item);
      return bank ? [bank] : [];
    })
    .sort((a, b) => a.order - b.order);
}

export function countQuestions(bank: TopicBank): number {
  return bank.groups.reduce((sum, group) => sum + group.questions.length, 0);
}
