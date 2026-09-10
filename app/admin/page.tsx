import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CreditCard,
  Mail,
  MessageSquareText,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireAdminPage } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin overview — ScoreWell",
  description: "ScoreWell administration overview and recent activity.",
};

function actionLabel(action: string) {
  return action.replaceAll("_", " ").toLowerCase().replace(/^./, (letter) => letter.toUpperCase());
}

function relativeTime(date: Date) {
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default async function AdminOverviewPage() {
  // The gate. See requireAdminPage — the layout alone does not stop this page running.
  await requireAdminPage();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [totalUsers, adminUsers, newUsers, pendingPayments, openReviews, newsletterSubscribers, recentActivity] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.paymentSubmission.count({ where: { status: "PENDING" } }),
    prisma.reviewRequest.count({ where: { status: { in: ["PENDING", "IN_REVIEW"] } } }),
    prisma.newsletterSubscriber.count(),
    prisma.adminActivityLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { admin: { select: { name: true, email: true } } },
    }),
  ]);

  const stats = [
    { label: "Total users", value: totalUsers, detail: `${newUsers} joined in 30 days`, href: "/admin/users", icon: Users, tone: "brand" },
    { label: "Admin users", value: adminUsers, detail: "Database role: ADMIN", href: "/admin/admins", icon: ShieldCheck, tone: "pop" },
    { label: "Pending payments", value: pendingPayments, detail: "Waiting for review", href: "/admin/payments", icon: CreditCard, tone: "accent" },
    { label: "Open reviews", value: openReviews, detail: "Pending or in review", href: "/admin/reviews", icon: MessageSquareText, tone: "brand" },
  ] as const;

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-pop-600">Control center</p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Overview</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-ink-body">A clear view of what needs attention across ScoreWell.</p>
          </div>
          <Link href="/admin/activity-logs" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-link shadow-sm hover:border-brand-300 hover:bg-brand-50">
            <Activity className="h-4 w-4" /> View activity
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ href, label, value, detail, icon: Icon, tone }, index) => (
            <Link key={label} href={href} data-reveal style={{ transitionDelay: `${index * 70}ms` }} className="group rounded-2xl border border-line bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone === "pop" ? "bg-pop-100 text-pop-700" : tone === "accent" ? "bg-accent-100 text-accent-600" : "bg-brand-100 text-link"}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowRight className="h-4 w-4 text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-link" />
              </div>
              <p className="mt-5 text-sm font-medium text-ink-muted">{label}</p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">{value}</p>
              <p className="mt-1 text-xs text-ink-muted">{detail}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <section data-reveal className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-pop-600">Audit trail</p>
                <h2 className="mt-1 font-display text-xl font-bold text-ink">Recent activity</h2>
              </div>
              <Link href="/admin/activity-logs" className="text-sm font-semibold text-link hover:underline">See all</Link>
            </div>
            {recentActivity.length === 0 ? (
              <p className="px-6 py-12 text-sm text-ink-muted">No admin activity yet.</p>
            ) : (
              <div className="divide-y divide-line">
                {recentActivity.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 px-5 py-4 sm:px-6">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-link"><Activity className="h-4 w-4" /></span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-ink">{log.summary}</p>
                      <p className="mt-1 truncate text-xs text-ink-muted">
                        {log.admin?.name ?? log.admin?.email ?? log.adminEmail} · {actionLabel(log.action)}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-ink-muted" dateTime={log.createdAt.toISOString()}>{relativeTime(log.createdAt)}</time>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section data-reveal style={{ transitionDelay: "100ms" }} className="rounded-2xl border border-line bg-surface p-5 shadow-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pop-600">At a glance</p>
            <h2 className="mt-1 font-display text-xl font-bold text-ink">Workspace reach</h2>
            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4" /> Newsletter list</span><span className="font-semibold text-ink">{newsletterSubscribers}</span></div>
              <div className="h-px bg-line" />
              <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-sm text-ink-muted"><TrendingUp className="h-4 w-4" /> New users / 30 days</span><span className="font-semibold text-ink">{newUsers}</span></div>
              <Link href="/admin/users" className="flex items-center justify-between rounded-xl bg-brand-50 px-3 py-3 text-sm font-semibold text-link hover:bg-brand-100">Manage users <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}