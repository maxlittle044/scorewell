import { EmailButton, EmailDetails, EmailLayout, emailColors } from "./email-layout";

type WelcomeUserEmailProps = {
  name: string;
  email: string;
  /**
   * A single-use Firebase link that lets the person choose their own password.
   *
   * This used to be the temporary password itself, printed in the message. Email is not a
   * private channel — it sits in the recipient's mailbox indefinitely, is copied across mail
   * servers in transit, and is readable by anyone who later gets into that inbox. A password
   * sent that way is compromised from the moment it is sent, and asking the reader to change
   * it afterwards does not undo that.
   *
   * The link is also what gets the account working: completing it marks the address verified
   * in Firebase, which sign-in now requires.
   *
   * Null when the link could not be generated, which must not block the account being made.
   */
  setPasswordUrl: string | null;
  loginUrl: string;
};

export function WelcomeUserEmail({ name, email, setPasswordUrl, loginUrl }: WelcomeUserEmailProps) {
  return (
    <EmailLayout preview="Your ScoreWell account is ready." title="Welcome to ScoreWell">
      <p style={{ color: emailColors.ink, fontWeight: 700, margin: "0 0 16px" }}>Hello {name},</p>
      <p style={{ margin: "0 0 20px" }}>
        Your ScoreWell account has been created. Choose a password to finish setting it up.
      </p>
      <EmailDetails>
        <p style={{ color: emailColors.muted, fontSize: "12px", fontWeight: 700, letterSpacing: "1px", margin: "0 0 8px", textTransform: "uppercase" }}>Your sign-in email</p>
        <p style={{ margin: 0 }}>{email}</p>
      </EmailDetails>

      {setPasswordUrl ? (
        <>
          <EmailButton href={setPasswordUrl}>Choose your password</EmailButton>
          <p style={{ color: emailColors.muted, fontSize: "14px", margin: "24px 0 0" }}>
            This link is personal to you and can only be used once. Setting your password also
            confirms your email address, which you need to do before you can sign in.
          </p>
        </>
      ) : (
        <>
          <EmailButton href={loginUrl}>Go to ScoreWell</EmailButton>
          <p style={{ color: emailColors.muted, fontSize: "14px", margin: "24px 0 0" }}>
            To set your password, choose &ldquo;Forgotten your password?&rdquo; on the sign-in
            page and enter this address. That link also confirms your email, which you need to
            do before you can sign in.
          </p>
        </>
      )}
    </EmailLayout>
  );
}
