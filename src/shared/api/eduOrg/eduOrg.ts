import { api } from '../base';
import { eduOrgPaginatedResponse, eduOrgSchema, type EduOrgParams } from './schema';

export async function getOrgs(params?: EduOrgParams) {
  const { data } = await api.get('/educational_organizations/', { params });
  return eduOrgPaginatedResponse.parse(data);
}

export async function getOrg(id: number) {
  const { data } = await api.get(`/educational_organizations/${id}/`);
  return eduOrgSchema.parse(data);
}
