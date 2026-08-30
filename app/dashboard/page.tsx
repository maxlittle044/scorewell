import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUsageStatus } from "@/lib/ai/usage";
import { PageHeader } from "@/components/layout/page-header";
import { PremiumBadge } from "@/components/dashboard/premium-lock";
import { formatStudyTime, getAnalytics, getBandTrend, getStudyTime } from "@/lib/analytics";
import { BandTrendChart } from "@/components/dashboard/band-trend-chart";
import { countDueCards } from "@/lib/content/flashcards";

export const metadata: Metadata = {
  title: "Your dashboard — ScoreWell",
};

const SKILL_LABELS = {
  LISTENING: "Listening",
  READING: "Reading",
  WRITING: "Writing",
  SPEAKING: "Speaking",
} as const;

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [
    subscription,
    recentProgress,
    latestBySkill,
    usage,
    analytics,
    bandTrend,
    studyTime,
    dueCards,
  ] = await Promise.all([
      prisma.subscription.findUnique({ where: { userId } }),
      prisma.progress.findMany({
        where: { userId },
        orderBy: { completedAt: "desc" },
        take: 5,
        include: { contentItem: { select: { title: true } } },
      }),
      prisma.progress.findMany({
        where: { userId, skill: { not: null }, bandScore: { not: null } },
        orderBy: { completedAt: "desc" },
        distinct: ["skill"],
      }),
      getUsageStatus(userId),
      getAnalytics(userId),
      getBandTrend(userId),
      getStudyTime(userId),
      countDueCards(userId),
    ]);

  const isPremium = subscription?.tier === "PREMIUM";

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title={`Welcome back${session.user.name ? `, ${session.user.name}` : ""}`}
          description="Track your progress and manage your plan."
        />

        {/* The daily study prompt (site-build-prompt.md section 6). Shown only when there
            is genuinely something to do — a standing "0 cards due" tile would train the
            learner to ignore the one place that tells them when to come back. */}
        {dueCards > 0 && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-pop-100 bg-pop-50 p-5">
            <div>
              <p className="font-semibold text-ink">
                {dueCards} {dueCards === 1 ? "flashcard is" : "flashcards are"} ready for review
              </p>
              <p className="mt-1 text-sm text-ink-body">
                Ten minutes now is worth more than an hour of it next week.
              </p>
            </div>
            <Link
              href="/flashcards"
              className="shrink-0 rounded-full bg-pop-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pop-700"
            >
              Start review
            </Link>
          </div>
        )}

        <div className="mb-6 rounded-2xl border border-line bg-surface p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-semibold text-ink">Band score trend</h2>
            <p className="text-sm text-ink-muted">
              {bandTrend.best !== null && (
                <>
                  Best so far <span className="font-semibold text-ink">{bandTrend.best}</span>
                  {" · "}
                </>
              )}
              {/* Only claimed once something was actually measured. */}
              {studyTime.totalSeconds > 0 ? (
                <>
                  <span className="font-semibold text-ink">
                    {formatStudyTime(studyTime.totalSeconds)}
                  </span>{" "}
                  studied
                </>
              ) : (
                "Study time starts counting from your next attempt"
              )}
            </p>
          </div>
          <BandTrendChart trend={bandTrend} />

          {studyTime.untimedAttempts > 0 && (
            <p className="mt-3 text-xs text-ink-muted">
              {studyTime.untimedAttempts}{" "}
              {studyTime.untimedAttempts === 1 ? "earlier attempt isn't" : "earlier attempts aren't"}{" "}
              counted in that total — they were taken before study time was measured.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-6 lg:col-span-2">
            <h2 className="font-semibold text-ink">Latest band by skill</h2>
            {latestBySkill.length === 0 ? (
              <p className="mt-5 text-sm text-ink-muted">
                Complete a practice test to see your band score progress here.
              </p>
            ) : (
              <div className="mt-5 flex flex-col gap-4">
                {latestBySkill.map((entry) => (
                  <div key={entry.skill}>
                    <div className="mb-1 flex items-center justify-between text-sm text-ink-body">
                      <span>{SKILL_LABELS[entry.skill!]}</span>
                      <span className="font-medium text-ink">{entry.bandScore}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-surface-sunken">
                      <div
                        className="h-2 rounded-full bg-brand-500"
                        style={{ width: `${Math.min(100, (entry.bandScore! / 9) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="font-semibold text-ink">Subscription</h2>
            <p className="mt-3 inline-block rounded-full bg-surface-sunken px-3 py-1 text-sm font-medium text-ink-body">
              {isPremium ? "Premium plan" : "Free plan"}
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              {isPremium
                ? "Unlimited AI tool usage and priority support."
                : `${usage.remaining} of ${usage.limit} AI tool uses remaining this month.`}
            </p>
            {/* Credits are only meaningful once the free allowance is gone, but
                showing a non-zero balance always avoids a learner thinking a
                purchase vanished. */}
            {usage.credits > 0 && (
              <p className="mt-3 text-sm text-ink-body">
                <strong className="text-ink">{usage.credits}</strong> pay-per-use{" "}
                {usage.credits === 1 ? "credit" : "credits"} in reserve.
              </p>
            )}
            {!isPremium && (
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  href="/pricing"
                  className="block rounded-full bg-brand-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Upgrade to Premium
                </Link>
                <Link
                  href="/pricing"
                  className="block rounded-full border border-line px-4 py-2.5 text-center text-sm font-semibold text-ink-body hover:border-brand-400"
                >
                  Buy credits
                </Link>
                <Link
                  href="/reviews"
                  className="block rounded-full border border-line px-4 py-2.5 text-center text-sm font-semibold text-ink-body hover:border-brand-400"
                >
                  Examiner review
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-ink">Mistake analytics</h2>
              {!isPremium && <PremiumBadge />}
            </div>
            <Link href="/dashboard/analytics" className="text-sm font-medium text-link hover:underline">
              {isPremium ? "View breakdown →" : "See what's included →"}
            </Link>
          </div>
          {isPremium ? (
            analytics.weakest ? (
              <p className="mt-3 text-sm text-ink-body">
                Weakest area so far: <strong className="text-ink">{analytics.weakest.label}</strong> —{" "}
                {analytics.weakest.correct} of {analytics.weakest.total} correct across{" "}
                {analytics.analysedAttempts} {analytics.analysedAttempts === 1 ? "attempt" : "attempts"}.
              </p>
            ) : (
              <p className="mt-3 text-sm text-ink-muted">
                Take a few more tests and we&apos;ll show which question types are costing you marks.
              </p>
            )
          ) : (
            <p className="mt-3 text-sm text-ink-muted">
              Premium breaks your results down by IELTS question type, so you can see which
              sub-skill is losing you marks. Your attempts are recorded either way.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
          <h2 className="font-semibold text-ink">Recent results</h2>
          {recentProgress.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">
              You haven&apos;t completed any practice tests yet.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-line">
              {recentProgress.map((result) => (
                <li key={result.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-ink">
                      {result.contentItem?.title ?? result.taskType ?? "Practice activity"}
                    </p>
                    <p className="text-ink-muted">
                      {result.completedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="font-medium text-ink-body">
                    {result.bandScore ?? "Pending review"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
