import { api } from "../base";
import { testSchema, type TestPaginatedResponse, type TestParams, type TestPayload, type TestResponse } from "./schema";

export async function saveTest(body: TestPayload) {
  const { data } = await api.post<TestResponse>('/users/me/main-test/', body);
  return testSchema.parse(data);
}

export async function getTest(params?: TestParams) {
  const { data } = await api.get<TestPaginatedResponse>('/users/me/main-test/', { params });
  return data;
}
 