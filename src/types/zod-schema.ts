import { z } from 'zod';

export const postFormSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  title: z.string().min(5).max(220),
  status: z.enum(['draft', 'published']),
  description: z.string().min(10).max(400),
  imageUrl: z.string().url().max(100),
  content: z.string().min(1).max(3000),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(1).max(18),
  password: z.string().min(8).max(16),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const commentingFormSchema = z.object({
  id: z.string().optional(),
  content: z.string().min(5).max(50),
});

export type CommentingFormValues = z.infer<typeof commentingFormSchema>;
