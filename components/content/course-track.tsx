"use client";

import { useOptimistic, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { toggleCourseLessonAction } from "@/lib/course-actions";

/**
 * The lesson list of a self-study course track (site-build-prompt.md section 4b).
 *
 * Ticking a lesson is optimistic: the checkbox is a low-stakes toggle and waiting a
 * round-trip to see it move makes a track feel broken. If the write fails the state snaps
 * back and says why, rather than leaving a tick that was never saved.
 *
 * Signed-out learners still see the whole track — only the ticking needs an account, and
 * the list says so once rather than disabling every row silently.
 */

export type CourseLesson = {
  title: string;
  summary: string;
  href?: string;
};

export function CourseTrack({
  courseSlug,
  lessons,
  completed,
  signedIn,
}: {
  courseSlug: string;
  lessons: CourseLesson[];
  completed: number[];
  signedIn: boolean;
}) {
  const [saved, setSaved] = useState<number[]>(completed);
  const [optimistic, setOptimistic] = useOptimistic(
    saved,
    (current: number[], index: number) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index],
  );
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const done = new Set(optimistic);
  const nextIndex = lessons.findIndex((_, index) => !done.has(index));

  const toggle = (index: number) => {
    if (!signedIn) return;
    setError(null);
    startTransition(async () => {
      setOptimistic(index);
      const result = await toggleCourseLessonAction({ courseSlug, lessonIndex: index });
      if (!result.ok) {
        setError(result.error ?? "Could not save that.");
        return;
      }
      setSaved((current) =>
        result.completed ? [...current, index] : current.filter((i) => i !== index),
      );
    });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          {optimistic.length} of {lessons.length} complete
        </p>
        {!signedIn && (
          <p className="text-sm text-ink-muted">
            <Link href="/login" className="font-medium text-link hover:underline">
              Log in
            </Link>{" "}
            to track your progress.
          </p>
        )}
      </div>

      <div
        className="mb-6 h-2 w-full overflow-hidden rounded-full bg-surface-sunken"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={lessons.length}
        aria-valuenow={optimistic.length}
        aria-label="Course progress"
      >
        <div
          className="h-2 rounded-full bg-pop-500 transition-[width] duration-300"
          style={{ width: `${(optimistic.length / Math.max(1, lessons.length)) * 100}%` }}
        />
      </div>

      {error && <p className="mb-4 text-sm text-rose-700">{error}</p>}

      <ol className="flex flex-col divide-y divide-line rounded-2xl border border-line">
        {lessons.map((lesson, index) => {
          const isDone = done.has(index);
          const isNext = index === nextIndex;

          return (
            <li
              key={lesson.title}
              className={cn("flex gap-4 px-5 py-4", isNext && "bg-brand-50/40")}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                disabled={!signedIn}
                aria-pressed={isDone}
                aria-label={
                  isDone ? `Mark "${lesson.title}" as not done` : `Mark "${lesson.title}" as done`
                }
                title={signedIn ? undefined : "Log in to track your progress"}
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                  isDone
                    ? "border-pop-500 bg-pop-500 text-white"
                    : "border-line-strong text-ink-muted",
                  signedIn && !isDone && "hover:border-pop-400",
                  !signedIn && "cursor-not-allowed opacity-70",
                )}
              >
                {isDone ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                    <path
                      d="M3 7.5l2.5 2.5L11 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isDone ? "text-ink-muted line-through" : "text-ink",
                  )}
                >
                  {lesson.title}
                </p>
                <p className="mt-0.5 text-sm text-ink-body">{lesson.summary}</p>
              </div>

              {lesson.href && (
                <Link
                  href={lesson.href}
                  className="shrink-0 self-center text-sm font-medium text-link hover:underline"
                >
                  {isNext ? "Start →" : "Open →"}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
