import { z } from "zod";
import { prisma } from "@/lib/prisma";

const SampleDataSchema = z.object({
  prompt: z.string(),
  answer: z.string(),
  examinerNotes: z.array(z.object({ criterion: z.string(), note: z.string() })),
});

export type BandNineSample = {
  id: string;
  title: string;
  skill: string | null;
  taskType: string | null;
  tags: string[];
  prompt: string;
  answer: string;
  examinerNotes: { criterion: string; note: string }[];
};

export async function getBandNineSample(slug: string): Promise<BandNineSample | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "SAMPLE_ANSWER", published: true },
  });
  if (!item) return null;

  const parsed = SampleDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return {
    id: item.id,
    title: item.title,
    skill: item.skill,
    taskType: item.taskType,
    tags: item.tags,
    ...parsed.data,
  };
}

export async function listBandNineSamples() {
  return prisma.contentItem.findMany({
    where: { contentType: "SAMPLE_ANSWER", published: true },
    orderBy: [{ skill: "asc" }, { slug: "asc" }],
    select: { slug: true, title: true, skill: true, taskType: true },
  });
}
