import type { Metadata } from "next";
import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { getTip } from "@/lib/content/tips";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/ielts/tips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tip = await getTip(slug);
  return {
    title: `${tip?.title ?? titleFromSlug(slug)} — ScoreWell`,
    description: tip?.excerpt,
  };
}

export default async function TipPage({ params }: PageProps<"/ielts/tips/[slug]">) {
  const { slug } = await params;
  const tip = await getTip(slug);

  if (!tip) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This article isn&apos;t available yet.{" "}
            <Link href="/ielts/tips" className="font-medium text-brand-600 hover:underline">
              Browse all tips
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <article className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
          {tip.topic && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
              {tip.topic}
            </span>
          )}
          <span>{tip.readMinutes} min read</span>
        </div>

        <h1 className="mb-4 text-2xl font-bold text-zinc-900">{tip.title}</h1>
        <p className="mb-8 border-l-2 border-brand-200 pl-4 text-base leading-relaxed text-zinc-600">
          {tip.excerpt}
        </p>

        <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700">
          {tip.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <TagList tags={tip.tags} />
      </article>
    </main>
  );
}
