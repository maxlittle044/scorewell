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
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This test isn&apos;t available yet.{" "}
            <Link href="/ielts/writing" className="font-medium text-link hover:underline">
              Browse all writing tests
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
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink">{test.title}</h1>
          {test.minutes > 0 && <CountdownTimer minutes={test.minutes} />}
        </div>

        <div className="mb-6 rounded-xl border border-line bg-surface-muted p-5">
          <p className="text-sm leading-relaxed text-ink">{test.prompt}</p>
          <p className="mt-3 text-sm text-ink-body">{test.instructions}</p>
          <p className="mt-3 text-xs text-ink-muted">Write at least {test.minWords} words.</p>
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
