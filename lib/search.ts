import { prisma } from "@/lib/prisma";
import { NAV_ITEMS } from "@/lib/nav-data";
import { CONTENT_TYPE_LABELS, hrefForContentItem } from "@/lib/content/tags";

export type SearchResult = {
  title: string;
  href: string;
  kind: string;
  excerpt?: string;
};

/** Flattens the mega-menu into a searchable list of site pages and tools. */
function allNavLinks(): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = [];
  for (const item of NAV_ITEMS) {
    if (item.type === "link") {
      links.push({ label: item.label, href: item.href });
    } else {
      for (const column of item.columns) {
        links.push(...column.links);
      }
    }
  }
  return links;
}

export async function search(query: string): Promise<SearchResult[]> {
  const q = query.trim();
  if (!q) return [];

  const items = await prisma.contentItem.findMany({
    where: {
      published: true,
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { topic: { contains: q, mode: "insensitive" } },
        { sourceTestSet: { contains: q, mode: "insensitive" } },
        { taskType: { contains: q, mode: "insensitive" } },
        { tags: { has: q.toLowerCase() } },
      ],
    },
    take: 25,
    orderBy: { updatedAt: "desc" },
  });

  const contentResults: SearchResult[] = items.map((item) => ({
    title: item.title,
    href: hrefForContentItem(item),
    kind: CONTENT_TYPE_LABELS[item.contentType] ?? "Content",
    excerpt: [item.sourceTestSet, item.topic].filter(Boolean).join(" · ") || undefined,
  }));

  const lower = q.toLowerCase();
  const pageResults: SearchResult[] = allNavLinks()
    .filter((link) => link.label.toLowerCase().includes(lower))
    .map((link) => ({ title: link.label, href: link.href, kind: "Page" }));

  return [...contentResults, ...pageResults];
}
