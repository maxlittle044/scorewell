import type { Metadata } from "next";
import { AiTextTool } from "@/components/tools/ai-text-tool";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Summarizer — ScoreWell",
};

export default function SummarizerPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Summarizer"
          description="Condense a long passage into a short summary — useful for reading practice."
        />
        <AiTextTool
          kind="summarizer"
          inputLabel="Text to summarize"
          placeholder="Paste a passage or article..."
          actionLabel="Summarize"
          rows={10}
        />
      </div>
    </main>
  );
}
