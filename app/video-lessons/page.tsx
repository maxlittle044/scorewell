import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { listVideoLessons } from "@/lib/content/video-lessons";

export const metadata: Metadata = {
  title: "Video Lessons — ScoreWell",
  description:
    "Short, focused IELTS lessons — watch the video or read the full written lesson underneath.",
};

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="white" aria-hidden="true">
      <path d="M6 4l10 6-10 6V4z" />
    </svg>
  );
}

const TOPIC_GRADIENTS: Record<string, string> = {
  Grammar: "from-brand-600 to-brand-800",
  Speaking: "from-rose-600 to-rose-800",
  Writing: "from-emerald-600 to-emerald-800",
  Listening: "from-violet-600 to-violet-800",
};

export default async function VideoLessonsIndexPage() {
  const lessons = await listVideoLessons();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Video lessons"
          description="Short, focused lessons — watch the video or read the full written lesson underneath."
        />

        {lessons.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
            No lessons have been published yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <Link
                key={lesson.slug}
                href={`/video-lessons/${lesson.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`relative flex h-36 items-center justify-center bg-linear-to-br ${
                    TOPIC_GRADIENTS[lesson.topic ?? ""] ?? "from-zinc-600 to-zinc-800"
                  }`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors group-hover:bg-white/30">
                    <PlayIcon />
                  </span>
                  <span className="absolute bottom-2 right-2 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
                    {lesson.lessonMinutes} min
                  </span>
                  {lesson.isPlaceholderVideo && (
                    <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
                      Sample clip
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col bg-surface p-4">
                  <h3 className="font-semibold text-ink group-hover:text-link">
                    {lesson.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{lesson.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
