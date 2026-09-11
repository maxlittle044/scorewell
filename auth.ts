import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyIdToken } from "@/lib/firebase/admin";
import { linkFirebaseUser } from "@/lib/auth-user";

/**
 * Sessions stay with NextAuth; identity moved to Firebase.
 *
 * The browser signs in with Firebase, gets an ID token, and hands it here. This provider
 * verifies the token server-side and exchanges it for the Postgres user row, after which the
 * session cookie works exactly as it always did — which is why the forty-odd `auth()` call
 * sites elsewhere needed no changes at all.
 *
 * Firebase is not asked anything on subsequent requests: the JWT session is self-contained,
 * so a Firebase outage cannot sign existing users out. It would only stop new sign-ins.
 *
 * **Reverting** is this file. Swap the provider back to email/password compared against
 * `User.passwordHash`, which is still populated for every account that ever had one.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      // Not an email/password pair any more — the browser has already proved who it is to
      // Firebase, and this is the proof.
      credentials: { idToken: { label: "Firebase ID token", type: "text" } },
      authorize: async (credentials) => {
        const idToken = credentials?.idToken;
        if (typeof idToken !== "string" || !idToken) return null;

        const decoded = await verifyIdToken(idToken);
        if (!decoded?.email) return null;

        if (!decoded.email_verified) return null;

        try {
          const user = await linkFirebaseUser({
            firebaseUid: decoded.uid,
            email: decoded.email,
            name: decoded.name ?? null,
            image: decoded.picture ?? null,
          });
          return { id: user.id, name: user.name, email: user.email, image: user.image };
        } catch (error) {
          console.error("Firebase sign-in could not be linked to an account:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});
