import Link from "next/link";
import { AudioPlaceholder } from "@/components/content/audio-placeholder";
import { CountdownTimer } from "@/components/content/countdown-timer";
import { Quiz } from "@/components/content/quiz";
import { TagList } from "@/components/content/tag-list";
import { getListeningTest } from "@/lib/content/listening";
import { titleFromSlug } from "@/lib/slug";

export default async function ListeningTestPage({
  params,
}: PageProps<"/ielts/listening/[slug]">) {
  const { slug } = await params;
  const test = await getListeningTest(slug);

  if (!test) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This test isn&apos;t available yet — we&apos;re still adding content. Try{" "}
            <Link href="/ielts/listening/practice-set-1" className="font-medium text-brand-600 hover:underline">
              Listening Practice Set 1
            </Link>{" "}
            in the meantime.
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
          <CountdownTimer minutes={10} />
        </div>

        <AudioPlaceholder label={test.audioLabel} />

        <details className="mb-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <summary className="cursor-pointer text-sm font-medium text-zinc-700">
            Show transcript
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700">{test.transcript}</p>
        </details>

        <Quiz questions={test.questions} skill="LISTENING" title={test.title} contentItemId={test.id} />

        <TagList tags={test.tags} />
      </div>
    </main>
  );
}
