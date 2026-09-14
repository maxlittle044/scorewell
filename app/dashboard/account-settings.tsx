"use client";

import { useState, useTransition } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { describeAuthError, getFirebaseAuth } from "@/lib/firebase/client";
import { updateAccountNameAction } from "./account-settings-actions";

export function AccountSettings({ name, email }: { name: string; email: string }) {
  const [currentName, setCurrentName] = useState(name);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [sendingReset, setSendingReset] = useState(false);
  const [editingName, setEditingName] = useState(false);

  function saveName(formData: FormData) {
    setNotice(null);
    setError(null);
    const nextName = String(formData.get("name") ?? "").trim();

    startTransition(async () => {
      const result = await updateAccountNameAction(nextName);
      if (result.error) {
        setError(result.error);
        return;
      }
      setCurrentName(nextName);
      setNotice(result.success ?? "Your name has been updated.");
    });
  }

  async function sendResetEmail() {
    setSendingReset(true);
    setNotice(null);
    setError(null);
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
      setNotice("If your account uses a password, a reset link is on its way.");
    } catch (resetError) {
      setError(describeAuthError(resetError));
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="border-b border-line bg-linear-to-r from-brand-700 to-brand-600 px-6 py-5 text-white sm:px-7">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <UserRound className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Personal account</p>
            <h2 className="mt-1 text-xl font-bold">Account settings</h2>
            <p className="mt-1 text-sm text-white/75">Manage how your account appears and stays secure.</p>
          </div>
        </div>
      </div>

      {(notice || error) && (
        <p className={`mx-6 mt-5 rounded-lg border px-3 py-2.5 text-sm sm:mx-7 ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
          {error ?? notice}
        </p>
      )}

      <div className="grid gap-0 md:grid-cols-2">
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <UserRound className="h-4 w-4 text-pop-600" aria-hidden="true" />
            Profile details
          </div>
          <p className="mt-1 text-sm text-ink-muted">This is the name other parts of ScoreWell use.</p>

          {editingName ? (
            <form action={saveName} className="mt-5 flex flex-col gap-3">
              <label htmlFor="account-name" className="text-sm font-medium text-ink-body">
                Full name
              </label>
              <input
                id="account-name"
                name="name"
                value={currentName}
                onChange={(event) => setCurrentName(event.target.value)}
                maxLength={100}
                required
                className="w-full rounded-lg border border-line bg-surface-muted px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-400 focus:bg-surface focus:ring-4 focus:ring-brand-100"
              />
              <div className="flex flex-wrap gap-2">
                <Button type="submit" size="sm" disabled={pending}>
                  {pending ? "Saving..." : "Save name"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingName(false)}
                  disabled={pending}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-5 flex items-center justify-between gap-4 rounded-xl border border-line bg-surface-muted px-4 py-3">
              <p className="truncate text-sm font-medium text-ink">{currentName || "No name set"}</p>
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingName(true)}>
                Change name
              </Button>
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 border-t border-line pt-4 text-xs text-ink-muted">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="truncate">{email}</span>
          </div>
        </div>

        <div className="border-t border-line bg-surface-muted p-6 md:border-l md:border-t-0 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ShieldCheck className="h-4 w-4 text-pop-600" aria-hidden="true" />
            Sign-in security
          </div>
          <p className="mt-1 text-sm text-ink-muted">Reset your password securely through your email.</p>

          <div className="mt-5 rounded-xl border border-line bg-surface p-4">
            <div className="flex gap-3">
              <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Change your password</p>
                <p className="mt-1 text-sm leading-6 text-ink-muted">
                  We&apos;ll send a secure reset link to your account email.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => void sendResetEmail()}
                  disabled={sendingReset}
                >
                  {sendingReset ? "Sending..." : "Send reset link"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}