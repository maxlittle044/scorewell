import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { WritingChecker } from "@/components/tools/writing-checker";

export const metadata: Metadata = {
  title: "Writing Task 1 (Academic) Checker — ScoreWell",
};

export default function WritingTask1AcademicPage() {
  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Writing Task 1 (Academic) checker"
          description="Get feedback on a report describing a chart, graph, table, or process — or generate a sample answer."
        />
        <WritingChecker minWords={150} taskType="task1-academic" />
      </div>
    </main>
  );
}
