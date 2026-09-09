"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

/**
 * Browser-side Firebase, used by the login and signup forms to obtain an ID token which the
 * server then verifies (see `lib/firebase/admin.ts`).
 *
 * These values are public by design — they identify the project, they do not authorise
 * anything. Access is controlled by Firebase's own rules and by the server verifying every
 * token, so `NEXT_PUBLIC_` is correct here and not an oversight.
 *
 * Lazy for the same reason as the admin app: a missing variable should break sign-in, which
 * is visible and fixable, rather than the build.
 */

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseClientConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

let app: FirebaseApp | null = null;

export function getFirebaseAuth(): Auth {
  if (!isFirebaseClientConfigured()) {
    throw new Error("Firebase client configuration is missing.");
  }
  if (!app) {
    app = getApps().length
      ? getApp()
      : initializeApp({
          apiKey: config.apiKey!,
          authDomain: config.authDomain!,
          projectId: config.projectId!,
          appId: config.appId!,
        });
  }
  return getAuth(app);
}

/**
 * Turns Firebase's error codes into something a learner can act on.
 *
 * The raw codes leak implementation detail and, worse, distinguish "no such account" from
 * "wrong password" — which lets anyone test whether an email is registered here. Both map to
 * the same message on purpose.
 */
export function describeAuthError(error: unknown): string {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  switch (code) {
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/weak-password":
      return "Please choose a password of at least six characters.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Couldn't reach the sign-in service. Check your connection and try again.";
    default:
      return "Something went wrong signing you in. Please try again.";
  }
}
