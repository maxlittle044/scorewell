import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/site/site-url";
import { indexableSectionPaths } from "@/lib/site/site-sections";

/**
 * The XML sitemap crawlers fetch, at `/sitemap.xml`. Distinct from `/sitemap`, which is the
 * page a person reads.
 *
 * The site's value is its content pages, and until this existed the only way for a crawler to
 * find any of them was to follow links from the home page. A sitemap does not guarantee
 * indexing, but its absence guarantees slow and partial discovery of exactly the pages the
 * business depends on.
 *
 * **No `priority` or `changeFrequency`.** Google ignores both, and inventing "0.8" for a tip
 * would be a made-up number in a file whose whole purpose is to be accurate. `lastModified`
 * is real — it comes from the row's `updatedAt`.
 */

/** Rebuilt hourly, so content published after a deploy still gets found. */
export const revalidate = 3600;

/**
 * Where a content row is actually reachable.
 *
 * This mapping is deliberately explicit rather than derived. Several content types share a
 * `contentType` and are told apart by `taskType` or `skill`, and some rows have no page of
 * their own at all — a topic pool is rendered inside `/topics/speaking/[part]`, not at a URL
 * of its own. Listing a URL that 404s is worse than omitting it, so anything without a
 * verified detail route returns null and is left out.
 */
function pathForItem(item: {
  slug: string;
  contentType: string;
  taskType: string | null;
  skill: string | null;
}): string | null {
  const { slug, contentType, taskType, skill } = item;

  switch (contentType) {
    case "PRACTICE_TEST": {
      // Split across four routes by skill, not by taskType — every practice test has a skill.
      const bySkill: Record<string, string> = {
        READING: "/ielts/reading",
        LISTENING: "/ielts/listening",
        WRITING: "/ielts/writing",
        SPEAKING: "/ielts/speaking",
      };
      const base = skill ? bySkill[skill] : undefined;
      return base ? `${base}/${slug}` : null;
    }

    case "ARTICLE": {
      // Articles fan out further than any other type. `/ielts/tips/[slug]` will happily serve
      // most of them, but a grammar point's real home is the grammar library — listing both
      // would put the same text at two URLs and split its own ranking.
      if (taskType === "grammar-point") return `/ielts/grammar/${slug}`;
      if (taskType === "study-abroad") return `/study-abroad/${slug}`;
      // Rendered inside a listing page, with no page of their own.
      if (taskType === "announcement" || taskType === "flashcard-deck") return null;
      if (taskType === "topic-bank" || taskType === "topic-pool") return null;
      return `/ielts/tips/${slug}`;
    }

    case "MINI_EXERCISE": {
      if (taskType === "grammar-test") return `/ielts/grammar-tests/${slug}`;
      // The placement diagnostic is one fixed page, not a per-slug one.
      if (taskType === "placement") return null;
      return `/ielts/mini-exercises/${slug}`;
    }

    case "VIDEO_LESSON":
      return taskType === "live-lesson" ? `/live-lessons/${slug}` : `/video-lessons/${slug}`;

    case "SAMPLE_ANSWER":
      return `/ielts/band-9-samples/${slug}`;
    case "COURSE":
      return `/courses/${slug}`;
    case "PRONUNCIATION_DRILL":
      return `/pronunciation/${slug}`;
    case "DICTATION_SHADOWING":
      return `/dictation-shadowing/${slug}`;
    case "WRITING_EXERCISE":
      return `/writing-exercises/${slug}`;
    case "AI_CONVERSATION":
      return `/ai-conversations/${slug}`;

    default:
      // A content type added later is left out rather than guessed at, which fails visibly
      // (a page missing from search) instead of silently (a sitemap full of 404s).
      return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await prisma.contentItem.findMany({
    where: { published: true },
    select: { slug: true, contentType: true, taskType: true, skill: true, updatedAt: true },
  });

  const content = items
    .map((item) => {
      const path = pathForItem(item);
      return path ? { url: absoluteUrl(path), lastModified: item.updatedAt } : null;
    })
    .filter((entry): entry is { url: string; lastModified: Date } => entry !== null);

  const sections = indexableSectionPaths().map((path) => ({ url: absoluteUrl(path) }));

  return [...sections, ...content];
}
