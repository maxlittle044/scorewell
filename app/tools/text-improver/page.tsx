import type { Metadata } from "next";
import { AiTextTool } from "@/components/tools/ai-text-tool";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Text Improver — ScoreWell",
};

export default function TextImproverPage() {
  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Text improver"
          description="Get a stronger, more natural-sounding version of your writing."
        />
        <AiTextTool
          kind="text-improver"
          inputLabel="Text to improve"
          placeholder="Paste a sentence or paragraph..."
          actionLabel="Improve text"
          rows={8}
        />
      </div>
    </main>
  );
}
