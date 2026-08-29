import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { getAllTags, getItemsByTag, tagLabel } from "@/lib/content/tags";

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `${tagLabel(tag)} — ScoreWell`,
    description: `All ScoreWell practice tests and materials tagged ${tagLabel(tag)}.`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(({ tag }) => ({ tag }));
}

export default async function TagArchivePage({ params }: PageProps<"/tags/[tag]">) {
  const { tag } = await params;
  const items = await getItemsByTag(tag);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/tags" className="text-sm font-medium text-link hover:underline">
          ← All topics
        </Link>

        <div className="mt-4">
          <PageHeader
            title={tagLabel(tag)}
            description={
              items.length === 0
                ? undefined
                : `${items.length} item${items.length === 1 ? "" : "s"} tagged ${tagLabel(tag)}.`
            }
          />
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line-strong bg-surface px-6 py-10 text-center">
            <p className="text-sm text-ink-muted">
              Nothing is tagged &ldquo;{tagLabel(tag)}&rdquo; yet.{" "}
              <Link href="/tags" className="font-medium text-link hover:underline">
                Browse all topics
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-zinc-100 rounded-2xl border border-line bg-surface">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-muted">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    {item.meta && <p className="mt-0.5 text-sm text-ink-muted">{item.meta}</p>}
                  </div>
                  <span className="shrink-0 rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-ink-body">
                    {item.kind}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
