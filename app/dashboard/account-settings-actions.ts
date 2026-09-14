"use server";

import { auth } from "@/auth";
import { getFirebaseAdminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";
import { prisma } from "@/lib/prisma";

type AccountActionResult = { error?: string; success?: string };

export async function updateAccountNameAction(name: string): Promise<AccountActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Please sign in again to update your name." };

  const trimmedName = name.trim();
  if (!trimmedName || trimmedName.length > 100) {
    return { error: "Enter a name between 1 and 100 characters." };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, firebaseUid: true },
  });
  if (!user) return { error: "Your account could not be found." };

  try {
    if (user.firebaseUid && isFirebaseConfigured()) {
      await getFirebaseAdminAuth().updateUser(user.firebaseUid, { displayName: trimmedName });
    }

    await prisma.user.update({ where: { id: user.id }, data: { name: trimmedName } });
    return { success: "Your name has been updated." };
  } catch (error) {
    console.error("Could not update account name:", error);
    return { error: "Could not update your name. Please try again." };
  }
}