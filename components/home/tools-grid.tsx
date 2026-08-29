import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_LINK_CLASS } from "@/components/ui/card";
import { MicIcon } from "./skill-icons";
import {
  BarChartIcon,
  CalculatorIcon,
  CheckCircleIcon,
  DocumentCheckIcon,
  GlobeIcon,
  LayersIcon,
  LightbulbIcon,
  ListIcon,
  MailIcon,
  RefreshIcon,
  SparklesIcon,
  SpeakerIcon,
} from "./tool-icons";

type Tool = {
  label: string;
  href: string;
  icon: typeof BarChartIcon;
  bg: string;
  fg: string;
};

type ToolGroup = {
  heading: string;
  tools: Tool[];
};

const TOOL_GROUPS: ToolGroup[] = [
  {
    heading: "Writing tools",
    tools: [
      { label: "Task 1 Academic Checker", href: "/tools/writing-task1-academic-checker", icon: BarChartIcon, bg: "bg-brand-50", fg: "text-brand-600" },
      { label: "Task 1 General Checker", href: "/tools/writing-task1-general-checker", icon: MailIcon, bg: "bg-sky-50", fg: "text-sky-600" },
      { label: "Task 2 Essay Checker", href: "/tools/writing-task2-checker", icon: DocumentCheckIcon, bg: "bg-emerald-50", fg: "text-emerald-600" },
      { label: "Text Improver", href: "/tools/text-improver", icon: SparklesIcon, bg: "bg-violet-50", fg: "text-violet-600" },
    ],
  },
  {
    heading: "Speaking & audio",
    tools: [
      { label: "Speaking Part 1/2/3 Checker", href: "/tools/speaking-part1-checker", icon: MicIcon, bg: "bg-rose-50", fg: "text-rose-600" },
      { label: "Text-to-Speech Generator", href: "/tools/text-to-speech", icon: SpeakerIcon, bg: "bg-amber-50", fg: "text-accent-600" },
    ],
  },
  {
    heading: "Language tools",
    tools: [
      { label: "Paraphraser", href: "/tools/paraphraser", icon: RefreshIcon, bg: "bg-brand-50", fg: "text-brand-600" },
      { label: "Sentence Explainer", href: "/tools/sentence-explainer", icon: LightbulbIcon, bg: "bg-amber-50", fg: "text-accent-600" },
      { label: "Summarizer", href: "/tools/summarizer", icon: ListIcon, bg: "bg-sky-50", fg: "text-sky-600" },
      { label: "Translator", href: "/tools/translator", icon: GlobeIcon, bg: "bg-emerald-50", fg: "text-emerald-600" },
      { label: "Grammar Checker", href: "/tools/grammar-checker", icon: CheckCircleIcon, bg: "bg-rose-50", fg: "text-rose-600" },
    ],
  },
  {
    heading: "Practice tools",
    tools: [
      { label: "Band Score Calculators", href: "/tools/band-calculator/overall", icon: CalculatorIcon, bg: "bg-violet-50", fg: "text-violet-600" },
      { label: "Flashcards", href: "/flashcards", icon: LayersIcon, bg: "bg-brand-50", fg: "text-brand-600" },
    ],
  },
];

export function ToolsGrid() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          kicker="40+ AI tools"
          title="AI tools for every part of your prep"
          description="Free monthly usage on every tool. Unlimited with Premium."
        />

        <div data-reveal className="flex flex-col gap-10">
          {TOOL_GROUPS.map((group) => (
            <div key={group.heading}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                {group.heading}
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {group.tools.map(({ label, href, icon: Icon, bg, fg }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`${CARD_LINK_CLASS} flex flex-col items-center gap-3 px-4 py-6 text-center`}
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-lg ring-1 ring-inset ring-black/5 transition-transform group-hover:scale-110 ${bg} ${fg}`}>
                      <Icon />
                    </span>
                    <span className="text-sm font-medium text-zinc-800">{label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
