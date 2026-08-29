"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { SpeakingRecorder } from "@/components/content/speaking-recorder";
import { PageHeader } from "@/components/layout/page-header";
import {
  checkSpeakingAction,
  generateSpeakingSampleAction,
} from "@/lib/ai/speaking-checker-actions";

const PARTS = [
  { key: "part1", label: "Part 1", prompt: "What kind of music do you enjoy listening to?" },
  { key: "part2", label: "Part 2", prompt: "Describe a book that made a strong impression on you." },
  { key: "part3", label: "Part 3", prompt: "Do you think reading habits have changed in the last decade?" },
] as const;

function ErrorBox({ error, limitReached }: { error: string; limitReached?: boolean }) {
  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
        limitReached
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-red-200 bg-red-50 text-red-600"
      }`}
    >
      {error}
      {limitReached && (
        <Link href="/pricing" className="ml-1 font-semibold underline hover:no-underline">
          See plans
        </Link>
      )}
    </div>
  );
}

export default function SpeakingCheckerPage() {
  const [part, setPart] = useState<(typeof PARTS)[number]["key"]>("part1");
  const [mode, setMode] = useState<"check" | "generate">("check");
  const [transcript, setTranscript] = useState("");

  const [checkState, checkAction, checking] = useActionState(checkSpeakingAction, {});
  const [sampleState, sampleAction, generating] = useActionState(generateSpeakingSampleAction, {});

  const current = PARTS.find((p) => p.key === part)!;

  return (
    <main className="flex flex-1 flex-col bg-white">
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
                part === p.key ? "bg-brand-600 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <p className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm text-zinc-700">
          {current.prompt}
        </p>

        <div className="mb-6 flex rounded-full bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setMode("check")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "check" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
            }`}
          >
            Check my answer
          </button>
          <button
            type="button"
            onClick={() => setMode("generate")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${
              mode === "generate" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
            }`}
          >
            Generate a sample
          </button>
        </div>

        {mode === "check" ? (
          <div>
            <SpeakingRecorder transcript={transcript} onTranscriptChange={setTranscript} />

            <form action={checkAction}>
              <input type="hidden" name="part" value={part} />
              <input type="hidden" name="prompt" value={current.prompt} />
              <input type="hidden" name="transcript" value={transcript} />
              <button
                type="submit"
                disabled={transcript.trim() === "" || checking}
                className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                {checking ? "Checking…" : "Check with AI"}
              </button>
            </form>

            {checkState.error && (
              <ErrorBox error={checkState.error} limitReached={checkState.limitReached} />
            )}

            {checkState.result && (
              <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-600">Estimated band</span>
                  <span className="text-2xl font-bold text-brand-600">
                    {checkState.result.overallBand}
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-3">
                  {checkState.result.criteria.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-zinc-800">{c.name}</span>
                        <span className="font-semibold text-zinc-900">{c.band}</span>
                      </div>
                      <p className="mt-0.5 text-sm text-zinc-600">{c.feedback}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 rounded-lg bg-white px-3 py-2 text-xs text-zinc-500">
                  Pronunciation is one of the four official IELTS speaking criteria, but it
                  can&apos;t be judged from a transcript — this estimate covers the other three
                  only.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">Strengths</p>
                    <ul className="mt-1.5 list-inside list-disc text-sm text-zinc-600">
                      {checkState.result.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-amber-700">Improvements</p>
                    <ul className="mt-1.5 list-inside list-disc text-sm text-zinc-600">
                      {checkState.result.improvements.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form action={sampleAction}>
            <input type="hidden" name="part" value={part} />
            <input type="hidden" name="prompt" value={current.prompt} />
            <button
              type="submit"
              disabled={generating}
              className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {generating ? "Generating…" : "Generate sample answer"}
            </button>

            {sampleState.error && (
              <ErrorBox error={sampleState.error} limitReached={sampleState.limitReached} />
            )}

            {sampleState.sample && (
              <div className="mt-4 whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-800">
                {sampleState.sample}
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
