import { prisma } from "@/lib/prisma";

type ActivityInput = {
  adminId: string;
  adminEmail: string;
  action: string;
  entityType: string;
  entityId?: string;
  summary: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export async function logAdminActivity(input: ActivityInput) {
  await prisma.adminActivityLog.create({
    data: {
      adminId: input.adminId,
      adminEmail: input.adminEmail,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      summary: input.summary,
      metadata: input.metadata,
    },
  });
}