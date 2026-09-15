"use server";

import { auth } from "@/auth";
import { isAdminUser } from "@/lib/admin";
import { logAdminActivity } from "@/lib/admin-activity";
import { sendEmail } from "@/lib/email/send-email";
import { AccountDeletedEmail } from "@/lib/email/templates/account-deleted";
import { AccountEnabledEmail } from "@/lib/email/templates/account-enabled";
import { AccountSuspendedEmail } from "@/lib/email/templates/account-suspended";
import { WelcomeUserEmail } from "@/lib/email/templates/welcome-user";
import { absoluteUrl } from "@/lib/site/site-url";

type EmailTemplate = "welcome" | "suspended" | "enabled" | "deleted";
type ActionResult = { error?: string; success?: string };

const subjects: Record<EmailTemplate, string> = {
  welcome: "Welcome to ScoreWell",
  suspended: "Your ScoreWell account has been suspended",
  enabled: "Your ScoreWell account has been re-enabled",
  deleted: "Your ScoreWell account has been deleted",
};

export async function sendAdminEmailPreview(template: EmailTemplate): Promise<ActionResult> {
  try {
    const session = await auth();
    const adminId = session?.user?.id;
    const recipient = session?.user?.email?.trim();

    if (!adminId || !(await isAdminUser(adminId))) {
      return { error: "You are not authorized to send email previews." };
    }
    if (!recipient) return { error: "Your admin account does not have an email address." };
    if (!Object.hasOwn(subjects, template)) return { error: "That email template is not available." };

    const name = session.user.name?.trim() || "ScoreWell administrator";
    const react = {
      welcome: WelcomeUserEmail({
        name,
        email: recipient,
        // A preview, so no real link is minted: a genuine one is single-use and would be
        // spent by whoever opened the preview. This shows the wording, which is the point.
        setPasswordUrl: absoluteUrl("/login?mode=reset"),
        loginUrl: absoluteUrl("/login"),
      }),
      suspended: AccountSuspendedEmail({ name, email: recipient }),
      enabled: AccountEnabledEmail({ name, email: recipient, loginUrl: absoluteUrl("/login") }),
      deleted: AccountDeletedEmail({ name, email: recipient }),
    }[template];

    const sent = await sendEmail({ to: recipient, subject: subjects[template], react });
    if (!sent) return { error: "Email could not be sent. Check the Resend configuration and server logs." };

    await logAdminActivity({
      adminId,
      adminEmail: recipient,
      action: "SEND_EMAIL_PREVIEW",
      entityType: "EMAIL",
      summary: `Sent the ${template} email preview to ${recipient}`,
      metadata: { template, recipient },
    });

    return { success: `The ${template} email was sent to ${recipient}.` };
  } catch (error) {
    console.error("Admin could not send email preview:", error);
    return { error: "Email could not be sent. Check the server logs for details." };
  }
}
