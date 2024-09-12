import { DataUrl } from '@/shared/lib';
import { z } from 'zod';
import { certificateList } from '../certificate/schema';

export const roles = ['student', 'parent', 'teacher', 'director'] as const;
export const roleLabels: Record<(typeof roles)[number], string> = {
  director: 'Директор',
  parent: 'Родитель',
  student: 'Студент',
  teacher: 'Учитель',
} as const;

export const accountSchema = z.object({
  achievements: z.string().nullable(),
  competencies: z.string().nullable(),
  competitions: z.string().nullable(),
  educational_organization: z.number().nullable(),
  certificates: certificateList.nullable(),
  email: z.string().email(),
  first_name: z
    .string()

    .max(30, { message: 'Имя должно быть не более 30 символов' })
    .nullable(),
  id: z.number().int(),
  last_name: z.string().max(30, { message: 'Фамилия должна быть не более 30 символов' }).nullable(),
  patronymic: z
    .string()
    .max(30, { message: 'Отчество должно быть не более 30 символов' })
    .nullable(),
  phone_number: z
    .custom(
      (p) => (typeof p === 'string' && !p) || (typeof p === 'string' && p.startsWith('+7') && /^\+7\d{10}$/.test(p)),
      'Номер телефона должен быть в формате +79991112233'
    )
    .nullable()
    .optional(),
  photo: z.string().url().nullable(),
  professional_competencies: z
    .array(z.string())
    .max(10, 'Можно добавить максимум 10 значений')
    .nullable(),
  professional_interests: z
    .array(z.string())
    .max(10, 'Можно добавить максимум 10 значений')
    .nullable(),
  specialty: z.string().nullable(),
  telegram: z
    .custom(
      (t) =>
        (typeof t === 'string' && !t) || (typeof t === 'string' && t.startsWith('https://t.me/')),
      'Ссылка на Telegram должна начинаться с https://t.me/'
    )
    .nullable()
    .optional(),
  role: z.enum(roles).default('student').nullable().optional(),
});

export type AccountSchema = z.infer<typeof accountSchema>;

export const registerPayload = z
  .object({
    email: z.string({ message: 'Обязательное поле' }).email({ message: 'Невалидный email' }),
    password: z
      .string({ message: 'Обязательное поле' })
      .min(8, { message: 'Пароль должен быть не менее 8 символов' })
      .max(32, { message: 'Пароль должен быть не более 32 символов' }),
  })

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

export const restorePasswordConfirmPayload = z
  .object({
    new_password: z
      .string({ message: 'Обязательное поле' })
      .min(8, { message: 'Пароль должен быть не менее 8 символов' })
      .max(32, { message: 'Пароль должен быть не более 32 символов' }),
    re_new_password: z
      .string({ message: 'Обязательное поле' })
      .min(8, { message: 'Пароль должен быть не менее 8 символов' })
      .max(32, { message: 'Пароль должен быть не более 32 символов' }),
    token: z.string({ message: 'Обязательное поле' }),
    uid: z.string({ message: 'Обязательное поле' }),
  })
  .refine((data) => data.new_password === data.re_new_password, {
    message: 'Пароли не совпадают',
    path: ['re_new_password'],
  });

export type RestorePasswordConfirmPayload = z.infer<typeof restorePasswordConfirmPayload>;

export const updateAccountPayload = accountSchema
  .omit({
    photo: true,
  })
  .extend({
    photo: z.custom<DataUrl>(
      (file) => {
        return (
          (file instanceof DataUrl && !file.size) ||
          (file instanceof DataUrl && (file.size ?? Number.MAX_SAFE_INTEGER) <= 8 * 1024 * 1024)
        );
      },
      {
        message: 'Размер файла должен быть не более 8 МБ',
      }
    ),
  })
  .partial();

export type UpdateAccountPayload = z.infer<typeof updateAccountPayload>;
