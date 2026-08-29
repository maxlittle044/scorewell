"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  cancelRegistrationAction,
  registerForLessonAction,
} from "@/lib/live-lesson-actions";

type Props = {
  slug: string;
  /** Example listing with no teacher and no joining link — cannot be registered for. */
  placeholder: boolean;
  isPast: boolean;
  isSignedIn: boolean;
  isRegistered: boolean;
};

export function LessonRegisterButton({
  slug,
  placeholder,
  isPast,
  isSignedIn,
  isRegistered,
}: Props) {
  const router = useRouter();
  const [registered, setRegistered] = useState(isRegistered);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (placeholder) {
    return (
      <span className="rounded-full border border-line bg-surface-muted px-6 py-3 text-sm font-semibold text-ink-muted">
        Registration not open
      </span>
    );
  }

  if (isPast) {
    return (
      <span className="rounded-full border border-line bg-surface-muted px-6 py-3 text-sm font-semibold text-ink-muted">
        This session has ended
      </span>
    );
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Log in to register
      </Link>
    );
  }

  function run(action: () => Promise<{ ok: boolean; error?: string }>, next: boolean) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (result.ok) {
        setRegistered(next);
        // revalidatePath only marks the server cache stale — without this the
        // open page keeps the attendee count and join link it rendered with.
        router.refresh();
      } else {
        setError(result.error ?? "Something went wrong.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        {registered ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-pop-50 px-5 py-2.5 text-sm font-semibold text-pop-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 13 4 4L19 7" />
              </svg>
              You are registered
            </span>
            <button
              type="button"
              disabled={pending}
              onClick={() => run(() => cancelRegistrationAction(slug), false)}
              className="text-sm font-semibold text-ink-muted hover:text-ink disabled:opacity-50"
            >
              {pending ? "Working…" : "Cancel registration"}
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => registerForLessonAction(slug), true)}
            className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-60"
          >
            {pending ? "Registering…" : "Register"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
