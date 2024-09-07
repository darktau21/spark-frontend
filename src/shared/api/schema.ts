import { z } from 'zod';

export function createPaginatedResponse<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    results: z.array(itemSchema),
    count: z.number(),
    next: z.string().url().nullable(),
    previous: z.string().url().nullable(),
  });
}
