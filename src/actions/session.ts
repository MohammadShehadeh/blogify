'use server';

import type { JWTPayload } from 'jose';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { env } from '@/env';

const secretKey = env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const expireInMilliseconds = 7 * 24 * 60 * 60 * 1000;

export type SessionPayload = JWTPayload | null;
export type JwtToken = string | undefined;

export const encrypt = (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
};

export const decrypt = async (jwtToken: JwtToken = ''): Promise<SessionPayload> => {
  try {
    const { payload } = await jwtVerify(jwtToken, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch (error) {
    return null;
  }
};

export const createSession = async (payload: SessionPayload) => {
  const expiresAt = new Date(Date.now() + expireInMilliseconds);
  const session = await encrypt({ ...payload, expiresAt });
  cookies().set({ name: 'session', value: session, httpOnly: true, expires: expiresAt, sameSite: 'lax' });
};

export const deleteSession = async () => {
  cookies().delete('session');
};

export const getSession = async () => {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  return session;
};
