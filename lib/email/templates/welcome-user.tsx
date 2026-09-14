import { EmailButton, EmailDetails, EmailLayout, emailColors } from "./email-layout";

type WelcomeUserEmailProps = {
  name: string;
  email: string;
  temporaryPassword: string;
  loginUrl: string;
};

export function WelcomeUserEmail({ name, email, temporaryPassword, loginUrl }: WelcomeUserEmailProps) {
  return (
    <EmailLayout preview="Your ScoreWell account is ready." title="Welcome to ScoreWell">
      <p style={{ color: emailColors.ink, fontWeight: 700, margin: "0 0 16px" }}>Hello {name},</p>
      <p style={{ margin: "0 0 20px" }}>
        Your ScoreWell account has been created. Use the details below to sign in and begin learning.
      </p>
      <EmailDetails>
        <p style={{ color: emailColors.muted, fontSize: "12px", fontWeight: 700, letterSpacing: "1px", margin: "0 0 8px", textTransform: "uppercase" }}>Sign-in details</p>
        <p style={{ borderBottom: `1px solid ${emailColors.line}`, margin: "0 0 10px", paddingBottom: "10px" }}><strong>Email</strong><br />{email}</p>
        <p style={{ margin: 0 }}><strong>Temporary password</strong><br />{temporaryPassword}</p>
      </EmailDetails>
      <EmailButton href={loginUrl}>Log in to ScoreWell</EmailButton>
      <p style={{ color: emailColors.muted, fontSize: "14px", margin: "24px 0 0" }}>
        For your security, please change this temporary password after signing in.
      </p>
    </EmailLayout>
  );
}
