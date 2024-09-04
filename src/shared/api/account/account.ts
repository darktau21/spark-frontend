import imageCompression from 'browser-image-compression';
import { api } from '../base';
import {
  type AccountSchema,
  type LoginPayload,
  type LoginResponse,
  type RegisterPayload,
  type RegisterResponse,
  type RestorePasswordConfirmPayload,
  type RestorePasswordPayload,
  type UpdateAccountPayload,
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

export async function updateMe(body: UpdateAccountPayload) {
  if (body.photo?.file && body.photo?.file instanceof File) {
    await uploadAvatar(body.photo.file);
  }
  delete body.photo;
  body.professional_competencies = body.professional_competencies ?? [];
  const { data } = await api.put<AccountSchema>('/users/me/', body);
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

export async function deleteAccount() {
  await api.delete('/users/me/');
}

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  const compressedFile = await imageCompression(file, {
    maxWidthOrHeight: 250,
    initialQuality: 0.8,
  });
  console.log(compressedFile, 'compFile', file);
  formData.append('photo', new File([compressedFile], file.name));

  const { data } = await api.patch<AccountSchema>('/users/me/', formData);
  return data;
}
