import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Flashcard decks (site-build-prompt.md sections 5 and 6).
 *
 * ARTICLEs split off by taskType "flashcard-deck", the pattern tips, announcements, topic
 * banks, grammar points and study-abroad destinations already use — no schema change for the
 * content itself. The per-learner scheduling that sits on top of it does have its own table;
 * see FlashcardReview in schema.prisma.
 */

export const FLASHCARD_DECK_TASK_TYPE = "flashcard-deck";

const CardSchema = z.object({
  key: z.string(),
  front: z.string(),
  back: z.string(),
  example: z.string(),
});

const DeckDataSchema = z.object({
  description: z.string(),
  cards: z.array(CardSchema).min(1),
});

export type Flashcard = z.infer<typeof CardSchema>;

export type FlashcardDeck = {
  slug: string;
  title: string;
  description: string;
  cards: Flashcard[];
  tags: string[];
};

export async function listDecks(): Promise<FlashcardDeck[]> {
  const items = await prisma.contentItem.findMany({
    where: {
      contentType: "ARTICLE",
      taskType: FLASHCARD_DECK_TASK_TYPE,
      published: true,
    },
    orderBy: { slug: "asc" },
    select: { slug: true, title: true, tags: true, data: true },
  });

  return items.flatMap((item) => {
    const parsed = DeckDataSchema.safeParse(item.data);
    if (!parsed.success) return [];
    return [{ slug: item.slug, title: item.title, tags: item.tags, ...parsed.data }];
  });
}

export async function getDeck(slug: string): Promise<FlashcardDeck | null> {
  const item = await prisma.contentItem.findFirst({
    where: {
      slug,
      contentType: "ARTICLE",
      taskType: FLASHCARD_DECK_TASK_TYPE,
      published: true,
    },
    select: { slug: true, title: true, tags: true, data: true },
  });
  if (!item) return null;

  const parsed = DeckDataSchema.safeParse(item.data);
  if (!parsed.success) return null;
  return { slug: item.slug, title: item.title, tags: item.tags, ...parsed.data };
}

export type CardState = {
  card: Flashcard;
  /** Absent for a card this learner has never answered. */
  box?: number;
  dueAt?: Date;
  /** Due now, or never seen: both belong in today's session. */
  isDue: boolean;
};

export type DeckSession = {
  states: CardState[];
  dueCount: number;
  newCount: number;
  laterCount: number;
  /** When the soonest not-yet-due card comes back, for the "nothing due" state. */
  nextDueAt: Date | null;
};

/**
 * The deck with this learner's schedule applied.
 *
 * Cards the learner has never seen count as due: a new card is the one thing that is always
 * worth doing, and holding them back would leave a first-time learner with an empty session.
 */
export async function getDeckSession(
  userId: string | null,
  deck: FlashcardDeck,
  now: Date = new Date(),
): Promise<DeckSession> {
  const reviews = userId
    ? await prisma.flashcardReview.findMany({
        where: { userId, deckSlug: deck.slug },
        select: { cardKey: true, box: true, dueAt: true },
      })
    : [];

  const byKey = new Map(reviews.map((review) => [review.cardKey, review]));

  const states: CardState[] = deck.cards.map((card) => {
    const review = byKey.get(card.key);
    if (!review) return { card, isDue: true };
    return {
      card,
      box: review.box,
      dueAt: review.dueAt,
      isDue: review.dueAt.getTime() <= now.getTime(),
    };
  });

  const later = states.filter((state) => !state.isDue && state.dueAt);
  const nextDueAt = later.reduce<Date | null>(
    (soonest, state) =>
      !soonest || (state.dueAt && state.dueAt < soonest) ? (state.dueAt ?? soonest) : soonest,
    null,
  );

  return {
    states,
    dueCount: states.filter((state) => state.isDue && state.box !== undefined).length,
    newCount: states.filter((state) => state.box === undefined).length,
    laterCount: later.length,
    nextDueAt,
  };
}

/** Cards due across every deck, for the dashboard's study prompt. */
export async function countDueCards(userId: string, now: Date = new Date()): Promise<number> {
  const decks = await listDecks();
  if (decks.length === 0) return 0;

  const reviews = await prisma.flashcardReview.findMany({
    where: { userId, deckSlug: { in: decks.map((deck) => deck.slug) } },
    select: { deckSlug: true, cardKey: true, dueAt: true },
  });

  const seen = new Map(reviews.map((review) => [`${review.deckSlug}:${review.cardKey}`, review.dueAt]));

  let due = 0;
  for (const deck of decks) {
    for (const card of deck.cards) {
      const dueAt = seen.get(`${deck.slug}:${card.key}`);
      // Unseen cards count too, for the same reason the session treats them as due.
      if (!dueAt || dueAt.getTime() <= now.getTime()) due += 1;
    }
  }
  return due;
}
