"use client";

import { useState } from "react";
import { SpeakButton, SpeechUnsupportedNote } from "@/components/content/speak-button";

type Token = { raw: string; norm: string };

/** Keeps the original spelling for display but compares on a punctuation-free form. */
function tokenize(text: string): Token[] {
  return text
    .trim()
    .split(/\s+/)
    .map((raw) => ({
      raw,
      norm: raw
        .toLowerCase()
        .replace(/[‘’]/g, "'")
        .replace(/[^a-z0-9'-]/g, ""),
    }))
    .filter((token) => token.norm.length > 0);
}

/**
 * Longest-common-subsequence alignment, so a single missing or extra word
 * doesn't mark the whole rest of the line wrong.
 */
function align(expected: Token[], actual: Token[]) {
  const n = expected.length;
  const m = actual.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        expected[i].norm === actual[j].norm
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const expectedOk = new Array<boolean>(n).fill(false);
  const actualOk = new Array<boolean>(m).fill(false);
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (expected[i].norm === actual[j].norm) {
      expectedOk[i] = true;
      actualOk[j] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++;
    } else {
      j++;
    }
  }

  const matched = expectedOk.filter(Boolean).length;
  return { expectedOk, actualOk, matched, total: n };
}

function MarkedWords({ tokens, ok, tone }: { tokens: Token[]; ok: boolean[]; tone: "actual" | "expected" }) {
  return (
    <p className="flex flex-wrap gap-x-1.5 gap-y-1 text-sm leading-relaxed">
      {tokens.map((token, index) => (
        <span
          key={`${token.raw}-${index}`}
          className={
            ok[index]
              ? "text-emerald-700"
              : tone === "actual"
                ? "text-rose-600 line-through decoration-rose-300"
                : "rounded bg-amber-100 px-1 font-medium text-amber-900"
          }
        >
          {token.raw}
        </span>
      ))}
    </p>
  );
}

type SegmentState = { attempt: string; checked: boolean; revealed: boolean };

export function DictationPractice({ segments }: { segments: string[] }) {
  const [state, setState] = useState<SegmentState[]>(() =>
    segments.map(() => ({ attempt: "", checked: false, revealed: false }))
  );

  function update(index: number, patch: Partial<SegmentState>) {
    setState((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  }

  const fullText = segments.join(" ");

  const scored = state
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.checked)
    .map(({ s, i }) => align(tokenize(segments[i]), tokenize(s.attempt)));
  const totalMatched = scored.reduce((sum, r) => sum + r.matched, 0);
  const totalWords = scored.reduce((sum, r) => sum + r.total, 0);

  return (
    <div>
      <SpeechUnsupportedNote />

      <div className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="mb-3 text-sm font-medium text-zinc-700">Listen to the whole passage first</p>
        <div className="flex flex-wrap gap-2">
          <SpeakButton text={fullText} variant="primary">
            Play all
          </SpeakButton>
          <SpeakButton text={fullText} rate={0.7} variant="quiet">
            Play slowly
          </SpeakButton>
        </div>
      </div>

      <p className="mb-4 text-sm text-zinc-600">
        Now work through it one line at a time: play the line, type what you hear, then check. Once a
        line is correct, play it again and shadow it out loud.
      </p>

      <ol className="flex flex-col gap-4">
        {segments.map((segment, index) => {
          const current = state[index];
          const expected = tokenize(segment);
          const actual = tokenize(current.attempt);
          const result = current.checked ? align(expected, actual) : null;
          const perfect = result !== null && result.matched === result.total && actual.length === expected.length;

          return (
            <li key={index} className="rounded-2xl border border-zinc-200 p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600">
                  {index + 1}
                </span>
                <SpeakButton text={segment} variant="quiet">
                  Play line
                </SpeakButton>
                <SpeakButton text={segment} rate={0.65} variant="quiet">
                  Slowly
                </SpeakButton>
                {perfect && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Word perfect
                  </span>
                )}
              </div>

              <label className="sr-only" htmlFor={`dictation-line-${index}`}>
                Transcription for line {index + 1}
              </label>
              <textarea
                id={`dictation-line-${index}`}
                value={current.attempt}
                onChange={(e) => update(index, { attempt: e.target.value, checked: false })}
                rows={2}
                placeholder="Type what you hear..."
                className="w-full rounded-xl border border-zinc-300 p-3 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => update(index, { checked: true })}
                  disabled={current.attempt.trim() === ""}
                  className="rounded-full bg-brand-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={() => update(index, { revealed: !current.revealed })}
                  className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  {current.revealed ? "Hide line" : "Reveal line"}
                </button>
              </div>

              {result && (
                <div className="mt-3 flex flex-col gap-2 rounded-xl bg-zinc-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    {result.matched} of {result.total} words matched
                  </p>
                  <div>
                    <p className="mb-0.5 text-xs text-zinc-500">You typed</p>
                    <MarkedWords tokens={actual} ok={result.actualOk} tone="actual" />
                  </div>
                  {result.matched < result.total && (
                    <div>
                      <p className="mb-0.5 text-xs text-zinc-500">Highlighted words were missed</p>
                      <MarkedWords tokens={expected} ok={result.expectedOk} tone="expected" />
                    </div>
                  )}
                </div>
              )}

              {current.revealed && (
                <p className="mt-3 rounded-xl border border-zinc-200 bg-white p-3 text-sm leading-relaxed text-zinc-700">
                  {segment}
                </p>
              )}
            </li>
          );
        })}
      </ol>

      {totalWords > 0 && (
        <p className="mt-6 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          Across the lines you&apos;ve checked: {totalMatched} of {totalWords} words correct (
          {Math.round((totalMatched / totalWords) * 100)}%).
        </p>
      )}
    </div>
  );
}
