import type { Metadata } from "next";
import { AiTextTool } from "@/components/tools/ai-text-tool";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Paraphraser — ScoreWell",
};

export default function ParaphraserPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Paraphraser"
          description="Rewrite a sentence or paragraph with different wording, without losing the meaning."
        />
        <AiTextTool
          kind="paraphraser"
          inputLabel="Text to paraphrase"
          placeholder="Paste a sentence or short paragraph..."
          actionLabel="Paraphrase"
        />
      </div>
    </main>
  );
}
