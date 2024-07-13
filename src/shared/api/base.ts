import axios, { type AxiosError, HttpStatusCode } from 'axios';
import { useRouter } from 'vue-router';

import { env } from '../config';
import { routeNames, storage } from '../lib';

export const api = axios.create({
  baseURL: env.API_BASE_URL,
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
      const router = useRouter();
      router.push({ name: routeNames.serverError });
    }

    throw error;
  }
);
