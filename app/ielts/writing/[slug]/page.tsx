import Link from "next/link";
import { CountdownTimer } from "@/components/content/countdown-timer";
import { TagList } from "@/components/content/tag-list";
import { WritingEditor } from "@/components/content/writing-editor";
import { getWritingItem } from "@/lib/content/writing";
import { titleFromSlug } from "@/lib/slug";

export default async function WritingTestPage({
  params,
}: PageProps<"/ielts/writing/[slug]">) {
  const { slug } = await params;
  const test = await getWritingItem(slug, "test");

  if (!test) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This test isn&apos;t available yet.{" "}
            <Link href="/ielts/writing" className="font-medium text-brand-600 hover:underline">
              Browse all writing tests
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900">{test.title}</h1>
          {test.minutes > 0 && <CountdownTimer minutes={test.minutes} />}
        </div>

        <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm leading-relaxed text-zinc-800">{test.prompt}</p>
          <p className="mt-3 text-sm text-zinc-600">{test.instructions}</p>
          <p className="mt-3 text-xs text-zinc-500">Write at least {test.minWords} words.</p>
        </div>

        <WritingEditor
          minWords={test.minWords}
          taskType={test.taskType}
          examPrompt={test.prompt}
          title={test.title}
          contentItemId={test.id}
        />

        <TagList tags={test.tags} />
      </div>
    </main>
  );
}
