"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Saving and restoring an attempt in progress (site-build-prompt.md section 4a).
 *
 * An attempt used to be atomic: submit it or lose it. Closing a tab halfway through a reading
 * paper threw away the work, and "in progress" could only be shown for a four-skill sitting,
 * because that was the one unfinished state the database recorded.
 *
 * Signed-out learners get nothing here rather than an error. Drafts are keyed to a user, and
 * a test is still perfectly usable without one — the answers simply live in the page until
 * it is submitted, exactly as before.
 */

/** Loose by design: each runner owns its own answer shape, and this only stores it. */
export type DraftAnswers = Record<string, unknown>;

export async function loadDraftAction(
  contentItemId: string,
): Promise<{ answers: DraftAnswers | null }> {
  const session = await auth();
  if (!session?.user || !contentItemId) return { answers: null };

  const draft = await prisma.attemptDraft.findUnique({
    where: { userId_contentItemId: { userId: session.user.id, contentItemId } },
    select: { answers: true },
  });

  const answers = draft?.answers;
  // A JSON column can hold an array or a scalar; only an object is a usable answer map.
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) return { answers: null };
  return { answers: answers as DraftAnswers };
}

export async function saveDraftAction(
  contentItemId: string,
  answers: DraftAnswers,
): Promise<void> {
  const session = await auth();
  if (!session?.user || !contentItemId) return;

  try {
    // An empty answer map means the learner has cleared everything, which is not an attempt
    // worth resuming — and leaving it would badge the tile "in progress" over nothing.
    if (Object.keys(answers).length === 0) {
      await prisma.attemptDraft.deleteMany({ where: { userId: session.user.id, contentItemId } });
      return;
    }

    await prisma.attemptDraft.upsert({
      where: { userId_contentItemId: { userId: session.user.id, contentItemId } },
      update: { answers: answers as object },
      create: { userId: session.user.id, contentItemId, answers: answers as object },
    });
  } catch (error) {
    // Autosave is a convenience running behind a learner mid-test. If it fails — a dropped
    // connection, a deleted test — the attempt in front of them must carry on regardless.
    console.error("saveDraftAction failed:", error);
  }
}

/** Called on submit: the Progress row now records the attempt, so the draft is spent. */
export async function clearDraftAction(contentItemId: string): Promise<void> {
  const session = await auth();
  if (!session?.user || !contentItemId) return;

  try {
    await prisma.attemptDraft.deleteMany({ where: { userId: session.user.id, contentItemId } });
  } catch (error) {
    console.error("clearDraftAction failed:", error);
  }
}
