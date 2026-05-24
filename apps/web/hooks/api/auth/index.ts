import { trpc } from "~/trpc/client"

export const useSignUp = () => {
    const utils = trpc.useUtils()

    const { 
        mutateAsync: createUserWithEmailAndPasswordAsync,
        mutate: createUserWithEmailAndPassword,
        error,
        failureCount,
        isIdle,
        isError,
        isSuccess,
        status,

    } = trpc.auth.createUserWithEmailAndPassword.useMutation({
        onSuccess: async () => await utils.auth.getLoggedInUserInfo.invalidate()
    })

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
    const utils = trpc.useUtils()

    const { 
        mutateAsync: signInUserWithEmailAndPasswordAsync,
        mutate: signInUserWithEmailAndPassword,
        error,
        failureCount,
        isIdle,
        isError,
        isSuccess,
        status,

    } = trpc.auth.signInUserWithEmailAndPassword.useMutation({
        onSuccess: async () => await utils.auth.getLoggedInUserInfo.invalidate()
    })

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

export const useUser = () => {
    const {
        data: user, isError, isFetched, isFetching, isLoading, status
    } = trpc.auth.getLoggedInUserInfo.useQuery()
    
    return {
        user,
        isError,
        isFetched,
        isFetching,
        isLoading,
        status
    }
}
