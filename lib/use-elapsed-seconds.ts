"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Time spent on the current exercise, for the dashboard's study-time total.
 *
 * The start is recorded in an effect rather than as `useRef(Date.now())`: the latter
 * evaluates during render, which is impure and reads the clock again on every retry or
 * replay of that render. Returns a getter rather than a value so reading the elapsed time
 * doesn't re-render anything.
 *
 * Undefined until the mount effect has run, so a submission that somehow beats it records
 * no duration instead of a wrong one.
 */
export function useElapsedSeconds(): () => number | undefined {
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  return useCallback(() => {
    const startedAt = startedAtRef.current;
    return startedAt === null ? undefined : (Date.now() - startedAt) / 1000;
  }, []);
}
