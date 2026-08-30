import type { Metadata } from "next";
import Link from "next/link";
import { TagList } from "@/components/content/tag-list";
import { auth } from "@/auth";
import { CourseTrack } from "@/components/content/course-track";
import { getCourse, getCourseProgress } from "@/lib/content/courses";
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
  const [course, session] = await Promise.all([getCourse(slug), auth()]);

  if (!course) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This course isn&apos;t available yet.{" "}
            <Link href="/courses" className="font-medium text-link hover:underline">
              Browse all courses
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  const progress = session?.user
    ? await getCourseProgress(session.user.id, course.slug, course.lessons.length)
    : { completed: [], total: course.lessons.length, nextIndex: 0 };

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-2xl font-bold text-ink">{course.title}</h1>
        <p className="mb-1 text-ink-body">{course.description}</p>
        <p className="mb-8 text-sm text-ink-muted">
          {course.lessons.length} lessons
          {course.videoCount > 0 && (
            <>
              {" "}
              · {course.videoCount} on video
            </>
          )}{" "}
          · Self-paced · {course.level}
        </p>

        <CourseTrack
          courseSlug={course.slug}
          lessons={course.lessons}
          completed={progress.completed}
          signedIn={Boolean(session?.user)}
        />

        <TagList tags={course.tags} />
      </div>
    </main>
  );
}
