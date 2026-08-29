"use client";

import { useActionState, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { runTextToolAction } from "@/lib/ai/text-tool-actions";

const LANGUAGES = ["Spanish", "French", "Mandarin Chinese", "Hindi", "Arabic", "Portuguese", "Vietnamese", "Japanese"];

export default function TranslatorPage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [state, formAction, pending] = useActionState(runTextToolAction, {});

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <PageHeader title="Translator" description="Translate text to and from English." />

        <form action={formAction}>
          <input type="hidden" name="kind" value="translator" />
          <input type="hidden" name="targetLanguage" value={language} />

          <label htmlFor="translate-lang" className="mb-1.5 block text-sm font-medium text-ink-body">
            Translate to
          </label>
          <select
            id="translate-lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-4 rounded-lg border border-line-strong px-3 py-2 text-sm text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <label htmlFor="translate-input" className="mb-1.5 block text-sm font-medium text-ink-body">
            Text to translate
          </label>
          <textarea
            id="translate-input"
            name="inputText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Enter text in English or your target language..."
            className="w-full rounded-xl border border-line-strong p-4 text-sm leading-relaxed text-ink focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />

          <button
            type="submit"
            disabled={text.trim() === "" || pending}
            className="mt-3 rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-line-strong"
          >
            {pending ? "Translating…" : `Translate to ${language}`}
          </button>

          {state.error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {state.error}
            </div>
          )}

          {state.result && (
            <div className="mt-4 whitespace-pre-wrap rounded-xl border border-line bg-surface-muted px-4 py-3 text-sm leading-relaxed text-ink">
              {state.result}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
