'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { USER_COOKIE_KEY } from '@/constants/auth';

export async function refreshCookie(token: string) {
  const oneDay = 24 * 60 * 60 * 1000;

  cookies().set({
    name: USER_COOKIE_KEY,
    value: token,
    expires: Date.now() + oneDay,
    path: '/',
  });
}

export async function createCookie(token: string, redirectTo: string = '/') {
  await refreshCookie(token);
  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

export async function deleteCookie() {
  cookies().delete(USER_COOKIE_KEY);
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function getServerCookie() {
  return cookies().get(USER_COOKIE_KEY)?.value;
}
