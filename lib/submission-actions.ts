"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  MAX_ANSWER_LENGTH,
  MAX_ANSWER_TITLE_LENGTH,
  MAX_REPLY_LENGTH,
  checkLength,
} from "@/lib/input-limits";

export type ShareState = { shared?: boolean; error?: string };

/** Publishes the learner's own answer to the community feed. */
export async function shareAnswerAction(
  _prevState: ShareState,
  formData: FormData,
): Promise<ShareState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to share your answer." };
  }

  const answerText = String(formData.get("answerText") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim() || null;
  const taskType = String(formData.get("taskType") ?? "").trim() || null;
  const contentItemId = String(formData.get("contentItemId") ?? "").trim() || null;

  if (!answerText) return { error: "Write an answer before sharing it." };

  // This is published to a public feed, so the only previous limit on its size was whatever
  // the browser chose to send.
  const tooLong =
    checkLength(answerText, MAX_ANSWER_LENGTH, "answer") ??
    (title ? checkLength(title, MAX_ANSWER_TITLE_LENGTH, "title") : null);
  if (tooLong) return { error: tooLong };

  await prisma.submission.create({
    data: {
      userId: session.user.id,
      title,
      taskType,
      contentItemId,
      answerText,
      skill: "WRITING",
      published: true,
    },
  });

  revalidatePath("/ielts/submitted-answers");
  return { shared: true };
}

export type ReplyState = { error?: string };

export async function postReplyAction(
  _prevState: ReplyState,
  formData: FormData,
): Promise<ReplyState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to leave feedback." };
  }

  const submissionId = String(formData.get("submissionId") ?? "");
  const text = String(formData.get("text") ?? "").trim();

  if (!text) return { error: "Write some feedback first." };

  const tooLong = checkLength(text, MAX_REPLY_LENGTH, "feedback");
  if (tooLong) return { error: tooLong };

  const submission = await prisma.submission.findFirst({
    where: { id: submissionId, published: true },
    select: { id: true },
  });
  if (!submission) return { error: "That answer is no longer available." };

  await prisma.submissionReply.create({
    data: { submissionId, userId: session.user.id, text },
  });

  revalidatePath(`/ielts/submitted-answers/${submissionId}`);
  return {};
}
