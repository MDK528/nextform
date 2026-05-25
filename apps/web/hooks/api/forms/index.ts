import { trpc } from "~/trpc/client";

export const useCreateForm = () => {
  const utils = trpc.useUtils();

  const {
    mutateAsync: createFormAsync,
    mutate: createForm,
    isLoading,
    error,
    failureCount,
    isIdle,
    isError,
    isSuccess,
    status
  } = trpc.form.createForm.useMutation({
    onSuccess: async () => {
      await utils.form.invalidate()
    },
  });

  return {
    createFormAsync,
    createForm,
    isLoading,
    error,
    failureCount,
    isIdle,
    isError,
    isSuccess,
    status
  };
};
