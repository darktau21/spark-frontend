<script setup lang="ts">
import { PERSONAL_DATA_CONSENT_LINK, PRIVACY_POLICY_LINK } from '@/shared/const';
import { routeNames } from '@/shared/lib';
import {
  ClientCopyright,
  SotCopyright,
  UiFooter,
  UiLogo,
  UiNavLink,
  UiOuterLink,
  WebWaveCopyright,
} from '@/shared/ui';
</script>

<template>
  <UiFooter>
    <template #logo>
      <UiLogo variant="light" />
    </template>

    <div class="footer-links">
      <UiNavLink variant="light" :to="{ name: routeNames.home }">Главная</UiNavLink>
      <UiNavLink variant="light" :to="{ name: routeNames.account }">Личный кабинет</UiNavLink>
      <UiNavLink variant="light" :to="{ name: routeNames.test }">Тестирование</UiNavLink>
    </div>
    <div class="footer-links">
      <UiOuterLink variant="light" :href="PERSONAL_DATA_CONSENT_LINK">
        Согласие на обработку персональных данных
      </UiOuterLink>
      <UiOuterLink variant="light" :href="PRIVACY_POLICY_LINK">
        Политика конфиденциальности
      </UiOuterLink>
    </div>
    <template #copyrights>
      <ClientCopyright />
      <SotCopyright width="88" height="52" />
      <WebWaveCopyright />
    </template>
  </UiFooter>
</template>

<style scoped>
.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}
</style>
