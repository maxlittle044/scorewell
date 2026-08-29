import type { Metadata } from "next";
import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { getCourse } from "@/lib/content/courses";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  return {
    title: `${course?.title ?? titleFromSlug(slug)} — ScoreWell`,
    description: course?.description,
  };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = await getCourse(slug);

  if (!course) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This course isn&apos;t available yet.{" "}
            <Link href="/courses" className="font-medium text-brand-600 hover:underline">
              Browse all courses
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">{course.title}</h1>
        <p className="mb-1 text-zinc-600">{course.description}</p>
        <p className="mb-8 text-sm text-zinc-500">
          {course.lessons.length} lessons · Self-paced · {course.level}
        </p>

        <ol className="flex flex-col divide-y divide-zinc-200 rounded-2xl border border-zinc-200">
          {course.lessons.map((lesson, i) => {
            const inner = (
              <>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-zinc-900">{lesson.title}</span>
                  <span className="mt-0.5 block text-sm text-zinc-600">{lesson.summary}</span>
                </span>
                {lesson.href && (
                  <span className="shrink-0 self-center text-sm font-medium text-brand-600">
                    Start →
                  </span>
                )}
              </>
            );

            return (
              <li key={lesson.title}>
                {lesson.href ? (
                  <Link href={lesson.href} className="flex gap-4 px-5 py-4 hover:bg-zinc-50">
                    {inner}
                  </Link>
                ) : (
                  <div className="flex gap-4 px-5 py-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ol>

        <TagList tags={course.tags} />
      </div>
    </main>
  );
}
