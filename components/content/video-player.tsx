import type { LessonVideo } from "@/lib/content/video-lessons";

/**
 * Plays the lesson video. MP4s use the browser's native controls; the youtube
 * branch exists so swapping in a real hosted lesson is a data change in the
 * seed rather than a code change here.
 */
export function VideoPlayer({ video, title }: { video: LessonVideo; title: string }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-2xl bg-zinc-950">
        {video.kind === "youtube" ? (
          <iframe
            // cc_load_policy=1 turns captions on where the video has them, which
            // matters more here than usual: these are listening-adjacent lessons.
            // rel=0 keeps the end screen to the same channel.
            src={`https://www.youtube-nocookie.com/embed/${video.src}?cc_load_policy=1&cc_lang_pref=en&rel=0`}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full border-0"
          />
        ) : (
          <video
            controls
            preload="metadata"
            playsInline
            className="aspect-video w-full"
          >
            <source src={video.src} type="video/mp4" />
            {/*
              Plain media playback isn't CORS-restricted, but <track> is: a
              captions file on another origin needs Access-Control-Allow-Origin
              (and crossOrigin on the <video>) or it silently won't load.
              Host caption files with the app to avoid that.
            */}
            {video.captionsUrl && (
              <track kind="captions" src={video.captionsUrl} srcLang="en" label="English" default />
            )}
            Your browser doesn&apos;t support embedded video.
          </video>
        )}
      </div>

      <figcaption className="mt-2 text-xs leading-relaxed text-ink-muted">
        {video.placeholder && (
          <span className="mr-1.5 rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-800">
            Stand-in footage
          </span>
        )}
        {video.placeholder
          ? "This clip is a placeholder while the lesson is being filmed — the written lesson below is the real material."
          : null}{" "}
        {video.credit}
      </figcaption>
    </figure>
  );
}
