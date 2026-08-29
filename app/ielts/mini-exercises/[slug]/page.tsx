import Link from "next/link";
import { Quiz } from "@/components/content/quiz";
import { TagList } from "@/components/content/tag-list";
import { getQuizContent } from "@/lib/content/quiz-content";
import { titleFromSlug } from "@/lib/slug";

export default async function MiniExercisePage({
  params,
}: PageProps<"/ielts/mini-exercises/[slug]">) {
  const { slug } = await params;
  const exercise = await getQuizContent(slug, "mini-exercise");

  if (!exercise) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This exercise isn&apos;t available yet.{" "}
            <Link
              href="/ielts/mini-exercises"
              className="font-medium text-brand-600 hover:underline"
            >
              Browse all mini exercises
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-xl font-bold text-zinc-900">{exercise.title}</h1>
        <Quiz questions={exercise.questions} title={exercise.title} contentItemId={exercise.id} />
        <TagList tags={exercise.tags} />
      </div>
    </main>
  );
}
