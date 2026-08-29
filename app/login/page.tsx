"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { authAction } from "./actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [state, formAction, pending] = useActionState(authAction, {});

  return (
    <main className="flex flex-1 items-center justify-center bg-surface-muted px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-8 flex rounded-full bg-surface-sunken p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "login" ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "signup" ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            Sign up
          </button>
        </div>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="mode" value={mode} />

          {state.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
          )}

          {mode === "signup" && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink-body">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-body">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-body">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="w-full rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {mode === "login" ? (
            <>
              New to ScoreWell?{" "}
              <button type="button" onClick={() => setMode("signup")} className="font-medium text-link hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")} className="font-medium text-link hover:underline">
                Log in
              </button>
            </>
          )}
        </p>

        <p className="mt-4 text-center text-xs text-ink-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-ink-body">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-ink-body">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
