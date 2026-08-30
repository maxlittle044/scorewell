"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { MAX_DETAIL_LENGTH, MAX_TITLE_LENGTH, STATUSES } from "@/lib/feature-request-constants";
import type { FeatureRequestStatus } from "@/generated/prisma/enums";

export type SubmitState = { error?: string; submitted?: boolean };

/** Anything shorter than this is not a request anybody can act on. */
const MIN_TITLE_LENGTH = 8;

export async function submitFeatureRequestAction(
  _prevState: SubmitState,
  formData: FormData,
): Promise<SubmitState> {
  const session = await auth();
  if (!session?.user) return { error: "Please log in to suggest a feature." };

  const title = String(formData.get("title") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();

  if (title.length < MIN_TITLE_LENGTH) {
    return { error: "Give it a title of at least a few words so people know what they're voting for." };
  }
  if (title.length > MAX_TITLE_LENGTH || detail.length > MAX_DETAIL_LENGTH) {
    return { error: "That's longer than the board allows — trim it down." };
  }

  await prisma.featureRequest.create({
    data: {
      title,
      detail: detail || null,
      createdById: session.user.id,
      // Suggesting something is a vote for it. The alternative is a board where every new
      // request sits at zero while its author looks for the button they just used.
      votes: { create: { userId: session.user.id } },
    },
  });

  revalidatePath("/feature-requests");
  return { submitted: true };
}

export type VoteResult = { ok: boolean; voted?: boolean; votes?: number; error?: string };

/**
 * Adds or removes this reader's vote.
 *
 * One row per account per request, enforced by a unique index rather than by this code: two
 * clicks racing each other would otherwise both find no vote and both create one.
 */
export async function toggleFeatureVoteAction(requestId: string): Promise<VoteResult> {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Please log in to vote." };

  const request = await prisma.featureRequest.findUnique({
    where: { id: requestId },
    select: { id: true },
  });
  if (!request) return { ok: false, error: "That request no longer exists." };

  const where = { requestId_userId: { requestId, userId: session.user.id } };
  const existing = await prisma.featureVote.findUnique({ where });

  if (existing) {
    await prisma.featureVote.delete({ where });
  } else {
    await prisma.featureVote.create({ data: { requestId, userId: session.user.id } });
  }

  const votes = await prisma.featureVote.count({ where: { requestId } });
  revalidatePath("/feature-requests");
  return { ok: true, voted: !existing, votes };
}

/**
 * Moves a request along the roadmap. Admins only.
 *
 * "Planned" is a promise about what this site will build. A learner voting on a request
 * cannot make that promise on our behalf, which is why status is not derived from votes.
 */
export async function setFeatureRequestStatusAction(
  requestId: string,
  status: FeatureRequestStatus,
): Promise<{ ok: boolean; error?: string }> {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) return { ok: false, error: "Not allowed." };
  if (!STATUSES.includes(status)) return { ok: false, error: "Unknown status." };

  await prisma.featureRequest.update({ where: { id: requestId }, data: { status } });
  revalidatePath("/feature-requests");
  return { ok: true };
}
