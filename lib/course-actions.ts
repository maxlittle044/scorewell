"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/content/courses";

export type ToggleResult = { ok: boolean; completed?: boolean; error?: string };

/**
 * Ticks a course lesson off, or un-ticks it.
 *
 * The lesson index is checked against the course's real lesson count before anything is
 * written, so a crafted request can't create ticks for lessons that don't exist and skew
 * the learner's own progress bar.
 */
export async function toggleCourseLessonAction(params: {
  courseSlug: string;
  lessonIndex: number;
}): Promise<ToggleResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Please log in to track your progress." };

  const course = await getCourse(params.courseSlug);
  if (!course) return { ok: false, error: "That course is no longer available." };

  if (
    !Number.isInteger(params.lessonIndex) ||
    params.lessonIndex < 0 ||
    params.lessonIndex >= course.lessons.length
  ) {
    return { ok: false, error: "That lesson isn't part of this course." };
  }

  const where = {
    userId_courseSlug_lessonIndex: {
      userId: session.user.id,
      courseSlug: params.courseSlug,
      lessonIndex: params.lessonIndex,
    },
  };

  const existing = await prisma.courseLessonCompletion.findUnique({ where });

  if (existing) {
    await prisma.courseLessonCompletion.delete({ where });
  } else {
    await prisma.courseLessonCompletion.create({
      data: {
        userId: session.user.id,
        courseSlug: params.courseSlug,
        lessonIndex: params.lessonIndex,
      },
    });
  }

  revalidatePath(`/courses/${params.courseSlug}`);
  revalidatePath("/courses");
  return { ok: true, completed: !existing };
}
