import { api } from '../base';
import { certificateList, certificateSchema } from './schema';

export async function uploadCertificate(file: File) {
  const body = new FormData();
  body.append('certificate', file);
  const { data } = await api.postForm('/users/certificates/');
  return certificateSchema.parse(data);
}

export async function getCertificates() {
  const { data } = await api.get('/users/certificates/');
  return certificateList.parse(data);
}

export async function deleteCertificate(id: number) {
  await api.delete(`/users/certificates/${id}`);
}
