import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * The numbered "how it works" strip (site-build-prompt.md section 3, item 7):
 * placement → learning path → practice → AI scoring → optional human review.
 *
 * Every step links to something that exists and is reachable today. That matters twice
 * over: the spec forbids advertising anything not built, and until this strip existed the
 * homepage never mentioned the Learning Path or the full simulation at all, so two of the
 * site's biggest features were invisible to a first-time visitor.
 */

type Step = {
  title: string;
  description: string;
  href: string;
  /** Shown as a small tag where a step isn't part of the free path. */
  note?: string;
};

const STEPS: Step[] = [
  {
    title: "Take the diagnostic",
    description:
      "Twelve questions on reading and language, about ten minutes, no timer. It estimates where you're starting from.",
    href: "/learning-path/assessment",
  },
  {
    title: "Get your plan",
    description:
      "Tell us the band you need. Your Learning Path orders what to do next around that gap, and rebuilds as your results change.",
    href: "/learning-path",
  },
  {
    title: "Practise skill by skill",
    description:
      "Work through the library by skill or collection. Listening and Reading are marked instantly, with the answer's source highlighted in the passage.",
    href: "/exam-library",
  },
  {
    title: "Sit a full simulation",
    description:
      "All four skills back to back under one clock, in the order the real exam runs them — the dress rehearsal for timing and stamina.",
    href: "/simulation",
  },
  {
    title: "Get AI feedback",
    description:
      "Writing and Speaking come back scored per criterion, with specific fixes rather than a single number.",
    href: "/tools/writing-task2-checker",
  },
  {
    title: "Add an examiner review",
    description:
      "Want a person to read it? Send a submission to a human examiner with the turnaround stated before you pay.",
    href: "/reviews",
    note: "Optional",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-zinc-50/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="How it works"
          title={
            <>
              From <span className="text-pop-600">where you are</span> to the band you need
            </>
          }
          description="Six steps, in order. Start anywhere, but this is the path that works."
        />

        <ol data-reveal className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <Link
                href={step.href}
                className="group flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-brand-400 hover:bg-brand-50/40"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-zinc-900 group-hover:text-brand-700">
                    {step.title}
                  </h3>
                  {step.note && (
                    <span className="rounded-full bg-accent-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-accent-600">
                      {step.note}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-zinc-600">{step.description}</p>
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <Button href="/learning-path" size="lg">
            Start with the diagnostic
          </Button>
        </div>
      </div>
    </section>
  );
}
