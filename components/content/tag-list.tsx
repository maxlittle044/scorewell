import Link from "next/link";
import { tagLabel } from "@/lib/content/tags";

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;

  return (
    <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-5">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">Topics</span>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-brand-50 hover:text-brand-700"
        >
          {tagLabel(tag)}
        </Link>
      ))}
    </div>
  );
}
