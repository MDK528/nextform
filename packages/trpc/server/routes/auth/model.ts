import {z} from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string('Full name is required').describe('The full name of the user'),
    email: z.email('Invalid email address').describe('The email address of the user'),
    password: z.string('Password is required').min(6, 'Password must be at least 6 characters long').describe('The password for the user account'),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe('The ID of the created user'),
});

export type CreateUserWithEmailAndPasswordInputType = z.infer<typeof createUserWithEmailAndPasswordInputModel>;
export type CreateUserWithEmailAndPasswordOutputType = z.infer<typeof createUserWithEmailAndPasswordOutputModel>;

export const signInUserWithEmailAndPasswordInputModel = z.object({
    email: z.email('Invalid email address').describe('The email address of the user'),
    password: z.string('Password is required').min(6, 'Password must be at least 6 characters long').describe('The password for the user account'),
});

export const signInUserWithEmailAndPasswordOutputModel = z.object({
    id: z.string().describe('The ID of the signed-in user'),
});

export type SignInUserWithEmailAndPasswordInputType = z.infer<typeof signInUserWithEmailAndPasswordInputModel>;
export type SignInUserWithEmailAndPasswordOutputType = z.infer<typeof signInUserWithEmailAndPasswordOutputModel>;


export const getLoggedInUserInfoInputModel = z.undefined()
export const getLoggedInUserInfoOutputModel = z.object({
    id: z.string().describe('The ID of the signed-in user'),
    fullName: z.string().describe('The full name of the user'),
    email: z.email().describe('The email address of the user'),
    profileImgUrl: z.string().describe('User image URL').optional().nullable()
})
