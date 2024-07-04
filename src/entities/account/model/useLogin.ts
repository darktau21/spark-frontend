import { accountApi } from '@/shared/api';
import { routeNames, storage, useAxiosErrorToast } from '@/shared/lib';
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

import { TOKEN_KEY } from './const';

const ERROR_TIMEOUT = 4000;

export const useLogin = () => {
  const toast = useToast();
  const router = useRouter();
  const login = useMutation({
    mutationFn: accountApi.login,
    mutationKey: TOKEN_KEY,
    onError: (error: unknown) => {
      const parse = useAxiosErrorToast('Ошибка авторизации');
      parse(error);
      setTimeout(() => login.reset(), ERROR_TIMEOUT);
      console.error(error);
    },
    onSuccess: (data) => {
      console.log(data);
      storage.set('authToken', data.auth_token);
      toast.success('Успешная авторизация');
      router.push({ name: routeNames.home });
    },
  });

  return login;
};
