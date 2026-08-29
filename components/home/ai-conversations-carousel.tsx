import Link from "next/link";
import { listConversationTopics } from "@/lib/content/ai-conversations";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_LINK_CLASS } from "@/components/ui/card";

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M4 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}


export async function AiConversationsCarousel() {
  const topics = await listConversationTopics();
  if (topics.length === 0) return null;

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="AI conversation practice"
          description="Talk through real speaking topics and get feedback as you go."
          viewAllHref="/ai-conversations"
          viewAllLabel="View all topics"
        />

        <div data-reveal className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/ai-conversations/${topic.slug}`}
              className={`${CARD_LINK_CLASS} w-60 shrink-0 snap-start p-5`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-linear-to-br from-brand-50 to-pop-50 text-brand-600 transition-transform group-hover:scale-110">
                <ChatIcon />
              </span>
              <h3 className="mt-4 font-semibold text-zinc-900 group-hover:text-brand-600">
                {topic.title}
              </h3>
              <p className="mt-1.5 text-sm text-zinc-500">{topic.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
