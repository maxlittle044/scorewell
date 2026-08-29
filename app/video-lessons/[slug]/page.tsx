import type { Metadata } from "next";
import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { VideoPlayer } from "@/components/content/video-player";
import { getVideoLesson, listVideoLessons } from "@/lib/content/video-lessons";
import { titleFromSlug } from "@/lib/slug";

export async function generateStaticParams() {
  const lessons = await listVideoLessons();
  return lessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/video-lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getVideoLesson(slug);
  return {
    title: `${lesson?.title ?? titleFromSlug(slug)} — ScoreWell`,
    description: lesson?.summary,
  };
}

export default async function VideoLessonPage({
  params,
}: PageProps<"/video-lessons/[slug]">) {
  const { slug } = await params;
  const lesson = await getVideoLesson(slug);

  if (!lesson) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This lesson isn&apos;t available yet.{" "}
            <Link href="/video-lessons" className="font-medium text-brand-600 hover:underline">
              Browse all lessons
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          {lesson.topic && (
            <span className="rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand-700">
              {lesson.topic}
            </span>
          )}
          <span>{lesson.lessonMinutes} min lesson</span>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-zinc-900">{lesson.title}</h1>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600">{lesson.summary}</p>

        <VideoPlayer video={lesson.video} title={lesson.title} />

        <section className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            What you&apos;ll take away
          </h2>
          <ul className="flex flex-col gap-2 text-sm leading-relaxed text-zinc-700">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="border-l-2 border-brand-200 pl-3">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Full lesson
          </h2>
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-zinc-700">
            {lesson.transcript.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        <TagList tags={lesson.tags} />
      </div>
    </main>
  );
}
