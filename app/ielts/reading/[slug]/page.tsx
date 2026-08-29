import Link from "next/link";
import { ExamRunner } from "@/components/exam/exam-runner";
import { TagList } from "@/components/content/tag-list";
import { getReadingTest } from "@/lib/content/reading";
import { titleFromSlug } from "@/lib/slug";

export default async function ReadingTestPage({
  params,
}: PageProps<"/ielts/reading/[slug]">) {
  const { slug } = await params;
  const test = await getReadingTest(slug);

  if (!test) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This test isn&apos;t available yet — we&apos;re still adding content. Try{" "}
            <Link href="/ielts/reading/academic-test-1" className="font-medium text-brand-600 hover:underline">
              Academic Reading Test 1
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display mb-6 text-2xl font-bold text-zinc-900">{test.title}</h1>

        <ExamRunner
          questionSet={test.questionSet}
          passage={test.passage}
          passageLabel="Reading passage"
          skill="READING"
          title={test.title}
          contentItemId={test.id}
          durationMinutes={test.durationMinutes ?? 20}
        />

        <TagList tags={test.tags} />
      </div>
    </main>
  );
}
