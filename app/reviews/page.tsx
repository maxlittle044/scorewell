import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCreditBalance } from "@/lib/credits";
import { PageHeader } from "@/components/layout/page-header";
import { ReviewRequestForm } from "@/components/content/review-request-form";
import { REVIEW_STATUS_LABELS, REVIEW_TURNAROUND_HOURS } from "@/lib/review";

export const metadata: Metadata = {
  title: "Examiner Review — ScoreWell",
  description:
    "Request a paid human examiner review of a writing or speaking answer, on top of the instant AI score.",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  IN_REVIEW: "bg-brand-100 text-link",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-surface-sunken text-ink-body",
};

export default async function ReviewsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = session.user.id;
  const [requests, credits] = await Promise.all([
    prisma.reviewRequest.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { submission: { select: { title: true, taskType: true, answerText: true } } },
    }),
    getCreditBalance(userId),
  ]);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Examiner review"
          description="A real person reads your answer and writes back, on top of the instant AI score you already get for free."
        />

        <div className="mb-8 rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-ink-body">
            You have <strong className="text-ink">{credits}</strong>{" "}
            {credits === 1 ? "credit" : "credits"}.{" "}
            <Link href="/pricing" className="font-medium text-link hover:underline">
              Buy more
            </Link>
          </p>
        </div>

        <section className="mb-12">
          <h2 className="mb-5 text-lg font-bold text-ink">Your requests</h2>
          {requests.length === 0 ? (
            <p className="rounded-2xl border border-line bg-surface p-6 text-sm text-ink-muted">
              You have not requested a review yet.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border border-line bg-surface p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold text-ink">
                      {request.submission.title ?? request.submission.taskType ?? "Your answer"}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        STATUS_STYLES[request.status] ?? "bg-surface-sunken text-ink-body"
                      }`}
                    >
                      {REVIEW_STATUS_LABELS[request.status] ?? request.status}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-ink-muted">
                    {request.submission.answerText}
                  </p>

                  <p className="mt-3 text-xs text-ink-muted">
                    Requested{" "}
                    {request.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {" · "}
                    {request.creditsCharged} credits
                    {request.status === "PENDING" &&
                      ` · turnaround ${request.turnaroundHours}h once picked up`}
                  </p>

                  {request.status === "COMPLETED" && request.reviewerNotes && (
                    <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                        Examiner feedback
                      </p>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-emerald-900">
                        {request.reviewerNotes}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <ReviewRequestForm credits={credits} />

        <p className="mt-4 text-xs text-ink-muted">
          Turnaround is {REVIEW_TURNAROUND_HOURS} hours from the moment a reviewer picks your
          answer up, not from when you submit it.
        </p>
      </div>
    </main>
  );
}
