"use client";

import { useState } from "react";

export function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="mt-5 flex items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 p-2">
      <span className="flex-1 truncate px-2 text-sm text-zinc-700">{link}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
