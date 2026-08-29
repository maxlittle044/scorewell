import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Leaderboard — ScoreWell",
};

type Period = "daily" | "weekly" | "monthly" | "yearly";

const PERIODS: { key: Period; label: string; days: number }[] = [
  { key: "daily", label: "Daily", days: 1 },
  { key: "weekly", label: "Weekly", days: 7 },
  { key: "monthly", label: "Monthly", days: 30 },
  { key: "yearly", label: "Yearly", days: 365 },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((part) => part.replace(".", "")[0])
    .join("")
    .toUpperCase();
}

export default async function LeaderboardPage({ searchParams }: PageProps<"/leaderboard">) {
  const params = await searchParams;
  const periodParam = typeof params.period === "string" ? params.period : "daily";
  const period = PERIODS.find((p) => p.key === periodParam) ?? PERIODS[0];

  const periodStart = new Date();
  periodStart.setDate(periodStart.getDate() - period.days);
  if (period.key === "daily") {
    periodStart.setHours(0, 0, 0, 0);
  }

  const grouped = await prisma.progress.groupBy({
    by: ["userId"],
    where: { taskType: "Daily challenge", completedAt: { gte: periodStart } },
    _sum: { score: true },
    orderBy: { _sum: { score: "desc" } },
    take: 20,
  });

  const users = await prisma.user.findMany({
    where: { id: { in: grouped.map((g) => g.userId) } },
    select: { id: true, name: true },
  });
  const usersById = new Map(users.map((u) => [u.id, u]));

  const rankings = grouped
    .map((g) => {
      const user = usersById.get(g.userId);
      return {
        userId: g.userId,
        // Never fall back to email here — this page is public, unauthenticated.
        name: user?.name ?? "Anonymous",
        correct: g._sum.score ?? 0,
      };
    })
    .filter((r) => r.correct > 0);

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Leaderboard" description="Top scorers from the daily timed challenge." />

        <div className="mb-6 flex gap-2">
          {PERIODS.map((p) => (
            <Link
              key={p.key}
              href={`/leaderboard?period=${p.key}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                period.key === p.key ? "bg-brand-600 text-white" : "bg-surface-sunken text-ink-body hover:bg-line"
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>

        {rankings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong px-6 py-10 text-center">
            <p className="text-sm text-ink-muted">
              No rankings yet for this period.{" "}
              <Link href="/ielts/daily-challenge" className="font-medium text-link hover:underline">
                Take today&apos;s challenge
              </Link>{" "}
              to be the first on the board.
            </p>
          </div>
        ) : (
          <ol className="flex flex-col divide-y divide-zinc-100 rounded-2xl border border-line">
            {rankings.map((entry, i) => (
              <li key={entry.userId} className="flex items-center gap-4 px-5 py-3.5">
                <span className="w-6 text-sm font-semibold text-ink-muted">{i + 1}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-link">
                  {initials(entry.name)}
                </span>
                <span className="flex-1 text-sm font-medium text-ink">{entry.name}</span>
                <span className="text-sm font-semibold text-ink-body">
                  {entry.correct} correct
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </main>
  );
}
