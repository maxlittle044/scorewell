import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { PlacementTest } from "@/components/content/placement-test";
import { getPlacement } from "@/lib/learning-path";

export const metadata: Metadata = {
  title: "Placement diagnostic — ScoreWell",
  description:
    "A short reading, grammar and vocabulary diagnostic that estimates your starting level and builds a personalised study plan.",
};

export default async function PlacementPage() {
  const placement = await getPlacement();
  const session = await auth();

  if (!placement) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900">Placement diagnostic</h1>
          <p className="mt-4 text-sm text-zinc-500">
            The diagnostic isn&apos;t available yet.{" "}
            <Link href="/exam-library" className="font-medium text-brand-600 hover:underline">
              Browse the Exam Library
            </Link>{" "}
            in the meantime.
          </p>
        </div>
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex flex-1 flex-col bg-white">
        <div className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl font-bold text-zinc-900">Placement diagnostic</h1>
          <p className="mt-3 text-sm text-zinc-600">
            The diagnostic builds a study plan from your result and keeps it up to date as you
            practise, so it needs somewhere to save that — an account.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button href="/login" size="sm">
              Log in to start
            </Button>
            <Button href="/exam-library" variant="outline" size="sm">
              Browse practice tests
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-zinc-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Learning Path
          </p>
          <h1 className="font-display text-2xl font-bold text-zinc-900">Placement diagnostic</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Twelve questions, no timer, about ten minutes. It measures reading comprehension and
            your grasp of grammar and vocabulary — the two things that can be marked
            objectively. Listening, Writing and Speaking get their own steps in the plan
            afterwards.
          </p>
        </div>

        <PlacementTest passage={placement.passage} questions={placement.questions} />
      </div>
    </main>
  );
}
