import { accountApi } from '@/shared/api';
import { routeNames, useAxiosErrorToast } from '@/shared/lib';
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { CURRENT_USER_KEY } from './const';

const ERROR_TIMEOUT = 4000;

export const useRegister = () => {
  const toast = useToast();
  const router = useRouter();
  const register = useMutation({
    mutationFn: accountApi.register,
    mutationKey: CURRENT_USER_KEY,
    onError: (error: unknown) => {
      const parse = useAxiosErrorToast('Ошибка регистрации');
      parse(error);
      setTimeout(() => register.reset(), ERROR_TIMEOUT);
      console.error(error);
    },
    onSuccess: () => {
      toast.success('Успешная регистрация');
      router.push({ name: routeNames.login });
    },
  });

  return register;
};
