"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { uploadPaymentScreenshot } from "@/lib/storage";
import { MAX_TRANSACTION_REF_LENGTH, checkLength, checkScreenshot } from "@/lib/input-limits";
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

  // The form's maxLength is a courtesy to whoever is typing; this is the actual limit.
  const refTooLong = checkLength(transactionRef, MAX_TRANSACTION_REF_LENGTH, "transaction reference");
  if (refTooLong) return { error: refTooLong };

  // Checked before anything is written, so an unusable file is reported rather than dropped.
  if (screenshot instanceof File) {
    const problem = checkScreenshot(screenshot);
    if (problem) return { error: problem };
  }

  // A credit-pack purchase and a subscription both come through this form; the
  // purpose decides what approving the payment will actually grant.
  const pack = getCreditPack(String(formData.get("pack") ?? ""));
  const isCredits = String(formData.get("purpose") ?? "") === "CREDITS";

  if (isCredits && !pack) {
    return { error: "That credit pack is no longer available." };
  }

  const attached = screenshot instanceof File && screenshot.size > 0;
  const screenshotPath = attached
    ? await uploadPaymentScreenshot(screenshot as File, session.user.id)
    : null;

  // If someone attached proof of payment and it did not store — storage unconfigured, or the
  // file was not the image it claimed to be — say so. Recording the payment anyway would
  // leave them believing they had sent evidence that nobody will ever see.
  if (attached && !screenshotPath) {
    return {
      error:
        "Your payment details were not submitted because the screenshot could not be saved. Try again, or submit without a screenshot and quote your transaction reference.",
    };
  }

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
