import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { auth } from "@/auth";
import { getCourseProgressCounts, listCourses } from "@/lib/content/courses";

export const metadata: Metadata = {
  title: "Courses — ScoreWell",
  description: "Multi-lesson IELTS preparation paths covering writing, speaking, reading and more.",
};

export default async function CoursesIndexPage() {
  const [courses, session] = await Promise.all([listCourses(), auth()]);
  // Real completions only — a course nobody has started shows no progress line at all,
  // the same rule the library uses for attempt counts.
  const progress = session?.user
    ? await getCourseProgressCounts(session.user.id, courses.map((c) => c.slug))
    : new Map<string, number>();

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Courses"
          description="Multi-lesson paths that build a full skill, step by step."
        />

        {courses.length === 0 ? (
          <p className="text-sm text-ink-muted">No courses published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group overflow-hidden rounded-2xl border border-line shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`relative h-32 bg-linear-to-br ${course.gradient}`}>
                  {/* The count, not a "video course" label: it says exactly how much of the
                      track is recorded, which a threshold-based badge would blur. */}
                  {course.videoCount > 0 && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2.5 1.5l8 4.5-8 4.5z" fill="currentColor" />
                      </svg>
                      {course.videoCount} {course.videoCount === 1 ? "video" : "videos"}
                    </span>
                  )}
                </div>
                <div className="bg-surface p-5">
                  <h3 className="font-semibold text-ink group-hover:text-link">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-body">{course.description}</p>
                  <p className="mt-3 text-xs font-medium text-ink-muted">
                    {course.lessonCount} lessons
                  </p>
                  {(progress.get(course.slug) ?? 0) > 0 && (
                    <div className="mt-3">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
                        <div
                          className="h-1.5 rounded-full bg-pop-500"
                          style={{
                            width: `${Math.min(100, ((progress.get(course.slug) ?? 0) / Math.max(1, course.lessonCount)) * 100)}%`,
                          }}
                        />
                      </div>
                      <p className="mt-1.5 text-xs text-ink-muted">
                        {Math.min(progress.get(course.slug) ?? 0, course.lessonCount)} of{" "}
                        {course.lessonCount} complete
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
