import type { Metadata } from "next";
import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { getBandNineSample } from "@/lib/content/samples";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/ielts/band-9-samples/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sample = await getBandNineSample(slug);
  return { title: `${sample?.title ?? titleFromSlug(slug)} — Band 9 sample — ScoreWell` };
}

const CRITERIA_LABEL: Record<string, string> = {
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

export default async function BandNineSamplePage({
  params,
}: PageProps<"/ielts/band-9-samples/[slug]">) {
  const { slug } = await params;
  const sample = await getBandNineSample(slug);

  if (!sample) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This sample isn&apos;t available yet.{" "}
            <Link
              href="/ielts/band-9-samples"
              className="font-medium text-link hover:underline"
            >
              Browse all band-9 samples
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const isSpeaking = sample.skill === "SPEAKING";

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-link">
            Band 9
          </span>
          {sample.skill && (
            <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-ink-body">
              {CRITERIA_LABEL[sample.skill] ?? sample.skill}
            </span>
          )}
          {sample.taskType && (
            <span className="rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-ink-body">
              {sample.taskType}
            </span>
          )}
        </div>

        <h1 className="mb-6 text-2xl font-bold text-ink">{sample.title}</h1>

        <div className="mb-8 rounded-xl border border-line bg-surface-muted p-5">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {isSpeaking ? "Question" : "Task"}
          </p>
          <p className="text-sm leading-relaxed text-ink-body">{sample.prompt}</p>
        </div>

        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Model answer
        </h2>
        <article className="whitespace-pre-line text-sm leading-relaxed text-ink-body">
          {sample.answer}
        </article>

        <h2 className="mb-3 mt-10 text-sm font-semibold uppercase tracking-wide text-ink-muted">
          Why this scores band 9
        </h2>
        <div className="flex flex-col gap-4">
          {sample.examinerNotes.map((note) => (
            <div key={note.criterion} className="rounded-xl border border-line p-4">
              <p className="text-sm font-semibold text-ink">{note.criterion}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-body">{note.note}</p>
            </div>
          ))}
        </div>

        <TagList tags={sample.tags} />
      </div>
    </main>
  );
}
