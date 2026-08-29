import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { HeroIllustration } from "./hero-illustration";

/**
 * Counts are read from the content library rather than written down, so the hero can never
 * drift from what the site actually contains — and never overstates it.
 */
async function getLibraryStats() {
  const [practiceTests, published] = await Promise.all([
    prisma.contentItem.count({ where: { published: true, contentType: "PRACTICE_TEST" } }),
    prisma.contentItem.count({ where: { published: true } }),
  ]);
  return [
    { value: String(practiceTests), label: "practice tests" },
    { value: String(published), label: "lessons & exercises" },
    { value: "Free", label: "to start, no card needed" },
  ];
}

/** Circular arrow badge that sits inside the leading call to action (spec section 7.1). */
function ArrowBadge({ tone }: { tone: "on-dark" | "on-light" }) {
  return (
    <span
      aria-hidden="true"
      className={
        tone === "on-dark"
          ? "ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/20"
          : "ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-50"
      }
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" />
        <path d="M9 7h8v8" />
      </svg>
    </span>
  );
}

export async function Hero() {
  const stats = await getLibraryStats();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft pale wash instead of a full-bleed dark band (spec section 7.1). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-160 bg-linear-to-b from-pop-50 to-white"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-160 w-320 -translate-x-1/2 rounded-full bg-pop-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-12 text-center sm:px-6 lg:px-8 lg:pt-24">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-pop-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-pop-700">
          <span className="h-1.5 w-1.5 rounded-full bg-pop-500" />
          Real exam formats · Free to practise
        </span>

        <h1 className="font-display mx-auto max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-900 sm:text-5xl lg:text-6xl">
          Stop guessing why you{" "}
          <span className="text-pop-600">lost the mark.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600">
          Practise every real IELTS question type, then see exactly where each answer came from
          in the passage — and why the wrong options were wrong.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/exam-library" size="lg" className="pr-2">
            Start practising
            <ArrowBadge tone="on-dark" />
          </Button>
          <Button href="/pricing" variant="outline" size="lg" className="bg-white">
            See plans
          </Button>
        </div>

        <p className="mt-5 text-sm text-zinc-500">
          No download, no card. Works in any modern browser.
        </p>

        <div className="mt-14">
          <HeroIllustration />
        </div>

        <dl className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4 border-t border-zinc-200 pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">
                {stat.value}
              </dd>
              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
