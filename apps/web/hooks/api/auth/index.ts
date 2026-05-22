import { trpc } from "~/trpc/client"

export const useSignUp = () => {
    const { 
        mutateAsync: createUserWithEmailAndPasswordAsync,
        mutate: createUserWithEmailAndPassword,
        error,
        failureCount,
        isIdle,
        isError,
        isSuccess,
        status,

    } = trpc.auth.createUserWithEmailAndPassword.useMutation()

    return {
        createUserWithEmailAndPasswordAsync,
        createUserWithEmailAndPassword,
        error,
        failureCount,
        isIdle,
        isError,
        isSuccess,
        status,
    }
}

export const useSignIn = () => {
    const { 
        mutateAsync: signInUserWithEmailAndPasswordAsync,
        mutate: signInUserWithEmailAndPassword,
        error,
        failureCount,
        isIdle,
        isError,
        isSuccess,
        status,

    } = trpc.auth.signInUserWithEmailAndPassword.useMutation()

    return {
        signInUserWithEmailAndPasswordAsync,
        signInUserWithEmailAndPassword,
        error,
        failureCount,
        isIdle,
        isError,
        isSuccess,
        status,
    }
}