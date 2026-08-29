import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { REVIEW_STATUS_LABELS, countWords } from "@/lib/review";
import { completeReviewAction, refundReviewAction, startReviewAction } from "./actions";

export const metadata: Metadata = {
  title: "Examiner review queue — ScoreWell",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  IN_REVIEW: "bg-brand-100 text-brand-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-zinc-100 text-zinc-600",
};

export default async function AdminReviewsPage() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    notFound();
  }

  const requests = await prisma.reviewRequest.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "asc" }],
    include: {
      user: { select: { name: true, email: true } },
      submission: { select: { title: true, taskType: true, answerText: true } },
    },
    take: 50,
  });

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Examiner review queue"
          description="Paid human reviews, oldest first. The learner has already been charged, so a request that cannot be completed should be refunded rather than left."
        />

        {requests.length === 0 ? (
          <p className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-500">
            No review requests yet.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {requests.map((request) => (
              <article key={request.id} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-zinc-900">
                      {request.submission.title ?? request.submission.taskType ?? "Answer"}
                    </h2>
                    <p className="mt-0.5 text-sm text-zinc-500">
                      {request.user.name ?? request.user.email} ·{" "}
                      {countWords(request.submission.answerText)} words ·{" "}
                      {request.creditsCharged} credits · {request.turnaroundHours}h turnaround
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      STATUS_STYLES[request.status] ?? "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {REVIEW_STATUS_LABELS[request.status] ?? request.status}
                  </span>
                </div>

                <div className="mt-4 max-h-64 overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700">
                    {request.submission.answerText}
                  </p>
                </div>

                {request.status === "COMPLETED" && request.reviewerNotes && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                      Feedback sent
                    </p>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-emerald-900">
                      {request.reviewerNotes}
                    </p>
                  </div>
                )}

                {request.status === "PENDING" && (
                  <form action={startReviewAction} className="mt-4">
                    <input type="hidden" name="requestId" value={request.id} />
                    <button
                      type="submit"
                      className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      Start review
                    </button>
                  </form>
                )}

                {request.status === "IN_REVIEW" && (
                  <form action={completeReviewAction} className="mt-4 flex flex-col gap-3">
                    <input type="hidden" name="requestId" value={request.id} />
                    <label htmlFor={`notes-${request.id}`} className="text-sm font-medium text-zinc-700">
                      Feedback for the learner
                    </label>
                    <textarea
                      id={`notes-${request.id}`}
                      name="notes"
                      rows={6}
                      required
                      placeholder="Per-criterion comments and the specific fixes that would raise the band."
                      className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900"
                    />
                    <button
                      type="submit"
                      className="w-fit rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      Send feedback
                    </button>
                  </form>
                )}

                {(request.status === "PENDING" || request.status === "IN_REVIEW") && (
                  <form action={refundReviewAction} className="mt-3">
                    <input type="hidden" name="requestId" value={request.id} />
                    <button
                      type="submit"
                      className="text-sm font-medium text-zinc-500 hover:text-red-600"
                    >
                      Cannot complete — refund {request.creditsCharged} credits
                    </button>
                  </form>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
