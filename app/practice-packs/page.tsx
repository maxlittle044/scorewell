import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/page-header";
import { UnlockPackButton } from "@/components/content/unlock-pack-button";
import { Card } from "@/components/ui/card";
import { getCreditBalance } from "@/lib/credits";
import { PACK_COST_CREDITS, describeSkills } from "@/lib/content/practice-pack-config";
import {
  getOwnedPackSlugs,
  hasPremiumPlan,
  listPacks,
} from "@/lib/content/practice-packs";

export const metadata: Metadata = {
  title: "Downloadable practice packs — ScoreWell",
  description:
    "Whole practice collections assembled into one printable document, with every answer key at the back.",
};

export default async function PracticePacksPage() {
  const session = await auth();
  const packs = await listPacks();

  const [credits, isPremium, owned] = session?.user
    ? await Promise.all([
        getCreditBalance(session.user.id),
        hasPremiumPlan(session.user.id),
        getOwnedPackSlugs(
          session.user.id,
          packs.map((pack) => pack.slug),
        ),
      ])
    : [0, false, new Set<string>()];

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Downloadable practice packs"
          description="A whole collection assembled into one printable document — every test in order, then all the answer keys together at the back."
        />

        {/* Stated up front rather than buried: what is being sold here is the assembly, not
            access to the tests, which stay free one at a time. */}
        <div className="mb-10 rounded-2xl border border-line bg-surface-muted p-6">
          <h2 className="text-sm font-semibold text-ink">What you are paying for</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">
            Every test in every pack is free to print on its own, from its own page, and always
            will be — a pack does not unlock anything you cannot already get. What it saves you is
            the assembly: one file instead of a dozen, in a fixed order, with the keys separated
            out so you can work through the whole set before checking anything.{" "}
            <Link href="/exam-library" className="font-medium text-link hover:underline">
              Browse the library
            </Link>{" "}
            if you would rather print them one by one.
          </p>
          <p className="mt-3 text-sm text-ink-body">
            {PACK_COST_CREDITS} credits per pack.{" "}
            {isPremium
              ? "Your Premium plan includes every pack while it is active."
              : "Included with Premium while the plan is active."}
          </p>
        </div>

        {packs.length === 0 ? (
          <p className="rounded-2xl border border-line bg-surface-muted p-8 text-center text-sm text-ink-muted">
            Nothing here yet — packs appear once a collection has at least two published tests.
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {packs.map((pack) => {
              const unlocked = isPremium || owned.has(pack.slug);

              return (
                <li key={pack.slug}>
                  <Card className="flex h-full flex-col p-6">
                    <h2 className="font-display text-lg font-bold text-ink">{pack.name}</h2>
                    <p className="mt-1 text-sm text-ink-muted">
                      {pack.testCount} tests · {describeSkills(pack.skills)}
                    </p>

                    <div className="mt-auto pt-5">
                      {unlocked ? (
                        <div>
                          <Link
                            href={`/practice-packs/${pack.slug}`}
                            className="text-sm font-semibold text-link hover:underline"
                          >
                            Open the pack →
                          </Link>
                          <p className="mt-1 text-xs text-ink-muted">
                            {isPremium && !owned.has(pack.slug)
                              ? "Included with Premium"
                              : "Unlocked"}
                          </p>
                        </div>
                      ) : session?.user ? (
                        <UnlockPackButton slug={pack.slug} credits={credits} />
                      ) : (
                        <Link
                          href="/login"
                          className="text-sm font-semibold text-link hover:underline"
                        >
                          Log in to unlock →
                        </Link>
                      )}
                    </div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
}
