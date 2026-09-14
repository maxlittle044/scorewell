import type { Metadata } from "next";
import { requireAdminPage } from "@/lib/admin";
import { normalisePrivateKey } from "@/lib/firebase/admin";
import { PageHeader } from "@/components/layout/page-header";

export const metadata: Metadata = {
  title: "Configuration — ScoreWell",
};

/**
 * Which environment variables this deployment actually has.
 *
 * Vercel has no read API for environment variables, so the only honest way to answer "is
 * anything missing in production?" is to ask the running deployment. Several of these fail
 * *silently* when unset — Supabase storage returns null and a payment screenshot simply never
 * uploads; ADMIN_EMAILS only matters on the day you need it — so "the site looks fine" is not
 * evidence that they are set.
 *
 * **Names and presence only. No values, ever, not even truncated.** The one exception is the
 * Firebase private key, which reports whether it still parses as a PEM — that is the failure
 * this project hit twice, and it cannot be told from "present" alone.
 */

// Read at request time, so this reflects the deployment as it is now rather than at build.
export const dynamic = "force-dynamic";

type Importance = "required" | "recommended" | "optional";

type Check = {
  name: string;
  importance: Importance;
  /** What stops working when this is missing. */
  consequence: string;
  /** Extra detail that is safe to show — never a value. */
  detail?: () => string | null;
};

type Group = { heading: string; note?: string; checks: Check[] };

const GROUPS: Group[] = [
  {
    heading: "Database",
    checks: [
      { name: "DATABASE_URL", importance: "required", consequence: "Nothing that reads or writes data works — no content pages, no accounts." },
      { name: "DIRECT_URL", importance: "recommended", consequence: "Schema changes cannot be applied. The running site is unaffected." },
    ],
  },
  {
    heading: "Sessions",
    checks: [
      { name: "AUTH_SECRET", importance: "required", consequence: "No one can sign in; session cookies cannot be signed." },
    ],
  },
  {
    heading: "Firebase — browser",
    note: "Inlined at build time, so adding these needs a redeploy with the build cache cleared.",
    checks: [
      { name: "NEXT_PUBLIC_FIREBASE_API_KEY", importance: "required", consequence: "The sign-in form is replaced by a 'not available' notice." },
      { name: "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", importance: "required", consequence: "Sign-in cannot reach Firebase." },
      { name: "NEXT_PUBLIC_FIREBASE_PROJECT_ID", importance: "required", consequence: "Sign-in cannot reach Firebase." },
      { name: "NEXT_PUBLIC_FIREBASE_APP_ID", importance: "required", consequence: "Sign-in cannot reach Firebase." },
    ],
  },
  {
    heading: "Firebase — server",
    checks: [
      { name: "FIREBASE_PROJECT_ID", importance: "required", consequence: "ID tokens cannot be verified, so every sign-in fails." },
      { name: "FIREBASE_CLIENT_EMAIL", importance: "required", consequence: "ID tokens cannot be verified, so every sign-in fails." },
      {
        name: "FIREBASE_PRIVATE_KEY",
        importance: "required",
        consequence: "ID tokens cannot be verified, so every sign-in fails.",
        detail: () => {
          const raw = process.env.FIREBASE_PRIVATE_KEY;
          if (!raw) return null;
          return normalisePrivateKey(raw)
            ? "parses as a PEM key"
            : "PRESENT BUT UNREADABLE — the \\n escapes did not survive being set";
        },
      },
    ],
  },
  {
    heading: "Admin access",
    checks: [
      {
        name: "ADMIN_EMAILS",
        importance: "recommended",
        consequence:
          "The way back in if the last admin role is ever removed. Everything works without it until that day, and then nothing does.",
      },
    ],
  },
  {
    heading: "Email notifications",
    note: "Required for account lifecycle emails and the admin email preview page. Values are never shown.",
    checks: [
      {
        name: "RESEND_API_KEY",
        importance: "recommended",
        consequence: "ScoreWell cannot deliver welcome, suspension, re-enable, deletion, or preview emails.",
      },
      {
        name: "RESEND_FROM_EMAIL",
        importance: "recommended",
        consequence: "ScoreWell has no verified sender address for outgoing notifications.",
      },
    ],
  },
  {
    heading: "AI tools",
    checks: [
      { name: "GROQ_API_KEY", importance: "recommended", consequence: "Every AI tool degrades to unavailable. The rest of the site is unaffected by design." },
    ],
  },
  {
    heading: "File storage",
    note: "Fails silently: an upload returns null and the screenshot is simply never stored.",
    checks: [
      { name: "SUPABASE_URL", importance: "recommended", consequence: "Payment screenshots are discarded on upload, with no error shown to anyone." },
      { name: "SUPABASE_SERVICE_ROLE_KEY", importance: "recommended", consequence: "Payment screenshots are discarded on upload, with no error shown to anyone." },
    ],
  },
  {
    heading: "Payments",
    note: "Checkout stays closed until at least one destination is set — deliberately, so the site cannot take money with nowhere to send it.",
    checks: [
      { name: "PAYMENT_ACCOUNT_NAME", importance: "optional", consequence: "The name money should be sent to is not shown at checkout." },
      { name: "PAYMENT_ESEWA_ID", importance: "optional", consequence: "eSewa is not offered." },
      { name: "PAYMENT_KHALTI_ID", importance: "optional", consequence: "Khalti is not offered." },
      { name: "PAYMENT_BANK_ACCOUNT", importance: "optional", consequence: "Bank transfer is not offered." },
      { name: "PAYMENT_ESEWA_QR_URL", importance: "optional", consequence: "No QR is shown when eSewa is selected — the ID is still shown. A stand-in is never invented." },
      { name: "PAYMENT_KHALTI_QR_URL", importance: "optional", consequence: "No QR is shown when Khalti is selected — the ID is still shown." },
      { name: "PAYMENT_BANK_QR_URL", importance: "optional", consequence: "No QR is shown for bank transfer. Most banks do not issue one." },
    ],
  },
  {
    heading: "Canonical URL",
    checks: [
      {
        name: "NEXT_PUBLIC_SITE_URL",
        importance: "optional",
        consequence:
          "Only needed once a real domain is bought. Unset, Vercel's own production URL is used, which is correct today.",
      },
    ],
  },
];

