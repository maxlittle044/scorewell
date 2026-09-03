import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/auth";
import { LibraryFilters } from "@/components/exam/library-filters";
import { countTests, getLibrary, parseFilters } from "@/lib/content/exam-library";
import type { LearnerState } from "@/lib/content/exam-library";
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

/**
 * The reader's own standing on a test (section 4a). Rendered only when there is something to
 * report — an "unattempted" badge on every other tile would be a page full of labels saying
 * nothing has happened. Both states can be true at once: a learner with a result from earlier
 * practice can also be partway through a sitting that includes this test.
 */
function LearnerBadge({ state }: { state: LearnerState }) {
  return (
    <span className="mt-2 flex flex-wrap items-center gap-1.5">
      {state.inProgress && (
        <span
          // The sitting is unfinished; which of its legs the learner is actually on is not
          // recorded, so the title says what we do know rather than implying more.
          title="Part of a full sitting you haven't finished yet"
          className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700"
        >
          In progress
        </span>
      )}
      {state.best && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
          Your best: Band {state.best.band.toFixed(1)}
          {state.best.attempts > 1 && (
            <span className="font-normal text-brand-700/70">· {state.best.attempts} attempts</span>
          )}
        </span>
      )}
    </span>
  );
}

export default async function ExamLibraryPage({
  searchParams,
}: PageProps<"/exam-library">) {
  const [params, session] = await Promise.all([searchParams, auth()]);
  const filters = parseFilters(params);
  const collections = await getLibrary(filters, session?.user?.id);
  const total = countTests(collections);

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-3 text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          IELTS <span className="text-pop-600">Exam Library</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-ink-body">
          Every practice test on the site, in one place. Filter by test variant, by skill, or
          search the whole library.
        </p>

        <Suspense fallback={<div className="mb-10 h-48" />}>
          <LibraryFilters />
        </Suspense>

        {total === 0 ? (
          <p className="rounded-2xl border border-line bg-surface-muted p-6 text-center text-sm text-ink-muted">
            No tests match these filters yet. Try clearing the search or choosing All Skills.
          </p>
        ) : (
          <>
            <p className="mb-8 text-sm text-ink-muted">
              {total} {total === 1 ? "test" : "tests"} across {collections.length}{" "}
              {collections.length === 1 ? "collection" : "collections"}.
            </p>

            <div className="flex flex-col gap-8">
              {collections.map((collection) => (
                <section
                  key={collection.name}
                  className="rounded-2xl border border-line bg-surface p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 sm:flex-row">
                    <CollectionCover name={collection.name} />

                    <div className="min-w-0 flex-1">
                      <h2 className="mb-4 text-lg font-bold text-ink">{collection.name}</h2>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {collection.tests.map((test) => (
                          <Link
                            key={test.slug}
                            href={test.href}
                            className="group rounded-xl border border-line p-4 transition-colors hover:border-brand-400 hover:bg-brand-50/40"
                          >
                            <p className="text-sm font-semibold text-ink group-hover:text-link">
                              {test.title}
                            </p>
                            <p className="mt-1 text-xs text-ink-muted">
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
                            {test.learner && <LearnerBadge state={test.learner} />}
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
