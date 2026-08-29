import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Platform announcements (site-build-prompt.md section 4b).
 *
 * ARTICLEs split off by taskType "announcement", the same pattern tips, topic banks and
 * grammar points use, so this needed no schema change.
 */

export const ANNOUNCEMENT_TASK_TYPE = "announcement";

const AnnouncementDataSchema = z.object({
  date: z.string(),
  kind: z.enum(["New", "Improved", "Fixed"]),
  body: z.array(z.string()).min(1),
  link: z.object({ href: z.string(), label: z.string() }).optional(),
});

export type Announcement = {
  slug: string;
  title: string;
  date: string;
  kind: "New" | "Improved" | "Fixed";
  body: string[];
  link?: { href: string; label: string };
  tags: string[];
};

/**
 * Newest first.
 *
 * Ordered on the stored `date` rather than `createdAt`: reseeding rewrites createdAt for
 * everything at once, which would scramble the feed into seed order.
 */
export async function listAnnouncements(limit?: number): Promise<Announcement[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "ARTICLE",
      taskType: ANNOUNCEMENT_TASK_TYPE,
      published: true,
    },
    select: { slug: true, title: true, tags: true, data: true },
  });

  const parsed = items.flatMap((item) => {
    const result = AnnouncementDataSchema.safeParse(item.data);
    if (!result.success) return [];
    return [{ slug: item.slug, title: item.title, tags: item.tags, ...result.data }];
  });

  parsed.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return limit ? parsed.slice(0, limit) : parsed;
}

/** Formats the stored ISO date for display, falling back to the raw string if it's odd. */
export function formatAnnouncementDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
