"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";
import { Logo } from "@/components/layout/logo";
import { describeAuthError, getFirebaseAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";
import { completeSignInAction } from "./actions";

type Mode = "login" | "signup" | "reset";

/**
 * Sign-in runs in the browser against Firebase, then hands the resulting ID token to the
 * server, which verifies it and issues the ScoreWell session cookie.
 *
 * The password never reaches our server, which is the main reason for the move: password
 * reset, verification emails and rate limiting are Firebase's problem now rather than
 * something this site would have to build and get right on its own.
 */
export function LoginForm({
  initialMode,
  callbackUrl,
}: {
  initialMode: "login" | "signup";
  /** Where to go afterwards. Unvalidated here; the server action decides if it is safe. */
  callbackUrl?: string;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [unverifiedUser, setUnverifiedUser] = useState<User | null>(null);
  const [resending, setResending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pending, startTransition] = useTransition();

  const configured = isFirebaseClientConfigured();

  function showError(message: string) {
    setError(message);
  }

  async function resendVerificationEmail(user = unverifiedUser) {
    if (!user) return;

    setResending(true);
    try {
      await sendEmailVerification(user);
      setError(null);
      setNotice("Verification email sent. Check your inbox and follow the link to verify your email address.");
    } catch (err) {
      showError(describeAuthError(err));
    } finally {
      setResending(false);
    }
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    setNotice(null);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();

    setUnverifiedUser(null);

    if (!email) return showError("Please enter your email address.");

    try {
      const auth = getFirebaseAuth();

      if (mode === "reset") {
        await sendPasswordResetEmail(auth, email);
        // Deliberately the same message whether or not an account exists, so this form
        // cannot be used to discover which addresses are registered.
        setNotice("If that email has an account, a reset link is on its way.");
        return;
      }

      if (!password) return showError("Please enter your password.");

      const credential =
        mode === "signup"
          ? await createUserWithEmailAndPassword(auth, email, password)
          : await signInWithEmailAndPassword(auth, email, password);

      if (mode === "signup" && name) {
        await updateProfile(credential.user, { displayName: name });
      }

      await credential.user.reload();
      if (!credential.user.emailVerified) {
        setUnverifiedUser(credential.user);
        if (mode === "signup") {
          await sendEmailVerification(credential.user);
          setNotice("Signup successful. We sent a verification link to your email address. Verify it before logging in.");
        } else {
          setError("Email verification required. Please verify your email address before accessing ScoreWell.");
        }
        return;
      }

      // Forced refresh so the token carries the display name just set.
      const idToken = await credential.user.getIdToken(true);

      startTransition(async () => {
        const result = await completeSignInAction(idToken, mode === "signup", callbackUrl);
        if (result?.error) showError(result.error);
      });
    } catch (err) {
      showError(describeAuthError(err));
    }
  }

  if (!configured) {
    return (
      <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-sm font-semibold text-amber-900">Sign-in isn&apos;t available</p>
          <p className="mt-2 text-sm text-amber-900/90">
            The sign-in service isn&apos;t configured yet. Everything free on the site still
            works — practice tests, sample answers and the tips library don&apos;t need an
            account.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-16">
      <div className="login-card w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        {mode !== "reset" && (
          <div className="mt-8 flex rounded-full bg-surface-sunken p-1">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setNotice(null);
                }}
                className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
                  mode === m ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>
        )}

        {mode === "reset" ? (
          <h1 className="mt-8 text-center text-lg font-bold text-ink">Reset your password</h1>
        ) : (
          /* The card is identified visually by the logo and the Log in / Sign up tabs, which
             leaves anyone navigating by headings on a page with none at all. */
          <h1 className="sr-only">
            {mode === "login" ? "Log in to ScoreWell" : "Create a ScoreWell account"}
          </h1>
        )}

        <form action={handleSubmit} className="mt-6 flex flex-col gap-4">
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}
          {notice && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{notice}</p>
          )}

          {unverifiedUser && mode === "login" && (
            <button
              type="button"
              onClick={() => void resendVerificationEmail()}
              disabled={resending}
              className="w-full rounded-full border border-brand-500 bg-brand-100 px-4 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:border-brand-600 hover:bg-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-200 disabled:cursor-not-allowed disabled:border-brand-400 disabled:bg-brand-100 disabled:text-brand-700"
            >
              {resending ? "Sending…" : "Resend Verification Email"}
            </button>
          )}

          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-body">
                Name
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-lg border border-line-strong py-2 pl-10 pr-3 text-sm text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-body">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-line-strong py-2 pl-10 pr-3 text-sm text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          </div>

          {mode !== "reset" && (
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-body">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full rounded-lg border border-line-strong py-2 pl-10 pr-12 text-sm text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-brand-600 transition-colors hover:bg-brand-50 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-[18px] w-[18px] stroke-[2.25]" />
                  ) : (
                    <Eye className="h-[18px] w-[18px] stroke-[2.25]" />
                  )}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending
              ? "Please wait…"
              : mode === "login"
                ? "Log in"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {mode === "login" && (
            <>
              <button
                type="button"
                onClick={() => {
                  setMode("reset");
                  setError(null);
                  setNotice(null);
                }}
                className="font-medium text-link hover:underline"
              >
                Forgotten your password?
              </button>
            </>
          )}
          {mode === "signup" && (
            <>
              By continuing you agree to our{" "}
              <Link href="/terms" className="font-medium text-link hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="font-medium text-link hover:underline">
                Privacy Policy
              </Link>
              .
            </>
          )}
          {mode === "reset" && (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
                setNotice(null);
              }}
              className="font-medium text-link hover:underline"
            >
              Back to log in
            </button>
          )}
        </p>
      </div>
    </main>
  );
}
