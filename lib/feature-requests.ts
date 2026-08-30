import { prisma } from "@/lib/prisma";
import type { FeatureRequestStatus } from "@/generated/prisma/enums";
import type { FeatureRequestView } from "@/lib/feature-request-constants";

/**
 * The public voting board (site-build-prompt.md section 3a).
 *
 * Every count here is a real row. The page this replaced opened with five invented requests
 * carrying invented vote totals, which is the "no invented community activity" rule broken in
 * the most visible way a site can break it — a board that looks busy on day one tells every
 * visitor something untrue about how many people are here.
 *
 * Labels, limits and the row type live in lib/feature-request-constants.ts so the board
 * component can import them without pulling Prisma into the browser bundle.
 */

/**
 * Most-wanted first.
 *
 * Shipped and declined requests sort to the bottom whatever their vote count: they are a
 * record of what was decided, not a queue, and leaving a shipped item at the top of a
 * "what should we build next" list wastes the most valuable row on the page.
 */
export async function listFeatureRequests(userId: string | null): Promise<FeatureRequestView[]> {
  const requests = await prisma.featureRequest.findMany({
    include: {
      _count: { select: { votes: true } },
      // Only this reader's vote is fetched, not the whole voter list — the board shows a
      // count, and who voted for what is nobody else's business.
      votes: userId ? { where: { userId }, select: { id: true } } : false,
    },
  });

  const decided = (status: FeatureRequestStatus) => status === "SHIPPED" || status === "DECLINED";

  return requests
    .map((request) => ({
      id: request.id,
      title: request.title,
      detail: request.detail,
      status: request.status,
      votes: request._count.votes,
      votedByMe: Array.isArray(request.votes) ? request.votes.length > 0 : false,
      createdAt: request.createdAt,
    }))
    .sort(
      (a, b) =>
        Number(decided(a.status)) - Number(decided(b.status)) ||
        b.votes - a.votes ||
        b.createdAt.getTime() - a.createdAt.getTime(),
    );
}
