import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { LibraryFilters } from "@/components/exam/library-filters";
import { countTests, getLibrary, parseFilters } from "@/lib/content/exam-library";
import type { Skill } from "@/generated/prisma/enums";

export const metadata: Metadata = {
  title: "IELTS Exam Library — ScoreWell",
  description:
    "Every practice test on ScoreWell in one place — filter by Academic or General Training, by skill, or search the whole library.",
};

const SKILL_LABELS: Record<Skill, string> = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

/** Typographic collection tile — our own, never a reproduction of a book cover. */
function CollectionCover({ name }: { name: string }) {
  return (
    <div className="flex h-40 w-32 shrink-0 flex-col justify-between rounded-xl bg-brand-700 p-4 text-white shadow-md">
      <span className="text-[0.6rem] font-semibold uppercase tracking-widest text-white/60">
        Collection
      </span>
      <span className="text-sm font-bold leading-tight">{name}</span>
    </div>
  );
}

export default async function ExamLibraryPage({
  searchParams,
}: PageProps<"/exam-library">) {
  const filters = parseFilters(await searchParams);
  const collections = await getLibrary(filters);
  const total = countTests(collections);

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          IELTS <span className="text-pop-600">Exam Library</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-zinc-600">
          Every practice test on the site, in one place. Filter by test variant, by skill, or
          search the whole library.
        </p>

        <Suspense fallback={<div className="mb-10 h-48" />}>
          <LibraryFilters />
        </Suspense>

        {total === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center text-sm text-zinc-500">
            No tests match these filters yet. Try clearing the search or choosing All Skills.
          </p>
        ) : (
          <>
            <p className="mb-8 text-sm text-zinc-500">
              {total} {total === 1 ? "test" : "tests"} across {collections.length}{" "}
              {collections.length === 1 ? "collection" : "collections"}.
            </p>

            <div className="flex flex-col gap-8">
              {collections.map((collection) => (
                <section
                  key={collection.name}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <CollectionCover name={collection.name} />

                    <div className="min-w-0 flex-1">
                      <h2 className="mb-4 text-lg font-bold text-zinc-900">{collection.name}</h2>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {collection.tests.map((test) => (
                          <Link
                            key={test.slug}
                            href={test.href}
                            className="group rounded-xl border border-zinc-200 p-4 transition-colors hover:border-brand-400 hover:bg-brand-50/40"
                          >
                            <p className="text-sm font-semibold text-zinc-800 group-hover:text-brand-700">
                              {test.title}
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                              {SKILL_LABELS[test.skill]}
                              {/* Real Progress count only — nothing shown at zero. */}
                              {test.attempts > 0 && (
                                <>
                                  {" · "}
                                  {test.attempts.toLocaleString("en-US")}{" "}
                                  {test.attempts === 1 ? "attempt" : "attempts"}
                                </>
                              )}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
