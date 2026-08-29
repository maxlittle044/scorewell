import { Button } from "@/components/ui/button";

function TrophyIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M9 5h10v5a5 5 0 0 1-10 0V5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 6H6a2 2 0 0 0 0 4h1.5M19 6h3a2 2 0 0 1 0 4h-1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M14 15v4M11 23h6M11.5 19h5l1 4h-7.5l1-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export function DailyChallenge() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative flex flex-col items-center gap-8 overflow-hidden rounded-3xl bg-linear-to-br from-brand-600 via-brand-700 to-pop-700 px-6 py-10 text-center text-white shadow-glow-lg sm:px-12 md:flex-row md:text-left"
        >
          <div aria-hidden="true" className="absolute inset-0 bg-noise" />
          <div
            aria-hidden="true"
            className="animate-float pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-accent-400/30 blur-3xl"
          />
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-inset ring-white/20">
            <TrophyIcon />
          </span>

          <div className="relative flex-1">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Today&apos;s timed challenge
            </h2>
            <p className="mt-2 max-w-xl text-brand-100">
              A new short, timed exercise every day. Beat the clock, earn points,
              and climb the daily, weekly, and monthly leaderboard against
              learners worldwide.
            </p>
          </div>

          <Button href="/ielts/daily-challenge" variant="white" className="relative shrink-0">
            Try today&apos;s challenge
          </Button>
        </div>
      </div>
    </section>
  );
}
