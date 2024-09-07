import { z } from 'zod';
import { createPaginatedResponse } from '../schema';

export const eduOrgSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type EduOrg = z.infer<typeof eduOrgSchema>;

export const eduOrgPaginatedResponse = createPaginatedResponse(eduOrgSchema);
export type EduOrgPaginatedResponse = z.infer<typeof eduOrgPaginatedResponse>;

export type EduOrgParams = { limit?: number; offset?: number; search?: string };
