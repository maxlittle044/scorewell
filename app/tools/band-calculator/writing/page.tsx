import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { CriteriaBandCalculator } from "@/components/tools/criteria-band-calculator";

export const metadata: Metadata = {
  title: "Writing Band Calculator — ScoreWell",
};

export default function WritingBandCalculatorPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Writing band calculator" description="Score yourself (or a checker's feedback) against the four writing criteria." />
        <CriteriaBandCalculator
          criteria={["Task Response", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"]}
        />
      </div>
    </main>
  );
}
