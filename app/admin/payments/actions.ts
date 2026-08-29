"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { getDuration } from "@/lib/pricing";
import { rewardReferralIfPending } from "@/lib/referral";
import { grantCredits } from "@/lib/credits";

async function requireAdmin() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    throw new Error("Not authorized.");
  }
}

export async function approvePaymentAction(formData: FormData) {
  await requireAdmin();

  const submissionId = String(formData.get("submissionId") ?? "");
  const submission = await prisma.paymentSubmission.findUniqueOrThrow({ where: { id: submissionId } });

  // A credit purchase tops up the ledger and must NOT touch the subscription —
  // approving one used to be impossible, and granting Premium here would hand
  // out a paid tier for the price of a credit pack.
  if (submission.purpose === "CREDITS") {
    await prisma.paymentSubmission.update({
      where: { id: submissionId },
      data: { status: "APPROVED", reviewedAt: new Date() },
    });
    await grantCredits(
      submission.userId,
      submission.creditsPurchased ?? 0,
      `Credit pack purchase (${submission.transactionRef})`,
    );
    revalidatePath("/admin/payments");
    return;
  }

  const duration = getDuration(submission.billingInterval);
  const currentPeriodEnd = new Date();
  currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + duration.months);

  await prisma.$transaction([
    prisma.paymentSubmission.update({
      where: { id: submissionId },
      data: { status: "APPROVED", reviewedAt: new Date() },
    }),
    prisma.subscription.upsert({
      where: { userId: submission.userId },
      create: {
        userId: submission.userId,
        tier: "PREMIUM",
        status: "ACTIVE",
        billingInterval: submission.billingInterval,
        currentPeriodEnd,
      },
      update: {
        tier: "PREMIUM",
        status: "ACTIVE",
        billingInterval: submission.billingInterval,
        currentPeriodEnd,
      },
    }),
  ]);

  // If this user was referred, both sides earn a free month — runs after the
  // subscription upsert so the credit extends the period just purchased.
  await rewardReferralIfPending(submission.userId);

  revalidatePath("/admin/payments");
}

export async function rejectPaymentAction(formData: FormData) {
  await requireAdmin();

  const submissionId = String(formData.get("submissionId") ?? "");
  const note = String(formData.get("note") ?? "").trim();

  await prisma.paymentSubmission.update({
    where: { id: submissionId },
    data: { status: "REJECTED", reviewedAt: new Date(), reviewNote: note || null },
  });

  revalidatePath("/admin/payments");
}
