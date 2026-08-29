import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import Link from "next/link";
import { TIP_SKILLS, TIP_SKILL_LABELS, listTips } from "@/lib/content/tips";

export const metadata: Metadata = {
  title: "Tips — ScoreWell",
  description: "Short, practical IELTS advice for reading, writing, listening and speaking.",
};

export default async function TipsIndexPage() {
  const tips = await listTips();

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Tips" description="Short, practical advice for every part of the exam." />

        <div className="mb-10 flex flex-wrap gap-2.5">
          <span className="rounded-full border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-semibold text-white">
            All tips
          </span>
          {TIP_SKILLS.map((value) => (
            <Link
              key={value}
              href={`/ielts/tips/skill/${value}`}
              className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-300"
            >
              {TIP_SKILL_LABELS[value]}
            </Link>
          ))}
        </div>

        {tips.length === 0 ? (
          <p className="text-sm text-zinc-500">No articles published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip) => (
              <ContentCard
                key={tip.slug}
                tag={tip.topic ?? "Tips"}
                title={tip.title}
                meta={tip.readMinutes ? `${tip.readMinutes} min read` : ""}
                href={`/ielts/tips/${tip.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
