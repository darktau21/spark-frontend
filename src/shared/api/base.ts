import axios from 'axios';

import { env } from '../config';
import { storage } from '../lib';

export const api = axios.create({
  baseURL: env.API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = storage.get('authToken');
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
