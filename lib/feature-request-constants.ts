import type { FeatureRequestStatus } from "@/generated/prisma/enums";

/**
 * The parts of the voting board a browser needs: labels, limits, and the row shape.
 *
 * Split out of lib/feature-requests.ts because that module imports Prisma, and the board is a
 * client component — importing it there drags the database client into the browser bundle and
 * the route fails to build. lib/learning-path-constants.ts exists for the same reason.
 */

export const STATUS_LABELS: Record<FeatureRequestStatus, string> = {
  OPEN: "Open",
  PLANNED: "Planned",
  IN_PROGRESS: "In progress",
  SHIPPED: "Shipped",
  DECLINED: "Not planned",
};

/** Order in the admin control. */
export const STATUSES: FeatureRequestStatus[] = [
  "OPEN",
  "PLANNED",
  "IN_PROGRESS",
  "SHIPPED",
  "DECLINED",
];

export const MAX_TITLE_LENGTH = 120;
export const MAX_DETAIL_LENGTH = 600;

export type FeatureRequestView = {
  id: string;
  title: string;
  detail: string | null;
  status: FeatureRequestStatus;
  votes: number;
  /** Whether the signed-in reader has already voted. False for signed-out readers. */
  votedByMe: boolean;
  createdAt: Date;
};
