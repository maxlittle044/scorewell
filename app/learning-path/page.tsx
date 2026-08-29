import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { getLearningPlan } from "@/lib/learning-path";
import type { Skill } from "@/generated/prisma/enums";

export const metadata: Metadata = {
  title: "Your Learning Path — ScoreWell",
  description:
    "A personalised, goal-based study plan built from your placement diagnostic and your practice history.",
};

const SKILL_LABELS: Record<Skill, string> = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

/** What the page shows before there's anything to build a plan from. */
function Intro({ signedIn }: { signedIn: boolean }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
        Your <span className="text-pop-600">Learning Path</span>
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-zinc-600">
        Take a short diagnostic, tell us the band you need, and get an ordered plan built from
        your own results — not a generic checklist.
      </p>

      <ol className="mx-auto mt-10 flex max-w-md flex-col gap-3 text-left">
        {[
          ["Take the diagnostic", "Twelve questions, no timer, about ten minutes."],
          ["Set your target band", "The plan is built around the gap you actually need to close."],
          ["Work the plan", "It rebuilds from your latest results every time you open it."],
        ].map(([title, detail], index) => (
          <li key={title} className="flex gap-3 rounded-xl border border-zinc-200 bg-white p-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
              {index + 1}
            </span>
            <span>
              <span className="block text-sm font-semibold text-zinc-900">{title}</span>
              <span className="block text-sm text-zinc-500">{detail}</span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex justify-center gap-3">
        {signedIn ? (
          <Button href="/learning-path/assessment" size="lg">
            Start the diagnostic
          </Button>
        ) : (
          <>
            <Button href="/login" size="lg">
              Log in to start
            </Button>
            <Button href="/exam-library" variant="outline" size="lg">
              Browse tests
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default async function LearningPathPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Intro signedIn={false} />
        </div>
      </main>
    );
  }

  const plan = await getLearningPlan(session.user.id);
  const started = plan.placementBand !== null || plan.perSkill.some((s) => s.band !== null);

  if (!started) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <Intro signedIn />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Learning Path
        </p>
        <h1 className="font-display text-2xl font-bold text-zinc-900">Your study plan</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Rebuilt from your latest results each time you open it.
        </p>

        {/* Where you are */}
        <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="font-semibold text-zinc-900">Where you are</h2>
            {plan.targetBand !== null && (
              <p className="text-sm text-zinc-500">
                Target band{" "}
                <span className="font-semibold text-zinc-800">{plan.targetBand.toFixed(1)}</span>
              </p>
            )}
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {plan.perSkill.map((entry) => (
              <div key={entry.skill} className="rounded-xl bg-zinc-50 p-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {SKILL_LABELS[entry.skill]}
                </dt>
                <dd
                  className={
                    entry.band === null
                      ? "mt-1 text-sm text-zinc-400"
                      : "mt-1 text-2xl font-bold text-brand-700"
                  }
                >
                  {entry.band === null ? "Not measured" : entry.band.toFixed(1)}
                </dd>
              </div>
            ))}
          </dl>

          {plan.placementBand !== null && (
            <div className="mt-5 rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-700">
                Your diagnostic put your starting level at around band{" "}
                <span className="font-semibold text-zinc-900">
                  {plan.placementBand.toFixed(1)}
                </span>
                .{" "}
                {plan.sections.length > 0 && (
                  <>
                    {plan.sections
                      .map((section) => `${section.label} ${section.correct}/${section.total}`)
                      .join(" · ")}
                    .
                  </>
                )}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                That estimate comes from reading and language questions only — it is a starting
                point, not a substitute for a full timed test in each skill.
              </p>
            </div>
          )}

          {plan.gap !== null && plan.gap > 0 && (
            <p className="mt-4 text-sm text-zinc-600">
              Your weakest measured skill is{" "}
              <span className="font-semibold text-zinc-900">{plan.gap}</span> below your target.
            </p>
          )}
        </section>

        {/* What to do next */}
        <section className="mt-6">
          <h2 className="mb-3 font-semibold text-zinc-900">What to do next</h2>

          {plan.steps.length === 0 ? (
            <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
              Nothing outstanding right now — every skill has a band and no question type is
              lagging. Keep practising, and the plan will pick up whatever slips.
            </p>
          ) : (
            <ol className="flex flex-col gap-3">
              {plan.steps.map((step, index) => (
                <li
                  key={step.id}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900">{step.title}</p>
                    <p className="mt-0.5 text-sm text-zinc-600">{step.reason}</p>
                  </div>
                  <Button href={step.href} size="sm" variant="outline" className="shrink-0">
                    {step.cta}
                  </Button>
                </li>
              ))}
            </ol>
          )}
        </section>

        <p className="mt-8 text-sm text-zinc-500">
          {plan.placementBand === null ? (
            <>
              Haven&apos;t taken the diagnostic?{" "}
              <Link
                href="/learning-path/assessment"
                className="font-medium text-brand-600 hover:underline"
              >
                Take it now
              </Link>{" "}
              to sharpen the plan.
            </>
          ) : (
            <>
              Level changed?{" "}
              <Link
                href="/learning-path/assessment"
                className="font-medium text-brand-600 hover:underline"
              >
                Retake the diagnostic
              </Link>
              .
            </>
          )}
        </p>
      </div>
    </main>
  );
}
