import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicBankView } from "@/components/content/topic-bank-view";
import { getTopicBank } from "@/lib/content/topic-banks";

export const metadata: Metadata = {
  title: "Writing Task 2 essay-question bank — ScoreWell",
  description:
    "Task 2 essay questions grouped by subject and marked with the essay type each one calls for, browsable without starting a timed test.",
};

export default async function EssayQuestionBankPage() {
  const bank = await getTopicBank("essay-question-bank");
  if (!bank) notFound();

  return <TopicBankView bank={bank} />;
}
