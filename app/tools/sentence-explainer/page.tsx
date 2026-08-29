import type { Metadata } from "next";
import { AiTextTool } from "@/components/tools/ai-text-tool";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Sentence Explainer — ScoreWell",
};

export default function SentenceExplainerPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Sentence explainer"
          description="Don't understand a sentence? Paste it and get a plain-English breakdown."
        />
        <AiTextTool
          kind="sentence-explainer"
          inputLabel="Sentence to explain"
          placeholder="Paste a sentence you don't fully understand..."
          actionLabel="Explain"
          rows={4}
        />
      </div>
    </main>
  );
}
