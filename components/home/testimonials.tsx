"use client";

import { useEffect, useState } from "react";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatarColor: string;
};

/**
 * Real learner quotes only.
 *
 * This list is deliberately empty. It previously held five invented learners
 * with invented quotes and star ratings, which is exactly the fabricated review
 * content the project's honesty rules forbid — and publishing it would have
 * made it a false claim to visitors rather than a placeholder.
 *
 * Add entries here only when a real learner has actually said the words, with
 * their permission to publish. Until then the whole section renders nothing;
 * site-build-prompt.md section 7a explicitly allows this area to start empty
 * and grow rather than being seeded with numbers we cannot support.
 */
const TESTIMONIALS: Testimonial[] = [];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M8 1.5l1.98 4.14 4.52.53-3.35 3.14.9 4.49L8 11.6l-4.05 2.2.9-4.49L1.5 6.17l4.52-.53L8 1.5z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(id);
  }, [count]);

  // No real quotes yet — show nothing rather than an empty shell or invented ones.
  if (count === 0) return null;

  const current = TESTIMONIALS[Math.min(index, count - 1)];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-surface via-brand-50/50 to-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-pop-600">
          From our learners
        </h2>
        <p className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          What ScoreWell learners say
        </p>

        <div
          data-reveal
          className="mt-10 rounded-3xl border border-line/80 bg-surface/80 px-6 py-10 shadow-xl shadow-zinc-900/4 backdrop-blur"
        >
          <div className="flex flex-col items-center">
            <div className="rounded-full bg-linear-to-br from-brand-500 to-pop-500 p-0.5 shadow-glow-sm">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white ${current.avatarColor}`}
              >
                {initials(current.name)}
              </div>
            </div>

            <div className="mt-4 flex text-accent-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < current.rating} />
              ))}
            </div>

            <blockquote className="mt-4 max-w-xl text-lg text-ink-body">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <p className="mt-4 text-sm font-medium text-ink">
              {current.name}
              <span className="font-normal text-ink-muted"> — {current.role}</span>
            </p>

            {count > 1 && (
              <div className="mt-6 flex items-center gap-2">
                {TESTIMONIALS.map((testimonial, i) => (
                  <button
                    key={testimonial.name}
                    type="button"
                    aria-label={`Show testimonial from ${testimonial.name}`}
                    aria-current={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index
                        ? "w-6 bg-linear-to-r from-brand-500 to-pop-500"
                        : "w-2 bg-line hover:bg-line-strong"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
