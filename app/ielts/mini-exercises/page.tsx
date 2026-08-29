import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Mini Exercises — ScoreWell",
};

const EXERCISES = [
  { tag: "Vocabulary", title: "Word choice: formal vs informal register", meta: "2 min · 3 questions", slug: "formal-vs-informal-register" },
  { tag: "Grammar", title: "Articles: a, an, the, or nothing?", meta: "2 min · 3 questions", slug: "articles-practice" },
  { tag: "Listening", title: "Catch the number: prices and dates", meta: "3 min · 3 questions", slug: "catch-the-number" },
  { tag: "Reading", title: "Skimming for the main idea", meta: "2 min · 3 questions", slug: "skimming-main-idea" },
];

export default function MiniExercisesIndexPage() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Mini exercises"
          description="Short, low-commitment practice — a few minutes, a few questions."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {EXERCISES.map((exercise) => (
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
