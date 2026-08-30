"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

export type NewsletterState = { error?: string; subscribed?: boolean };

// Deliberately lenient: this is the address someone typed, not a login. Zod's email check
// plus a length cap is enough to reject the obvious mistakes without turning away the
// unusual-but-valid addresses a stricter pattern would.
const EmailSchema = z.string().trim().toLowerCase().max(254).pipe(z.email());

export async function subscribeToNewsletterAction(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = EmailSchema.safeParse(String(formData.get("email") ?? ""));
  if (!parsed.success) {
    return { error: "That doesn't look like an email address." };
  }

  const source = String(formData.get("source") ?? "").slice(0, 60) || null;

  try {
    // Same answer whether the address is new or already stored. Saying "you're already
    // subscribed" would turn this box into a way of testing whether a given person is on
    // the list, which is not something a stranger should be able to check.
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data },
      create: { email: parsed.data, source },
      // An address that signs up twice keeps its original date and source — the first
      // capture is the true one.
      update: {},
    });
  } catch {
    return { error: "Couldn't save that just now. Please try again." };
  }

  return { subscribed: true };
}
