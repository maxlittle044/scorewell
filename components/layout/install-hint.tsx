"use client";

import { useSyncExternalStore } from "react";

/**
 * A quiet note that the site can be installed to the home screen
 * (site-build-prompt.md section 4b, "PWA install").
 *
 * Deliberately not a custom install button driven by `beforeinstallprompt`: Next's own
 * PWA guide advises against it because the event doesn't exist on Safari or iOS, so the
 * button would sit there doing nothing for a large share of this site's audience.
 * Chromium browsers show their own prompt; iOS needs the manual route, which is the one
 * case worth spelling out.
 *
 * Read through `useSyncExternalStore` rather than an effect that sets state: the value
 * comes from browser APIs that don't exist during SSR, and this is the hook built for
 * exactly that — it also picks up the app being installed while the page is open, since
 * `display-mode` flips at that moment.
 */

type InstallState = "unknown" | "ios" | "other" | "installed";

const STANDALONE_QUERY = "(display-mode: standalone)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const query = window.matchMedia(STANDALONE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot(): InstallState {
  if (typeof window === "undefined") return "unknown";

  const standalone =
    window.matchMedia(STANDALONE_QUERY).matches ||
    // iOS Safari predates display-mode and exposes its own flag instead.
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  if (standalone) return "installed";

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  return isIOS ? "ios" : "other";
}

/** Nothing is known about the browser on the server, so the hint renders only after hydration. */
function getServerSnapshot(): InstallState {
  return "unknown";
}

export function InstallHint() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (state === "unknown" || state === "installed") return null;

  return (
    <p className="text-sm text-zinc-500">
      {state === "ios" ? (
        <>
          Install ScoreWell: tap Share, then{" "}
          <span className="text-zinc-300">Add to Home Screen</span>.
        </>
      ) : (
        <>Install ScoreWell from your browser menu to open it like an app.</>
      )}
    </p>
  );
}
