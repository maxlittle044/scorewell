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
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">Answer not found</h1>
          <p className="mt-4 text-sm text-zinc-500">
            This answer may have been removed.{" "}
            <Link
              href="/ielts/submitted-answers"
              className="font-medium text-brand-600 hover:underline"
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
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        {submission.taskType && (
          <span className="mb-3 inline-block rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
            {submission.taskType}
          </span>
        )}
        <h1 className="mb-1 text-xl font-bold text-zinc-900">{submission.title}</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Shared by {submission.author} · {formatDate(submission.createdAt)}
        </p>

        <article className="mb-8 whitespace-pre-line rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-700">
          {submission.answerText}
        </article>

        <h2 className="mb-4 text-sm font-semibold text-zinc-900">
          Community feedback ({submission.replies.length})
        </h2>

        {submission.replies.length === 0 ? (
          <p className="mb-6 text-sm text-zinc-500">
            No feedback yet — be the first to help this learner out.
          </p>
        ) : (
          <ul className="mb-6 flex flex-col gap-4">
            {submission.replies.map((reply) => (
              <li key={reply.id} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                  {initials(reply.author)}
                </span>
                <div>
                  <p className="text-sm font-medium text-zinc-800">
                    {reply.author}{" "}
                    <span className="font-normal text-zinc-400">{formatDate(reply.createdAt)}</span>
                  </p>
                  <p className="text-sm text-zinc-600">{reply.text}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {session?.user ? (
          <ReplyForm submissionId={submission.id} />
        ) : (
          <p className="text-sm text-zinc-500">
            <Link href="/login" className="font-medium text-brand-600 hover:underline">
              Log in
            </Link>{" "}
            to leave feedback on this answer.
          </p>
        )}
      </div>
    </main>
  );
}
