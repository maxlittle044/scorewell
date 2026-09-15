"use client";

import { ExamRunner } from "@/components/exam/exam-runner";
import type { QuestionSet } from "@/lib/exam/schema";
import { ListeningPlayer } from "./listening-player";
import { useSpeechSupported } from "./speak-button";

/**
 * A listening paper: the recording, then the questions, with the transcript withheld until
 * submission — reading along would defeat the point of a listening test.
 *
 * The one exception is a browser that cannot speak: there the transcript is the only way to
 * attempt the paper at all, so it stays visible from the start and `ListeningPlayer` says why.
 */
export function ListeningExam({
  questionSet,
  title,
  contentItemId,
  transcript,
  audioLabel,
  durationMinutes,
}: {
  questionSet: QuestionSet;
  title: string;
  contentItemId: string;
  transcript: string;
  audioLabel: string;
  durationMinutes?: number;
}) {
  const speechSupported = useSpeechSupported();

  return (
    <div>
      <ListeningPlayer transcript={transcript} label={audioLabel} />

      <ExamRunner
        questionSet={questionSet}
        title={title}
        contentItemId={contentItemId}
        passage={transcript}
        passageHiddenUntilSubmit={speechSupported}
        passageLabel="Transcript"
        skill="LISTENING"
        durationMinutes={durationMinutes}
      />
    </div>
  );
}
