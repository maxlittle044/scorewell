import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in or sign up — ScoreWell",
  description: "Sign in to save your progress, track your band scores and use the AI tools.",
};

/**
 * A server component, so it can read the query string directly and hand the form plain props.
 * The form itself was the whole page before, and a client page can neither export metadata nor
 * see `searchParams` without a client hook — which is why /login had no title of its own and
 * always opened on "Log in", however the visitor arrived.
 */
export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;

  // Referral links send people here to create an account, and they are the least likely
  // visitors of all to already have one.
  const initialMode = params.mode === "signup" ? "signup" : "login";

  // Passed through untouched. Whether it is safe to follow is decided on the server, in the
  // action, where the value cannot be tampered with after the check.
  const callbackUrl = typeof params.callbackUrl === "string" ? params.callbackUrl : undefined;

  return <LoginForm initialMode={initialMode} callbackUrl={callbackUrl} />;
}
