import { api } from "@frontend/trpc";

// note: if the mutation returns a message, we use that. if it returns nothing, we show nothing
export const hookHandler = <T extends any[], R>(
  hook: (...args: T) => Promise<R>,
  successMessage?: string,
  errorMessage?: string
) => {
  return async (...args: T): Promise<R> => {
    try {
      const result = await hook(...args);
      if (!result) return result;
      // @ts-expect-error
      const message = result["message"];
      const messageToUse = successMessage || message;

      if (messageToUse) {
        //   successToast(messageToUse);
      }
      return result;
    } catch (err: any) {
      if (err.data?.zodError) {
        const zodError = err.data.zodError;
        let errorMessage = "Validation Error: ";

        if (zodError.formErrors && zodError.formErrors.length > 0) {
          errorMessage += zodError.formErrors[0];
        } else if (zodError.fieldErrors) {
          const firstFieldError = Object.entries(zodError.fieldErrors)[0];
          if (firstFieldError) {
            const [field, errors] = firstFieldError;
            if (Array.isArray(errors) && errors.length > 0) {
              errorMessage += `${errors[0]}`;
            }
          }
        }

        //   errorToast(errorMessage);
        throw err;
      } else {
        if (err.meta) {
          const { meta } = err;
          const { response } = meta;
          const { status } = response;

          if (status === 401) {
            //   errorToast("Please sign in");
          } else {
            const message = errorMessage || err.message;
            //   errorToast(message);
            throw err;
          }
        } else {
          // network failure or other error without meta information
          const message = errorMessage || "An unexpected error occurred";
          // errorToast(message);
          throw err;
        }
      }
    }
    return undefined as unknown as R;
  };
};

export const useLaunchUser = (
  successMessage?: string,
  errorMessage?: string
) => {
  const { mutateAsync, ...rest } = api.user.launch.useMutation();
  const wrappedMutate = hookHandler(mutateAsync, successMessage, errorMessage);
  return { mutateAsync: wrappedMutate, ...rest };
};

export const useCreateDocument = (
  successMessage?: string,
  errorMessage?: string
) => {
  const { mutateAsync, ...rest } = api.document.create.useMutation();
  const wrappedMutate = hookHandler(mutateAsync, successMessage, errorMessage);
  return { mutateAsync: wrappedMutate, ...rest };
};

export const useSoftDeleteDocument = (
  successMessage?: string,
  errorMessage?: string
) => {
  const { mutateAsync, ...rest } = api.document.softDelete.useMutation();
  const wrappedMutate = hookHandler(mutateAsync, successMessage, errorMessage);
  return { mutateAsync: wrappedMutate, ...rest };
};

export const useUpdateDocumentTitle = (
  successMessage?: string,
  errorMessage?: string
) => {
  const { mutateAsync, ...rest } = api.document.updateTitle.useMutation();
  const wrappedMutate = hookHandler(mutateAsync, successMessage, errorMessage);
  return { mutateAsync: wrappedMutate, ...rest };
};
