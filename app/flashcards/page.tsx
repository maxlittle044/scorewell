import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/page-header";
import { FlashcardsDeck } from "@/components/tools/flashcards-deck";
import { getDeckSession, listDecks } from "@/lib/content/flashcards";

export const metadata: Metadata = {
  title: "Flashcards — ScoreWell",
  description:
    "Academic vocabulary on a spaced-repetition schedule: each word comes back just before you would have forgotten it.",
};

export default async function FlashcardsPage() {
  const [decks, session] = await Promise.all([listDecks(), auth()]);
  const deck = decks[0] ?? null;

  if (!deck) {
    return (
      <main className="flex flex-1 flex-col bg-surface-muted">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <PageHeader title="Flashcards" />
          <p className="text-sm text-ink-muted">No decks here yet.</p>
        </div>
      </main>
    );
  }

  const userId = session?.user?.id ?? null;
  const state = await getDeckSession(userId, deck);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title={deck.title} description={deck.description} />

        {userId ? (
          <p className="mb-6 text-sm text-ink-muted">
            {state.dueCount + state.newCount === 0 ? (
              <>
                Nothing due today.{" "}
                {state.nextDueAt && (
                  <>
                    The next card is back on{" "}
                    {state.nextDueAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                    })}
                    .
                  </>
                )}
              </>
            ) : (
              // "In today's session", not "due now": this is the count as the page loaded,
              // and the live counter is on the card itself. Two numbers that disagree while
              // one silently means something else is worse than one that names its scope.
              <>
                <strong className="text-ink">{state.dueCount + state.newCount}</strong> in today&apos;s
                session
                {state.newCount > 0 && <> · {state.newCount} new</>}
                {state.laterCount > 0 && <> · {state.laterCount} scheduled for later</>}
              </>
            )}
          </p>
        ) : (
          <p className="mb-6 text-sm text-ink-muted">
            The whole deck is here to work through.{" "}
            <Link href="/login" className="font-medium text-link hover:underline">
              Log in
            </Link>{" "}
            and each card gets scheduled — right answers come back later, missed ones come back
            sooner.
          </p>
        )}

        <FlashcardsDeck deckSlug={deck.slug} states={state.states} signedIn={Boolean(userId)} />

        <p className="mt-10 text-xs leading-relaxed text-ink-muted">
          Cards move up a five-step ladder: a card you know comes back after 1, 3, 7, 21 and
          then 60 days. Miss one and it drops back to the start, and you see it again before
          the session ends.
        </p>
      </div>
    </main>
  );
}