function isSet(name: string): boolean {
  return Boolean(process.env[name]?.trim());
}

const TONE: Record<Importance, { label: string; missing: string }> = {
  required: { label: "Required", missing: "bg-red-50 text-red-700" },
  recommended: { label: "Recommended", missing: "bg-amber-50 text-amber-800" },
  optional: { label: "Optional", missing: "bg-surface-sunken text-ink-muted" },
};

export default async function AdminConfigurationPage() {
  // The gate. See requireAdminPage — the layout alone does not stop this page running.
  await requireAdminPage();

  const all = GROUPS.flatMap((g) => g.checks);
  const missingRequired = all.filter((c) => c.importance === "required" && !isSet(c.name));
  const missingRecommended = all.filter((c) => c.importance === "recommended" && !isSet(c.name));

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-8 sm:py-14">
        <PageHeader
          title="Configuration center"
          description="Keep ScoreWell's core services ready. Review connection health and setup status without exposing any secret values."
        />

        <div
          className={`rounded-2xl border p-5 ${
            missingRequired.length
              ? "border-red-200 bg-red-50"
              : missingRecommended.length
                ? "border-amber-200 bg-amber-50"
                : "border-emerald-200 bg-emerald-50"
          }`}
        >
          <p className="text-sm font-semibold text-ink">
            {missingRequired.length
              ? `${missingRequired.length} required variable${missingRequired.length === 1 ? "" : "s"} missing`
              : missingRecommended.length
                ? `Everything required is set. ${missingRecommended.length} recommended variable${missingRecommended.length === 1 ? "" : "s"} missing.`
                : "Everything required and recommended is set."}
          </p>
          {(missingRequired.length > 0 || missingRecommended.length > 0) && (
            <p className="mt-2 text-sm text-ink-body">
              {[...missingRequired, ...missingRecommended].map((c) => c.name).join(", ")}
            </p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-6">
          {GROUPS.map((group) => (
            <section key={group.heading} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="border-b border-line px-5 py-4">
                <h2 className="text-sm font-semibold text-ink">{group.heading}</h2>
                {group.note && <p className="mt-1 text-xs text-ink-muted">{group.note}</p>}
              </div>

              <ul className="divide-y divide-line">
                {group.checks.map((check) => {
                  const set = isSet(check.name);
                  const detail = set && check.detail ? check.detail() : null;
                  const broken = detail?.startsWith("PRESENT BUT");

                  return (
                    <li key={check.name} className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-mono text-sm text-ink">{check.name}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ink-muted">{check.consequence}</p>
                        {detail && (
                          <p className={`mt-1 text-xs ${broken ? "font-semibold text-red-700" : "text-ink-muted"}`}>
                            {detail}
                          </p>
                        )}
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          set
                            ? broken
                              ? "bg-red-50 text-red-700"
                              : "bg-emerald-50 text-emerald-700"
                            : TONE[check.importance].missing
                        }`}
                      >
                        {set ? (broken ? "Unreadable" : "Set") : `Not set · ${TONE[check.importance].label}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
