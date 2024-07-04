import { api } from '../base';
import {
  type RegisterPayload,
  registerResponse,
  type LoginPayload,
  loginResponse,
  type LoginResponse,
  type RegisterResponse,
  type AccountSchema,
} from './schema';

export async function register(body: RegisterPayload) {
  const response = await api.post<RegisterResponse>('/users/', body);
  return registerResponse.parse(response.data);
}

export async function login(body: LoginPayload) {
  const response = await api.post<LoginResponse>('/token/login/', body);
  return loginResponse.parse(response.data);
}

export function getMe() {
  return api.get<AccountSchema>('/users/me/');
}
