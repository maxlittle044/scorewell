"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { getCreditBalance, spendCredits } from "@/lib/credits";
import { PACK_COST_CREDITS, packLedgerReason } from "@/lib/content/practice-pack-config";
import { getPack, hasBoughtPack, hasPremiumPlan } from "@/lib/content/practice-packs";

export type PackActionState = { error?: string; success?: boolean };

/**
 * Unlock a downloadable practice pack with credits.
 *
 * The spend and the entitlement are the same ledger row, so there is no window in which a
 * learner has been charged but does not own the pack. Everything before the spend is a
 * guard against charging for something already owned or not for sale.
 */
export async function unlockPackAction(
  _prevState: PackActionState,
  formData: FormData,
): Promise<PackActionState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to unlock this pack." };
  }

  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) return { error: "That pack does not exist." };

  // Confirms the pack is real and still has resolvable tests before taking anything.
  const pack = await getPack(slug);
  if (!pack) return { error: "That pack does not exist." };

  if (await hasPremiumPlan(session.user.id)) {
    // Premium already includes every pack; charging would be taking credits for
    // something the plan grants.
    return { success: true };
  }

  if (await hasBoughtPack(session.user.id, slug)) {
    return { success: true };
  }

  const balance = await getCreditBalance(session.user.id);
  if (balance < PACK_COST_CREDITS) {
    return {
      error: `This pack costs ${PACK_COST_CREDITS} credits — you have ${balance}. You can buy credits from the pricing page, or print each test free from its own page.`,
    };
  }

  const charged = await spendCredits(
    session.user.id,
    PACK_COST_CREDITS,
    packLedgerReason(slug),
  );
  if (!charged) {
    return { error: "Could not take the credits for this pack. Please try again." };
  }

  revalidatePath("/practice-packs");
  revalidatePath(`/practice-packs/${slug}`);
  return { success: true };
}
