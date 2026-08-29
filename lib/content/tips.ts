import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { TOPIC_POOL_TASK_TYPE } from "@/lib/content/topic-pools";
import { TOPIC_BANK_TASK_TYPE } from "@/lib/content/topic-banks";

/** Everything sharing the ARTICLE content type that is not a tip article. */
const NON_TIP_TASK_TYPES = [TOPIC_POOL_TASK_TYPE, TOPIC_BANK_TASK_TYPE];

/**
 * Topic pools and topic banks share the ARTICLE content type with tips and are
 * told apart by taskType. The explicit null branch matters: `{ notIn: [...] }`
 * alone compiles to a comparison that is NULL — and therefore false — for every
 * tip, since tips carry no taskType. That silently emptied the tips index once
 * topic pools existed; add any further ARTICLE taskType to the list above
 * rather than filtering it somewhere else.
 */
const IS_A_TIP = {
  OR: [{ taskType: null }, { taskType: { notIn: NON_TIP_TASK_TYPES } }],
};

const TipDataSchema = z.object({
  excerpt: z.string(),
  readMinutes: z.number(),
  body: z.array(z.string()),
});

export type TipArticle = {
  id: string;
  title: string;
  topic: string | null;
  tags: string[];
  excerpt: string;
  readMinutes: number;
  body: string[];
};

export async function getTip(slug: string): Promise<TipArticle | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "ARTICLE", published: true, ...IS_A_TIP },
  });
  if (!item) return null;

  const parsed = TipDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, title: item.title, topic: item.topic, tags: item.tags, ...parsed.data };
}

export async function listTips() {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "ARTICLE", published: true, ...IS_A_TIP },
    orderBy: { slug: "asc" },
    select: { slug: true, title: true, topic: true, data: true },
  });

  return items.map((item) => {
    const parsed = TipDataSchema.safeParse(item.data);
    return {
      slug: item.slug,
      title: item.title,
      topic: item.topic,
      readMinutes: parsed.success ? parsed.data.readMinutes : null,
      excerpt: parsed.success ? parsed.data.excerpt : null,
    };
  });
}

/**
 * Tips split into one page per skill (spec section 4b) rather than a single
 * mixed index. The split uses `topic`, which the tip seed data already carries —
 * no new column and no reseed.
 */
export const TIP_SKILLS = ["reading", "listening", "writing", "speaking", "general"] as const;

export type TipSkill = (typeof TIP_SKILLS)[number];

export const TIP_SKILL_LABELS: Record<TipSkill, string> = {
  reading: "Reading",
  listening: "Listening",
  writing: "Writing",
  speaking: "Speaking",
  general: "General",
};

export function isTipSkill(value: string): value is TipSkill {
  return (TIP_SKILLS as readonly string[]).includes(value);
}

export async function listTipsBySkill(skill: TipSkill) {
  const all = await listTips();
  const label = TIP_SKILL_LABELS[skill];
  return all.filter((tip) => tip.topic === label);
}
