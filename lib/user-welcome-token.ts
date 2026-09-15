import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;

/**
 * How long a welcome link stays usable. Encoded in the payload rather than tracked
 * server-side, so it bounds exposure (a leaked or archived email stops working) without
 * needing storage. Single-use is enforced separately, in app/user/welcome/actions.ts, by
 * checking whether the account is already email-verified.
 */
const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function encryptionKey() {
  const secret = process.env.AUTH_SECRET?.trim() || process.env.NEXTAUTH_SECRET?.trim();
  if (!secret) throw new Error("AUTH_SECRET is required for welcome links.");
  return createHash("sha256").update(secret).digest();
}

export function createUserWelcomeToken(email: string): string {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, encryptionKey(), iv);
  const payload = `${Date.now()}:${email}`;
  const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [iv, tag, encrypted].map((part) => part.toString("base64url")).join(".");
}

export function readUserWelcomeToken(token: string): string {
  try {
    const [ivText, tagText, encryptedText] = token.split(".");
    if (!ivText || !tagText || !encryptedText) return "";

    const decipher = createDecipheriv(ALGORITHM, encryptionKey(), Buffer.from(ivText, "base64url"));
    decipher.setAuthTag(Buffer.from(tagText, "base64url"));
    const payload = Buffer.concat([
      decipher.update(Buffer.from(encryptedText, "base64url")),
      decipher.final(),
    ]).toString("utf8");

    const separatorIndex = payload.indexOf(":");
    if (separatorIndex === -1) return "";
    const issuedAt = Number(payload.slice(0, separatorIndex));
    const email = payload.slice(separatorIndex + 1);
    if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > TOKEN_TTL_MS) return "";

    return email;
  } catch {
    return "";
  }
}
