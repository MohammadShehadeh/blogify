'use server';

import bcrypt from 'bcrypt';

import { db } from '@/db';
import { users } from '@/db/schema';
import { createResponse } from '@/lib/utils';
import type { LoginFormValues, RegisterFormValues } from '@/types/zod-schema';

export async function createNewUser({ name, email, password }: RegisterFormValues) {
  try {
    // Hash user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning({ insertedId: users.id });

    if (!newUser) {
      throw new Error('something went wrong while creating new user');
    }

    return createResponse({ data: newUser });
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
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const { password: dbPassword, ...restUser } = user;
    const passwordsMatch = await bcrypt.compare(password, dbPassword);

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
