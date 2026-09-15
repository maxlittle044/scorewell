import type { Metadata } from "next";
import { readUserWelcomeToken } from "@/lib/user-welcome-token";
import { WelcomeSetup } from "./welcome-setup";

export const metadata: Metadata = {
  title: "Set up your ScoreWell account",
  description: "Set a password for your new ScoreWell account.",
};

export default async function WelcomePage({ searchParams }: PageProps<"/user/welcome">) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const email = token ? readUserWelcomeToken(token) : "";

  return (
    <WelcomeSetup
      token={token}
      tokenError={
        !token
          ? "This account setup link is missing a token. Please use the link from your welcome email."
          : !email
            ? "This account setup link is invalid or has expired. Please request a new welcome email."
            : undefined
      }
    />
  );
}