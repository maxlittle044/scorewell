import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { listDictationExercises } from "@/lib/content/dictation";

export const metadata: Metadata = {
  title: "Dictation & Shadowing — ScoreWell",
  description:
    "Listen, transcribe line by line, and shadow short passages to build listening accuracy and speaking fluency together.",
};

const LEVEL_GRADIENTS: Record<string, string> = {
  Beginner: "from-sky-500 to-sky-700",
  Intermediate: "from-brand-500 to-brand-700",
  Advanced: "from-violet-500 to-violet-700",
};

export default async function DictationIndexPage() {
  const exercises = await listDictationExercises();

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Dictation & shadowing"
          description="Listen, transcribe, and repeat short stories to build listening and speaking together."
        />

        {exercises.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No passages have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise) => (
              <Link
                key={exercise.slug}
                href={`/dictation-shadowing/${exercise.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`h-24 bg-gradient-to-br ${
                    LEVEL_GRADIENTS[exercise.level] ?? "from-zinc-500 to-zinc-700"
                  }`}
                />
                <div className="flex flex-1 flex-col bg-white p-4">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{exercise.level}</span>
                    <span>{exercise.duration}</span>
                  </div>
                  <h3 className="mt-1.5 font-semibold text-zinc-900 group-hover:text-brand-600">
                    {exercise.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{exercise.intro}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
