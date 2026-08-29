"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadPaymentScreenshot } from "@/lib/storage";
import { getDuration, totalForDuration } from "@/lib/pricing";
import { getCreditPack } from "@/lib/credits";
import { paymentsConfigured } from "@/lib/payment-config";
import type { PaymentMethod } from "@/generated/prisma/enums";

export type CheckoutActionState = { error?: string; success?: boolean };

const METHODS: PaymentMethod[] = ["BANK_TRANSFER", "ESEWA", "KHALTI"];

export async function submitPaymentAction(
  _prevState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  // Refuse before anything else: with no account configured there is nowhere
  // for the money to have gone, so recording a reference would be misleading.
  if (!paymentsConfigured()) {
    return { error: "Payments are not set up yet, so we cannot accept this." };
  }

  const session = await auth();
  if (!session?.user) {
    return { error: "You must be logged in to submit a payment." };
  }

  const methodRaw = String(formData.get("method") ?? "");
  const method = METHODS.includes(methodRaw as PaymentMethod) ? (methodRaw as PaymentMethod) : null;
  const transactionRef = String(formData.get("transactionRef") ?? "").trim();
  const screenshot = formData.get("screenshot");

  if (!method) return { error: "Please choose a payment method." };
  if (!transactionRef) return { error: "Please enter the transaction reference." };

  // A credit-pack purchase and a subscription both come through this form; the
  // purpose decides what approving the payment will actually grant.
  const pack = getCreditPack(String(formData.get("pack") ?? ""));
  const isCredits = String(formData.get("purpose") ?? "") === "CREDITS";

  if (isCredits && !pack) {
    return { error: "That credit pack is no longer available." };
  }

  const screenshotPath =
    screenshot instanceof File ? await uploadPaymentScreenshot(screenshot, session.user.id) : null;

  if (isCredits && pack) {
    await prisma.paymentSubmission.create({
      data: {
        userId: session.user.id,
        method,
        purpose: "CREDITS",
        billingInterval: null,
        creditsPurchased: pack.credits,
        amountNpr: pack.priceNpr,
        transactionRef,
        screenshotPath,
      },
    });
    return { success: true };
  }

  const duration = getDuration(String(formData.get("billingInterval") ?? ""));
  await prisma.paymentSubmission.create({
    data: {
      userId: session.user.id,
      method,
      purpose: "SUBSCRIPTION",
      billingInterval: duration.interval,
      amountNpr: totalForDuration(duration),
      transactionRef,
      screenshotPath,
    },
  });

  return { success: true };
}
