import type { Metadata } from "next";
import Link from "next/link";
import { DictationPractice } from "@/components/content/dictation-practice";
import { TagList } from "@/components/content/tag-list";
import {
  estimateDuration,
  getDictationExercise,
  listDictationExercises,
} from "@/lib/content/dictation";
import { titleFromSlug } from "@/lib/slug";

export async function generateStaticParams() {
  const exercises = await listDictationExercises();
  return exercises.map((exercise) => ({ slug: exercise.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/dictation-shadowing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const exercise = await getDictationExercise(slug);
  return {
    title: `${exercise?.title ?? titleFromSlug(slug)} — ScoreWell`,
    description: exercise?.intro,
  };
}

export default async function DictationPage({
  params,
}: PageProps<"/dictation-shadowing/[slug]">) {
  const { slug } = await params;
  const exercise = await getDictationExercise(slug);

  if (!exercise) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This passage isn&apos;t available yet.{" "}
            <Link
              href="/dictation-shadowing"
              className="font-medium text-link hover:underline"
            >
              Browse all passages
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-link">
            {exercise.level}
          </span>
          {exercise.topic && <span>{exercise.topic}</span>}
          <span>·</span>
          <span>about {estimateDuration(exercise.segments)} of audio</span>
        </div>

        <h1 className="mb-3 text-2xl font-bold text-ink">{exercise.title}</h1>
        <p className="mb-6 text-sm leading-relaxed text-ink-body">{exercise.intro}</p>

        <div className="mb-8 rounded-xl border-l-2 border-brand-200 bg-brand-50/40 py-3 pl-4 pr-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-link">
            What to listen for
          </p>
          <p className="text-sm leading-relaxed text-ink-body">{exercise.listeningFocus}</p>
        </div>

        <DictationPractice segments={exercise.segments} />

        <TagList tags={exercise.tags} />
      </div>
    </main>
  );
}
