import { z } from 'zod';

export const accountSchema = z.object({
  // TODO Rewrite competencies check
  // competencies: z.record(z.string().optional(), z.string().optional()).nullable(),
  educational_organization: z.number().nullable(),
  first_name: z
    .string()
    .min(3, { message: 'Имя должно быть не менее 3 символов' })
    .max(30, { message: 'Имя должно быть не более 30 символов' })
    .nullable(),
  id: z.number().int(),
  last_name: z
    .string({ message: 'Обязательное поле' })
    .min(3, { message: 'Фамилия должна быть не менее 3 символов' })
    .max(30, { message: 'Фамилия должна быть не более 30 символов' })
    .nullable(),
  patronymic: z
    .string()
    .min(3, { message: 'Отчество должно быть не менее 3 символов' })
    .max(30, { message: 'Отчество должно быть не более 30 символов' })
    .nullable(),
  phone_number: z.string().nullable(),
  photo: z.string().url().nullable(),
  // professional_competencies: z.record(z.string().optional(), z.string().optional()).nullable(),
  telegram: z.string().nullable(),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export const registerPayload = z
  .object({
    email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
    password: z
      .string({ message: 'Обязательное поле' })
      .min(8, { message: 'Пароль должен быть не менее 8 символов' })
      .max(32, { message: 'Пароль должен быть не более 32 символов' }),
    re_password: z
      .string({ message: 'Обязательное поле' })
      .min(8, { message: 'Пароль должен быть не менее 8 символов' })
      .max(32, { message: 'Пароль должен быть не более 32 символов' }),
  })
  .refine((data) => data.password === data.re_password, {
    message: 'Пароли не совпадают',
    path: ['re_password'],
  });

export type RegisterPayload = z.infer<typeof registerPayload>;

export const registerResponse = z.object({
  email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
});

export type RegisterResponse = z.infer<typeof registerResponse>;

export const loginPayload = z.object({
  email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
  password: z
    .string({ message: 'Обязательное поле' })
    .min(8, { message: 'Пароль должен быть не менее 8 символов' })
    .max(32, { message: 'Пароль должен быть не более 32 символов' }),
});

export type LoginPayload = z.infer<typeof loginPayload>;

export const loginResponse = z.object({
  auth_token: z.string({ message: 'Токен не найден' }),
});

export type LoginResponse = z.infer<typeof loginResponse>;

export const restorePasswordPayload = z.object({
  email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
});

export type RestorePasswordPayload = z.infer<typeof restorePasswordPayload>;

export const restorePasswordResponse = z.object({
  message: z.string(),
});

export type RestorePasswordResponse = z.infer<typeof restorePasswordResponse>;
