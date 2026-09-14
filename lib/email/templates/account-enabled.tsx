import { EmailButton, EmailLayout, EmailStatus, emailColors } from "./email-layout";

type AccountEnabledEmailProps = { name: string; email: string; loginUrl: string };

export function AccountEnabledEmail({ name, email, loginUrl }: AccountEnabledEmailProps) {
  return (
    <EmailLayout preview="Your ScoreWell account has been re-enabled." title="Account re-enabled">
      <EmailStatus tone="success">Access restored</EmailStatus>
      <p style={{ color: emailColors.ink, fontWeight: 700, margin: "0 0 16px" }}>Hello {name},</p>
      <p style={{ margin: "0 0 20px" }}>
        Your ScoreWell account ({email}) has been re-enabled. You can log in and continue learning again.
      </p>
      <EmailButton href={loginUrl}>Log in to ScoreWell</EmailButton>
    </EmailLayout>
  );
}
