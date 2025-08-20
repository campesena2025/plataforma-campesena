import NextAuth from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "./utils/zod";
import { loginStrapi } from "./services/api/auth.service";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // Call your authentication service
          const loginResponse = await loginStrapi(email, password);

          if (!loginResponse || !loginResponse.user) {
            return null;
          }

          // Map your LoginResponse to the expected User object
          return {
            id: String(loginResponse.user.id),
            name: loginResponse.user.username,
            email: loginResponse.user.email,
          };
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
});
