import { AxiosError } from 'axios';
import { useToast } from 'vue-toastification';

export function useAxiosErrorToast(defaultMessage: string) {
  const toast = useToast();

  const parse = (error: unknown) => {
    if (error instanceof AxiosError) {
      const errorMessages = Object.values(error.response?.data).flat() as string[];
      if (errorMessages.length > 0) {
        errorMessages.forEach((error: string) => {
          toast.error(error);
        });
        return;
      }
      toast.error(error.response?.data?.message ?? defaultMessage);
      return;
    }
  };

  return parse;
}
