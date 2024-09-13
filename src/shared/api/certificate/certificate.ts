import { api } from '../base';
import { certificateList, certificateSchema } from './schema';

export async function uploadCertificate(file: File) {
  const body = new FormData();
  const newFile = new File([file], file.name);
  body.append('certificate', newFile);
  console.log(file);
  const { data } = await api.postForm('/users/certificates/', body);
  return certificateSchema.parse(data);
}

export async function getCertificates() {
  const { data } = await api.get('/users/certificates/');
  return certificateList.parse(data);
}

export async function deleteCertificate(id: number) {
  await api.delete(`/users/certificates/${id}`);
}
