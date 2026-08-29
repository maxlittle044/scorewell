"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { WritingEditor } from "@/components/content/writing-editor";
import { generateSampleAction } from "@/lib/ai/writing-checker-actions";
import type { WritingTaskType } from "@/lib/ai/writing-checker";

export function WritingChecker({
  minWords,
  taskType = "task2",
}: {
  minWords: number;
  taskType?: WritingTaskType;
}) {
  const [mode, setMode] = useState<"check" | "generate">("check");
  const [prompt, setPrompt] = useState("");
  const [state, formAction, pending] = useActionState(generateSampleAction, {});

  return (
    <div>
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
        <WritingEditor minWords={minWords} taskType={taskType} />
      ) : (
        <form action={formAction}>
          <input type="hidden" name="taskType" value={taskType} />
          <label htmlFor="gen-prompt" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Prompt or topic
          </label>
          <textarea
            id="gen-prompt"
            name="examPrompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="Paste the exam question you want a sample answer for..."
            className="w-full rounded-xl border border-zinc-300 p-4 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="submit"
            disabled={prompt.trim() === "" || pending}
            className="mt-3 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {pending ? "Generating…" : "Generate sample answer"}
          </button>

          {state.error && (
            <div
              className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                state.limitReached
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-red-200 bg-red-50 text-red-600"
              }`}
            >
              {state.error}
              {state.limitReached && (
                <Link href="/pricing" className="ml-1 font-semibold underline hover:no-underline">
                  See plans
                </Link>
              )}
            </div>
          )}

          {state.sample && (
            <div className="mt-4 whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-800">
              {state.sample}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
