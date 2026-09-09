import { cert, getApp, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type DecodedIdToken } from "firebase-admin/auth";

/**
 * Server-side Firebase, used for one job: proving that an ID token sent by the browser is
 * genuine, and saying which account it belongs to.
 *
 * Firebase owns identity only. Every row of application data stays in Postgres, keyed by the
 * existing `User.id` — see the `firebaseUid` comment in schema.prisma for why `passwordHash`
 * is kept alongside it as the revert path.
 *
 * **Built lazily, and never at module load.** The Groq client threw on a missing key at import
 * time and took `next build` down with it — a missing secret must disable the feature that
 * needs it, not the whole site.
 */

export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super("Firebase server credentials are not set.");
    this.name = "FirebaseNotConfiguredError";
  }
}

let app: App | null = null;

function getAdminApp(): App {
  if (app) return app;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Stored with literal \n because environment variables are single-line; Vercel's UI and
  // .env both keep it that way, so the escapes have to be turned back into real newlines.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) throw new FirebaseNotConfiguredError();

  // Next reloads modules between requests in development; reusing the named app avoids
  // "app already exists" on the second call.
  app = getApps().length ? getApp() : initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return app;
}

/** True when the server has everything it needs, so callers can degrade rather than throw. */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

/**
 * Verifies an ID token minted by the client SDK. Returns null rather than throwing for a bad
 * or expired token, because that is an ordinary signed-out state and not an error.
 *
 * `checkRevoked` is on: without it a token stays valid for up to an hour after the account is
 * disabled or its password changed, which is exactly the window that matters.
 */
export async function verifyIdToken(idToken: string): Promise<DecodedIdToken | null> {
  try {
    return await getAuth(getAdminApp()).verifyIdToken(idToken, true);
  } catch {
    return null;
  }
}
