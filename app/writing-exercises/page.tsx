import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { listWritingItems } from "@/lib/content/writing";

export const metadata: Metadata = {
  title: "Writing Exercises — ScoreWell",
};

const TASK_TYPE_LABELS: Record<string, string> = {
  "task1-academic": "Writing Task 1 (Academic)",
  "task1-general": "Writing Task 1 (General)",
  task2: "Writing Task 2",
};

export default async function WritingExercisesIndexPage() {
  const exercises = await listWritingItems("exercise");

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Writing exercises"
          description="Untimed practice with prompts based on real past exam questions."
        />

        {exercises.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
            No writing exercises have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {exercises.map((exercise) => (
              <ContentCard
                key={exercise.slug}
                tag={TASK_TYPE_LABELS[exercise.taskType] ?? "Writing"}
                title={exercise.title}
                meta={
                  exercise.minWords
                    ? `Practice prompt · ${exercise.minWords}+ words`
                    : "Practice prompt"
                }
                href={`/writing-exercises/${exercise.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
