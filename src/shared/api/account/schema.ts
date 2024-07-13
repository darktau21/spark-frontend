import { z } from 'zod';

export const accountSchema = z.object({
  // TODO: switch optional to nullable
  avatar: z.string().url().optional(),
  email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
  first_name: z
    .string({ message: 'Обязательное поле' })
    .min(3, { message: 'Имя должно быть не менее 3 символов' })
    .max(30, { message: 'Имя должно быть не более 30 символов' }),
  id: z.number().int(),
  last_name: z
    .string({ message: 'Обязательное поле' })
    .min(3, { message: 'Фамилия должна быть не менее 3 символов' })
    .max(30, { message: 'Фамилия должна быть не более 30 символов' }),
  patronymic: z
    .string()
    .min(3, { message: 'Отчество должно быть не менее 3 символов' })
    .max(30, { message: 'Отчество должно быть не более 30 символов' })
    .nullable(),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export const registerPayload = accountSchema
  .omit({ id: true })
  .extend({
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

export const registerResponse = accountSchema.pick({
  email: true,
  first_name: true,
  id: true,
  last_name: true,
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
