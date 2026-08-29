"use client";

import { useState } from "react";

const CARDS = [
  { front: "Ubiquitous", back: "Present, appearing, or found everywhere." },
  { front: "Ambiguous", back: "Open to more than one interpretation; not having one obvious meaning." },
  { front: "Meticulous", back: "Showing great attention to detail; very careful and precise." },
  { front: "Pragmatic", back: "Dealing with things sensibly and realistically." },
  { front: "Substantial", back: "Of considerable importance, size, or worth." },
  { front: "Inevitable", back: "Certain to happen; unavoidable." },
  { front: "Controversial", back: "Giving rise to public disagreement." },
  { front: "Consensus", back: "General agreement among a group of people." },
  { front: "Feasible", back: "Possible to do easily or conveniently." },
  { front: "Detrimental", back: "Tending to cause harm." },
];

export function FlashcardsDeck() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = CARDS[index];

  function next() {
    setFlipped(false);
    setIndex((i) => (i + 1) % CARDS.length);
  }

  function prev() {
    setFlipped(false);
    setIndex((i) => (i - 1 + CARDS.length) % CARDS.length);
  }

  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 text-sm text-zinc-500">
        {index + 1} / {CARDS.length}
      </p>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flex h-56 w-full max-w-sm items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-sm hover:shadow-md"
      >
        {flipped ? (
          <p className="text-base text-zinc-700">{card.back}</p>
        ) : (
          <p className="text-3xl font-bold text-zinc-900">{card.front}</p>
        )}
      </button>
      <p className="mt-3 text-xs text-zinc-400">Click the card to flip it</p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={prev}
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={next}
          className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
