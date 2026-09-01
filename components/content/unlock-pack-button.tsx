"use client";

import { useActionState } from "react";
import { unlockPackAction } from "@/lib/content/practice-pack-actions";
import { PACK_COST_CREDITS } from "@/lib/content/practice-pack-config";
import { Button } from "@/components/ui/button";

/**
 * Unlocks one pack with credits. Rendered only for signed-in learners who do not already
 * have it — an owner gets a plain download link instead, so this never becomes a way to be
 * charged twice.
 */
export function UnlockPackButton({ slug, credits }: { slug: string; credits: number }) {
  const [state, formAction, pending] = useActionState(unlockPackAction, {});

  if (state.success) {
    return (
      <p className="text-sm font-semibold text-emerald-700">
        Unlocked — reload to open the pack.
      </p>
    );
  }

  const affordable = credits >= PACK_COST_CREDITS;

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="slug" value={slug} />
      <Button type="submit" size="sm" disabled={pending || !affordable}>
        {pending ? "Unlocking…" : `Unlock for ${PACK_COST_CREDITS} credits`}
      </Button>

      {!affordable && (
        <p className="text-xs text-ink-muted">
          You have {credits} {credits === 1 ? "credit" : "credits"}.{" "}
          <a href="/pricing" className="font-medium text-link hover:underline">
            Buy more
          </a>{" "}
          — or print each test free from its own page.
        </p>
      )}

      {state.error && <p className="text-xs font-medium text-red-600">{state.error}</p>}
    </form>
  );
}
