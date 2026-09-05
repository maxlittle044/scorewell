"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clearDraftAction, loadDraftAction, saveDraftAction } from "@/lib/draft-actions";

/** How long the learner must pause before an autosave fires. */
const SAVE_DEBOUNCE_MS = 1200;

/**
 * Keeps an in-progress attempt on the server so it survives a closed tab.
 *
 * Shared by the exam runner and the simpler quiz so the two cannot drift into different
 * autosave rules. Both hold answers as an object keyed by question id; this only stores and
 * returns that object, and never inspects it.
 *
 * **Restoring is one-shot.** The draft is fetched once on mount and handed back through
 * `restored`; after that this hook only writes. Re-applying a fetched draft later would
 * fight the learner for control of their own answers.
 *
 * **Saving is debounced and last-write-wins.** Every keystroke would otherwise be a round
 * trip, and a burst of them could land out of order; waiting for a pause both cuts the
 * traffic and means the last state is the one stored.
 */
export function useAttemptDraft({
  contentItemId,
  answers,
  enabled = true,
}: {
  /** Absent on pages with no test behind them, where there is nothing to key a draft to. */
  contentItemId?: string;
  answers: Record<string, unknown>;
  /** Set false once submitted, so the finished attempt is not saved back as a draft. */
  enabled?: boolean;
}) {
  const [restored, setRestored] = useState<Record<string, unknown> | null>(null);
  const [fetched, setFetched] = useState(false);
  const loadedRef = useRef(false);

  // Derived rather than set: with no test to key a draft to there is nothing to wait for, and
  // computing that here avoids a state update in the effect body below.
  const checked = !contentItemId || fetched;

  useEffect(() => {
    if (!contentItemId || loadedRef.current) return;
    loadedRef.current = true;

    let cancelled = false;
    loadDraftAction(contentItemId).then((result) => {
      if (cancelled) return;
      if (result.answers && Object.keys(result.answers).length > 0) setRestored(result.answers);
      setFetched(true);
    });
    return () => {
      cancelled = true;
    };
  }, [contentItemId]);

  // Skips the first run so mounting never writes the empty state back over a stored draft
  // before the fetch above has had a chance to return it.
  const dirtyRef = useRef(false);
  useEffect(() => {
    if (!contentItemId || !enabled || !checked) return;
    if (!dirtyRef.current) {
      dirtyRef.current = true;
      return;
    }

    const id = setTimeout(() => {
      void saveDraftAction(contentItemId, answers);
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [contentItemId, answers, enabled, checked]);

  // Stable, so callers can depend on it from a useCallback without recreating themselves —
  // the exam runner's submit handler is memoised and must not change on every render.
  const clear = useCallback(() => {
    if (contentItemId) void clearDraftAction(contentItemId);
  }, [contentItemId]);

  return {
    /** The stored answers, once; null when there were none. */
    restored,
    /** True after the lookup has settled, so a caller can wait before overwriting. */
    checked,
    /** Call on submit — the attempt is now a Progress row and the draft is spent. */
    clear,
  };
}
