import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  MessageSquare,
  ShieldCheck,
  Target,
  UserRound,
  XCircle,
} from "lucide-react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getFirebaseAdminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";
import { getSignedScreenshotUrl } from "@/lib/storage";
import { requireAdminPage } from "@/lib/admin";
import { UserActionsMenu } from "../user-actions-menu";

export const metadata: Metadata = {
  title: "User details — ScoreWell",
  description: "View ScoreWell user account details and activity.",
};

function formatDate(date: Date | string | null | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(date: Date | string | null | undefined) {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const METHOD_LABELS: Record<string, string> = {
  BANK_TRANSFER: "Bank transfer",
  ESEWA: "eSewa",
  KHALTI: "Khalti",
};

export default async function AdminUserDetailsPage({ params }: PageProps<"/admin/users/[id]">) {
  await requireAdminPage();
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      firebaseUid: true,
      role: true,
      targetBand: true,
      referralCode: true,
      createdAt: true,
      updatedAt: true,
      subscription: {
        select: { tier: true, status: true, billingInterval: true, currentPeriodEnd: true },
      },
      _count: {
        select: {
          submissions: true,
          progress: true,
          aiUsage: true,
          paymentSubmissions: true,
          conversations: true,
          referralsMade: true,
        },
      },
      paymentSubmissions: {
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          method: true,
          purpose: true,
          billingInterval: true,
          creditsPurchased: true,
          amountNpr: true,
          transactionRef: true,
          screenshotPath: true,
          status: true,
          reviewNote: true,
          createdAt: true,
        },
      },
      progress: {
        orderBy: { completedAt: "desc" },
        take: 8,
        select: { id: true, skill: true, taskType: true, bandScore: true, completedAt: true },
      },
      adminActivityLogs: {
        orderBy: { createdAt: "desc" },
        take: 8,
        select: { id: true, action: true, summary: true, createdAt: true },
      },
    },
  });

  if (!user) notFound();

  const payments = await Promise.all(
    user.paymentSubmissions.map(async (payment) => ({
      ...payment,
      screenshotUrl: payment.screenshotPath
        ? await getSignedScreenshotUrl(payment.screenshotPath)
        : null,
    })),
  );

  let firebaseUser: Awaited<ReturnType<ReturnType<typeof getFirebaseAdminAuth>["getUser"]>> | null = null;
  if (user.firebaseUid && isFirebaseConfigured()) {
    firebaseUser = await getFirebaseAdminAuth().getUser(user.firebaseUid).catch(() => null);
  }

  const displayName = user.name?.trim() || "Unnamed user";
  const initials = displayName.split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";
  const details = [
    ["Account ID", user.id],
    ["Firebase UID", user.firebaseUid ?? "Not linked"],
    ["Created", formatDateTime(user.createdAt)],
    ["Last updated", formatDateTime(user.updatedAt)],
    ["Referral code", user.referralCode ?? "None"],
  ];

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
        <Link href={user.role === "ADMIN" ? "/admin/admins" : "/admin/users"} className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-sm font-semibold text-link shadow-sm transition-colors hover:border-brand-300 hover:bg-brand-50">
          <ArrowLeft className="h-4 w-4" /> Back to users
        </Link>

        <div data-reveal className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            {user.image ? (
              // Arbitrary provider avatar URLs are stored by Firebase.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt="" className="h-16 w-16 rounded-full object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-link">{initials}</div>
            )}
            <div>
              <p className="text-2xl font-bold text-ink">{displayName}</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-ink-muted"><Mail className="h-4 w-4" />{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink-muted">Account controls</span>
            <UserActionsMenu
              userId={user.id}
              email={user.email}
              name={user.name}
              role={user.role}
              disabled={firebaseUser?.disabled ?? false}
            />
          </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-link">{user.role === "ADMIN" ? "Admin" : "User"}</span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${firebaseUser?.emailVerified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"}`}>
              {firebaseUser?.emailVerified ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              {firebaseUser?.emailVerified ? "Email verified" : "Email not verified"}
            </span>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${firebaseUser?.disabled ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"}`}>
              {firebaseUser?.disabled ? "Suspended" : "Active"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [FileText, "Submissions", user._count.submissions],
            [Target, "Practice results", user._count.progress],
            [MessageSquare, "AI conversations", user._count.conversations],
            [CreditCard, "Payments", user._count.paymentSubmissions],
          ].map(([Icon, label, value]) => (
            <div key={String(label)} className="rounded-2xl border border-line bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-link"><Icon className="h-5 w-5" /></span>
              <p className="mt-4 text-sm text-ink-muted">{String(label)}</p>
              <p className="mt-1 text-3xl font-bold text-ink">{String(value)}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section data-reveal className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pop-600">Identity</p>
            <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-ink"><UserRound className="h-5 w-5 text-link" /> Account details</h2>
            <dl className="mt-5 divide-y divide-line">
              {details.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-4 py-3 text-sm"><dt className="text-ink-muted">{label}</dt><dd className="max-w-[65%] break-all text-right font-medium text-ink-body">{value}</dd></div>)}
              <div className="flex items-start justify-between gap-4 py-3 text-sm"><dt className="text-ink-muted">Target band</dt><dd className="font-medium text-ink-body">{user.targetBand ?? "Not set"}</dd></div>
              <div className="flex items-start justify-between gap-4 py-3 text-sm"><dt className="text-ink-muted">Firebase last sign-in</dt><dd className="text-right font-medium text-ink-body">{formatDateTime(firebaseUser?.metadata.lastSignInTime)}</dd></div>
            </dl>
          </section>

          <section data-reveal className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pop-600">Billing</p>
            <h2 className="mt-1 flex items-center gap-2 text-lg font-bold text-ink"><ShieldCheck className="h-5 w-5 text-link" /> Subscription</h2>
            {user.subscription ? (
              <dl className="mt-5 divide-y divide-line">
                <div className="flex justify-between py-3 text-sm"><dt className="text-ink-muted">Tier</dt><dd className="font-semibold text-ink-body">{user.subscription.tier}</dd></div>
                <div className="flex justify-between py-3 text-sm"><dt className="text-ink-muted">Status</dt><dd className="font-semibold text-ink-body">{user.subscription.status}</dd></div>
                <div className="flex justify-between py-3 text-sm"><dt className="text-ink-muted">Billing interval</dt><dd className="font-semibold text-ink-body">{user.subscription.billingInterval ?? "—"}</dd></div>
                <div className="flex justify-between py-3 text-sm"><dt className="text-ink-muted">Period ends</dt><dd className="font-semibold text-ink-body">{formatDate(user.subscription.currentPeriodEnd)}</dd></div>
              </dl>
            ) : <p className="mt-5 text-sm text-ink-muted">No subscription record.</p>}
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section data-reveal className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pop-600">Transactions</p>
            <h2 className="mt-1 text-lg font-bold text-ink">Recent payments</h2>
            <div className="mt-4 divide-y divide-line">
              {payments.length === 0 ? <p className="py-4 text-sm text-ink-muted">No payments yet.</p> : payments.map((payment) => (
                <div key={payment.id} className="py-4 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink-body">{payment.purpose === "CREDITS" ? `${payment.creditsPurchased ?? 0} credits` : "Premium subscription"}</p>
                      <p className="mt-1 text-xs text-ink-muted">{METHOD_LABELS[payment.method]} · NPR {payment.amountNpr} · {formatDate(payment.createdAt)}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${payment.status === "APPROVED" ? "bg-emerald-100 text-emerald-700" : payment.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"}`}>{payment.status}</span>
                  </div>
                  <div className="mt-2 grid gap-1 text-xs text-ink-muted sm:grid-cols-2">
                    <span>Reference: <strong className="font-medium text-ink-body">{payment.transactionRef}</strong></span>
                    {payment.billingInterval && <span>Billing: <strong className="font-medium text-ink-body">{payment.billingInterval}</strong></span>}
                  </div>
                  {payment.reviewNote && <p className="mt-2 text-xs text-ink-muted">Review note: {payment.reviewNote}</p>}
                  {payment.screenshotUrl && <a href={payment.screenshotUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-link hover:underline">View payment screenshot</a>}
                </div>
              ))}
            </div>
          </section>
          <section data-reveal className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-pop-600">Learning activity</p>
            <h2 className="mt-1 text-lg font-bold text-ink">Recent practice results</h2>
            <div className="mt-4 divide-y divide-line">{user.progress.length === 0 ? <p className="py-4 text-sm text-ink-muted">No practice results yet.</p> : user.progress.map((result) => <div key={result.id} className="flex items-center justify-between gap-3 py-3 text-sm"><div><p className="font-medium text-ink-body">{result.skill ?? result.taskType ?? "Practice result"}</p><p className="mt-1 text-xs text-ink-muted">{formatDate(result.completedAt)}</p></div><span className="font-semibold text-link">{result.bandScore ?? "—"}</span></div>)}</div>
          </section>
        </div>

        {user.adminActivityLogs.length > 0 && <section className="mt-6 rounded-2xl border border-line bg-surface p-6 shadow-sm"><h2 className="text-lg font-bold text-ink">Recent admin activity</h2><div className="mt-4 divide-y divide-line">{user.adminActivityLogs.map((activity) => <div key={activity.id} className="flex items-center justify-between gap-3 py-3 text-sm"><span className="text-ink-body">{activity.summary}</span><time className="shrink-0 text-xs text-ink-muted">{formatDateTime(activity.createdAt)}</time></div>)}</div></section>}
      </div>
    </main>
  );
}