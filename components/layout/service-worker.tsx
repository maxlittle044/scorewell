"use client";

import { useEffect } from "react";

/**
 * Registers the offline service worker (site-build-prompt.md section 8).
 *
 * Development is excluded on purpose: a service worker caching a dev server's output is a
 * reliable way to spend an afternoon debugging a stale page that no longer exists in the
 * source.
 */
export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    // After load, so registering never competes with the first paint.
    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
        // An unavailable service worker costs offline support and nothing else, so a
        // failure here must stay silent rather than surface as an error to the learner.
      });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
