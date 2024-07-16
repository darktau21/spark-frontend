import { z } from 'zod';

export const accountSchema = z.object({
  competencies: z.array(z.string()).optional(),
  educational_organization: z.number().optional(),
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
    .optional(),
  phone_number: z.string().optional(),
  photo: z.string().url().optional(),
  professional_competencies: z.array(z.string()).optional(),
  telegram: z.string().optional(),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export const registerPayload = accountSchema
  .pick({ email: true, first_name: true, last_name: true })
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

export const restorePasswordPayload = z.object({
  email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
});

export type RestorePasswordPayload = z.infer<typeof restorePasswordPayload>;

export const restorePasswordResponse = z.object({
  message: z.string(),
});

export type RestorePasswordResponse = z.infer<typeof restorePasswordResponse>;
