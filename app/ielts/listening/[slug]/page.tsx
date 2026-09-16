import Link from "next/link";
import { ListeningExam } from "@/components/content/listening-exam";
import { TagList } from "@/components/content/tag-list";
import { getListeningTest } from "@/lib/content/listening";
import { allQuestions, toGroups } from "@/lib/exam/schema";
import { titleFromSlug } from "@/lib/slug";

export default async function ListeningTestPage({
  params,
}: PageProps<"/ielts/listening/[slug]">) {
  const { slug } = await params;
  const test = await getListeningTest(slug);

  if (!test) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This test isn&apos;t available yet — we&apos;re still adding content. Try{" "}
            <Link href="/ielts/listening/practice-set-1" className="font-medium text-link hover:underline">
              Listening Practice Set 1
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      </main>
    );
  }

  // Scaled from the real 40-question / 30-minute paper, so a short single-section practice
  // set and a full 4-section test each get a proportional clock rather than one fixed value.
  const questionCount = allQuestions(toGroups(test.questionSet)).length;
  const durationMinutes = Math.max(10, Math.round((questionCount / 40) * 30));

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="font-display mb-6 text-2xl font-bold text-ink">{test.title}</h1>

        <ListeningExam
          questionSet={test.questionSet}
          title={test.title}
          contentItemId={test.id}
          transcript={test.transcript}
          audioLabel={test.audioLabel}
          durationMinutes={durationMinutes}
        />

        <p className="mt-6 text-sm text-ink-muted">
          Prefer paper?{" "}
          <Link href={`/print/${slug}`} className="font-medium text-link hover:underline">
            Print this test
          </Link>{" "}
          or save it as a PDF.
        </p>

        <TagList tags={test.tags} />
      </div>
    </main>
  );
}
