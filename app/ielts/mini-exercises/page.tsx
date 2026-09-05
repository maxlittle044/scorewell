import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { listQuizCards } from "@/lib/content/quiz-content";

export const metadata: Metadata = {
  title: "Mini Exercises — ScoreWell",
};

export default async function MiniExercisesIndexPage() {
  const exercises = await listQuizCards("mini-exercise");

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Mini exercises"
          description="Short, low-commitment practice — a few minutes, a few questions."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {exercises.map((exercise) => (
            <ContentCard
              key={exercise.slug}
              tag={exercise.tag}
              title={exercise.title}
              meta={exercise.meta}
              href={`/ielts/mini-exercises/${exercise.slug}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
