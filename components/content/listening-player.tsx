"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { pickVoice, useSpeechSupported } from "./speak-button";

/**
 * Plays a listening test's transcript aloud, so the paper can be sat by listening rather
 * than by reading the answers off the page.
 *
 * **Why synthesis and not audio files.** Recording or licensing four-skill exam audio is a
 * running cost and a hosting problem; `speechSynthesis` is already the project's answer for
 * text-to-speech, costs nothing, and ships no megabytes. The trade is real and the caller
 * says so on the page: one synthetic voice at an even pace is not the multi-speaker, accented
 * recording of the exam. It is, however, the difference between practising listening and
 * reading a transcript.
 *
 * **Spoken in sentence-sized chunks.** A single long utterance is silently truncated by some
 * browsers partway through, which on a listening test would look like the recording simply
 * stopping. Chunking also gives an honest progress bar and makes pause and resume behave.
 */

/** Splits after sentence-ending punctuation, keeping the punctuation with its sentence. */
function toChunks(transcript: string): string[] {
  return transcript
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ListeningPlayer({
  transcript,
  label,
}: {
  transcript: string;
  /** e.g. "Section 1: University housing call" — what the recording is. */
  label: string;
}) {
  const supported = useSpeechSupported();
  const [chunks] = useState(() => toChunks(transcript));
  const [spoken, setSpoken] = useState(0);
  const [status, setStatus] = useState<"idle" | "playing" | "paused" | "done">("idle");
  const [plays, setPlays] = useState(0);

  // Bumped whenever playback is torn down. `cancel()` fires `onend` on the utterance it
  // stops, which would otherwise queue the next chunk of a recording the learner just
  // stopped; handlers from an old run compare against this and bow out.
  const runRef = useRef(0);

  const stop = useCallback(() => {
    runRef.current += 1;
    if (typeof window !== "undefined") window.speechSynthesis.cancel();
    setStatus("idle");
    setSpoken(0);
  }, []);

  // Speech keeps playing after a navigation unless it is explicitly cancelled.
  useEffect(() => stop, [stop]);

  // A plain declaration rather than a useCallback, because it calls itself to queue the next
  // chunk and a memoised binding cannot reference itself before it is declared. It closes
  // over nothing that changes between renders — `chunks` is set once — so there is nothing
  // for a dependency array to track.
  function speakFrom(index: number, run: number) {
    if (index >= chunks.length) {
      setStatus("done");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang = "en-GB";
    // Slightly under natural pace: IELTS recordings are deliberate, and synthesised speech
    // at full speed runs words together in a way a real speaker does not.
    utterance.rate = 0.95;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      if (runRef.current !== run) return;
      setSpoken(index + 1);
      speakFrom(index + 1, run);
    };
    utterance.onerror = () => {
      if (runRef.current !== run) return;
      setStatus("idle");
    };

    window.speechSynthesis.speak(utterance);
  }

  function play() {
    if (!supported) return;
    runRef.current += 1;
    const run = runRef.current;
    window.speechSynthesis.cancel();
    setSpoken(0);
    setStatus("playing");
    setPlays((n) => n + 1);
    speakFrom(0, run);
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus("paused");
  }

  function resume() {
    window.speechSynthesis.resume();
    setStatus("playing");
  }

  if (!supported) {
    return (
      <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-sm font-medium text-amber-900">{label}</p>
        <p className="mt-1 text-sm text-amber-900/90">
          This browser can&apos;t speak the recording, so the transcript is shown below instead
          — you can still answer, but it will be a reading exercise rather than a listening
          one. Chrome, Edge and Safari can play it.
        </p>
      </div>
    );
  }

  const progress = chunks.length === 0 ? 0 : Math.round((spoken / chunks.length) * 100);

  return (
    <div className="mb-6 rounded-xl border border-line bg-surface-muted p-4">
      <div className="flex flex-wrap items-center gap-3">
        {status === "playing" ? (
          <button
            type="button"
            onClick={pause}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Pause
          </button>
        ) : (
          <button
            type="button"
            onClick={status === "paused" ? resume : play}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {status === "paused" ? "Resume" : status === "done" ? "Play again" : "Play recording"}
          </button>
        )}

        {status !== "idle" && (
          <button
            type="button"
            onClick={stop}
            className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink-body hover:bg-surface"
          >
            Stop
          </button>
        )}

        <span className="text-sm text-ink-body">{label}</span>
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Recording progress"
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-ink-muted">
        Read aloud by your browser, not a studio recording — one voice, one accent, and an even
        pace, where the real test uses several speakers.{" "}
        {plays > 1
          ? `You've played it ${plays} times; the real exam plays it once.`
          : "The real exam plays the recording once."}
      </p>
    </div>
  );
}
