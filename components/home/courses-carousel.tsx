import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_HOVER_CLASS } from "@/components/ui/card";

const COURSES = [
  {
    title: "Writing Task 2 Foundations",
    description: "8 lessons on essay structure, coherence, and band-7+ vocabulary.",
    href: "/courses/writing-task-2-foundations",
    gradient: "from-brand-500 to-pop-600",
  },
  {
    title: "Speaking Fluency Bootcamp",
    description: "6 lessons of guided speaking drills with instant AI feedback.",
    href: "/courses/speaking-fluency-bootcamp",
    gradient: "from-rose-500 to-pop-600",
  },
  {
    title: "Academic Reading: Speed & Accuracy",
    description: "5 lessons on skimming, scanning, and every question type.",
    href: "/courses/academic-reading-speed-accuracy",
    gradient: "from-emerald-500 to-brand-600",
  },
  {
    title: "General Training Complete Prep",
    description: "10 lessons covering all four skills for GT candidates.",
    href: "/courses/general-training-complete-prep",
    gradient: "from-accent-500 to-pop-500",
  },
];

export function CoursesCarousel() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Structured courses"
          description="Multi-lesson paths that build a full skill, step by step."
          viewAllHref="/courses"
          viewAllLabel="View all courses"
        />

        <div data-reveal className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {COURSES.map((course) => (
            <Link
              key={course.href}
              href={course.href}
              className={`group w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-line/80 bg-surface ${CARD_HOVER_CLASS}`}
            >
              <div className={`h-32 bg-linear-to-br ${course.gradient}`} />
              <div className="p-5">
                <h3 className="font-semibold text-ink group-hover:text-link">
                  {course.title}
                </h3>
                <p className="mt-1.5 text-sm text-ink-body">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
