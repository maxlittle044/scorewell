"use client";

import { useEffect, useState } from "react";

export function TtsTool() {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog."
  );
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // Checks a browser-only API (unavailable during SSR), so this can't be a
    // lazy useState initializer without causing a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  function speak() {
    if (!supported || text.trim() === "") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <div>
      <label htmlFor="tts-input" className="mb-1.5 block text-sm font-medium text-ink-body">
        Text to read aloud
      </label>
      <textarea
        id="tts-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Type or paste text to hear it spoken..."
        className="w-full rounded-xl border border-line-strong p-4 text-sm leading-relaxed text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />

      {!supported ? (
        <p className="mt-3 text-sm text-rose-600">
          Your browser doesn&apos;t support speech synthesis.
        </p>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={speak}
            disabled={text.trim() === ""}
            className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
          >
            {speaking ? "Speaking…" : "Play"}
          </button>
          {speaking && (
            <button
              type="button"
              onClick={stop}
              className="rounded-full border border-line-strong px-5 py-2 text-sm font-medium text-ink-body hover:bg-surface-muted"
            >
              Stop
            </button>
          )}
        </div>
      )}
    </div>
  );
}
