"use client";

import { useActionState, useOptimistic, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  MAX_DETAIL_LENGTH,
  MAX_TITLE_LENGTH,
  STATUSES,
  STATUS_LABELS,
  type FeatureRequestView,
} from "@/lib/feature-request-constants";
import {
  setFeatureRequestStatusAction,
  submitFeatureRequestAction,
  toggleFeatureVoteAction,
} from "@/lib/feature-request-actions";
import type { FeatureRequestStatus } from "@/generated/prisma/enums";

const STATUS_STYLES: Record<FeatureRequestStatus, string> = {
  OPEN: "bg-surface-sunken text-ink-body",
  PLANNED: "bg-brand-50 text-link",
  IN_PROGRESS: "bg-accent-100 text-accent-600",
  SHIPPED: "bg-emerald-100 text-emerald-700",
  DECLINED: "bg-surface-sunken text-ink-muted",
};

/**
 * The voting board (site-build-prompt.md section 3a).
 *
 * Voting is optimistic — the count moves on click and snaps back with a reason if the write
 * fails, the same treatment the course track gives its checkboxes. Signed-out readers see
 * every request and every real count; only the buttons need an account, and the page says so
 * once rather than disabling rows with no explanation.
 */
export function FeatureBoard({
  requests,
  signedIn,
  isAdmin,
}: {
  requests: FeatureRequestView[];
  signedIn: boolean;
  isAdmin: boolean;
}) {
  return (
    <ul className="flex flex-col divide-y divide-line rounded-2xl border border-line">
      {requests.map((request) => (
        <RequestRow key={request.id} request={request} signedIn={signedIn} isAdmin={isAdmin} />
      ))}
    </ul>
  );
}

function RequestRow({
  request,
  signedIn,
  isAdmin,
}: {
  request: FeatureRequestView;
  signedIn: boolean;
  isAdmin: boolean;
}) {
  const [saved, setSaved] = useState({ votes: request.votes, voted: request.votedByMe });
  const [optimistic, setOptimistic] = useOptimistic(
    saved,
    (current: { votes: number; voted: boolean }) => ({
      votes: current.votes + (current.voted ? -1 : 1),
      voted: !current.voted,
    }),
  );
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function vote() {
    if (!signedIn) return;
    setError(null);
    startTransition(async () => {
      setOptimistic(null);
      const result = await toggleFeatureVoteAction(request.id);
      if (!result.ok) {
        setError(result.error ?? "Couldn't save that vote.");
        return;
      }
      setSaved({ votes: result.votes ?? saved.votes, voted: Boolean(result.voted) });
    });
  }

  return (
    <li className="flex items-start gap-4 px-5 py-4">
      <button
        type="button"
        onClick={vote}
        disabled={!signedIn}
        aria-pressed={optimistic.voted}
        aria-label={optimistic.voted ? `Remove your vote for "${request.title}"` : `Vote for "${request.title}"`}
        title={signedIn ? undefined : "Log in to vote"}
        className={cn(
          "flex w-14 shrink-0 flex-col items-center rounded-lg border py-1.5 text-xs font-semibold transition-colors",
          optimistic.voted ? "border-brand-600 bg-brand-50 text-link" : "border-line text-ink-body",
          signedIn && !optimistic.voted && "hover:border-brand-300",
          !signedIn && "cursor-not-allowed opacity-70",
        )}
      >
        <span aria-hidden="true">▲</span>
        {optimistic.votes}
      </button>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{request.title}</p>
        {request.detail && (
          <p className="mt-1 text-sm leading-relaxed text-ink-body">{request.detail}</p>
        )}
        {error && <p className="mt-1 text-sm text-rose-700">{error}</p>}
        {isAdmin && <StatusControl request={request} />}
      </div>

      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
          STATUS_STYLES[request.status],
        )}
      >
        {STATUS_LABELS[request.status]}
      </span>
    </li>
  );
}

/** Admin-only: the one control that can turn a request into a promise. */
function StatusControl({ request }: { request: FeatureRequestView }) {
  const [status, setStatus] = useState<FeatureRequestStatus>(request.status);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  return (
    <div className="mt-2 flex items-center gap-2">
      <label htmlFor={`status-${request.id}`} className="text-xs text-ink-muted">
        Status
      </label>
      <select
        id={`status-${request.id}`}
        value={status}
        onChange={(event) => {
          const next = event.target.value as FeatureRequestStatus;
          const previous = status;
          setStatus(next);
          setError(null);
          startTransition(async () => {
            const result = await setFeatureRequestStatusAction(request.id, next);
            if (!result.ok) {
              setStatus(previous);
              setError(result.error ?? "Couldn't change that.");
            }
          });
        }}
        className="rounded-lg border border-line-strong bg-surface px-2 py-1 text-xs text-ink"
      >
        {STATUSES.map((value) => (
          <option key={value} value={value}>
            {STATUS_LABELS[value]}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-rose-700">{error}</span>}
    </div>
  );
}

export function FeatureRequestForm({ signedIn }: { signedIn: boolean }) {
  const [state, formAction, pending] = useActionState(submitFeatureRequestAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  if (!signedIn) {
    return (
      <div className="mt-6 rounded-2xl border border-line bg-surface-muted p-5">
        <p className="text-sm text-ink-body">
          <Link href="/login" className="font-medium text-link hover:underline">
            Log in
          </Link>{" "}
          to suggest a feature or vote for one. An account per vote is the only thing keeping
          these counts meaningful.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-surface-muted p-5"
    >
      <label htmlFor="title" className="text-sm font-medium text-ink-body">
        Suggest a feature
      </label>
      <input
        id="title"
        name="title"
        required
        maxLength={MAX_TITLE_LENGTH}
        placeholder="What should we build next?"
        className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      <textarea
        id="detail"
        name="detail"
        rows={3}
        maxLength={MAX_DETAIL_LENGTH}
        placeholder="Optional: why it would help you"
        className="w-full rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      {state.error && <p className="text-sm text-rose-700">{state.error}</p>}
      {state.submitted && (
        <p className="text-sm text-emerald-700">
          Added to the board, with your vote on it.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
      >
        {pending ? "Posting…" : "Post it"}
      </button>
    </form>
  );
}
