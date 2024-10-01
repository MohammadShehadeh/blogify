import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { retrieveUserByEmail } from '@/actions/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
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
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const isOnRegister = nextUrl.pathname.startsWith('/register');

      if (isOnDashboard) {
        return isLoggedIn;
      }

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
});
