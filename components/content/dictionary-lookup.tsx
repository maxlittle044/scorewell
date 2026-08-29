"use client";

import { useCallback, useEffect, useState } from "react";
import type { DictionaryResult } from "@/app/api/dictionary/route";

/**
 * Inline dictionary lookup (site-build-prompt.md section 5: "usable while reading any
 * passage or doing any exercise").
 *
 * Select a single word anywhere in the page's main content and a small panel offers its
 * definition. It is strictly an aid: nothing on the page depends on it, a failed lookup
 * says so and nothing else breaks, and it never appears unless the learner deliberately
 * selects a word.
 *
 * Scoped to <main> so selecting text in the nav, footer or a form doesn't trigger it, and
 * limited to single words so highlighting a sentence to re-read it is left alone.
 */

type State =
  | { status: "idle" }
  | { status: "prompt"; word: string; x: number; y: number }
  | { status: "loading"; word: string; x: number; y: number }
  | { status: "done"; word: string; x: number; y: number; result: DictionaryResult }
  | { status: "error"; word: string; x: number; y: number; message: string };

const WORD_PATTERN = /^[A-Za-z][A-Za-z'-]{2,31}$/;

export function DictionaryLookup() {
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    function onSelection() {
      const selection = window.getSelection();
      const text = selection?.toString().trim() ?? "";

      if (!text || !WORD_PATTERN.test(text)) {
        // Only clear a prompt — never yank away a definition the learner is reading.
        setState((prev) => (prev.status === "prompt" ? { status: "idle" } : prev));
        return;
      }

      const node = selection?.anchorNode;
      const element = node instanceof Element ? node : node?.parentElement;
      if (!element?.closest("main")) return;
      // A selection inside an input is the learner editing, not reading.
      if (element.closest("input, textarea, [contenteditable='true']")) return;

      const rect = selection?.getRangeAt(0).getBoundingClientRect();
      if (!rect) return;

      setState({
        status: "prompt",
        word: text,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    }

    document.addEventListener("selectionchange", onSelection);
    return () => document.removeEventListener("selectionchange", onSelection);
  }, []);

  const look = useCallback(async () => {
    if (state.status !== "prompt") return;
    const { word, x, y } = state;
    setState({ status: "loading", word, x, y });

    try {
      const response = await fetch(`/api/dictionary?word=${encodeURIComponent(word)}`);
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { error?: string };
        setState({
          status: "error",
          word,
          x,
          y,
          message: body.error ?? "No definition found.",
        });
        return;
      }
      setState({ status: "done", word, x, y, result: (await response.json()) as DictionaryResult });
    } catch {
      setState({ status: "error", word, x, y, message: "The dictionary is unavailable." });
    }
  }, [state]);

  if (state.status === "idle") return null;

  const dismiss = () => setState({ status: "idle" });

  return (
    <div
      className="fixed z-50 -translate-x-1/2 -translate-y-full pb-2"
      style={{ left: `${state.x}px`, top: `${state.y}px` }}
      role="dialog"
      aria-label={`Dictionary: ${state.word}`}
    >
      <div className="max-h-72 w-72 overflow-y-auto rounded-xl border border-line bg-surface p-3 shadow-xl">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-ink">{state.word}</p>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close dictionary"
            className="-mr-1 -mt-1 rounded p-1 text-ink-muted hover:bg-surface-sunken hover:text-ink-body"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path
                d="M3 3l8 8M11 3l-8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {state.status === "prompt" && (
          <button
            type="button"
            onClick={look}
            className="mt-2 w-full rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
          >
            Look up this word
          </button>
        )}

        {state.status === "loading" && (
          <p className="mt-2 text-xs text-ink-muted">Looking it up…</p>
        )}

        {state.status === "error" && (
          <p className="mt-2 text-xs text-ink-body">{state.message}</p>
        )}

        {state.status === "done" && (
          <>
            <div className="mt-2 flex flex-col gap-2.5">
              {state.result.entries.map((entry, index) => (
                <div key={index}>
                  {entry.partOfSpeech && (
                    <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-pop-700">
                      {entry.partOfSpeech}
                    </p>
                  )}
                  <ol className="mt-0.5 flex list-decimal flex-col gap-1 pl-4">
                    {entry.senses.map((sense, senseIndex) => (
                      <li key={senseIndex} className="text-xs leading-relaxed text-ink-body">
                        {sense.definition}
                        {sense.examples[0] && (
                          <span className="mt-0.5 block italic text-ink-muted">
                            {sense.examples[0]}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            {/* Wiktionary is CC BY-SA: the credit is a licence condition, not a courtesy. */}
            <p className="mt-3 border-t border-line pt-2 text-[0.65rem] text-ink-muted">
              Definitions from{" "}
              <a
                href={`https://en.wiktionary.org/wiki/${encodeURIComponent(state.word)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink-body"
              >
                Wiktionary
              </a>
              , CC BY-SA.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
