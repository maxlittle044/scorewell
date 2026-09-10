"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { isAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { logAdminActivity } from "@/lib/admin-activity";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || !(await isAdminUser(session.user.id))) {
    throw new Error("Not authorized.");
  }
  return session;
}

/** Claim a pending request, which starts the stated turnaround clock. */
export async function startReviewAction(formData: FormData) {
  const session = await requireAdmin();

  const id = String(formData.get("requestId") ?? "");
  await prisma.reviewRequest.update({
    where: { id },
    data: { status: "IN_REVIEW" },
  });
  await logAdminActivity({
    adminId: session.user.id,
    adminEmail: session.user.email ?? "unknown",
    action: "START_REVIEW",
    entityType: "REVIEW_REQUEST",
    entityId: id,
    summary: `Started review ${id}`,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

export async function completeReviewAction(formData: FormData) {
  const session = await requireAdmin();

  const id = String(formData.get("requestId") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  // Completing with nothing written would show the learner an empty "feedback
  // ready" panel for credits they have already spent.
  if (!notes) return;

  await prisma.reviewRequest.update({
    where: { id },
    data: { status: "COMPLETED", reviewerNotes: notes, completedAt: new Date() },
  });
  await logAdminActivity({
    adminId: session.user.id,
    adminEmail: session.user.email ?? "unknown",
    action: "COMPLETE_REVIEW",
    entityType: "REVIEW_REQUEST",
    entityId: id,
    summary: `Completed review ${id}`,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

/** Refund and close a request the team cannot complete. */
export async function refundReviewAction(formData: FormData) {
  const session = await requireAdmin();

  const id = String(formData.get("requestId") ?? "");
  const request = await prisma.reviewRequest.findUniqueOrThrow({ where: { id } });
  if (request.status === "COMPLETED" || request.status === "CANCELLED") return;

  await prisma.$transaction([
    prisma.reviewRequest.update({ where: { id }, data: { status: "CANCELLED" } }),
    prisma.creditTransaction.create({
      data: {
        userId: request.userId,
        delta: request.creditsCharged,
        reason: "Refund: review could not be completed",
      },
    }),
  ]);
  await logAdminActivity({
    adminId: session.user.id,
    adminEmail: session.user.email ?? "unknown",
    action: "REFUND_REVIEW",
    entityType: "REVIEW_REQUEST",
    entityId: id,
    summary: `Refunded review ${id}`,
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}
