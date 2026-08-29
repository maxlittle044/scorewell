import Link from "next/link";
import { listDictationExercises } from "@/lib/content/dictation";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_HOVER_CLASS } from "@/components/ui/card";

function WaveformIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M4 14v0M8 10v8M12 6v16M16 9v10M20 12v4M24 14v0"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const LEVEL_GRADIENTS: Record<string, string> = {
  Beginner: "from-sky-500 to-brand-600",
  Intermediate: "from-brand-500 to-pop-600",
  Advanced: "from-pop-500 to-pop-700",
};

export async function DictationCarousel() {
  const stories = await listDictationExercises();
  if (stories.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Dictation & shadowing"
          description="Listen, transcribe, and repeat short stories to build listening and speaking together."
          viewAllHref="/dictation-shadowing"
          viewAllLabel="View all stories"
        />

        <div data-reveal className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/dictation-shadowing/${story.slug}`}
              className={`group w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-zinc-200/80 bg-white ${CARD_HOVER_CLASS}`}
            >
              <div className={`flex h-28 items-center justify-center bg-linear-to-br ${LEVEL_GRADIENTS[story.level] ?? "from-zinc-500 to-zinc-700"}`}>
                <WaveformIcon />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{story.level}</span>
                  <span>{story.duration}</span>
                </div>
                <h3 className="mt-1.5 font-semibold text-zinc-900 group-hover:text-brand-600">
                  {story.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
