import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { retrieveUserByEmail } from '@/actions/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          throw new Error('User not found.');
        }

        console.log('results.response.user: ', results.response.user);
        return results.response.user;
      },
    }),
  ],
  // By default, the `id` property does not exist on `token` or `session`.
  callbacks: {
    jwt({ token, user }) {
      // Extending the Session to include user's id
      if (user) token.id = user.id;

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;

      return session;
    },
  },
});
