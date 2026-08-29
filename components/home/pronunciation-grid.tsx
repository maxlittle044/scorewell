import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { CARD_LINK_CLASS } from "@/components/ui/card";

const PHONEMES = [
  { symbol: "θ", example: "think", href: "/pronunciation/th-voiceless" },
  { symbol: "ð", example: "this", href: "/pronunciation/th-voiced" },
  { symbol: "ʃ", example: "she", href: "/pronunciation/sh" },
  { symbol: "ʒ", example: "vision", href: "/pronunciation/zh" },
  { symbol: "tʃ", example: "chair", href: "/pronunciation/ch" },
  { symbol: "dʒ", example: "jump", href: "/pronunciation/j-jump" },
  { symbol: "r", example: "red", href: "/pronunciation/r-sound" },
  { symbol: "l", example: "light", href: "/pronunciation/l-sound" },
  { symbol: "v", example: "van", href: "/pronunciation/v-sound" },
  { symbol: "w", example: "wet", href: "/pronunciation/w-sound" },
  { symbol: "æ", example: "cat", href: "/pronunciation/ae" },
  { symbol: "ɪ", example: "sit", href: "/pronunciation/short-i" },
  { symbol: "iː", example: "see", href: "/pronunciation/long-e" },
  { symbol: "ə", example: "about", href: "/pronunciation/schwa" },
  { symbol: "ɜː", example: "bird", href: "/pronunciation/ur" },
  { symbol: "ʌ", example: "cup", href: "/pronunciation/uh" },
];

export function PronunciationGrid() {
  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pronunciation drills"
          description="Practice the sounds learners find trickiest, one at a time."
          viewAllHref="/pronunciation"
          viewAllLabel="View all sounds"
        />

        <div data-reveal className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {PHONEMES.map((phoneme) => (
            <Link
              key={phoneme.href}
              href={phoneme.href}
              className={`${CARD_LINK_CLASS} flex flex-col items-center py-6`}
            >
              <span className="text-2xl font-semibold text-brand-600 group-hover:text-pop-600">
                /{phoneme.symbol}/
              </span>
              <span className="mt-1.5 text-xs text-zinc-500">{phoneme.example}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
