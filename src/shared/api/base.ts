import axios from 'axios';

import { API_BASE_URL } from '../config';

export const api = axios
  .create({
    baseURL: API_BASE_URL,
  })
  .interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  });
