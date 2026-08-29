import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getAllTags, tagLabel } from "@/lib/content/tags";

export const metadata: Metadata = {
  title: "Browse by topic — ScoreWell",
  description: "Browse ScoreWell practice tests and materials by topic and tag.",
};

export default async function TagsIndexPage() {
  const tags = await getAllTags();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Browse by topic"
          description="Every practice item is tagged by skill, topic, and test set — pick a tag to see everything filed under it."
        />

        {tags.length === 0 ? (
          <p className="text-sm text-ink-muted">No tagged content yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-body hover:border-brand-300 hover:text-link"
              >
                {tagLabel(tag)}
                <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-ink-muted">
                  {count}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
