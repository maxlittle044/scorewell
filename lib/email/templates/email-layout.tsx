import type { ReactNode } from "react";

const colors = {
  ink: "#172033",
  muted: "#607087",
  line: "#e5eaf0",
  surface: "#eef3f7",
  brand: "#294563",
  brandDark: "#1d344c",
  accent: "#d6a84f",
  success: "#147d72",
  warning: "#a46116",
  danger: "#a53d4a",
};

export function EmailLayout({
  preview,
  title,
  children,
}: {
  preview: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="scorewell-email-outer"
      style={{
        backgroundColor: colors.surface,
        color: colors.ink,
        fontFamily: "Arial, Helvetica, sans-serif",
        margin: 0,
        padding: "24px 12px",
      }}
    >
      <div style={{ display: "none", maxHeight: 0, overflow: "hidden", opacity: 0 }}>{preview}</div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media only screen and (min-width: 620px) {
              .scorewell-email-outer { padding: 48px 16px !important; }
              .scorewell-email-header { padding: 26px 36px !important; }
              .scorewell-email-content { padding: 42px 36px 36px !important; }
            }
          `,
        }}
      />
      <div
        style={{
          backgroundColor: "#ffffff",
          border: `1px solid ${colors.line}`,
          borderRadius: "16px",
          boxSizing: "border-box",
          boxShadow: "0 12px 35px rgba(29, 52, 76, 0.08)",
          margin: "0 auto",
          maxWidth: "600px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div className="scorewell-email-header" style={{ backgroundColor: colors.brandDark, padding: "22px 24px" }}>
          <p style={{ color: "#ffffff", fontSize: "21px", fontWeight: 700, letterSpacing: "0.2px", margin: 0 }}>
            Score<span style={{ color: colors.accent }}>Well</span>
          </p>
          <p style={{ color: "#b9c8d7", fontSize: "12px", letterSpacing: "1.4px", margin: "8px 0 0", textTransform: "uppercase" }}>
            IELTS learning, made clearer
          </p>
        </div>
        <div className="scorewell-email-content" style={{ padding: "30px 24px 28px" }}>
          <p style={{ color: colors.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", margin: "0 0 12px", textTransform: "uppercase" }}>
            ScoreWell account
          </p>
          <h1 style={{ color: colors.ink, fontSize: "28px", fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2, margin: "0 0 24px" }}>
            {title}
          </h1>
          <div style={{ color: colors.muted, fontSize: "16px", lineHeight: 1.65 }}>{children}</div>
          <div style={{ borderTop: `1px solid ${colors.line}`, marginTop: "36px", paddingTop: "20px" }}>
            <p style={{ color: colors.muted, fontSize: "13px", lineHeight: 1.5, margin: 0 }}>
              This is an automated message from ScoreWell. Please do not reply to this email.
            </p>
          </div>
        </div>
      </div>
      <p style={{ color: colors.muted, fontSize: "12px", lineHeight: 1.5, margin: "18px auto 0", maxWidth: "600px", textAlign: "center" }}>
        ScoreWell · Practice with purpose
      </p>
    </div>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      style={{
        backgroundColor: colors.brand,
        borderRadius: "7px",
        boxShadow: "0 5px 12px rgba(41, 69, 99, 0.18)",
        color: "#ffffff",
        display: "inline-block",
        fontSize: "15px",
        fontWeight: 700,
        margin: "8px 0 4px",
        padding: "13px 20px",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

export const emailColors = colors;

export function EmailDetails({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#f5f8fa", border: `1px solid ${colors.line}`, borderRadius: "10px", margin: "0 0 26px", overflowWrap: "anywhere", padding: "16px 16px" }}>
      {children}
    </div>
  );
}

export function EmailStatus({ tone, children }: { tone: "success" | "warning" | "danger"; children: ReactNode }) {
  const color = colors[tone];
  return (
    <p style={{ color, fontSize: "13px", fontWeight: 700, letterSpacing: "0.8px", margin: "0 0 22px", textTransform: "uppercase" }}>
      {children}
    </p>
  );
}
