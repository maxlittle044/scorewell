import { z } from "zod";
import { prisma } from "@/lib/prisma";

const DictationDataSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  intro: z.string(),
  listeningFocus: z.string(),
  segments: z.array(z.string()),
});

export type DictationExercise = z.infer<typeof DictationDataSchema> & {
  id: string;
  slug: string;
  title: string;
  topic: string | null;
  tags: string[];
};

/**
 * Playback is speech synthesis rather than a recorded file, so the length is
 * estimated from the text instead of being a stored (and unverifiable) duration.
 */
export function estimateDuration(segments: string[]): string {
  const words = segments.join(" ").trim().split(/\s+/).length;
  const totalSeconds = Math.round((words / 140) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export async function getDictationExercise(slug: string): Promise<DictationExercise | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "DICTATION_SHADOWING", published: true },
  });
  if (!item) return null;

  const parsed = DictationDataSchema.safeParse(item.data);
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

export type DictationSummary = {
  slug: string;
  title: string;
  level: string;
  duration: string;
  intro: string;
};

export async function listDictationExercises(): Promise<DictationSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "DICTATION_SHADOWING", published: true },
    select: { slug: true, title: true, data: true },
  });

  return items.flatMap((item) => {
    const parsed = DictationDataSchema.safeParse(item.data);
    if (!parsed.success) return [];
    return [
      {
        slug: item.slug,
        title: item.title,
        level: parsed.data.level,
        duration: estimateDuration(parsed.data.segments),
        intro: parsed.data.intro,
      },
    ];
  });
}
