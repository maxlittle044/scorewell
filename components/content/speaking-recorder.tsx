"use client";

import { useEffect, useRef, useState } from "react";

// Minimal shape of the Web Speech API we use — it isn't in TS's DOM lib.
type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Works both controlled (pass `transcript` + `onTranscriptChange`, e.g. the
 * speaking checker, which submits the text) and uncontrolled (practice pages
 * that just want a recorder with a scratch transcript).
 */
export function SpeakingRecorder({
  transcript: controlledTranscript,
  onTranscriptChange,
}: {
  transcript?: string;
  onTranscriptChange?: (value: string) => void;
} = {}) {
  const [internalTranscript, setInternalTranscript] = useState("");
  const isControlled = controlledTranscript !== undefined && onTranscriptChange !== undefined;
  const transcript = isControlled ? controlledTranscript : internalTranscript;
  const setTranscript = isControlled ? onTranscriptChange : setInternalTranscript;

  const [status, setStatus] = useState<"idle" | "recording" | "recorded" | "error">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [sttSupported, setSttSupported] = useState(true);
  const [interim, setInterim] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const baseTranscriptRef = useRef("");

  useEffect(() => {
    // Browser-only API, so this can't be a lazy useState initializer without
    // risking a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSttSupported(getSpeechRecognition() !== null);
  }, []);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setStatus("recording");

      // Transcribe in the browser so no audio ever leaves the device.
      const Recognition = getSpeechRecognition();
      if (Recognition) {
        const recognition = new Recognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";
        baseTranscriptRef.current = transcript ? `${transcript} ` : "";

        recognition.onresult = (event) => {
          let finalText = "";
          let interimText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const text = result[0].transcript;
            if (result.isFinal) finalText += text;
            else interimText += text;
          }
          if (finalText) {
            baseTranscriptRef.current += finalText;
            setTranscript(baseTranscriptRef.current.trim());
          }
          setInterim(interimText);
        };
        recognition.onerror = () => setSttSupported(false);
        recognition.onend = () => setInterim("");

        recognition.start();
        recognitionRef.current = recognition;
      }
    } catch {
      setStatus("error");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setInterim("");
    setStatus("recorded");
  }

  return (
    <div className="rounded-xl border border-line bg-surface-muted p-5">
      {status === "error" && (
        <p className="mb-3 text-sm text-rose-600">
          Couldn&apos;t access your microphone. Check your browser permissions, or type your answer
          below instead.
        </p>
      )}

      <div className="flex items-center gap-3">
        {status === "recording" ? (
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-2 rounded-full bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
          >
            <span className="h-2.5 w-2.5 rounded-sm bg-surface" />
            Stop recording
          </button>
        ) : (
          <button
            type="button"
            onClick={startRecording}
            className="flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-surface" />
            {status === "recorded" ? "Record again" : "Start recording"}
          </button>
        )}

        {status === "recording" && (
          <span className="text-sm font-medium text-rose-600">Recording…</span>
        )}
      </div>

      {audioUrl && <audio controls src={audioUrl} className="mt-4 w-full" />}

      <div className="mt-4">
        <label htmlFor="transcript" className="mb-1.5 block text-sm font-medium text-ink-body">
          Your answer
          <span className="ml-1 font-normal text-ink-muted">
            {sttSupported
              ? "(transcribed as you speak — edit if needed)"
              : "(speech-to-text isn't supported in this browser — type your answer)"}
          </span>
        </label>
        <textarea
          id="transcript"
          value={interim ? `${transcript}${transcript ? " " : ""}${interim}` : transcript}
          onChange={(e) => setTranscript(e.target.value)}
          rows={6}
          placeholder="Speak, or type your answer here..."
          className="w-full rounded-xl border border-line-strong bg-surface p-4 text-sm leading-relaxed text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
        <p className="mt-2 text-xs text-ink-muted">
          Your recording stays on your device — only the text above is sent for feedback.
        </p>
      </div>
    </div>
  );
}
