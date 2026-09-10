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

/**
 * Appends one line to the admin audit trail.
 *
 * **Never throws.** Every caller writes the log *after* doing the thing it describes, so a
 * failure here would report an error for work that already succeeded — an admin would be told
 * the account was not deleted when it was, and would try again. A missing log line is a much
 * smaller problem than a lie about what happened, so the failure goes to the server log and
 * the action stands.
 */
export async function logAdminActivity(input: ActivityInput): Promise<void> {
  try {
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
  } catch (error) {
    console.error(
      `Admin activity log failed to record "${input.action}" on ${input.entityType} ${input.entityId ?? ""} — the action itself succeeded:`,
      error,
    );
  }
}
