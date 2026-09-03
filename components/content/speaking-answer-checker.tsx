"use client";

import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { useElapsedSeconds } from "@/lib/use-elapsed-seconds";
import { SpeakingRecorder } from "@/components/content/speaking-recorder";
import {
  CriterionFeedback,
  TRANSCRIPT_PRONUNCIATION_NOTE,
} from "@/components/tools/criterion-feedback";
import { checkSpeakingAction } from "@/lib/ai/speaking-checker-actions";

/**
 * Shared error box for the AI actions: a quota message reads as guidance with a way forward,
 * anything else as a failure. Exported because the speaking tool page's generate mode needs
 * the same treatment, and two copies would drift.
 */
export function AiErrorBox({ error, limitReached }: { error: string; limitReached?: boolean }) {
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

/**
 * Record an answer and have it scored (spec section 5).
 *
 * Used by the standalone speaking tool and by each speaking test's own page. The test page is
 * why `title` and `contentItemId` exist: passing them attributes the scored attempt to that
 * test, so it reaches the learner's history and the Exam Library tile instead of being filed
 * as a loose "Speaking Part 2". Both are absent on the tool page, where the attempt genuinely
 * belongs to no test.
 *
 * Pronunciation is never scored here — the model sees a transcript, not audio, and the note
 * below says so rather than letting a reader assume otherwise.
 */
export function SpeakingAnswerChecker({
  part,
  prompt,
  title,
  contentItemId,
}: {
  /** "part1" | "part2" | "part3"; the server validates it again before use. */
  part: string;
  prompt: string;
  title?: string;
  contentItemId?: string;
}) {
  const [transcript, setTranscript] = useState("");
  const [state, formAction, checking] = useActionState(checkSpeakingAction, {});

  const elapsedSeconds = useElapsedSeconds();
  const durationRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <SpeakingRecorder transcript={transcript} onTranscriptChange={setTranscript} />

      <form action={formAction}>
        <input type="hidden" name="part" value={part} />
        <input type="hidden" name="prompt" value={prompt} />
        <input type="hidden" name="transcript" value={transcript} />
        {title && <input type="hidden" name="title" value={title} />}
        {contentItemId && <input type="hidden" name="contentItemId" value={contentItemId} />}
        {/* Only timed when the attempt belongs to a test — see WritingEditor for why this is
            written from the click rather than during render. */}
        {contentItemId && <input ref={durationRef} type="hidden" name="durationSeconds" />}

        <button
          type="submit"
          onClick={() => {
            if (durationRef.current) durationRef.current.value = String(elapsedSeconds() ?? "");
          }}
          disabled={transcript.trim() === "" || checking}
          className="mt-4 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
        >
          {checking ? "Checking…" : "Check with AI"}
        </button>
      </form>

      {state.error && <AiErrorBox error={state.error} limitReached={state.limitReached} />}

      {state.result && (
        <div className="mt-4">
          <CriterionFeedback
            result={state.result}
            bandLabel="Estimated band"
            note={TRANSCRIPT_PRONUNCIATION_NOTE}
          />
        </div>
      )}
    </div>
  );
}
