import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";

const EXERCISES = [
  {
    tag: "Writing Task 2",
    title: "Some people think technology has made life more complicated",
    href: "/writing-exercises/technology-made-life-complicated",
  },
  {
    tag: "Writing Task 1 (Academic)",
    title: "Bar chart: internet usage by age group, 2010–2023",
    href: "/writing-exercises/internet-usage-by-age-bar-chart",
  },
  {
    tag: "Writing Task 1 (General)",
    title: "Letter to a landlord about a repair issue",
    href: "/writing-exercises/letter-to-landlord-repair-issue",
  },
  {
    tag: "Writing Task 2",
    title: "Should university education be free for all students?",
    href: "/writing-exercises/university-education-free",
  },
  {
    tag: "Writing Task 1 (Academic)",
    title: "Line graph: coffee consumption trends across three countries",
    href: "/writing-exercises/coffee-consumption-line-graph",
  },
];

export function WritingExercisesList() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Recent writing prompts"
          description="Practice with prompts based on real past exam questions."
          viewAllHref="/writing-exercises"
          viewAllLabel="View all prompts"
        />

        <ul data-reveal className="flex flex-col divide-y divide-zinc-200 rounded-2xl border border-line/80 bg-surface shadow-sm shadow-zinc-900/3">
          {EXERCISES.map((exercise) => (
            <li key={exercise.href}>
              <Link
                href={exercise.href}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-brand-50/50"
              >
                <div>
                  <span className="inline-block rounded-full bg-linear-to-r from-brand-50 to-pop-50 px-2.5 py-0.5 text-xs font-medium text-link">
                    {exercise.tag}
                  </span>
                  <p className="mt-1.5 font-medium text-ink">{exercise.title}</p>
                </div>
                <span className="shrink-0 text-sm font-medium text-link opacity-0 transition-opacity group-hover:opacity-100">
                  Practice →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
