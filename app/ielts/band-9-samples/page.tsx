import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { listBandNineSamples } from "@/lib/content/samples";

export const metadata: Metadata = {
  title: "Band-9 Sample Answers — ScoreWell",
  description:
    "Model band-9 IELTS writing and speaking answers, with examiner notes explaining why each one scores.",
};

const SKILL_LABEL: Record<string, string> = {
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

export default async function BandNineSamplesIndexPage() {
  const samples = await listBandNineSamples();

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Band-9 sample answers"
          description="Model writing and speaking responses, broken down by scoring criteria."
        />

        {samples.length === 0 ? (
          <p className="text-sm text-zinc-500">No samples published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((sample) => (
              <ContentCard
                key={sample.slug}
                tag={sample.taskType ?? "Sample"}
                title={sample.title}
                meta={`Band 9 · ${sample.skill ? (SKILL_LABEL[sample.skill] ?? sample.skill) : ""}`}
                href={`/ielts/band-9-samples/${sample.slug}`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
