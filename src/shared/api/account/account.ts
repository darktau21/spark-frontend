import { api } from '../base';
import {
  type RegisterPayload,
  registerResponse,
  type LoginPayload,
  loginResponse,
  type LoginResponse,
  type RegisterResponse,
  type AccountSchema,
  accountSchema,
} from './schema';

export async function register(body: RegisterPayload) {
  const { data } = await api.post<RegisterResponse>('/users/', body);
  return registerResponse.parse(data);
}

export async function login(body: LoginPayload) {
  const { data } = await api.post<LoginResponse>('/token/login/', body);
  return loginResponse.parse(data);
}

export async function getMe() {
  const { data } = await api.get<AccountSchema>('/users/me/');
  return accountSchema.parse(data);
}
