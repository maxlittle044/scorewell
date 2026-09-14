import type { Metadata } from "next";
import { MailCheck, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { requireAdminPage } from "@/lib/admin";
import { EmailPreviewForm } from "./email-preview-form";

export const metadata: Metadata = {
  title: "Email notifications — ScoreWell",
  description: "Send test previews of ScoreWell account notification emails.",
};

export default async function AdminEmailNotificationsPage() {
  const session = await requireAdminPage();
  const recipient = session.user.email;

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-14">
        <PageHeader
          title="Email notifications"
          description="Send a preview of any account notification to the administrator currently signed in."
        />

        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <MailCheck className="h-5 w-5 text-pop-600" />
            <p className="mt-4 text-sm font-semibold text-ink">Available templates</p>
            <p className="mt-1 text-2xl font-bold text-ink">4</p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            <p className="mt-4 text-sm font-semibold text-ink">Delivery access</p>
            <p className="mt-1 text-sm font-medium text-ink-body">Signed-in admins only</p>
          </div>
        </div>

        {recipient ? (
          <EmailPreviewForm recipient={recipient} />
        ) : (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Your admin account does not have an email address, so previews cannot be sent.
          </p>
        )}
      </div>
    </main>
  );
}
