import type { MetadataRoute } from "next";

/**
 * Web app manifest, making the site installable to a home screen
 * (site-build-prompt.md section 4b "PWA install", section 8).
 *
 * Pages already visited on the device open offline, served by public/sw.js. Submitting
 * anything still needs a connection, and the offline fallback page says so rather than
 * letting someone start a sitting that cannot be saved.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ScoreWell — IELTS practice and AI feedback",
    short_name: "ScoreWell",
    description:
      "Practice tests, full four-skill simulations, and AI feedback for IELTS learners.",
    // Opens on the library rather than the marketing homepage: someone who installed the
    // app already knows what it is and came to practise.
    start_url: "/exam-library",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    // The navy of the nav band, so the status bar matches the top of the app.
    theme_color: "#294563",
    categories: ["education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // Padded so Android's shape mask crops the background, never the mark.
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Exam Library", url: "/exam-library" },
      { name: "Learning Path", url: "/learning-path" },
      { name: "Full simulation", url: "/simulation" },
    ],
  };
}
