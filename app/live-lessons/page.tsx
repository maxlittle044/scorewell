import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { LessonRegisterButton } from "@/components/content/lesson-register-button";
import { PageHeader } from "@/components/layout/page-header";
import { cn } from "@/lib/cn";
import {
  LESSON_SKILLS,
  LESSON_SKILL_LABELS,
  formatLessonTime,
  getAttendeeCounts,
  getRegisteredLessonIds,
  isLessonSkill,
  listLiveLessons,
  type LiveLesson,
} from "@/lib/content/live-lessons";

export const metadata: Metadata = {
  title: "Live Lessons — ScoreWell",
  description:
    "Scheduled live IELTS lessons and webinars, filterable by skill, with recordings archived after each session.",
};

type CardProps = {
  lesson: LiveLesson;
  attendees: number;
  isSignedIn: boolean;
  isRegistered: boolean;
};

function SessionCard({ lesson, attendees, isSignedIn, isRegistered }: CardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-pop-50 px-2.5 py-0.5 text-xs font-semibold text-pop-700">
          {LESSON_SKILL_LABELS[lesson.skillFocus]}
        </span>
        <span className="text-xs text-ink-muted">{lesson.level}</span>
      </div>

      <h3 className="text-base font-bold text-ink">
        <Link href={`/live-lessons/${lesson.slug}`} className="hover:text-link">
          {lesson.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-body">{lesson.summary}</p>

      <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-xs text-ink-muted">When</dt>
          <dd className="font-semibold text-ink">
            {formatLessonTime(lesson.startsAt, lesson.durationMinutes)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-ink-muted">Led by</dt>
          <dd className="font-semibold text-ink">{lesson.instructor.name}</dd>
        </div>
        {/* Real registration count only — a session nobody has joined shows nothing. */}
        {attendees > 0 && (
          <div>
            <dt className="text-xs text-ink-muted">Registered</dt>
            <dd className="font-semibold text-ink">
              {attendees.toLocaleString("en-US")} {attendees === 1 ? "learner" : "learners"}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Link
          href={`/live-lessons/${lesson.slug}`}
          className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink-body transition-colors hover:border-brand-400 hover:text-link"
        >
          Session details
        </Link>
        {!lesson.isPast && (
          <LessonRegisterButton
            slug={lesson.slug}
            placeholder={lesson.placeholder}
            isPast={lesson.isPast}
            isSignedIn={isSignedIn}
            isRegistered={isRegistered}
          />
        )}
        {lesson.isPast && lesson.recordingSlug && (
          <Link
            href={`/video-lessons/${lesson.recordingSlug}`}
            className="text-sm font-semibold text-link hover:underline"
          >
            Watch the recording →
          </Link>
        )}
      </div>
    </article>
  );
}

export default async function LiveLessonsPage({ searchParams }: PageProps<"/live-lessons">) {
  const params = await searchParams;
  const raw = Array.isArray(params.skill) ? params.skill[0] : params.skill;
  const skill = raw && isLessonSkill(raw) ? raw : null;

  const [{ upcoming, past }, session] = await Promise.all([listLiveLessons(skill), auth()]);

  const all = [...upcoming, ...past];
  const ids = all.map((lesson) => lesson.id);
  const [attendees, registeredIds] = await Promise.all([
    getAttendeeCounts(ids),
    session?.user ? getRegisteredLessonIds(session.user.id, ids) : Promise.resolve(new Set<string>()),
  ]);

  const anyPlaceholder = all.some((lesson) => lesson.placeholder);

  const cardFor = (lesson: LiveLesson) => (
    <SessionCard
      key={lesson.slug}
      lesson={lesson}
      attendees={attendees.get(lesson.id) ?? 0}
      isSignedIn={Boolean(session?.user)}
      isRegistered={registeredIds.has(lesson.id)}
    />
  );

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Live lessons"
          description="Scheduled sessions taught live, with the recording archived here afterwards so nothing is lost if you cannot attend."
        />

        {anyPlaceholder && (
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="mb-1.5 text-sm font-semibold text-amber-900">
              These are example listings
            </h2>
            <p className="text-sm leading-relaxed text-amber-900">
              No live sessions have been scheduled yet. The sessions below show what the timetable
              will look like — they have no teacher assigned and no joining link, so registration
              stays closed on them. Nothing here is a session you can attend today.
            </p>
          </div>
        )}

        <div className="mb-10 flex flex-wrap gap-2.5">
          <Link
            href="/live-lessons"
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              !skill
                ? "border-brand-600 bg-brand-600 text-white"
                : "border-line bg-surface text-ink-body hover:border-brand-300",
            )}
          >
            All skills
          </Link>
          {LESSON_SKILLS.map((value) => (
            <Link
              key={value}
              href={`/live-lessons?skill=${value}`}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                skill === value
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-surface text-ink-body hover:border-brand-300",
              )}
            >
              {LESSON_SKILL_LABELS[value]}
            </Link>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="mb-5 text-lg font-bold text-ink">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
              Nothing scheduled here yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{upcoming.map(cardFor)}</div>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="mb-5 text-lg font-bold text-ink">Past sessions</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{past.map(cardFor)}</div>
          </section>
        )}
      </div>
    </main>
  );
}
