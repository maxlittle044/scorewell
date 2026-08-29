import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAnalytics } from "@/lib/analytics";
import { BreakdownSection } from "@/components/dashboard/accuracy-bar";
import { PremiumBadge, PremiumLock } from "@/components/dashboard/premium-lock";

export const metadata: Metadata = {
  title: "Mistake Analytics — ScoreWell",
};

export default async function AnalyticsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const subscription = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  });
  const isPremium = subscription?.tier === "PREMIUM" && subscription.status === "ACTIVE";

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-1.5 flex items-center gap-2">
          <h1 className="text-2xl font-bold text-ink">Mistake analytics</h1>
          {isPremium && <PremiumBadge />}
        </div>
        <p className="mb-8 text-sm text-ink-body">
          Where your marks are actually going — broken down by question type, skill and topic.
        </p>

        {!isPremium ? (
          <PremiumLock title="Mistake analytics is a Premium feature">
            Premium breaks every test you take down by IELTS question type — inference, specific
            detail, numbers and data, and so on — so you can see which sub-skill is costing you
            marks instead of guessing. Your attempts are being recorded either way, so the
            breakdown will be waiting for you if you upgrade later.
          </PremiumLock>
        ) : (
          <AnalyticsBody userId={session.user.id} />
        )}

        <p className="mt-8 text-sm">
          <Link href="/dashboard" className="font-medium text-link hover:underline">
            ← Back to dashboard
          </Link>
        </p>
      </div>
    </main>
  );
}

async function AnalyticsBody({ userId }: { userId: string }) {
  const analytics = await getAnalytics(userId);

  if (analytics.analysedAttempts === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <p className="text-sm text-ink-body">
          No analysed attempts yet. Take any Reading, Listening, grammar or mini-exercise test and
          your breakdown will appear here.
        </p>
        {analytics.attemptsWithoutDetail > 0 && (
          <p className="mt-2 text-xs text-ink-muted">
            {analytics.attemptsWithoutDetail} earlier{" "}
            {analytics.attemptsWithoutDetail === 1 ? "attempt was" : "attempts were"} recorded
            before per-question tracking existed, so {analytics.attemptsWithoutDetail === 1 ? "it has" : "they have"}{" "}
            no breakdown.
          </p>
        )}
        <Link
          href="/ielts/reading"
          className="mt-4 inline-block rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Take a reading test
        </Link>
      </div>
    );
  }

  const overall = Math.round((analytics.totalCorrect / analytics.totalQuestions) * 100);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-bold text-link">{overall}%</span>
          <span className="text-sm text-ink-body">
            overall accuracy across {analytics.totalQuestions} questions in{" "}
            {analytics.analysedAttempts}{" "}
            {analytics.analysedAttempts === 1 ? "attempt" : "attempts"}
          </span>
        </div>

        {analytics.weakest && (
          <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Your weakest area is <strong>{analytics.weakest.label}</strong> —{" "}
            {analytics.weakest.correct} of {analytics.weakest.total} correct. That&apos;s where
            practice will move your score most.
          </p>
        )}

        {analytics.attemptsWithoutDetail > 0 && (
          <p className="mt-3 text-xs text-ink-muted">
            {analytics.attemptsWithoutDetail} earlier{" "}
            {analytics.attemptsWithoutDetail === 1 ? "attempt is" : "attempts are"} excluded —{" "}
            {analytics.attemptsWithoutDetail === 1 ? "it was" : "they were"} recorded before
            per-question tracking existed.
          </p>
        )}
      </div>

      <BreakdownSection
        heading="By question type"
        description="Weakest first. Reading and Listening questions are tagged with the IELTS sub-skill they test."
        rows={analytics.byQuestionType}
        emptyNote="No tagged questions yet — take a Reading or Listening test to populate this."
      />

      <BreakdownSection
        heading="By skill"
        description="Only tests that map to a single IELTS skill are counted here."
        rows={analytics.bySkill}
        emptyNote="No skill-tagged attempts yet."
      />

      <BreakdownSection
        heading="By topic"
        description="Grammar points and content topics, so you can see which subject areas trip you up."
        rows={analytics.byTopic}
        emptyNote="No topics recorded yet."
      />
    </div>
  );
}
