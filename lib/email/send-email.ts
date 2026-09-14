import "server-only";

import { Resend } from "resend";
import type { ReactElement } from "react";

let resendClient: Resend | null | undefined;

function getResendClient() {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY?.trim();
  resendClient = apiKey ? new Resend(apiKey) : null;
  return resendClient;
}

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}): Promise<boolean> {
  const client = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL?.trim();

  if (!client || !from) {
    console.warn("Email notification skipped: RESEND_API_KEY or RESEND_FROM_EMAIL is not configured.");
    return false;
  }

  try {
    const { error } = await client.emails.send({
      from: `ScoreWell <${from}>`,
      to,
      subject,
      react,
    });
    if (error) {
      console.error("Email notification could not be sent:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email notification could not be sent:", error);
    return false;
  }
}
