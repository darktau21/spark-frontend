import axios from 'axios';

import { env } from '../config';

export const api = axios.create({
  baseURL: env.API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
