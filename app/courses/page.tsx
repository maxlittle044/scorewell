import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { listCourses } from "@/lib/content/courses";

export const metadata: Metadata = {
  title: "Courses — ScoreWell",
  description: "Multi-lesson IELTS preparation paths covering writing, speaking, reading and more.",
};

export default async function CoursesIndexPage() {
  const courses = await listCourses();

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Courses"
          description="Multi-lesson paths that build a full skill, step by step."
        />

        {courses.length === 0 ? (
          <p className="text-sm text-zinc-500">No courses published yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group overflow-hidden rounded-2xl border border-zinc-200 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`h-32 bg-gradient-to-br ${course.gradient}`} />
                <div className="bg-white p-5">
                  <h3 className="font-semibold text-zinc-900 group-hover:text-brand-600">
                    {course.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-600">{course.description}</p>
                  <p className="mt-3 text-xs font-medium text-zinc-400">
                    {course.lessonCount} lessons
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
