import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { WritingChecker } from "@/components/tools/writing-checker";

export const metadata: Metadata = {
  title: "Writing Task 2 Checker — ScoreWell",
};

export default function WritingTask2Page() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Writing Task 2 checker"
          description="Get feedback on your essay — or generate a band-9 sample answer for any prompt."
        />
        <WritingChecker minWords={250} taskType="task2" />
      </div>
    </main>
  );
}
