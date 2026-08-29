"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { runTextToolAction } from "@/lib/ai/text-tool-actions";
import type { TextToolKind } from "@/lib/ai/text-tool";

export function AiTextTool({
  kind,
  inputLabel,
  placeholder,
  actionLabel,
  rows = 8,
}: {
  kind: TextToolKind;
  inputLabel: string;
  placeholder: string;
  actionLabel: string;
  rows?: number;
}) {
  const [text, setText] = useState("");
  const [state, formAction, pending] = useActionState(runTextToolAction, {});

  return (
    <form action={formAction}>
      <input type="hidden" name="kind" value={kind} />

      <label htmlFor="tool-input" className="mb-1.5 block text-sm font-medium text-zinc-700">
        {inputLabel}
      </label>
      <textarea
        id="tool-input"
        name="inputText"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-300 p-4 text-sm leading-relaxed text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      <button
        type="submit"
        disabled={text.trim() === "" || pending}
        className="mt-3 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {pending ? "Working…" : actionLabel}
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

      {state.result && (
        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-800">
          {state.result}
        </div>
      )}
    </form>
  );
}
