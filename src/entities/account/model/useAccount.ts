import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { CURRENT_USER_KEY } from './const';
import { accountApi } from '@/shared/api';

export const useAccount = () => {
  const router = useRouter();
  const account = useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: () => accountApi.getMe(),
    throwOnError(error, query) {
      console.error(error);
      return true;
    },
  });

  return account;
};
