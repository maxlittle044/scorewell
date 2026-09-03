"use client";

import { useState } from "react";
import { Quiz, type QuizQuestion } from "./quiz";
import { ListeningPlayer } from "./listening-player";
import { useSpeechSupported } from "./speak-button";

/**
 * A listening paper: the recording, the questions, and the transcript — in that order, and
 * with the transcript withheld until the answers are submitted.
 *
 * That withholding is the point. The transcript used to sit in an open `<details>` beside the
 * questions, which made every listening test answerable by reading, so the score said nothing
 * about listening. Afterwards the transcript is the most useful thing on the page, which is
 * why it appears in full rather than staying hidden.
 *
 * The one exception is a browser that cannot speak: there the transcript is the only way to
 * attempt the paper at all, so it stays visible and the player says why.
 */
export function ListeningTest({
  questions,
  title,
  contentItemId,
  transcript,
  audioLabel,
}: {
  questions: QuizQuestion[];
  title: string;
  contentItemId: string;
  transcript: string;
  audioLabel: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const speechSupported = useSpeechSupported();
  const showTranscript = submitted || !speechSupported;

  return (
    <div>
      <ListeningPlayer transcript={transcript} label={audioLabel} />

      {!showTranscript && (
        <p className="mb-6 text-sm text-ink-muted">
          The transcript appears here once you submit, so you can check what you missed.
        </p>
      )}

      {showTranscript && (
        <details
          open={submitted}
          className="mb-8 rounded-xl border border-line bg-surface-muted p-5"
        >
          <summary className="cursor-pointer text-sm font-medium text-ink-body">
            Transcript
          </summary>
          <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-body">
            {transcript}
          </p>
        </details>
      )}

      <Quiz
        questions={questions}
        skill="LISTENING"
        title={title}
        contentItemId={contentItemId}
        onSubmitted={() => setSubmitted(true)}
      />
    </div>
  );
}
