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
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This exercise isn&apos;t available yet.{" "}
            <Link href="/writing-exercises" className="font-medium text-link hover:underline">
              Browse all writing exercises
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-xl font-bold text-ink">{exercise.title}</h1>

        <div className="mb-6 rounded-xl border border-line bg-surface-muted p-5">
          <p className="text-sm leading-relaxed text-ink">{exercise.prompt}</p>
          <p className="mt-3 text-sm text-ink-body">{exercise.instructions}</p>
          <p className="mt-3 text-xs text-ink-muted">Aim for at least {exercise.minWords} words.</p>
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
