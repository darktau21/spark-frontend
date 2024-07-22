import { api } from '../base';
import {
  type AccountSchema,
  type LoginPayload,
  type LoginResponse,
  type RegisterPayload,
  type RegisterResponse,
  type RestorePasswordConfirmPayload,
  type RestorePasswordPayload,
  accountSchema,
  loginResponse,
  registerResponse,
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

export async function logout() {
  await api.post('/token/logout/');
}

export async function restorePassword(body: RestorePasswordPayload) {
  await api.post('/reset_password/', body);
}

export async function restorePasswordConfirm(body: RestorePasswordConfirmPayload) {
  await api.post('/users/reset_password_confirm/', body);
}
