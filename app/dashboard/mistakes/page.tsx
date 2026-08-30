import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PageHeader } from "@/components/layout/page-header";
import { MistakeReview } from "@/components/dashboard/mistake-review";
import { getMistakeQueue } from "@/lib/content/mistakes";

export const metadata: Metadata = {
  title: "Review your mistakes — ScoreWell",
};

export default async function MistakeReviewPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const queue = await getMistakeQueue(session.user.id);

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Review your mistakes"
          description="Questions you've got wrong, asked again — spaced out so they come back just as they start to fade."
        />

        {queue.questions.length === 0 ? (
          <div className="rounded-2xl border border-line bg-surface p-8 text-center">
            <p className="text-base font-semibold text-ink">Nothing here yet.</p>
            <p className="mt-2 text-sm text-ink-body">
              {queue.passageMistakes > 0
                ? "Your missed questions so far are all from reading or listening tests, which can't be drilled one question at a time — see below."
                : "Once you miss a question in a grammar test or mini exercise, it turns up here."}
            </p>
            <Link
              href="/ielts/grammar-tests"
              className="mt-5 inline-block rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Try a grammar test
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-ink-muted">
              {queue.dueCount > 0 ? (
                <>
                  <strong className="text-ink">{queue.dueCount}</strong> in today&apos;s session
                  {queue.laterCount > 0 && <> · {queue.laterCount} scheduled for later</>}
                </>
              ) : (
                <>
                  Nothing due today — {queue.laterCount}{" "}
                  {queue.laterCount === 1 ? "question is" : "questions are"} scheduled for later
                  {queue.nextDueAt && (
                    <>
                      , the next on{" "}
                      {queue.nextDueAt.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                      })}
                    </>
                  )}
                  .
                </>
              )}
            </p>

            <MistakeReview questions={queue.questions} />
          </>
        )}

        {/* Said plainly rather than left as a silent gap: someone who knows they keep missing
            reading questions would otherwise read this page as broken. */}
        {queue.passageMistakes > 0 && (
          <p className="mt-8 text-xs leading-relaxed text-ink-muted">
            {queue.passageMistakes} missed{" "}
            {queue.passageMistakes === 1 ? "question" : "questions"} from reading and listening
            tests {queue.passageMistakes === 1 ? "isn't" : "aren't"} in this queue. Those questions
            need their passage or audio to make sense, so re-serving one on its own would be
            unanswerable — retake the test instead, or see where they cluster in your{" "}
            <Link href="/dashboard/analytics" className="font-medium text-link hover:underline">
              mistake analytics
            </Link>
            .
          </p>
        )}

        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          Same ladder as the flashcards: 1, 3, 7, 21 and 60 days, and a wrong answer sends a
          question back to the start.
        </p>
      </div>
    </main>
  );
}
