import type { Metadata } from "next";
import { ContentCard } from "@/components/content/content-card";
import { PageHeader } from "@/components/layout/page-header";
import { countQuestions, listTopicBanks } from "@/lib/content/topic-banks";

export const metadata: Metadata = {
  title: "Topic Banks — ScoreWell",
  description:
    "Browsable lists of IELTS Speaking topics and Task 2 essay questions, readable on their own without starting a timed test.",
};

export default async function TopicBanksIndexPage() {
  const banks = await listTopicBanks();

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Topic banks"
          description="Every Speaking topic and essay question we publish, in one browsable list — no timer, no scoring. Read a theme through, pick the questions you would struggle with, and take those into a practice test."
        />

        {banks.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No topic banks have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {banks.map((bank) => (
              <ContentCard
                key={bank.slug}
                tag={bank.topic ?? "Topic bank"}
                title={bank.title}
                meta={`${countQuestions(bank)} questions · ${bank.groups.length} themes`}
                href={bank.href}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
