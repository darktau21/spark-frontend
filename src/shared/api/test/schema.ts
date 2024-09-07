import { z } from 'zod';
import { createPaginatedResponse } from '../schema';
export const testSchema = z.object({
  answers: z.array(z.number()),
});

export const testResponseSchema = testSchema.extend({
  id: z.number(),
  created: z.string(),
});

export const testPaginatedResponse = createPaginatedResponse(testResponseSchema);

export type TestPayload = z.infer<typeof testSchema>;
export type TestResponse = z.infer<typeof testResponseSchema>;
export type TestPaginatedResponse = z.infer<typeof testPaginatedResponse>;
export type TestParams = {
  page: number;
  page_size: number;
};
