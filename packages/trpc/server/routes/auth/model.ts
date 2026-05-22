import {z} from "zod";

export const CreateUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string('Full name is required').describe('The full name of the user'),
    email: z.email('Invalid email address').describe('The email address of the user'),
    password: z.string('Password is required').min(6, 'Password must be at least 6 characters long').describe('The password for the user account'),
});

export const CreateUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe('The ID of the created user'),
});

export type CreateUserWithEmailAndPasswordInputType = z.infer<typeof CreateUserWithEmailAndPasswordInputModel>;
export type CreateUserWithEmailAndPasswordOutputType = z.infer<typeof CreateUserWithEmailAndPasswordOutputModel>;

export const SignInUserWithEmailAndPasswordInputModel = z.object({
    email: z.email('Invalid email address').describe('The email address of the user'),
    password: z.string('Password is required').min(6, 'Password must be at least 6 characters long').describe('The password for the user account'),
});

export const SignInUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe('The ID of the signed-in user'),
});

export type SignInUserWithEmailAndPasswordInputType = z.infer<typeof SignInUserWithEmailAndPasswordInputModel>;
export type SignInUserWithEmailAndPasswordOutputType = z.infer<typeof SignInUserWithEmailAndPasswordOutputModel>;
