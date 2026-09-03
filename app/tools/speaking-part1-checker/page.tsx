"use client";

import { useActionState, useState } from "react";
import {
  AiErrorBox,
  SpeakingAnswerChecker,
} from "@/components/content/speaking-answer-checker";
import { PageHeader } from "@/components/layout/page-header";
import { generateSpeakingSampleAction } from "@/lib/ai/speaking-checker-actions";

const PARTS = [
  { key: "part1", label: "Part 1", prompt: "What kind of music do you enjoy listening to?" },
  { key: "part2", label: "Part 2", prompt: "Describe a book that made a strong impression on you." },
  { key: "part3", label: "Part 3", prompt: "Do you think reading habits have changed in the last decade?" },
] as const;

export default function SpeakingCheckerPage() {
  const [part, setPart] = useState<(typeof PARTS)[number]["key"]>("part1");
  const [mode, setMode] = useState<"check" | "generate">("check");

  const [sampleState, sampleAction, generating] = useActionState(generateSpeakingSampleAction, {});

  const current = PARTS.find((p) => p.key === part)!;

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader
          title="Speaking checker"
          description="Record an answer for AI feedback, or generate a sample answer to study."
        />

        <div className="mb-4 flex gap-2">
          {PARTS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPart(p.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                part === p.key ? "bg-brand-600 text-white" : "bg-surface-sunken text-ink-body hover:bg-line"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <p className="mb-6 rounded-xl border border-line bg-surface-muted p-5 text-sm text-ink-body">
          {current.prompt}
        </p>

        <div className="mb-6 flex rounded-full bg-surface-sunken p-1">
          <button
            type="button"
            onClick={() => setMode("check")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "check" ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            Check my answer
          </button>
          <button
            type="button"
            onClick={() => setMode("generate")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "generate" ? "bg-surface text-ink shadow-sm" : "text-ink-muted"
            }`}
          >
            Generate a sample
          </button>
        </div>

        {mode === "check" ? (
          // No title or contentItemId: an answer checked here belongs to no test, so it is
          // saved against the skill alone rather than attributed to one.
          // `key` remounts on a part switch, clearing a transcript written for the old
          // question along with the feedback that went with it.
          <SpeakingAnswerChecker key={part} part={part} prompt={current.prompt} />
        ) : (
          <form action={sampleAction}>
            <input type="hidden" name="part" value={part} />
            <input type="hidden" name="prompt" value={current.prompt} />
            <button
              type="submit"
              disabled={generating}
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
            >
              {generating ? "Generating…" : "Generate sample answer"}
            </button>

            {sampleState.error && (
              <AiErrorBox error={sampleState.error} limitReached={sampleState.limitReached} />
            )}

            {sampleState.sample && (
              <div className="mt-4 whitespace-pre-wrap rounded-xl border border-line bg-surface-muted p-5 text-sm leading-relaxed text-ink">
                {sampleState.sample}
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
