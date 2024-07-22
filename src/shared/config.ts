import { z } from 'zod';

const envSchema = z.object({
  API_BASE_URL: z.string(),
  APP_NAME: z.string(),
  BASE_URL: z.string(),
  DEV: z.boolean(),
  MODE: z.enum(['development', 'production']),
  PROD: z.boolean(),
});

const fromViteEnv = (env: Record<string, unknown>) =>
  Object.fromEntries(Object.entries(env).map(([key, value]) => [key.replace('VITE_', ''), value]));

export const env = envSchema.parse(fromViteEnv(import.meta.env));
