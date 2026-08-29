import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getUsageStatus } from "@/lib/ai/usage";
import { PageHeader } from "@/components/layout/page-header";
import { PremiumBadge } from "@/components/dashboard/premium-lock";
import { getAnalytics, getBandTrend } from "@/lib/analytics";
import { BandTrendChart } from "@/components/dashboard/band-trend-chart";

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

  const [subscription, recentProgress, latestBySkill, usage, analytics, bandTrend] =
    await Promise.all([
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
    ]);

  const isPremium = subscription?.tier === "PREMIUM";

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title={`Welcome back${session.user.name ? `, ${session.user.name}` : ""}`}
          description="Track your progress and manage your plan."
        />

        <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-semibold text-zinc-900">Band score trend</h2>
            {bandTrend.best !== null && (
              <p className="text-sm text-zinc-500">
                Best so far <span className="font-semibold text-zinc-800">{bandTrend.best}</span>
                {bandTrend.overall.length > 1 && (
                  <> · {bandTrend.overall.length} banded results</>
                )}
              </p>
            )}
          </div>
          <BandTrendChart trend={bandTrend} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 lg:col-span-2">
            <h2 className="font-semibold text-zinc-900">Latest band by skill</h2>
            {latestBySkill.length === 0 ? (
              <p className="mt-5 text-sm text-zinc-500">
                Complete a practice test to see your band score progress here.
              </p>
            ) : (
              <div className="mt-5 flex flex-col gap-4">
                {latestBySkill.map((entry) => (
                  <div key={entry.skill}>
                    <div className="mb-1 flex items-center justify-between text-sm text-zinc-600">
                      <span>{SKILL_LABELS[entry.skill!]}</span>
                      <span className="font-medium text-zinc-800">{entry.bandScore}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-100">
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

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="font-semibold text-zinc-900">Subscription</h2>
            <p className="mt-3 inline-block rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
              {isPremium ? "Premium plan" : "Free plan"}
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              {isPremium
                ? "Unlimited AI tool usage and priority support."
                : `${usage.remaining} of ${usage.limit} AI tool uses remaining this month.`}
            </p>
            {/* Credits are only meaningful once the free allowance is gone, but
                showing a non-zero balance always avoids a learner thinking a
                purchase vanished. */}
            {usage.credits > 0 && (
              <p className="mt-3 text-sm text-zinc-600">
                <strong className="text-zinc-900">{usage.credits}</strong> pay-per-use{" "}
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
                  className="block rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 hover:border-brand-400"
                >
                  Buy credits
                </Link>
                <Link
                  href="/reviews"
                  className="block rounded-full border border-zinc-200 px-4 py-2.5 text-center text-sm font-semibold text-zinc-700 hover:border-brand-400"
                >
                  Examiner review
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-zinc-900">Mistake analytics</h2>
              {!isPremium && <PremiumBadge />}
            </div>
            <Link href="/dashboard/analytics" className="text-sm font-medium text-brand-600 hover:underline">
              {isPremium ? "View breakdown →" : "See what's included →"}
            </Link>
          </div>
          {isPremium ? (
            analytics.weakest ? (
              <p className="mt-3 text-sm text-zinc-600">
                Weakest area so far: <strong className="text-zinc-900">{analytics.weakest.label}</strong> —{" "}
                {analytics.weakest.correct} of {analytics.weakest.total} correct across{" "}
                {analytics.analysedAttempts} {analytics.analysedAttempts === 1 ? "attempt" : "attempts"}.
              </p>
            ) : (
              <p className="mt-3 text-sm text-zinc-500">
                Take a few more tests and we&apos;ll show which question types are costing you marks.
              </p>
            )
          ) : (
            <p className="mt-3 text-sm text-zinc-500">
              Premium breaks your results down by IELTS question type, so you can see which
              sub-skill is losing you marks. Your attempts are recorded either way.
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="font-semibold text-zinc-900">Recent results</h2>
          {recentProgress.length === 0 ? (
            <p className="mt-4 text-sm text-zinc-500">
              You haven&apos;t completed any practice tests yet.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-zinc-100">
              {recentProgress.map((result) => (
                <li key={result.id} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium text-zinc-800">
                      {result.contentItem?.title ?? result.taskType ?? "Practice activity"}
                    </p>
                    <p className="text-zinc-500">
                      {result.completedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="font-medium text-zinc-700">
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
