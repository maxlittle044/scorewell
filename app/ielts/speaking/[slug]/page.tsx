import Link from "next/link";
import { SpeakingRecorder } from "@/components/content/speaking-recorder";
import { TagList } from "@/components/content/tag-list";
import { getSpeakingTest } from "@/lib/content/speaking";
import { titleFromSlug } from "@/lib/slug";

export default async function SpeakingTestPage({
  params,
}: PageProps<"/ielts/speaking/[slug]">) {
  const { slug } = await params;
  const test = await getSpeakingTest(slug);

  if (!test) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This test isn&apos;t available yet.{" "}
            <Link href="/ielts/speaking" className="font-medium text-brand-600 hover:underline">
              Browse all speaking tests
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const isCueCard = test.part === "part2";

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-xl font-bold text-zinc-900">{test.title}</h1>

        {isCueCard ? (
          <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="mb-2 text-sm font-medium text-zinc-800">{test.questions[0]}</p>
            {test.cueCardPoints && (
              <>
                <p className="mb-1 text-sm text-zinc-700">You should say:</p>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-zinc-700">
                  {test.cueCardPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-3 text-sm text-zinc-600">{test.guidance}</p>
          </div>
        ) : (
          <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-zinc-800">
              {test.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-zinc-600">{test.guidance}</p>
          </div>
        )}

        <SpeakingRecorder />

        <p className="mt-4 text-center text-sm text-zinc-500">
          Want AI feedback on an answer?{" "}
          <Link
            href="/tools/speaking-part1-checker"
            className="font-medium text-brand-600 hover:underline"
          >
            Use the speaking checker
          </Link>
          .
        </p>

        <TagList tags={test.tags} />
      </div>
    </main>
  );
}
