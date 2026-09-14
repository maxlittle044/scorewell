"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Mail, Send, TriangleAlert } from "lucide-react";
import { sendAdminEmailPreview } from "./actions";

type EmailTemplate = "welcome" | "suspended" | "enabled" | "deleted";

type Props = { recipient: string };

const templates: Array<{ value: EmailTemplate; label: string; description: string }> = [
  { value: "welcome", label: "Welcome user", description: "Account details, temporary password, and login link" },
  { value: "suspended", label: "Account suspended", description: "Access restriction notification" },
  { value: "enabled", label: "Account re-enabled", description: "Restored access notification with login link" },
  { value: "deleted", label: "Account deleted", description: "Professional account closure notification" },
];

export function EmailPreviewForm({ recipient }: Props) {
  const [template, setTemplate] = useState<EmailTemplate>("welcome");
  const [result, setResult] = useState<{ error?: string; success?: string }>();
  const [pending, startTransition] = useTransition();
  const selected = templates.find((item) => item.value === template) ?? templates[0];

  function sendPreview() {
    setResult(undefined);
    startTransition(async () => setResult(await sendAdminEmailPreview(template)));
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="border-b border-line bg-brand-900 px-6 py-6 text-white sm:px-8">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-pop-300">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <p className="text-lg font-semibold">Send a template preview</p>
            <p className="mt-1 text-sm text-white/65">Test the final email in your inbox before sending account actions.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6 sm:p-8">
        <div className="rounded-xl border border-line bg-surface-muted px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">Recipient</p>
          <p className="mt-1 break-all text-sm font-semibold text-ink">{recipient}</p>
          <p className="mt-1 text-xs text-ink-muted">Only the currently signed-in administrator can receive previews.</p>
        </div>

        <div>
          <label htmlFor="email-template" className="text-sm font-semibold text-ink">Email template</label>
          <select
            id="email-template"
            value={template}
            onChange={(event) => setTemplate(event.target.value as EmailTemplate)}
            className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          >
            {templates.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
          <p className="mt-2 text-sm text-ink-muted">{selected.description}</p>
        </div>

        {result?.success && (
          <div role="status" className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{result.success}</span>
          </div>
        )}
        {result?.error && (
          <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{result.error}</span>
          </div>
        )}

        <button
          type="button"
          onClick={sendPreview}
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {pending ? "Sending preview..." : "Send preview email"}
        </button>
      </div>
    </section>
  );
}
