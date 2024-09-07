import imageCompression from 'browser-image-compression';
import { api, handleSchemaError } from '../base';
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

export const login = handleSchemaError(async (body: LoginPayload) => {
  const { data } = await api.post<LoginResponse>('/token/login/', body);
  return loginResponse.parse(data);
});

export const register = handleSchemaError(async (body: RegisterPayload) => {
  const { data } = await api.post<RegisterResponse>('/users/', body);
  return registerResponse.parse(data);
});

export const getMe = handleSchemaError(async () => {
  const { data } = await api.get<AccountSchema>('/users/me/');
  return accountSchema.parse(data);
});

export const updateMe = handleSchemaError(async (body: UpdateAccountPayload) => {
  if (body.photo?.file && body.photo?.file instanceof File) {
    await uploadAvatar(body.photo.file);
  }
  delete body.photo;
  body.professional_competencies = body.professional_competencies ?? [];
  const { data } = await api.put<AccountSchema>('/users/me/', body);
  return accountSchema.parse(data);
});

export const logout = handleSchemaError(async () => {
  await api.post('/token/logout/');
});

export const restorePassword = handleSchemaError(async (body: RestorePasswordPayload) => {
  await api.post('/reset_password/', body);
});

export const restorePasswordConfirm = handleSchemaError(
  async (body: RestorePasswordConfirmPayload) => {
    await api.post('/users/reset_password_confirm/', body);
  }
);

export const deleteAccount = handleSchemaError(async () => {
  await api.delete('/users/me/');
});

export const uploadAvatar = handleSchemaError(async (file: File) => {
  const formData = new FormData();
  const compressedFile = await imageCompression(file, {
    maxWidthOrHeight: 1200,
    initialQuality: 0.95,
  });
  formData.append('photo', new File([compressedFile], file.name));

  const { data } = await api.patch<AccountSchema>('/users/me/', formData);
  return data;
});
