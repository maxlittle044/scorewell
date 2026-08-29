"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { authAction } from "./actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [state, formAction, pending] = useActionState(authAction, {});

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="mt-8 flex rounded-full bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "login" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
            }`}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "signup" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
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
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-zinc-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
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

        <p className="mt-6 text-center text-sm text-zinc-500">
          {mode === "login" ? (
            <>
              New to ScoreWell?{" "}
              <button type="button" onClick={() => setMode("signup")} className="font-medium text-brand-600 hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")} className="font-medium text-brand-600 hover:underline">
                Log in
              </button>
            </>
          )}
        </p>

        <p className="mt-4 text-center text-xs text-zinc-400">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-zinc-600">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-zinc-600">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
