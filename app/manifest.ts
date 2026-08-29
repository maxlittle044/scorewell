import type { MetadataRoute } from "next";

/**
 * Web app manifest, making the site installable to a home screen
 * (site-build-prompt.md section 4b "PWA install", section 8).
 *
 * Installability only — this does not claim offline support. Serving pages offline needs
 * a service worker caching layer, which isn't built, and a manifest alone would let a
 * learner install the app and then find it blank on the train.
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
