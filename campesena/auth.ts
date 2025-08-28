import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import { signInSchema } from "./utils/zod";
import { login } from "./services/api/auth.service";
import strapiClientInstance from "./services/strapiClient";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const cookiesList = cookies();

        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // Call your authentication service
          const loginResponse = await login(email, password);

          if (!loginResponse || !loginResponse.user) {
            return null;
          }

          // Map your LoginResponse to the expected User object
          let user = {
            user: {
              id: String(loginResponse.user.id),
              name: loginResponse.user.username,
              email: loginResponse.user.email,
              jwt: loginResponse.jwt,
            },
          };

          strapiClientInstance.initializeToken();

          (await cookiesList).set("session-token", user.user.jwt);
          (await cookiesList).set("user-id", user.user.id, { sameSite: "lax" });

          return user.user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      return { ...token, ...user };
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token as any;

      return session;
    },
  },
});
