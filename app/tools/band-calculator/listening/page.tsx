import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ScoreBandCalculator } from "@/components/tools/score-band-calculator";

export const metadata: Metadata = {
  title: "Listening Band Calculator — ScoreWell",
};

export default function ListeningBandCalculatorPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Listening band calculator" description="Convert your raw listening score into an estimated band." />
        <ScoreBandCalculator />
      </div>
    </main>
  );
}
