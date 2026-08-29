import { z } from "zod";
import { prisma } from "@/lib/prisma";

const DrillDataSchema = z.object({
  symbol: z.string(),
  kind: z.enum(["consonant", "vowel"]),
  exampleWord: z.string(),
  howTo: z.string(),
  commonError: z.string(),
  words: z.array(z.string()),
  minimalPairs: z.array(z.object({ target: z.string(), contrast: z.string() })),
  sentence: z.string(),
  tip: z.string(),
});

export type PronunciationDrill = z.infer<typeof DrillDataSchema> & {
  id: string;
  slug: string;
  title: string;
  tags: string[];
};

export async function getPronunciationDrill(
  slug: string
): Promise<PronunciationDrill | null> {
  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "PRONUNCIATION_DRILL", published: true },
  });
  if (!item) return null;

  const parsed = DrillDataSchema.safeParse(item.data);
  if (!parsed.success) return null;

  return { id: item.id, slug: item.slug, title: item.title, tags: item.tags, ...parsed.data };
}

export type PronunciationDrillSummary = {
  slug: string;
  symbol: string;
  kind: "consonant" | "vowel";
  exampleWord: string;
};

/** Index listing — only the fields the phoneme grid needs. */
export async function listPronunciationDrills(): Promise<PronunciationDrillSummary[]> {
  const items = await prisma.contentItem.findMany({
    where: { contentType: "PRONUNCIATION_DRILL", published: true },
    select: { slug: true, data: true },
  });

  return items.flatMap((item) => {
    const parsed = DrillDataSchema.safeParse(item.data);
    if (!parsed.success) return [];
    const { symbol, kind, exampleWord } = parsed.data;
    return [{ slug: item.slug, symbol, kind, exampleWord }];
  });
}
