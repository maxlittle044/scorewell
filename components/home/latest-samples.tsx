import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_LINK_CLASS } from "@/components/ui/card";

type SampleCard = {
  tag: string;
  title: string;
  excerpt: string;
  href: string;
};

const WRITING_SAMPLES: SampleCard[] = [
  {
    tag: "Task 2",
    title: "Governments should invest more in public transport than roads",
    excerpt: "A band-9 response arguing for transport policy reform, with a clear position held throughout.",
    href: "/ielts/band-9-samples/public-transport-vs-roads",
  },
  {
    tag: "Task 1 (Academic)",
    title: "Line graph: smartphone ownership, 2000–2020",
    excerpt: "Model report describing overall trends before breaking down key data points by region.",
    href: "/ielts/band-9-samples/smartphone-ownership-line-graph",
  },
  {
    tag: "Task 1 (General)",
    title: "Letter to a colleague about a delayed project",
    excerpt: "A formal-tone sample letter covering all three bullet points with natural transitions.",
    href: "/ielts/band-9-samples/letter-colleague-delayed-project",
  },
];

const SPEAKING_SAMPLES: SampleCard[] = [
  {
    tag: "Part 1",
    title: "Questions about your hometown",
    excerpt: "Model answers showing natural extension beyond one-word responses.",
    href: "/ielts/band-9-samples/speaking-part1-hometown",
  },
  {
    tag: "Part 2",
    title: "Describe a skill you would like to learn",
    excerpt: "A full cue-card answer with the structure and range examiners reward.",
    href: "/ielts/band-9-samples/speaking-part2-skill-to-learn",
  },
  {
    tag: "Part 3",
    title: "Discussion on lifelong learning",
    excerpt: "Model answers that develop an opinion with reasons and examples.",
    href: "/ielts/band-9-samples/speaking-part3-lifelong-learning",
  },
];

const TIPS: SampleCard[] = [
  {
    tag: "Reading",
    title: "5 time-management tricks for the reading test",
    excerpt: "How to pace yourself across three passages without running out of time.",
    href: "/ielts/tips/reading-time-management",
  },
  {
    tag: "Writing",
    title: "How to structure a band-9 Task 2 essay",
    excerpt: "A repeatable four-paragraph structure that keeps your argument coherent.",
    href: "/ielts/tips/task-2-essay-structure",
  },
  {
    tag: "Speaking",
    title: "Common mistakes in IELTS Speaking Part 2",
    excerpt: "Why memorized answers get lower scores, and what to do instead.",
    href: "/ielts/tips/speaking-part2-mistakes",
  },
];

function SampleRow({ heading, viewAllHref, cards }: { heading: string; viewAllHref: string; cards: SampleCard[] }) {
  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <h3 className="text-lg font-semibold text-ink">{heading}</h3>
        <Link href={viewAllHref} className="hidden shrink-0 text-sm font-medium text-link hover:underline sm:inline">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className={`${CARD_LINK_CLASS} flex flex-col p-5`}>
            <span className="inline-block w-fit rounded-full bg-linear-to-r from-brand-50 to-pop-50 px-2.5 py-0.5 text-xs font-medium text-link">
              {card.tag}
            </span>
            <h4 className="mt-2.5 font-semibold text-ink group-hover:text-link">
              {card.title}
            </h4>
            <p className="mt-1.5 flex-1 text-sm text-ink-body">{card.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function LatestSamples() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          title="Fresh from ScoreWell"
          description="Newly added samples and tips, updated regularly."
        />

        <div data-reveal className="flex flex-col gap-12">
          <SampleRow heading="Recent Band-9 writing samples" viewAllHref="/ielts/band-9-samples" cards={WRITING_SAMPLES} />
          <SampleRow heading="Recent Band-9 speaking samples" viewAllHref="/ielts/band-9-samples" cards={SPEAKING_SAMPLES} />
          <SampleRow heading="Recent tips articles" viewAllHref="/ielts/tips" cards={TIPS} />
        </div>
      </div>
    </section>
  );
}
