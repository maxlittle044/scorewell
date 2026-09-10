import type { Metadata } from "next";
import { CalendarDays, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getFirebaseAdminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";
import { PageHeader } from "@/components/layout/page-header";
import { UsersTable } from "../users/users-table";
import { requireAdminPage } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admins — ScoreWell",
  description: "Manage ScoreWell administrator accounts and access roles.",
};

export default async function AdminsPage() {
  // The gate. See requireAdminPage — the layout alone does not stop this page running.
  await requireAdminPage();

  const users = await prisma.user.findMany({
    where: { role: "ADMIN" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      firebaseUid: true,
      role: true,
      createdAt: true,
    },
  });

  const disabledByFirebaseUid = new Map<string, boolean>();
  if (isFirebaseConfigured()) {
    const firebaseAuth = getFirebaseAdminAuth();
    await Promise.all(
      users.flatMap((user) =>
        user.firebaseUid
          ? [
              firebaseAuth
                .getUser(user.firebaseUid)
                .then((firebaseUser) => disabledByFirebaseUid.set(user.firebaseUid!, firebaseUser.disabled))
                .catch(() => undefined),
            ]
          : [],
      ),
    );
  }

  return (
    <main className="flex flex-1 flex-col bg-surface">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div data-reveal>
          <PageHeader
            title="Admins"
            description={`${users.length} administrator ${users.length === 1 ? "account" : "accounts"}.`}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div data-reveal className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pop-100 text-pop-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-ink-muted">Administrator accounts</p>
                <p className="mt-1 text-2xl font-semibold text-ink-body">{users.length}</p>
              </div>
            </div>
          </div>

          <div data-reveal style={{ transitionDelay: "100ms" }} className="rounded-2xl border border-ink-muted/20 bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-body/5">
                <CalendarDays className="h-5 w-5 text-ink-body" />
              </div>
              <div>
                <p className="text-sm text-ink-muted">Latest admin added</p>
                <p className="mt-1 text-lg font-semibold text-ink-body">
                  {users[0]?.createdAt.toLocaleDateString() ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <UsersTable
          defaultRole="ADMIN"
          users={users.map((user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
            disabled: user.firebaseUid ? disabledByFirebaseUid.get(user.firebaseUid) ?? false : false,
          }))}
        />
      </div>
    </main>
  );
}
