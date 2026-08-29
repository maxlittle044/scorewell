import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { SimulationRunner, type AttemptState } from "@/components/exam/simulation-runner";
import type { CriterionResult } from "@/components/tools/criterion-feedback";
import { getSimulationSetBySlug } from "@/lib/exam/simulation";
import { prisma } from "@/lib/prisma";
import { titleFromSlug } from "@/lib/slug";

export async function generateMetadata({
  params,
}: PageProps<"/simulation/[set]">): Promise<Metadata> {
  const { set } = await params;
  const simulation = await getSimulationSetBySlug(set);
  return {
    title: `${simulation?.name ?? titleFromSlug(set)} — Full IELTS Simulation | ScoreWell`,
  };
}

/** Narrows a stored JSONB feedback payload back to the shape the results screen renders. */
function asCriterionResult(value: unknown): CriterionResult | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<CriterionResult>;
  return typeof candidate.overallBand === "number" &&
    Array.isArray(candidate.criteria) &&
    Array.isArray(candidate.strengths) &&
    Array.isArray(candidate.improvements)
    ? (candidate as CriterionResult)
    : null;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
}

export default async function SimulationRunnerPage({
  params,
}: PageProps<"/simulation/[set]">) {
  const { set: slug } = await params;
  const simulation = await getSimulationSetBySlug(slug);

  if (!simulation) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-xl font-bold text-ink">{titleFromSlug(slug)}</h1>
          <p className="mt-4 text-sm text-ink-muted">
            No full simulation here — a sitting needs a collection with a test for all four
            skills.{" "}
            <Link href="/simulation" className="font-medium text-link hover:underline">
              See the ones that are ready
            </Link>
            .
          </p>
        </div>
      </Shell>
    );
  }

  const session = await auth();
  if (!session?.user) {
    return (
      <Shell>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-2xl font-bold text-ink">{simulation.name}</h1>
          <p className="mt-3 text-sm text-ink-body">
            A sitting runs on a saved clock so it survives a closed tab and can be resumed, which
            means it needs an account. Individual practice tests stay open to everyone.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/login" size="sm">
              Log in to start
            </Button>
            <Button href="/exam-library" variant="outline" size="sm">
              Browse practice tests
            </Button>
          </div>
        </div>
      </Shell>
    );
  }

  // The most recent sitting for this set: resumed if still running, or shown as results —
  // which is also where a finished sitting's Writing and Speaking get evaluated, so those
  // have to survive a revisit rather than dropping back to the pre-flight screen.
  const latest = await prisma.simulationAttempt.findFirst({
    where: {
      userId: session.user.id,
      sourceTestSet: simulation.name,
      status: { in: ["IN_PROGRESS", "COMPLETED"] },
    },
    orderBy: { startedAt: "desc" },
  });

  const initialAttempt: AttemptState | null = latest
    ? {
        id: latest.id,
        startedAt: latest.startedAt.getTime(),
        listeningBand: latest.listeningBand,
        readingBand: latest.readingBand,
        writingBand: latest.writingBand,
        speakingBand: latest.speakingBand,
        overallBand: latest.overallBand,
        writingResponse: latest.writingResponse,
        speakingTranscript: latest.speakingTranscript,
        // Written by evaluateSimulationLegAction as a CriterionResult; anything else is
        // treated as absent so a malformed row offers evaluation again instead of crashing.
        writingFeedback: asCriterionResult(latest.writingFeedback),
        speakingFeedback: asCriterionResult(latest.speakingFeedback),
        completed: latest.status === "COMPLETED",
      }
    : null;

  return (
    <Shell>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
          Full simulation
        </p>
        <h1 className="font-display text-2xl font-bold text-ink">{simulation.name}</h1>
      </div>

      <SimulationRunner set={simulation} initialAttempt={initialAttempt} />
    </Shell>
  );
}
