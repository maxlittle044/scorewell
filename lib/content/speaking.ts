import { z } from "zod";
import { prisma } from "@/lib/prisma";

const SpeakingDataSchema = z.object({
  questions: z.array(z.string()),
  cueCardPoints: z.array(z.string()).optional(),
  guidance: z.string(),
});

export type SpeakingTest = {
  id: string;
  title: string;
  part: string;
  tags: string[];
  questions: string[];
  cueCardPoints?: string[];
  guidance: string;
};

export type SpeakingTestSummary = {
  slug: string;
  title: string;
  part: string;
  topic: string | null;
};

/** Index listing. Ordered by part so Parts 1-3 group together on the page. */
export async function listSpeakingTests(): Promise<SpeakingTestSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "PRACTICE_TEST", skill: "SPEAKING", published: true },
    orderBy: [{ taskType: "asc" }, { slug: "asc" }],
    select: { slug: true, title: true, taskType: true, topic: true },
  });

  return items.map((item) => ({
    slug: item.slug,
    title: item.title,
    part: item.taskType ?? "part1",
    topic: item.topic,
  }));
}

export async function getSpeakingTest(slug: string): Promise<SpeakingTest | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "PRACTICE_TEST", skill: "SPEAKING", published: true },
  });
  if (!item) return null;

  const parsed = SpeakingDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return {
    id: item.id,
    title: item.title,
    part: item.taskType ?? "part1",
    tags: item.tags,
    ...parsed.data,
  };
}
