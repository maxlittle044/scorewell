"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    throw new Error("Not authorized.");
  }
}

/** Claim a pending request, which starts the stated turnaround clock. */
export async function startReviewAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("requestId") ?? "");
  await prisma.reviewRequest.update({
    where: { id },
    data: { status: "IN_REVIEW" },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

export async function completeReviewAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("requestId") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  // Completing with nothing written would show the learner an empty "feedback
  // ready" panel for credits they have already spent.
  if (!notes) return;

  await prisma.reviewRequest.update({
    where: { id },
    data: { status: "COMPLETED", reviewerNotes: notes, completedAt: new Date() },
  });

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

/** Refund and close a request the team cannot complete. */
export async function refundReviewAction(formData: FormData) {
  await requireAdmin();

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

  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}
