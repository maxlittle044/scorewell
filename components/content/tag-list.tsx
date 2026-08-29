import Link from "next/link";
import { tagLabel } from "@/lib/content/tags";

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-line pt-5">
      <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">Topics</span>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className="rounded-full bg-surface-sunken px-3 py-1 text-xs font-medium text-ink-body hover:bg-brand-50 hover:text-link"
        >
          {tagLabel(tag)}
        </Link>
      ))}
    </div>
  );
}
