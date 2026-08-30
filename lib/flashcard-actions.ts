"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getDeck } from "@/lib/content/flashcards";
import { MAX_BOX, nextBox, nextDueAt, type ReviewResult } from "@/lib/flashcards";

export type ReviewCardResult = {
  ok: boolean;
  box?: number;
  dueAt?: string;
  error?: string;
};

/**
 * Records one answer and schedules the card.
 *
 * The card key is checked against the deck's real cards before anything is written, the same
 * guard the course track uses on its lesson index: without it a crafted request could fill a
 * learner's own review table with keys that are not in any deck, and every later count of
 * "cards due" would be wrong.
 *
 * A lapse is only counted when a card that had climbed out of box 1 is missed. Missing a new
 * card is not a lapse; it is what a new card is for.
 */
export async function reviewCardAction(params: {
  deckSlug: string;
  cardKey: string;
  result: ReviewResult;
}): Promise<ReviewCardResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Please log in to save your progress." };

  if (params.result !== "again" && params.result !== "good") {
    return { ok: false, error: "That isn't an answer this deck understands." };
  }

  const deck = await getDeck(params.deckSlug);
  if (!deck) return { ok: false, error: "That deck is no longer available." };
  if (!deck.cards.some((card) => card.key === params.cardKey)) {
    return { ok: false, error: "That card isn't part of this deck." };
  }

  const where = {
    userId_deckSlug_cardKey: {
      userId: session.user.id,
      deckSlug: params.deckSlug,
      cardKey: params.cardKey,
    },
  };

  const existing = await prisma.flashcardReview.findUnique({ where });
  const currentBox = existing?.box ?? 1;
  // A card seen for the first time enters box 1 whichever way it was answered, so its first
  // gap is one day rather than three. Promoting a correct first answer straight to box 2
  // would skip the bottom rung of the ladder the page prints — and a word you recognised
  // once, cold, is exactly the word worth seeing again tomorrow.
  const box = existing ? nextBox(currentBox, params.result) : 1;
  const dueAt = nextDueAt(box);
  const lapsed = params.result === "again" && currentBox > 1;

  const saved = await prisma.flashcardReview.upsert({
    where,
    create: {
      userId: session.user.id,
      deckSlug: params.deckSlug,
      cardKey: params.cardKey,
      box,
      dueAt,
      reviewCount: 1,
      lapses: 0,
    },
    update: {
      box,
      dueAt,
      lastReviewedAt: new Date(),
      reviewCount: { increment: 1 },
      ...(lapsed ? { lapses: { increment: 1 } } : {}),
    },
    select: { box: true, dueAt: true },
  });

  // No revalidatePath: the deck is a client-side session that already knows what it just
  // answered, and re-rendering the page under the learner mid-session would lose their place.
  // The dashboard's due count is read fresh on its own next request.
  return { ok: true, box: Math.min(saved.box, MAX_BOX), dueAt: saved.dueAt.toISOString() };
}
