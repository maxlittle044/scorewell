import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { getSignedScreenshotUrl } from "@/lib/storage";
import { formatNpr } from "@/lib/pricing";
import { PageHeader } from "@/components/layout/page-header";
import { approvePaymentAction, rejectPaymentAction } from "./actions";

export const metadata: Metadata = {
  title: "Payment review — ScoreWell",
};

const METHOD_LABELS: Record<string, string> = {
  BANK_TRANSFER: "Bank transfer",
  ESEWA: "eSewa",
  KHALTI: "Khalti",
};

export default async function AdminPaymentsPage() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    notFound();
  }

  const submissions = await prisma.paymentSubmission.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { user: { select: { name: true, email: true } } },
    take: 50,
  });

  const withUrls = await Promise.all(
    submissions.map(async (s) => ({
      ...s,
      screenshotUrl: s.screenshotPath ? await getSignedScreenshotUrl(s.screenshotPath) : null,
    })),
  );

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Payment review" description="Approve or reject submitted payment proofs." />

        {withUrls.length === 0 ? (
          <p className="text-sm text-zinc-500">No payment submissions yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {withUrls.map((s) => (
              <div key={s.id} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-zinc-900">{s.user.name ?? s.user.email}</p>
                    <p className="text-sm text-zinc-500">{s.user.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      s.status === "PENDING"
                        ? "bg-amber-100 text-amber-700"
                        : s.status === "APPROVED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-zinc-400">Method</p>
                    <p className="font-medium text-zinc-800">{METHOD_LABELS[s.method]}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Amount</p>
                    <p className="font-medium text-zinc-800">{formatNpr(s.amountNpr)}</p>
                  </div>
                  {/* What approving actually grants — an admin must not have to guess. */}
                  <div>
                    <p className="text-zinc-400">Buying</p>
                    <p className="font-medium text-zinc-800">
                      {s.purpose === "CREDITS"
                        ? `${s.creditsPurchased ?? 0} credits`
                        : "Premium subscription"}
                    </p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Reference</p>
                    <p className="font-medium text-zinc-800">{s.transactionRef}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400">Submitted</p>
                    <p className="font-medium text-zinc-800">
                      {s.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>
                </div>

                {s.screenshotUrl && (
                  <a
                    href={s.screenshotUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-medium text-brand-600 hover:underline"
                  >
                    View payment screenshot
                  </a>
                )}

                {s.status === "PENDING" && (
                  <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-zinc-100 pt-4">
                    <form action={approvePaymentAction}>
                      <input type="hidden" name="submissionId" value={s.id} />
                      <button
                        type="submit"
                        className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={rejectPaymentAction} className="flex flex-1 items-center gap-2">
                      <input type="hidden" name="submissionId" value={s.id} />
                      <input
                        type="text"
                        name="note"
                        placeholder="Rejection reason (optional)"
                        className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                      />
                      <button
                        type="submit"
                        className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                )}

                {s.status === "REJECTED" && s.reviewNote && (
                  <p className="mt-3 text-sm text-zinc-500">Note: {s.reviewNote}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
