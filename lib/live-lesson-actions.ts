"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LIVE_LESSON_TASK_TYPE } from "@/lib/content/live-lessons";

export type RegistrationResult = { ok: boolean; error?: string };

/**
 * Registration for a live lesson (site-build-prompt.md section 4b).
 *
 * A placeholder session has no teacher assigned and no joining link, so it
 * cannot be registered for — letting someone sign up for one would create
 * exactly the false expectation the honesty rules exist to prevent. The check
 * lives here rather than only in the UI so a forged request cannot bypass it.
 */
async function findRegistrableLesson(slug: string) {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "VIDEO_LESSON",
      taskType: LIVE_LESSON_TASK_TYPE,
      published: true,
    },
    select: { id: true, data: true },
  });
  if (!item) return { item: null, error: "That session does not exist." };

  const data = item.data as { placeholder?: boolean; startsAt?: string } | null;
  if (data?.placeholder) {
    return { item: null, error: "This session has not been scheduled yet." };
  }
  if (data?.startsAt && new Date(data.startsAt).getTime() < Date.now()) {
    return { item: null, error: "This session has already taken place." };
  }

  return { item, error: undefined };
}

export async function registerForLessonAction(slug: string): Promise<RegistrationResult> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Log in to register for a session." };
  }

  const { item, error } = await findRegistrableLesson(slug);
  if (!item) return { ok: false, error };

  // Idempotent: the unique constraint on (userId, contentItemId) means a repeat
  // click cannot inflate the attendee count.
  await prisma.liveLessonRegistration.upsert({
    where: {
      userId_contentItemId: { userId: session.user.id, contentItemId: item.id },
    },
    create: { userId: session.user.id, contentItemId: item.id },
    update: {},
  });

  revalidatePath("/live-lessons");
  revalidatePath(`/live-lessons/${slug}`);
  return { ok: true };
}

export async function cancelRegistrationAction(slug: string): Promise<RegistrationResult> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Log in to manage your registrations." };
  }

  const item = await prisma.contentItem.findFirst({
    where: { slug, contentType: "VIDEO_LESSON", taskType: LIVE_LESSON_TASK_TYPE },
    select: { id: true },
  });
  if (!item) return { ok: false, error: "That session does not exist." };

  await prisma.liveLessonRegistration.deleteMany({
    where: { userId: session.user.id, contentItemId: item.id },
  });

  revalidatePath("/live-lessons");
  revalidatePath(`/live-lessons/${slug}`);
  return { ok: true };
}
