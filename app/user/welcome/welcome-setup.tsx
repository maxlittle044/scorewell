"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Logo } from "@/components/layout/logo";
import { describeAuthError, getFirebaseAuth, isFirebaseClientConfigured } from "@/lib/firebase/client";
import { completeSignInAction } from "@/app/login/actions";
import { setWelcomePasswordAction } from "./actions";

export function WelcomeSetup({ token, tokenError }: { token: string; tokenError?: string }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }
    if (password !== confirmation) {
      setError("The passwords do not match.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await setWelcomePasswordAction(token, password);
        if (result.error || !result.email) {
          setError(result.error ?? "This account setup link is invalid or has expired.");
          return;
        }

        const credential = await signInWithEmailAndPassword(
          getFirebaseAuth(),
          result.email,
          password,
        );
        const idToken = await credential.user.getIdToken(true);
        const signInResult = await completeSignInAction(idToken, false);
        if (signInResult?.error) setError(signInResult.error);
      } catch (setupError) {
        setError(describeAuthError(setupError));
      }
    });
  }

  if (!isFirebaseClientConfigured()) {
    return (
      <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="text-sm font-semibold text-amber-900">Account setup isn&apos;t available</p>
          <p className="mt-2 text-sm text-amber-900/90">
            The sign-in service isn&apos;t configured yet. Please contact ScoreWell support.
          </p>
        </div>
      </main>
    );
  }

  if (tokenError) {
    return (
      <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-semibold text-red-800">Account setup link unavailable</p>
          <p role="alert" className="mt-2 text-sm text-red-700">
            {tokenError}
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
        <div className="mx-auto mt-8 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
          <KeyRound className="h-5 w-5 text-brand-700" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-center text-lg font-bold text-ink">Set your password</h1>
        <p className="mt-2 text-center text-sm text-ink-muted">
          Choose a password to finish setting up your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <label className="text-sm font-medium text-ink-body">
            Password
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                disabled={pending}
                required
                className="w-full rounded-lg border border-line-strong py-2 pl-3 pr-11 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <label className="text-sm font-medium text-ink-body">
            Confirm password
            <div className="relative mt-1.5">
              <input
                type={showConfirmation ? "text" : "password"}
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                autoComplete="new-password"
                disabled={pending}
                required
                className="w-full rounded-lg border border-line-strong py-2 pl-3 pr-11 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmation((visible) => !visible)}
                aria-label={showConfirmation ? "Hide password" : "Show password"}
                className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-brand-600 hover:bg-brand-50"
              >
                {showConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={!token || pending}
            className="mt-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Signing you in..." : "Set password and continue"}
          </button>
        </form>
      </div>
    </main>
  );
}