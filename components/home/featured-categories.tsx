import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_LINK_CLASS } from "@/components/ui/card";
import { BookIcon, HeadphonesIcon, MicIcon, PencilIcon } from "./skill-icons";

/**
 * Counts come from the library, not from copy — the previous hard-coded "40+ full-length
 * reading tests" overstated a library that holds six.
 */
const CATEGORIES = [
  {
    label: "Reading",
    skill: "READING",
    description: "Timed passages with instant scoring and answer explanations.",
    href: "/ielts/reading",
    icon: BookIcon,
    bg: "bg-brand-50",
    fg: "text-brand-600",
  },
  {
    label: "Listening",
    skill: "LISTENING",
    description: "Exam-style recordings with transcripts and answer keys.",
    href: "/ielts/listening",
    icon: HeadphonesIcon,
    bg: "bg-pop-50",
    fg: "text-pop-600",
  },
  {
    label: "Writing",
    skill: "WRITING",
    description: "Task 1 & 2 prompts, graded against the real assessment criteria.",
    href: "/ielts/writing",
    icon: PencilIcon,
    bg: "bg-accent-100",
    fg: "text-accent-600",
  },
  {
    label: "Speaking",
    skill: "SPEAKING",
    description: "Parts 1–3 practice with a transcript-based examiner review.",
    href: "/ielts/speaking",
    icon: MicIcon,
    bg: "bg-rose-50",
    fg: "text-rose-600",
  },
] as const;

export async function FeaturedCategories() {
  const counts = await Promise.all(
    CATEGORIES.map((category) =>
      prisma.contentItem.count({
        where: { published: true, contentType: "PRACTICE_TEST", skill: category.skill },
      }),
    ),
  );

  return (
    <section className="bg-zinc-50">
      <div data-reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="Practice every part of the exam"
          description="Pick a skill and start with a full-length, timed test."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ label, description, href, icon: Icon, bg, fg }, index) => (
            <Link key={label} href={href} className={`${CARD_LINK_CLASS} flex flex-col p-6`}>
              <div className="flex items-start justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset ring-black/5 transition-transform group-hover:scale-110 ${bg} ${fg}`}>
                  <Icon />
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
                  {counts[index]} {counts[index] === 1 ? "test" : "tests"}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-brand-900">{label}</h3>
              <p className="mt-1 flex-1 text-sm text-zinc-600">{description}</p>
              <span className="mt-4 text-sm font-semibold text-brand-600 group-hover:text-accent-600">
                Start practising →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
