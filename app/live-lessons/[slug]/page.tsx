import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { LessonRegisterButton } from "@/components/content/lesson-register-button";
import { TagList } from "@/components/content/tag-list";
import {
  LESSON_SKILL_LABELS,
  formatLessonTime,
  getAttendeeCounts,
  getLiveLesson,
  getRegisteredLessonIds,
} from "@/lib/content/live-lessons";

export async function generateMetadata({
  params,
}: PageProps<"/live-lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await getLiveLesson(slug);
  if (!lesson) return {};

  return {
    title: `${lesson.title} — ScoreWell`,
    description: lesson.summary,
  };
}

export default async function LiveLessonPage({ params }: PageProps<"/live-lessons/[slug]">) {
  const { slug } = await params;
  const lesson = await getLiveLesson(slug);
  if (!lesson) notFound();

  const session = await auth();
  const [attendeeCounts, registeredIds] = await Promise.all([
    getAttendeeCounts([lesson.id]),
    session?.user
      ? getRegisteredLessonIds(session.user.id, [lesson.id])
      : Promise.resolve(new Set<string>()),
  ]);
  const attendees = attendeeCounts.get(lesson.id) ?? 0;

  return (
    <main className="flex flex-1 flex-col bg-white">
      <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm">
          <Link href="/live-lessons" className="font-medium text-brand-600 hover:underline">
            ← All live lessons
          </Link>
        </p>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-pop-50 px-2.5 py-0.5 text-xs font-semibold text-pop-700">
            {LESSON_SKILL_LABELS[lesson.skillFocus]}
          </span>
          <span className="text-xs text-zinc-500">{lesson.level}</span>
          {lesson.isPast && (
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600">
              Past session
            </span>
          )}
        </div>

        <h1 className="mb-4 font-display text-3xl font-bold tracking-tight text-zinc-900">
          {lesson.title}
        </h1>
        <p className="mb-8 border-l-2 border-brand-200 pl-4 text-base leading-relaxed text-zinc-600">
          {lesson.summary}
        </p>

        {lesson.placeholder && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="mb-1.5 text-sm font-semibold text-amber-900">
              This is an example listing
            </h2>
            <p className="text-sm leading-relaxed text-amber-900">
              This session has not been scheduled. There is no teacher assigned to it and no
              joining link, so there is nothing to register for yet — it is here to show how a
              session page will look. Registration opens when real sessions go on the timetable.
            </p>
          </div>
        )}

        <dl className="mb-8 grid grid-cols-1 gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-zinc-500">When</dt>
            <dd className="mt-1 text-sm font-semibold text-zinc-800">
              {formatLessonTime(lesson.startsAt, lesson.durationMinutes)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Length</dt>
            <dd className="mt-1 text-sm font-semibold text-zinc-800">
              {lesson.durationMinutes} minutes
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Led by</dt>
            <dd className="mt-1 text-sm font-semibold text-zinc-800">{lesson.instructor.name}</dd>
            <dd className="text-xs text-zinc-500">{lesson.instructor.role}</dd>
          </div>
          {/* Real registration count only — nothing is shown at zero. */}
          {attendees > 0 && (
            <div>
              <dt className="text-xs text-zinc-500">Registered</dt>
              <dd className="mt-1 text-sm font-semibold text-zinc-800">
                {attendees.toLocaleString("en-US")} {attendees === 1 ? "learner" : "learners"}
              </dd>
            </div>
          )}
        </dl>

        <h2 className="mb-3 text-lg font-bold text-zinc-900">What the session covers</h2>
        <ol className="mb-8 flex flex-col gap-2.5">
          {lesson.agenda.map((point, index) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
              <span className="font-semibold text-zinc-400">{index + 1}</span>
              {point}
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center gap-3">
          <LessonRegisterButton
            slug={lesson.slug}
            placeholder={lesson.placeholder}
            isPast={lesson.isPast}
            isSignedIn={Boolean(session?.user)}
            isRegistered={registeredIds.has(lesson.id)}
          />

          {lesson.joinUrl && registeredIds.has(lesson.id) && !lesson.isPast && (
            <a
              href={lesson.joinUrl}
              className="rounded-full border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Join the session
            </a>
          )}

          {lesson.recordingSlug && (
            <Link
              href={`/video-lessons/${lesson.recordingSlug}`}
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              Watch the recording →
            </Link>
          )}
        </div>

        <TagList tags={lesson.tags} />
      </article>
    </main>
  );
}
