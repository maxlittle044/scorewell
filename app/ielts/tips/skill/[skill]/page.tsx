import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import {
  TIP_SKILLS,
  TIP_SKILL_LABELS,
  isTipSkill,
  listTipsBySkill,
} from "@/lib/content/tips";

/**
 * Static `skill` segment sits alongside the `[slug]` article route at the same
 * level — Next resolves the static folder first, so `/ielts/tips/<article>`
 * still reaches the article page.
 */
export function generateStaticParams() {
  return TIP_SKILLS.map((skill) => ({ skill }));
}

export async function generateMetadata({
  params,
}: PageProps<"/ielts/tips/skill/[skill]">): Promise<Metadata> {
  const { skill } = await params;
  if (!isTipSkill(skill)) return {};

  const label = TIP_SKILL_LABELS[skill];
  return {
    title: `${label} Tips — ScoreWell`,
    description: `Short, practical IELTS ${label.toLowerCase()} advice.`,
  };
}

export default async function TipsBySkillPage({
  params,
}: PageProps<"/ielts/tips/skill/[skill]">) {
  const { skill } = await params;
  if (!isTipSkill(skill)) notFound();

  const tips = await listTipsBySkill(skill);
  const label = TIP_SKILL_LABELS[skill];

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title={`${label} tips`}
          description={`Short, practical advice for the ${label.toLowerCase()} part of the exam.`}
        />

        <div className="mb-10 flex flex-wrap gap-2.5">
          <Link
            href="/ielts/tips"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-300"
          >
            All tips
          </Link>
          {TIP_SKILLS.map((value) => (
            <Link
              key={value}
              href={`/ielts/tips/skill/${value}`}
              className={
                value === skill
                  ? "rounded-full border border-brand-600 bg-brand-600 px-4 py-2 text-sm font-semibold text-white"
                  : "rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-brand-300"
              }
            >
              {TIP_SKILL_LABELS[value]}
            </Link>
          ))}
        </div>

        {tips.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No {label.toLowerCase()} tips published yet.
          </p>
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
