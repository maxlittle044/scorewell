import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/layout/page-header";
import { ActivityLogView } from "./activity-log-view";

export const metadata: Metadata = {
  title: "Activity logs — ScoreWell",
  description: "Review changes made from the ScoreWell admin workspace.",
};

export default async function AdminActivityLogsPage() {
  const logs = await prisma.adminActivityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { admin: { select: { name: true, email: true } } },
  });

  return (
    <main className="flex flex-1 flex-col bg-surface-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <PageHeader
          title="Activity logs"
          description="A record of changes made from the admin workspace."
        />

        <ActivityLogView
          now={Date.now()}
          logs={logs.map((log) => ({
            id: log.id,
            adminName: log.admin?.name ?? null,
            adminEmail: log.admin?.email ?? log.adminEmail,
            action: log.action,
            entityType: log.entityType,
            entityId: log.entityId,
            summary: log.summary,
            metadata: log.metadata,
            createdAt: log.createdAt.toISOString(),
          }))}
        />
      </div>
    </main>
  );
}