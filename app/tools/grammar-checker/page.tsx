import type { Metadata } from "next";
import { AiTextTool } from "@/components/tools/ai-text-tool";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Grammar Checker — ScoreWell",
};

export default function GrammarCheckerPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Grammar checker"
          description="Not sure if a sentence is correct? Paste it and find out."
        />
        <AiTextTool
          kind="grammar-checker"
          inputLabel="Text to check"
          placeholder="Paste a sentence or paragraph to check for grammar mistakes..."
          actionLabel="Check grammar"
          rows={6}
        />
      </div>
    </main>
  );
}
