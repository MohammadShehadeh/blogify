import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { retrieveUserByEmail } from '@/actions/auth';
import { authConfig } from '@/auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const results = await retrieveUserByEmail({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if ('error' in results.response) {
          return null;
        }

        return results.response.user;
      },
    }),
  ],
});
