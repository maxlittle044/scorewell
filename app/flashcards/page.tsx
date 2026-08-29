import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FlashcardsDeck } from "@/components/tools/flashcards-deck";

export const metadata: Metadata = {
  title: "Flashcards — ScoreWell",
};

export default function FlashcardsPage() {
  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Flashcards" description="Academic vocabulary that shows up often in Task 2 essays and Part 3 discussions." />
        <FlashcardsDeck />
      </div>
    </main>
  );
}
