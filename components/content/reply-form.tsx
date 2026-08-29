"use client";

import { useActionState, useRef } from "react";
import { postReplyAction } from "@/lib/submission-actions";

export function ReplyForm({ submissionId }: { submissionId: string }) {
  const [state, formAction, pending] = useActionState(postReplyAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="submissionId" value={submissionId} />
      <textarea
        name="text"
        rows={3}
        placeholder="Leave feedback on this answer..."
        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {pending ? "Posting…" : "Post feedback"}
      </button>
    </form>
  );
}
