import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { listPronunciationDrills } from "@/lib/content/pronunciation";

export const metadata: Metadata = {
  title: "Pronunciation Drills — ScoreWell",
  description:
    "Drill the English sounds IELTS candidates find hardest, one at a time, with minimal pairs and spoken examples.",
};

const GROUPS = [
  { kind: "consonant" as const, heading: "Consonants" },
  { kind: "vowel" as const, heading: "Vowels" },
];

export default async function PronunciationIndexPage() {
  const drills = await listPronunciationDrills();

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Pronunciation drills"
          description="Practice the sounds learners find trickiest, one at a time."
        />

        {drills.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
            No drills have been published yet.
          </p>
        ) : (
          <div className="flex flex-col gap-10">
            {GROUPS.map((group) => {
              const items = drills.filter((d) => d.kind === group.kind);
              if (items.length === 0) return null;

              return (
                <section key={group.kind}>
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">
                    {group.heading}
                  </h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                    {items.map((drill) => (
                      <Link
                        key={drill.slug}
                        href={`/pronunciation/${drill.slug}`}
                        className="group flex flex-col items-center rounded-xl border border-line bg-surface py-6 shadow-sm transition-shadow hover:shadow-md"
                      >
                        <span className="text-2xl font-semibold text-link group-hover:text-link">
                          /{drill.symbol}/
                        </span>
                        <span className="mt-1.5 text-xs text-ink-muted">{drill.exampleWord}</span>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
