import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { TtsTool } from "@/components/tools/tts-tool";

export const metadata: Metadata = {
  title: "Text-to-Speech — ScoreWell",
};

export default function TextToSpeechPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Text-to-speech"
          description="Hear any text read aloud — useful for practicing pronunciation and listening."
        />
        <TtsTool />
      </div>
    </main>
  );
}
