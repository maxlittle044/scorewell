"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Speech synthesis is a browser-only API, so support has to be detected after
 * mount rather than in a lazy useState initializer (that would desync SSR).
 */
export function useSpeechSupported() {
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
  }, []);

  return supported;
}

/** Prefers a British English voice, since IELTS models RP most closely. */
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang.replace("_", "-").startsWith("en-GB")) ??
    voices.find((v) => v.lang.replace("_", "-").startsWith("en")) ??
    null
  );
}

type SpeakButtonProps = {
  text: string;
  /** Visible label; defaults to the text itself. */
  children?: React.ReactNode;
  /** 1 = normal. Use ~0.6 for a deliberate, drill-speed reading. */
  rate?: number;
  variant?: "primary" | "chip" | "quiet";
  className?: string;
};

const VARIANTS = {
  primary:
    "inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong",
  chip: "inline-flex items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1.5 text-sm text-ink-body hover:bg-brand-50 hover:text-link disabled:cursor-not-allowed disabled:opacity-50",
  quiet:
    "inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-1.5 text-sm font-medium text-ink-body hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50",
} as const;

function SpeakerIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
      className={active ? "animate-pulse" : undefined}
    >
      <path d="M8 2.5 4.8 5.2H2.5v5.6h2.3L8 13.5v-11z" />
      <path
        d="M10.6 5.4a3.4 3.4 0 0 1 0 5.2M12.6 3.4a6 6 0 0 1 0 9.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SpeakButton({
  text,
  children,
  rate = 1,
  variant = "chip",
  className,
}: SpeakButtonProps) {
  const supported = useSpeechSupported();
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cancel any in-flight speech if this button unmounts mid-utterance,
  // otherwise the audio keeps playing after navigating away.
  useEffect(() => {
    return () => {
      if (utteranceRef.current && typeof window !== "undefined") {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function speak() {
    if (!supported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = rate;
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={speak}
      disabled={!supported}
      title={supported ? `Hear "${text}"` : "Your browser doesn't support speech synthesis"}
      className={`${VARIANTS[variant]} ${className ?? ""}`}
    >
      <SpeakerIcon active={speaking} />
      {children ?? text}
    </button>
  );
}

/** Shown once per page when the browser can't speak, so buttons aren't a mystery. */
export function SpeechUnsupportedNote() {
  const supported = useSpeechSupported();
  if (supported) return null;

  return (
    <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      Your browser doesn&apos;t support speech synthesis, so the listen buttons are disabled. Try
      Chrome, Edge or Safari to hear the examples.
    </p>
  );
}
