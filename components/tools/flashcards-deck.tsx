"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CardState } from "@/lib/content/flashcards";
import { describeInterval } from "@/lib/flashcards";
import { reviewCardAction } from "@/lib/flashcard-actions";

/**
 * A spaced-repetition session over one deck (site-build-prompt.md section 6).
 *
 * The queue is built once, on mount, from what was due when the page rendered. Rebuilding it
 * after every answer would let a card the learner just saw jump back to the front, and would
 * make the "3 left" counter move unpredictably while they work.
 *
 * A missed card is pushed to the back of the queue for one more look this session, on top of
 * being scheduled for tomorrow. That requeue is deliberately not stored: it belongs to this
 * sitting, not to the schedule.
 *
 * Signed-out learners get the same deck without scheduling — the cards are the content, and
 * hiding them behind an account would be hiding free material.
 */

type QueueItem = { state: CardState; requeued: boolean };

export function FlashcardsDeck({
  deckSlug,
  states,
  signedIn,
}: {
  deckSlug: string;
  states: CardState[];
  signedIn: boolean;
}) {
  const initialQueue = useMemo<QueueItem[]>(() => {
    const due = states.filter((state) => state.isDue);
    // Signed out there is no schedule, so the whole deck is the session.
    const source = signedIn ? due : states;
    return source.map((state) => ({ state, requeued: false }));
  }, [states, signedIn]);

  const [queue, setQueue] = useState<QueueItem[]>(initialQueue);
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState(0);
  const [lastScheduled, setLastScheduled] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const current = queue[position];
  const remaining = queue.length - position;

  function advance(requeue: QueueItem | null) {
    setFlipped(false);
    setQueue((q) => (requeue ? [...q, requeue] : q));
    setPosition((p) => p + 1);
  }

  function answer(result: "again" | "good") {
    if (!current) return;
    setError(null);
    setAnswered((n) => n + 1);

    const requeue = result === "again" ? { state: current.state, requeued: true } : null;

    if (!signedIn) {
      // Nothing to save, but the session still behaves the same way.
      setLastScheduled(null);
      advance(requeue);
      return;
    }

    const cardKey = current.state.card.key;
    startTransition(async () => {
      const saved = await reviewCardAction({ deckSlug, cardKey, result });
      if (!saved.ok) {
        setError(saved.error ?? "Couldn't save that answer.");
        setAnswered((n) => Math.max(0, n - 1));
        return;
      }
      setLastScheduled(saved.box ? describeInterval(saved.box) : null);
      advance(requeue);
    });
  }

  if (!current) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <p className="text-base font-semibold text-ink">
          {answered === 0 ? "Nothing due right now." : "Session finished."}
        </p>
        <p className="mt-2 text-sm text-ink-body">
          {answered === 0
            ? "Every card in this deck is scheduled for a later day. Coming back when they are due is the whole point — cramming them again today teaches you less."
            : `${answered} ${answered === 1 ? "answer" : "answers"} recorded. Each card comes back on its own schedule.`}
        </p>
        {!signedIn && (
          <p className="mt-4 text-sm text-ink-muted">
            <Link href="/login" className="font-medium text-link hover:underline">
              Log in
            </Link>{" "}
            to have cards scheduled for you.
          </p>
        )}
      </div>
    );
  }

  const card = current.state.card;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full items-center justify-between text-sm text-ink-muted">
        <span>
          {remaining} {remaining === 1 ? "card" : "cards"} left
        </span>
        {current.requeued ? (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            Second look
          </span>
        ) : current.state.box ? (
          <span className="text-xs">Box {current.state.box}</span>
        ) : (
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-link">
            New
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        className="flex min-h-56 w-full max-w-sm flex-col items-center justify-center gap-3 rounded-2xl border border-line bg-surface p-6 text-center shadow-sm hover:shadow-md"
      >
        {flipped ? (
          <>
            <p className="text-base text-ink-body">{card.back}</p>
            <p className="text-sm italic text-ink-muted">{card.example}</p>
          </>
        ) : (
          <p className="text-3xl font-bold text-ink">{card.front}</p>
        )}
      </button>

      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}

      {flipped ? (
        <div className="mt-6 flex w-full max-w-sm gap-3">
          <button
            type="button"
            disabled={pending}
            onClick={() => answer("again")}
            className={cn(
              "flex-1 rounded-full border-2 border-line-strong px-5 py-2.5 text-sm font-semibold text-ink-body transition-colors hover:border-rose-400 hover:text-rose-700",
              pending && "cursor-not-allowed opacity-60",
            )}
          >
            Didn&apos;t know it
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => answer("good")}
            className={cn(
              "flex-1 rounded-full bg-pop-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pop-700",
              pending && "cursor-not-allowed opacity-60",
            )}
          >
            Knew it
          </button>
        </div>
      ) : (
        <p className="mt-3 text-xs text-ink-muted">Click the card to see the meaning</p>
      )}

      {lastScheduled && (
        <p className="mt-4 text-xs text-ink-muted">Last card scheduled {lastScheduled}.</p>
      )}
    </div>
  );
}
