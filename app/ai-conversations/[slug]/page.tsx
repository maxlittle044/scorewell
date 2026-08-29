import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AiConversation } from "@/components/tools/ai-conversation";
import { TagList } from "@/components/content/tag-list";
import {
  getConversationTopic,
  listConversationTopics,
} from "@/lib/content/ai-conversations";
import {
  ChatMessagesSchema,
  MAX_LEARNER_TURNS,
  countLearnerTurns,
  type ConversationFeedback,
} from "@/lib/ai/conversation";
import type { ConversationState } from "@/lib/ai/conversation-actions";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/ai-conversations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const topic = await getConversationTopic(slug);
  return {
    title: `${topic?.title ?? titleFromSlug(slug)} — AI conversation — ScoreWell`,
    description: topic?.blurb,
  };
}

/** Picks up the learner's most recent conversation on this topic, if any. */
async function resumeState(userId: string, slug: string): Promise<ConversationState> {
  const conversation = await prisma.conversation.findFirst({
    where: { userId, slug },
    orderBy: { updatedAt: "desc" },
  });
  if (!conversation) return {};

  const parsed = ChatMessagesSchema.safeParse(conversation.messages);
  if (!parsed.success) return {};

  const turnsUsed = countLearnerTurns(parsed.data);
  return {
    conversationId: conversation.id,
    messages: parsed.data,
    turnsUsed,
    turnsRemaining: Math.max(0, MAX_LEARNER_TURNS - turnsUsed),
    feedback: (conversation.feedback as ConversationFeedback | null) ?? undefined,
  };
}

export default async function AiConversationPage({
  params,
}: PageProps<"/ai-conversations/[slug]">) {
  const { slug } = await params;
  const [topic, session] = await Promise.all([getConversationTopic(slug), auth()]);

  if (!topic) {
    const others = await listConversationTopics();
    return (
      <main className="flex flex-1 flex-col bg-surface-muted">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This conversation topic isn&apos;t available yet.{" "}
            <Link href="/ai-conversations" className="font-medium text-link hover:underline">
              Browse all {others.length} topics
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const initial = session?.user ? await resumeState(session.user.id, slug) : {};

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-link">
            Speaking {topic.part}
          </span>
          <span>up to {MAX_LEARNER_TURNS} turns</span>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-ink">{topic.title}</h1>
        <p className="mb-6 text-sm text-ink-body">{topic.blurb}</p>

        <AiConversation slug={slug} initial={initial} signedIn={Boolean(session?.user)} />

        <section className="mt-8 rounded-2xl border border-line bg-surface p-5">
          <h2 className="mb-2.5 text-sm font-semibold uppercase tracking-wide text-ink-muted">
            Language to aim for
          </h2>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink-body">
            {topic.targetLanguage.map((item, i) => (
              <li key={i} className="border-l-2 border-brand-200 pl-3">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <TagList tags={topic.tags} />
      </div>
    </main>
  );
}
