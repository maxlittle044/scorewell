import { prisma } from "@/lib/prisma";

const TASK_TYPE_LABELS: Record<string, string> = {
  task2: "Task 2",
  "task1-academic": "Task 1 (Academic)",
  "task1-general": "Task 1 (General)",
};

export function taskTypeLabel(taskType: string | null): string | null {
  if (!taskType) return null;
  return TASK_TYPE_LABELS[taskType] ?? taskType;
}

/** Only ever show a first name / initial publicly — never the email. */
export function displayName(name: string | null): string {
  if (!name) return "A learner";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p.replace(".", "")[0])
    .join("")
    .toUpperCase();
}

export async function listPublishedSubmissions(taskType?: string) {
  const items = await prisma.submission.findMany({
    where: { published: true, ...(taskType ? { taskType } : {}) },
    orderBy: { createdAt: "desc" },
    take: 30,
    include: {
      user: { select: { name: true } },
      contentItem: { select: { title: true } },
      _count: { select: { replies: true } },
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title ?? item.contentItem?.title ?? "Practice answer",
    taskType: taskTypeLabel(item.taskType),
    author: displayName(item.user.name),
    replyCount: item._count.replies,
  }));
}

export async function getSubmission(id: string) {
  const item = await prisma.submission.findFirst({
    where: { id, published: true },
    include: {
      user: { select: { name: true } },
      contentItem: { select: { title: true } },
      replies: {
        orderBy: { createdAt: "asc" },
        include: { user: { select: { name: true } } },
      },
    },
  });
  if (!item) return null;

  return {
    id: item.id,
    title: item.title ?? item.contentItem?.title ?? "Practice answer",
    taskType: taskTypeLabel(item.taskType),
    answerText: item.answerText,
    author: displayName(item.user.name),
    createdAt: item.createdAt,
    replies: item.replies.map((reply) => ({
      id: reply.id,
      author: displayName(reply.user.name),
      text: reply.text,
      createdAt: reply.createdAt,
    })),
  };
}
