"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { REFERRAL_COOKIE, recordReferralSignup } from "@/lib/referral";

export type AuthActionState = { error?: string };

export async function authAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const mode = formData.get("mode") === "signup" ? "signup" : "login";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (mode === "signup") {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "An account with this email already exists." };
    }

    const name = String(formData.get("name") ?? "").trim();
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        subscription: { create: {} },
      },
    });

    const cookieStore = await cookies();
    const referralCode = cookieStore.get(REFERRAL_COOKIE)?.value;
    if (referralCode) {
      await recordReferralSignup(newUser.id, referralCode);
      cookieStore.delete(REFERRAL_COOKIE);
    }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          mode === "login"
            ? "Invalid email or password."
            : "Account created, but sign-in failed — please log in.",
      };
    }
    throw error;
  }

  return {};
}
