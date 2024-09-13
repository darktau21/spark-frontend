import { useAccount } from "@/entities/account";
import { certApi } from "@/shared/api";
import { defineStore } from "pinia";
import { ref, watch } from "vue";

const CERTIFICATES_STORE_KEY = 'store:certificates';
export const useCertificates = defineStore(CERTIFICATES_STORE_KEY, () => {
  const certificates = ref<certApi.CertificateList>([]);
  const account = useAccount();

  const loadCertificates = async (isAuth: boolean) => {
    if (!isAuth) {
      return;
    }

    certificates.value = await certApi.getCertificates();
  }

  const uploadCertificate = async (cert: File) => {
    await certApi.uploadCertificate(cert);
    await loadCertificates(account.isAuthorized);
  }

  const remove = async (id: number) => {
    await certApi.deleteCertificate(id);
    await loadCertificates(account.isAuthorized);

  }



  watch([account.isAuthorized, account.data] as const, async ([isAuth]) => await loadCertificates(isAuth), { immediate: true })

  return {
    uploadCertificate,
    loadCertificates,
    remove,
    certificates
  }
});