import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { listConversationTopics } from "@/lib/content/ai-conversations";

export const metadata: Metadata = {
  title: "AI Conversations — ScoreWell",
  description:
    "Practise IELTS Speaking with an AI examiner that asks real follow-up questions, then scores what you said.",
};

export default async function AiConversationsIndexPage() {
  const topics = await listConversationTopics();

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="AI conversation practice"
          description="Talk through real speaking topics and get feedback as you go."
        />

        {topics.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No conversation topics have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/ai-conversations/${topic.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {topic.part}
                </span>
                <h3 className="mt-1 font-semibold text-zinc-900 group-hover:text-brand-600">
                  {topic.title}
                </h3>
                <p className="mt-1.5 text-sm text-zinc-500">{topic.blurb}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
