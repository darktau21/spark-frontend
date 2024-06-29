import { api } from './base';

type RegisterBody = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  patronymic: string;
  re_password: string;
};

export async function register(body: RegisterBody) {
  return await api.post('/users/', body);
}

export async function login(body: Pick<RegisterBody, 'email' | 'password'>) {
  return await api.post('/token/login', body);
}

export function getUsers() {
  return api.get('/users');
}
