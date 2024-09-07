import { api } from "../base";
import { testPaginatedResponse, testSchema, type TestParams, type TestPayload } from './schema';

export async function saveTest(body: TestPayload) {
  const { data } = await api.post('/users/me/main-test/', body);
  return testSchema.parse(data);
}

export async function getTest(params?: TestParams) {
  const { data } = await api.get('/users/me/main-test/', { params });
  return testPaginatedResponse.parse(data);
}
 