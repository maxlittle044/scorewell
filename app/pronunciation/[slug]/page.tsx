import type { Metadata } from "next";
import Link from "next/link";
import { SpeakingRecorder } from "@/components/content/speaking-recorder";
import { SpeakButton, SpeechUnsupportedNote } from "@/components/content/speak-button";
import { TagList } from "@/components/content/tag-list";
import {
  getPronunciationDrill,
  listPronunciationDrills,
} from "@/lib/content/pronunciation";
import { titleFromSlug } from "@/lib/slug";

export async function generateStaticParams() {
  const drills = await listPronunciationDrills();
  return drills.map((drill) => ({ slug: drill.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/pronunciation/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const drill = await getPronunciationDrill(slug);
  return {
    title: `${drill?.title ?? titleFromSlug(slug)} — ScoreWell`,
    description: drill?.howTo,
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-2.5 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function PronunciationDrillPage({
  params,
}: PageProps<"/pronunciation/[slug]">) {
  const { slug } = await params;
  const drill = await getPronunciationDrill(slug);

  if (!drill) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This drill isn&apos;t available yet.{" "}
            <Link href="/pronunciation" className="font-medium text-brand-600 hover:underline">
              Browse all sounds
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
        <div className="text-center">
          <p className="text-6xl font-bold text-brand-600">/{drill.symbol}/</p>
          <h1 className="mt-3 text-lg font-semibold text-zinc-900">{drill.title}</h1>
          <p className="mt-1 text-xs uppercase tracking-wide text-zinc-400">{drill.kind}</p>
          <div className="mt-5 flex justify-center">
            <SpeakButton text={drill.exampleWord} variant="primary">
              Hear “{drill.exampleWord}”
            </SpeakButton>
          </div>
        </div>

        <div className="mt-10">
          <SpeechUnsupportedNote />
        </div>

        <Section title="How to make the sound">
          <p className="text-sm leading-relaxed text-zinc-700">{drill.howTo}</p>
        </Section>

        <Section title="The mistake to avoid">
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            {drill.commonError}
          </p>
        </Section>

        <Section title="Practice words">
          <p className="mb-3 text-sm text-zinc-600">
            Tap any word to hear it, then say it back.
          </p>
          <div className="flex flex-wrap gap-2">
            {drill.words.map((word) => (
              <SpeakButton key={word} text={word} rate={0.85} />
            ))}
          </div>
        </Section>

        <Section title="Minimal pairs">
          <p className="mb-3 text-sm text-zinc-600">
            These pairs differ in this one sound only — if a listener can&apos;t tell them apart,
            the sound isn&apos;t there yet.
          </p>
          <ul className="flex flex-col gap-2">
            {drill.minimalPairs.map((pair) => (
              <li
                key={`${pair.target}-${pair.contrast}`}
                className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 p-3"
              >
                <SpeakButton text={pair.target} rate={0.85} />
                <span className="text-xs text-zinc-400">vs</span>
                <SpeakButton text={pair.contrast} rate={0.85} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Practice sentence">
          <p className="mb-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-base leading-relaxed text-zinc-800">
            {drill.sentence}
          </p>
          <div className="flex flex-wrap gap-2">
            <SpeakButton text={drill.sentence} variant="quiet">
              Listen
            </SpeakButton>
            <SpeakButton text={drill.sentence} rate={0.6} variant="quiet">
              Listen slowly
            </SpeakButton>
          </div>
        </Section>

        <Section title="Tip">
          <p className="border-l-2 border-brand-200 pl-4 text-sm leading-relaxed text-zinc-600">
            {drill.tip}
          </p>
        </Section>

        <Section title="Record yourself">
          <p className="mb-3 text-sm text-zinc-600">
            Say the practice sentence out loud and compare it with the audio above.
          </p>
          <SpeakingRecorder />
        </Section>

        <TagList tags={drill.tags} />
      </div>
    </main>
  );
}
