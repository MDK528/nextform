import { z } from 'zod'

export const CreateUserWithEmailAndPasswordInput = z.object({
  fullName: z.string().describe('The full name of the user'),
  email: z.email('Invalid email address').describe('The email address of the user'),
  password: z.string().min(8, 'Password must be at least 8 characters long').describe('The password for the user account'),
});

export type CreateUserWithEmailAndPasswordInputType = z.infer<typeof CreateUserWithEmailAndPasswordInput>;

export const generateUserTokenPayload = z.object({
  id: z.uuid().describe('The UUID of the user')
});

export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>;

export const signInUserWithEmailAndPasswordInput = z.object({
  email: z.email('Invalid email address').describe('The email address of the user'),
  password: z.string().min(8, 'Password must be at least 8 characters long').describe('The password for the user account'),
});

export type SignInUserWithEmailAndPasswordInputType = z.infer<typeof signInUserWithEmailAndPasswordInput>;