import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { listSimulationSets, type LegSkill } from "@/lib/exam/simulation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Full IELTS Simulation Tests — ScoreWell",
  description:
    "Sit all four IELTS skills back to back under one clock, in the order and timing of the real exam.",
};

const SKILL_LABELS: Record<LegSkill, string> = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

const VARIANT_LABELS = {
  academic: "Academic",
  "general-training": "General Training",
} as const;

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`;
}

/** Typographic tile — our own, never a reproduction of a book cover (spec §7.2). */
function SetCover({ name }: { name: string }) {
  return (
    <div className="flex h-40 w-32 shrink-0 flex-col justify-between rounded-xl bg-brand-700 p-4 text-white shadow-md">
      <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-white/60">
        Full test
      </span>
      <span className="text-sm font-bold leading-tight">{name}</span>
    </div>
  );
}

export default async function SimulationIndexPage() {
  const sets = await listSimulationSets();
  const session = await auth();

  // Which sittings this learner already has running or finished, so each card can offer
  // the right action rather than always saying "Start".
  const attempts = session?.user
    ? await prisma.simulationAttempt.findMany({
        where: { userId: session.user.id },
        orderBy: { startedAt: "desc" },
        select: {
          id: true,
          sourceTestSet: true,
          status: true,
          overallBand: true,
          listeningBand: true,
          readingBand: true,
          startedAt: true,
        },
      })
    : [];

  const inProgress = new Map(
    attempts.filter((a) => a.status === "IN_PROGRESS").map((a) => [a.sourceTestSet, a]),
  );
  const completed = new Map(
    attempts.filter((a) => a.status === "COMPLETED").map((a) => [a.sourceTestSet, a]),
  );

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Full <span className="text-pop-600">Simulation Tests</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-600">
          All four skills back to back under a single clock, in the order the real exam runs
          them. The clock keeps running if you close the tab — just like the real thing.
        </p>

        {sets.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
            No full simulations here yet. They appear once a collection has a test for all four
            skills.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {sets.map((set) => {
              const running = inProgress.get(set.name);
              const done = completed.get(set.name);

              return (
                <section
                  key={set.slug}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <SetCover name={set.name} />

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h2 className="text-lg font-bold text-zinc-900">{set.name}</h2>
                        {set.variant && (
                          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
                            {VARIANT_LABELS[set.variant]}
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-sm text-zinc-500">
                        4 skills · {formatDuration(set.totalMinutes)} total
                      </p>

                      <ol className="mb-5 grid grid-cols-1 gap-2 md:grid-cols-2">
                        {set.legs.map((leg, index) => (
                          <li
                            key={leg.skill}
                            className="flex items-baseline gap-2 rounded-xl border border-zinc-200 p-3"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[0.65rem] font-bold text-zinc-500">
                              {index + 1}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-zinc-800">
                                {SKILL_LABELS[leg.skill]}
                              </span>
                              <span className="block truncate text-xs text-zinc-500">
                                {leg.title} · {leg.minutes} min
                              </span>
                            </span>
                          </li>
                        ))}
                      </ol>

                      {done && (
                        <p className="mb-3 text-sm text-zinc-600">
                          You completed this sitting.{" "}
                          {done.overallBand !== null ? (
                            <>
                              Overall band{" "}
                              <span className="font-semibold text-brand-700">
                                {done.overallBand.toFixed(1)}
                              </span>
                              .
                            </>
                          ) : (
                            <>
                              Listening
                              {done.listeningBand !== null
                                ? ` band ${done.listeningBand.toFixed(1)}`
                                : " not scored"}
                              , Reading
                              {done.readingBand !== null
                                ? ` band ${done.readingBand.toFixed(1)}`
                                : " not scored"}
                              .
                            </>
                          )}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3">
                        {!session?.user ? (
                          <>
                            <Button href="/login" size="sm">
                              Log in to start
                            </Button>
                            <span className="text-xs text-zinc-500">
                              A sitting is saved and resumable, so it needs an account.
                            </span>
                          </>
                        ) : running ? (
                          <>
                            <Button href={`/simulation/${set.slug}`} size="sm" variant="accent">
                              Resume sitting
                            </Button>
                            <span className="text-xs text-zinc-500">
                              Started {running.startedAt.toLocaleString("en-GB")} — the clock has
                              been running since.
                            </span>
                          </>
                        ) : (
                          <Button href={`/simulation/${set.slug}`} size="sm">
                            {done ? "Sit it again" : "Start full test"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}

        <p className="mt-10 text-center text-sm text-zinc-500">
          Want one skill at a time instead?{" "}
          <Link href="/exam-library" className="font-medium text-brand-600 hover:underline">
            Browse the Exam Library
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
