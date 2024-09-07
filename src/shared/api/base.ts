import axios, { type AxiosError, HttpStatusCode } from 'axios';

import { ZodError } from 'zod';
import { env } from '../config';
import { routeNames, storage } from '../lib';
import { router } from '../lib/router';
import { useToast } from 'vue-toastification';
import { nextTick } from 'vue';

export const api = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15 * 1000,
});

api.interceptors.request.use(
  (config) => {
    const token = storage.get('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      storage.remove('authToken');
      return;
    }

    if (error.response?.status && error.response.status >= 500) {
      router.push({ name: routeNames.serverError });
    }

    throw error;
  }
);

type AsyncFunction<P extends unknown[], R extends Promise<unknown>> = (...args: P) => R;

export const handleSchemaError =
  <P extends unknown[], R extends Promise<unknown>>(fn: AsyncFunction<P, R>) =>
  async (...args: P) => {
    try {
      return await fn(...args);
    } catch (err) {
      if (err instanceof ZodError) {
        const toast = useToast();
        setTimeout(() => {
          toast.clear();
          toast.error('Серверная ошибка');
          router.push({ name: routeNames.serverError });
        }, 0);
        console.error(err);
      }
      throw err;
    }
  };
