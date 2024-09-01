import { z } from 'zod';

export const eduOrgSchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type EduOrg = z.infer<typeof eduOrgSchema>;

export const eduOrgList = z.array(eduOrgSchema);
export type EduOrgList = z.infer<typeof eduOrgList>;

export const eduOrgListParams = z.object({
  search: z.string(),
});
export type EduOrgListParams = z.infer<typeof eduOrgListParams>;
