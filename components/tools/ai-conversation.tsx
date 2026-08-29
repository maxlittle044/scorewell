"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import {
  requestFeedbackAction,
  sendMessageAction,
  startConversationAction,
  type ConversationState,
} from "@/lib/ai/conversation-actions";
import type { ChatMessage } from "@/lib/ai/conversation";

function Notice({ state }: { state: ConversationState }) {
  if (!state.error) return null;
  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
        state.limitReached
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-red-200 bg-red-50 text-red-600"
      }`}
    >
      {state.error}
      {state.limitReached && (
        <Link href="/pricing" className="ml-1 font-semibold underline hover:no-underline">
          See plans
        </Link>
      )}
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  return (
    <div
      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        message.role === "assistant"
          ? "self-start bg-surface-sunken text-ink"
          : "self-end bg-brand-600 text-white"
      }`}
    >
      {message.content}
    </div>
  );
}

function FeedbackPanel({ feedback }: { feedback: NonNullable<ConversationState["feedback"]> }) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-link">
          {feedback.overallBand.toFixed(1)}
        </span>
        <span className="text-sm font-medium text-ink-body">estimated overall band</span>
      </div>

      <p className="mb-5 rounded-xl bg-surface-muted px-3 py-2 text-xs leading-relaxed text-ink-body">
        IELTS Speaking is marked on four criteria, but Pronunciation can&apos;t be judged from typed
        answers — only the three below are scored. For pronunciation, use the{" "}
        <Link href="/pronunciation" className="font-medium text-link hover:underline">
          pronunciation drills
        </Link>
        .
      </p>

      <div className="flex flex-col gap-3">
        {feedback.criteria.map((criterion) => (
          <div key={criterion.name} className="rounded-xl border border-line p-3">
            <div className="mb-1 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-ink">{criterion.name}</h4>
              <span className="text-sm font-bold text-link">
                {criterion.band.toFixed(1)}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-body">{criterion.feedback}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Strengths
          </h4>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-body">
            {feedback.strengths.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
            To improve
          </h4>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-body">
            {feedback.improvements.map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      {feedback.rephrasings.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Say it better
          </h4>
          <div className="flex flex-col gap-2.5">
            {feedback.rephrasings.map((item, i) => (
              <div key={i} className="rounded-xl border border-line p-3 text-sm">
                <p className="text-ink-muted">
                  You said: <span className="text-ink-body">“{item.said}”</span>
                </p>
                <p className="mt-1 text-ink">
                  Better: <span className="font-medium">“{item.better}”</span>
                </p>
                <p className="mt-1 text-xs text-ink-muted">{item.why}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AiConversation({
  slug,
  initial,
  signedIn,
}: {
  slug: string;
  initial: ConversationState;
  signedIn: boolean;
}) {
  const [state, setState] = useState<ConversationState>(initial);
  const [draft, setDraft] = useState("");
  const [pending, startTransition] = useTransition();
  const endRef = useRef<HTMLDivElement>(null);

  const messages = state.messages ?? [];
  const started = Boolean(state.conversationId);
  const outOfTurns = (state.turnsRemaining ?? 0) <= 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages.length, pending]);

  function run(fn: () => Promise<ConversationState>) {
    startTransition(async () => {
      const next = await fn();
      // A failed turn returns the unchanged history, so merge rather than
      // replace when the action couldn't produce a conversation at all.
      setState((prev) => (next.conversationId ? next : { ...prev, ...next }));
    });
  }

  if (!signedIn) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <p className="text-sm text-ink-body">
          Conversation practice uses the AI examiner, so you&apos;ll need to be signed in.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Log in to start
        </Link>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <p className="text-sm text-ink-body">
          You&apos;ll have a short spoken-style exchange with an AI examiner, then get band-level
          feedback on what you said.
        </p>
        <p className="mt-2 text-xs text-ink-muted">
          The whole conversation counts as one AI use, not one per message.
        </p>
        <button
          type="button"
          onClick={() => run(() => startConversationAction(slug))}
          disabled={pending}
          className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
        >
          {pending ? "Starting…" : "Start conversation"}
        </button>
        <Notice state={state} />
      </div>
    );
  }

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || pending || outOfTurns) return;
    setDraft("");
    run(() => sendMessageAction(state.conversationId!, text));
  }

  return (
    <div>
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
        {messages.map((message, i) => (
          <Bubble key={i} message={message} />
        ))}
        {pending && (
          <div className="self-start rounded-2xl bg-surface-sunken px-4 py-2.5 text-sm text-ink-muted">
            Thinking…
          </div>
        )}
        <div ref={endRef} />
      </div>

      <p className="mt-2 text-right text-xs text-ink-muted">
        {state.turnsRemaining} of {(state.turnsUsed ?? 0) + (state.turnsRemaining ?? 0)} turns left
      </p>

      {!state.feedback && (
        <form onSubmit={handleSend} className="mt-2 flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={pending || outOfTurns}
            placeholder={outOfTurns ? "No turns left — ask for feedback" : "Type your answer..."}
            className="flex-1 rounded-full border border-line-strong px-4 py-2.5 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 disabled:bg-surface-muted"
          />
          <button
            type="submit"
            disabled={pending || outOfTurns || draft.trim() === ""}
            className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
          >
            Send
          </button>
        </form>
      )}

      <Notice state={state} />

      {!state.feedback ? (
        <button
          type="button"
          onClick={() => run(() => requestFeedbackAction(state.conversationId!))}
          disabled={pending || (state.turnsUsed ?? 0) === 0}
          className="mt-4 rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-ink-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Reviewing…" : "End & get feedback"}
        </button>
      ) : (
        <>
          <FeedbackPanel feedback={state.feedback} />
          <button
            type="button"
            onClick={() => {
              setState({});
              run(() => startConversationAction(slug));
            }}
            disabled={pending}
            className="mt-4 rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-ink-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start a new conversation
          </button>
        </>
      )}
    </div>
  );
}
