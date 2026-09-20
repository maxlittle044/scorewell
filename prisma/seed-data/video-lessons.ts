export type VideoLessonSeed = {
  slug: string;
  title: string;
  topic: string;
  tags: string[];
  data: {
    summary: string;
    lessonMinutes: number;
    keyPoints: string[];
    /** The written lesson — real teaching material, independent of the clip. */
    transcript: string[];
    video: {
      /** "mp4" plays in a native <video>; "youtube" embeds a player. */
      kind: "mp4" | "youtube";
      /** MP4 URL, or the YouTube video id for kind "youtube". */
      src: string;
      /** Attribution for the footage. */
      credit: string;
      /**
       * True while the clip is stand-in footage rather than a real recorded
       * lesson. The player says so, so nobody mistakes it for the lesson.
       * Set false (and swap `src`) once real videos are produced.
       */
      placeholder: boolean;
      /** Optional WebVTT captions; none exist for the stand-in clips. */
      captionsUrl?: string;
    };
  };
};

/**
 * Originally four lessons that used stand-in footage (Blender films, a flower clip, a jellyfish clip).
 * They were removed because the footage had nothing to do with the lessons. Their written text
 * now lives on as tips (see tips.ts). Real, credited clips are in video-lessons-voa.ts.
 */
export const VIDEO_LESSONS: VideoLessonSeed[] = [];
