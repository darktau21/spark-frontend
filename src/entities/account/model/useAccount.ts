import { accountApi, api, testApi } from '@/shared/api';
import { routeNames, storage, useAxiosErrorToast } from '@/shared/lib';
import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const ACCOUNT_STORE_KEY = 'store:account';

export const useAccount = defineStore(ACCOUNT_STORE_KEY, () => {
  const isLoading = ref({
    data: false,
    login: false,
    register: false,
    restorePassword: false,
    restorePasswordConfirm: false,
  });
  const toast = useToast();
  const router = useRouter();
  const data = ref<accountApi.AccountSchema | null>(null);
  const isAuthorized = ref(Boolean(storage.get('authToken')));

  const refetchData = async () => {
    try {
      isLoading.value.data = true;
      const response = await accountApi.getMe();
      data.value = response;
      isAuthorized.value = true;
    } catch (error) {
      storage.remove('authToken');
      data.value = null;
      isAuthorized.value = false;
    } finally {
      isLoading.value.data = false;
    }
  };

  const login = async (loginData: accountApi.LoginPayload, remember: boolean = false) => {
    try {
      isLoading.value.login = true;
      const response = await accountApi.login(loginData);
      storage.set('authToken', response.auth_token);
      await refetchData();
      toast.success('Вы успешно авторизовались');
      storage.set('rememberMe', remember);
      const testResults = storage.get('testResults');
      if (testResults) {
        await testApi.saveTest({ answers: testResults });
        toast.success('Результаты теста успешно сохранены');
        storage.remove('testResults');
      }
      router.push({ name: routeNames.account, replace: true });
    } catch (error) {
      const parse = useAxiosErrorToast('Ошибка авторизации');
      parse(error);
      storage.remove('authToken');
    } finally {
      isLoading.value.login = false;
    }
  };

  const register = async (registerData: accountApi.RegisterPayload) => {
    try {
      isLoading.value.register = true;
      await accountApi.register(registerData);
      toast.success('Вы успешно зарегистрировались');
      router.push({ name: routeNames.login, replace: true });
    } catch (error) {
      const parse = useAxiosErrorToast('Ошибка регистрации');
      parse(error);
      console.error(error);
    } finally {
      isLoading.value.register = false;
    }
  };

  const logout = async () => {
    try {
      await accountApi.logout();
    } finally {
      storage.remove('authToken');
      storage.remove('rememberMe');
      data.value = null;
      isAuthorized.value = false;
      router.push({ name: routeNames.login });
    }
  };

  const restorePassword = async (email: string) => {
    try {
      isLoading.value.restorePassword = true;
      await accountApi.restorePassword({ email });
      toast.success('Ссылка для сброса пароля отправлена на ваш email');
      router.push({ name: routeNames.login });
    } catch (error) {
      const parse = useAxiosErrorToast('Ошибка восстановления пароля');
      parse(error);
    } finally {
      isLoading.value.restorePassword = false;
    }
  };

  const confirmRestorePassword = async (data: accountApi.RestorePasswordConfirmPayload) => {
    try {
      isLoading.value.restorePasswordConfirm = true;
      await accountApi.restorePasswordConfirm(data);
      toast.success('Пароль успешно изменен');
      router.push({ name: routeNames.login });
    } catch (error) {
      const parse = useAxiosErrorToast('Ошибка смены пароля');
      parse(error);
    } finally {
      isLoading.value.restorePasswordConfirm = false;
    }
  };

  const deleteAccount = async () => {
    try {
      await accountApi.deleteAccount();

      toast.warning('Аккаунт удален');
    } catch (error) {
      const parse = useAxiosErrorToast('Ошибка смены пароля');
      parse(error);
    } finally {
      storage.remove('authToken');
      storage.remove('rememberMe');
      data.value = null;
      isAuthorized.value = false;
      router.push({ name: routeNames.login });
      refetchData();
    }
  };

  const update = async (data: accountApi.UpdateAccountPayload) => {
    try {
      await accountApi.updateMe(data);
      toast.success('Данные успешно обновлены');
    } catch (error) {
      const parse = useAxiosErrorToast('Ошибка обновления данных');
      parse(error);
    } finally {
      await refetchData();
    }
  };

  const rememberMeHandler = () => {
    window.addEventListener('beforeunload', () => {
      if (storage.get('rememberMe')) {
        return;
      }
      try {
        navigator.sendBeacon(`${api.defaults.baseURL}/token/logout/`);
      } finally {
        storage.clear();
      }
    });
  };

  onMounted(refetchData);
  onMounted(rememberMeHandler);

  return {
    confirmRestorePassword,
    data,
    deleteAccount,
    isAuthorized,
    isLoading,
    login,
    logout,
    refetchData,
    register,
    restorePassword,
    update,
  };
});
