import { api } from '../base';
import { eduOrgList, eduOrgSchema, type EduOrgListParams } from './schema';

export async function getOrgs(params?: EduOrgListParams) {
  const { data } = await api.get('/educational_organizations/', { params });
  return eduOrgList.parse(data);
}

export async function getOrg(id: number) {
  const { data } = await api.get(`/educational_organizations/${id}/`);
  return eduOrgSchema.parse(data);
}
