import { EmailDetails, EmailLayout, EmailStatus, emailColors } from "./email-layout";

type AccountSuspendedEmailProps = { name: string; email: string };

export function AccountSuspendedEmail({ name, email }: AccountSuspendedEmailProps) {
  return (
    <EmailLayout preview="Your ScoreWell account has been suspended." title="Account suspended">
      <EmailStatus tone="danger">Access temporarily restricted</EmailStatus>
      <p style={{ color: emailColors.ink, fontWeight: 700, margin: "0 0 16px" }}>Hello {name},</p>
      <EmailDetails>
        <p style={{ color: emailColors.danger, fontWeight: 700, margin: 0 }}>Account status: Suspended</p>
      </EmailDetails>
      <p style={{ margin: "0 0 16px" }}>
        Your ScoreWell account ({email}) has been suspended by an administrator. You cannot log in while this status is active.
      </p>
      <p style={{ margin: 0 }}>
        If you believe this was unexpected, please contact the ScoreWell support team for assistance.
      </p>
    </EmailLayout>
  );
}
