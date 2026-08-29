import { Button } from "@/components/ui/button";

function UsersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="11" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 22c.6-4 3.4-6.5 7-6.5s6.4 2.5 7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="9" r="2.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 15.7c2.7.5 4.6 2.5 5 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CoachingCrossSell() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="flex flex-col items-center gap-6 rounded-3xl border border-zinc-200 bg-linear-to-br from-zinc-50 to-brand-50/40 px-6 py-10 text-center md:flex-row md:text-left"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-md ring-1 ring-inset ring-black/5">
            <UsersIcon />
          </span>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-zinc-900">
              Want personalized coaching?
            </h2>
            <p className="mt-1.5 max-w-xl text-zinc-600">
              Book 1-on-1 sessions with a human IELTS tutor for feedback the AI
              tools can&apos;t give — mock interviews, essay reviews, and a study
              plan built around your target band.
            </p>
          </div>

          <Button href="/coaching" variant="dark" className="shrink-0">
            Find a tutor
          </Button>
        </div>
      </div>
    </section>
  );
}
