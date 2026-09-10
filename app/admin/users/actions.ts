"use server";

import { auth } from "@/auth";
import { isAdminUser } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { getFirebaseAdminAuth, isFirebaseConfigured } from "@/lib/firebase/admin";
import { UserRole } from "@/generated/prisma/client";
import { logAdminActivity } from "@/lib/admin-activity";

type ActionResult = { error?: string; success?: string };
type UserRoleValue = "USER" | "ADMIN";

type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRoleValue;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || !(await isAdminUser(session.user.id))) {
    throw new Error("You are not authorized to manage users.");
  }
  return session;
}

async function findUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, firebaseUid: true },
  });
  if (!user) throw new Error("That user no longer exists.");
  return user;
}

function messageForError(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function createUserAction(input: CreateUserInput): Promise<ActionResult> {
  let firebaseUid: string | undefined;

  try {
    const session = await requireAdmin();
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();
    const password = input.password;
    const role = input.role === "ADMIN" ? UserRole.ADMIN : input.role === "USER" ? UserRole.USER : null;

    if (!name || name.length > 100) return { error: "Enter a name between 1 and 100 characters." };
    if (!email || !email.includes("@") || email.length > 254) return { error: "Enter a valid email address." };
    if (password.length < 6) return { error: "Password must be at least 6 characters." };
    if (!role) return { error: "That user role is not valid." };
    if (!isFirebaseConfigured()) return { error: "Firebase account service is not configured." };

    const firebaseUser = await getFirebaseAdminAuth().createUser({
      email,
      password,
      displayName: name,
    });
    firebaseUid = firebaseUser.uid;

    const user = await prisma.user.create({
      data: { name, email, firebaseUid, role },
      select: { id: true },
    });

    await logAdminActivity({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "unknown",
      action: "CREATE_USER",
      entityType: "USER",
      entityId: user.id,
      summary: `Created ${email}`,
      metadata: { role },
    });
    return { success: "User created." };
  } catch (error) {
    if (firebaseUid && isFirebaseConfigured()) {
      await getFirebaseAdminAuth().deleteUser(firebaseUid).catch(() => undefined);
    }
    console.error("Admin could not create user:", error);
    return { error: messageForError(error, "Could not create that user.") };
  }
}

export async function updateUserNameAction(userId: string, name: string): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    const user = await findUser(userId);
    const trimmedName = name.trim();

    if (!trimmedName || trimmedName.length > 100) {
      return { error: "Enter a name between 1 and 100 characters." };
    }

    if (user.firebaseUid && isFirebaseConfigured()) {
      await getFirebaseAdminAuth().updateUser(user.firebaseUid, { displayName: trimmedName });
    }

    await prisma.user.update({ where: { id: user.id }, data: { name: trimmedName } });
    await logAdminActivity({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "unknown",
      action: "UPDATE_USER_NAME",
      entityType: "USER",
      entityId: user.id,
      summary: `Changed the name for ${user.email}`,
      metadata: { name: trimmedName },
    });
    return { success: "User name updated." };
  } catch (error) {
    console.error("Admin could not update user name:", error);
    return { error: messageForError(error, "Could not update that user.") };
  }
}

export async function recordPasswordResetAction(userId: string): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    const user = await findUser(userId);

    await logAdminActivity({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "unknown",
      action: "SEND_PASSWORD_RESET",
      entityType: "USER",
      entityId: user.id,
      summary: `Sent a password reset link to ${user.email}`,
    });
    return { success: "Password reset recorded." };
  } catch (error) {
    console.error("Admin could not record password reset:", error);
    return { error: messageForError(error, "Could not record that password reset.") };
  }
}

export async function setUserRoleAction(userId: string, role: UserRoleValue): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    const user = await findUser(userId);

    if (session.user?.id === user.id) {
      return { error: "You cannot change your own admin role." };
    }

    const prismaRole = role === "ADMIN" ? UserRole.ADMIN : role === "USER" ? UserRole.USER : null;
    if (!prismaRole) return { error: "That user role is not valid." };

    await prisma.user.update({ where: { id: user.id }, data: { role: prismaRole } });
    await logAdminActivity({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "unknown",
      action: "CHANGE_USER_ROLE",
      entityType: "USER",
      entityId: user.id,
      summary: `Changed ${user.email} to ${prismaRole === UserRole.ADMIN ? "admin" : "user"}`,
      metadata: { role: prismaRole },
    });
    return { success: `User role changed to ${prismaRole === UserRole.ADMIN ? "admin" : "user"}.` };
  } catch (error) {
    console.error("Admin could not change user role:", error);
    return { error: messageForError(error, "Could not change that user's role.") };
  }
}

export async function setUserDisabledAction(
  userId: string,
  disabled: boolean,
): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    const user = await findUser(userId);

    if (session.user?.id === user.id) {
      return { error: "You cannot disable your own admin account." };
    }

    if (!user.firebaseUid || !isFirebaseConfigured()) {
      return { error: "This user is not linked to the Firebase account service." };
    }

    await getFirebaseAdminAuth().updateUser(user.firebaseUid, { disabled });
    await logAdminActivity({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "unknown",
      action: disabled ? "DISABLE_USER" : "ENABLE_USER",
      entityType: "USER",
      entityId: user.id,
      summary: `${disabled ? "Disabled" : "Enabled"} ${user.email}`,
    });
    return { success: disabled ? "User account disabled." : "User account enabled." };
  } catch (error) {
    console.error("Admin could not change user status:", error);
    return { error: messageForError(error, "Could not change that user's status.") };
  }
}

export async function deleteUserAction(userId: string): Promise<ActionResult> {
  try {
    const session = await requireAdmin();
    const user = await findUser(userId);

    if (session.user?.id === user.id) {
      return { error: "You cannot delete your own admin account." };
    }

    if (user.firebaseUid && isFirebaseConfigured()) {
      try {
        await getFirebaseAdminAuth().deleteUser(user.firebaseUid);
      } catch (error) {
        const code = typeof error === "object" && error && "code" in error ? error.code : null;
        if (code !== "auth/user-not-found") throw error;
      }
    }

    await prisma.user.delete({ where: { id: user.id } });
    await logAdminActivity({
      adminId: session.user.id,
      adminEmail: session.user.email ?? "unknown",
      action: "DELETE_USER",
      entityType: "USER",
      entityId: user.id,
      summary: `Deleted ${user.email}`,
    });
    return { success: "User deleted." };
  } catch (error) {
    console.error("Admin could not delete user:", error);
    return {
      error: messageForError(
        error,
        "Could not delete that user. Remove their associated records first.",
      ),
    };
  }
}