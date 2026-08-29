import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { ReplyForm } from "@/components/content/reply-form";
import { getSubmission, initials } from "@/lib/content/submissions";

export async function generateMetadata({
  params,
}: PageProps<"/ielts/submitted-answers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const submission = await getSubmission(slug);
  return { title: `${submission?.title ?? "Submitted answer"} — ScoreWell` };
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function SubmittedAnswerPage({
  params,
}: PageProps<"/ielts/submitted-answers/[slug]">) {
  const { slug } = await params;
  const [submission, session] = await Promise.all([getSubmission(slug), auth()]);

  if (!submission) {
    return (
      <main className="flex flex-1 flex-col bg-surface">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-ink">Answer not found</h1>
          <p className="mt-4 text-sm text-ink-muted">
            This answer may have been removed.{" "}
            <Link
              href="/ielts/submitted-answers"
              className="font-medium text-link hover:underline"
            >
              Browse all submitted answers
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        {submission.taskType && (
          <span className="mb-3 inline-block rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-ink-body">
            {submission.taskType}
          </span>
        )}
        <h1 className="mb-1 text-xl font-bold text-ink">{submission.title}</h1>
        <p className="mb-6 text-sm text-ink-muted">
          Shared by {submission.author} · {formatDate(submission.createdAt)}
        </p>

        <article className="mb-8 whitespace-pre-line rounded-xl border border-line bg-surface-muted p-5 text-sm leading-relaxed text-ink-body">
          {submission.answerText}
        </article>

        <h2 className="mb-4 text-sm font-semibold text-ink">
          Community feedback ({submission.replies.length})
        </h2>

        {submission.replies.length === 0 ? (
          <p className="mb-6 text-sm text-ink-muted">
            No feedback yet — be the first to help this learner out.
          </p>
        ) : (
          <ul className="mb-6 flex flex-col gap-4">
            {submission.replies.map((reply) => (
              <li key={reply.id} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-link">
                  {initials(reply.author)}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">
                    {reply.author}{" "}
                    <span className="font-normal text-ink-muted">{formatDate(reply.createdAt)}</span>
                  </p>
                  <p className="text-sm text-ink-body">{reply.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {session?.user ? (
          <ReplyForm submissionId={submission.id} />
        ) : (
          <p className="text-sm text-ink-muted">
            <Link href="/login" className="font-medium text-link hover:underline">
              Log in
            </Link>{" "}
            to leave feedback on this answer.
          </p>
        )}
      </div>
    </main>
  );
}
