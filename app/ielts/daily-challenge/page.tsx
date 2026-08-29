import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";
import { CountdownTimer } from "@/components/content/countdown-timer";
import { Quiz, type QuizQuestion } from "@/components/content/quiz";
import { listQuizContent } from "@/lib/content/quiz-content";

export const metadata: Metadata = {
  title: "Daily Challenge — ScoreWell",
};

// The leaderboard groups on this exact taskType, so it must stay stable even
// as the underlying exercise rotates each day.
const DAILY_TASK_TYPE = "Daily challenge";

const QuestionsSchema = z.object({
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number(),
    }),
  ),
});

/** Days since the epoch — rotates the challenge at UTC midnight. */
function dayNumber(): number {
  return Math.floor(Date.now() / 86_400_000);
}

export default async function DailyChallengePage() {
  const pool = await listQuizContent("mini-exercise");

  let questions: QuizQuestion[] = [];
  let contentItemId: string | undefined;
  let sourceTitle: string | undefined;

  if (pool.length > 0) {
    const today = pool[dayNumber() % pool.length];
    const parsed = QuestionsSchema.safeParse(today.data);
    if (parsed.success) {
      questions = parsed.data.questions;
      contentItemId = today.id;
      sourceTitle = today.title;
    }
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Today&apos;s challenge
          </h1>
          {questions.length > 0 && <CountdownTimer minutes={3} />}
        </div>

        {questions.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-zinc-300 px-6 py-10 text-center text-sm text-zinc-500">
            No challenge available today — check back soon.
          </p>
        ) : (
          <>
            <p className="mb-10 text-zinc-600">
              {questions.length} quick question{questions.length === 1 ? "" : "s"}
              {sourceTitle && <> on {sourceTitle.toLowerCase()}</>}. A new challenge appears each
              day.
            </p>

            <Quiz
              questions={questions}
              title={DAILY_TASK_TYPE}
              contentItemId={contentItemId}
            />
          </>
        )}

        <p className="mt-8 text-center text-sm text-zinc-500">
          Come back tomorrow for a new challenge, or check your ranking on the{" "}
          <Link href="/leaderboard" className="font-medium text-brand-600 hover:underline">
            leaderboard
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
