import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { WritingEditor } from "@/components/content/writing-editor";
import { getWritingItem } from "@/lib/content/writing";
import { titleFromSlug } from "@/lib/slug";

export default async function WritingExercisePage({
  params,
}: PageProps<"/writing-exercises/[slug]">) {
  const { slug } = await params;
  const exercise = await getWritingItem(slug, "exercise");

  if (!exercise) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This exercise isn&apos;t available yet.{" "}
            <Link href="/writing-exercises" className="font-medium text-brand-600 hover:underline">
              Browse all writing exercises
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-xl font-bold text-zinc-900">{exercise.title}</h1>

        <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm leading-relaxed text-zinc-800">{exercise.prompt}</p>
          <p className="mt-3 text-sm text-zinc-600">{exercise.instructions}</p>
          <p className="mt-3 text-xs text-zinc-500">Aim for at least {exercise.minWords} words.</p>
        </div>

        <WritingEditor
          minWords={exercise.minWords}
          taskType={exercise.taskType}
          examPrompt={exercise.prompt}
          title={exercise.title}
          contentItemId={exercise.id}
        />

        <TagList tags={exercise.tags} />
      </div>
    </main>
  );
}
