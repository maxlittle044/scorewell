import Link from "next/link";
import { listVideoLessons } from "@/lib/content/video-lessons";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_HOVER_CLASS } from "@/components/ui/card";

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
      <path d="M6 4l10 6-10 6V4z" />
    </svg>
  );
}

const TOPIC_GRADIENTS: Record<string, string> = {
  Grammar: "from-brand-600 to-brand-800",
  Speaking: "from-rose-600 to-pop-700",
  Writing: "from-emerald-600 to-brand-700",
  Listening: "from-pop-600 to-pop-800",
};


export async function VideoLessonsCarousel() {
  const videos = await listVideoLessons();
  if (videos.length === 0) return null;

  return (
    <section className="bg-surface-muted">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Video lessons"
          description="Short, focused lessons — watch the video or read the full written lesson."
          viewAllHref="/video-lessons"
          viewAllLabel="View all lessons"
        />

        <div data-reveal className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {videos.map((video) => (
            <Link
              key={video.slug}
              href={`/video-lessons/${video.slug}`}
              className={`group w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-line/80 bg-surface ${CARD_HOVER_CLASS}`}
            >
              <div className={`relative flex h-40 items-center justify-center bg-linear-to-br ${TOPIC_GRADIENTS[video.topic ?? ""] ?? "from-zinc-600 to-zinc-800"}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30">
                  <PlayIcon />
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
                  {video.lessonMinutes} min
                </span>
                {video.isPlaceholderVideo && (
                  <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
                    Sample clip
                  </span>
                )}
              </div>
              <div className="bg-surface p-4">
                <h3 className="font-semibold text-ink group-hover:text-link">
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
