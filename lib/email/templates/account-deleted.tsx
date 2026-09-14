import { EmailLayout, EmailStatus, emailColors } from "./email-layout";

type AccountDeletedEmailProps = { name: string; email: string };

export function AccountDeletedEmail({ name, email }: AccountDeletedEmailProps) {
  return (
    <EmailLayout preview="Your ScoreWell account has been deleted." title="Account deleted">
      <EmailStatus tone="warning">Account closed</EmailStatus>
      <p style={{ color: emailColors.ink, fontWeight: 700, margin: "0 0 16px" }}>Hello {name},</p>
      <p style={{ margin: "0 0 16px" }}>
        Your ScoreWell account ({email}) has been deleted. You can no longer sign in or access its data.
      </p>
      <p style={{ margin: 0 }}>Thank you for using ScoreWell.</p>
    </EmailLayout>
  );
}
