'use server';

import bcryptjs from 'bcryptjs';
import { redirect } from 'next/navigation';

import prisma from '@/db';
import { createResponse } from '@/lib/utils';
import type { LoginFormValues, RegisterFormValues } from '@/types/zod-schema';

export async function createNewUser({ name, email, password }: RegisterFormValues) {
  try {
    // Hash user's password before storing it
    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });

    if (!newUser.id) {
      throw new Error('something went wrong while creating new user');
    }

    redirect('/login');
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Registration Failed!',
      message: 'Please try another email or login to your account!',
    });
  }
}

export async function retrieveUserByEmail({ email, password }: LoginFormValues) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const { password: dbPassword, ...restUser } = user;
    const passwordsMatch = await bcryptjs.compare(password, dbPassword);

    if (!passwordsMatch) {
      throw new Error("Passwords don't match");
    }

    return createResponse({ user: restUser });
  } catch (error) {
    return createResponse({
      error: true,
      title: 'Login Failed!',
      message: 'Please verify your email and password!',
    });
  }
}
