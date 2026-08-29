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
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/tags" className="text-sm font-medium text-brand-600 hover:underline">
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
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-zinc-500">
              Nothing is tagged &ldquo;{tagLabel(tag)}&rdquo; yet.{" "}
              <Link href="/tags" className="font-medium text-brand-600 hover:underline">
                Browse all topics
              </Link>
              .
            </p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white">
            {items.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-50">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-900">{item.title}</p>
                    {item.meta && <p className="mt-0.5 text-sm text-zinc-500">{item.meta}</p>}
                  </div>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
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
