import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { OverallBandCalculator } from "@/components/tools/overall-band-calculator";

export const metadata: Metadata = {
  title: "Overall Band Calculator — ScoreWell",
};

export default function OverallBandCalculatorPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Overall band calculator" description="Enter your four skill bands to estimate your overall score." />
        <OverallBandCalculator />
      </div>
    </main>
  );
}
