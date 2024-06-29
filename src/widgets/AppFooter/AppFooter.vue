<script setup lang="ts">
import { routeNames } from '@/shared/lib';
import { UiFooter, UiLogo, UiNavLink, UiOuterLink } from '@/shared/ui';
</script>

<template>
  <UiFooter>
    <template #logo>
      <UiLogo />
    </template>

    <div class="footer-links">
      <UiNavLink :to="{ name: routeNames.home }">Главная</UiNavLink>
      <UiNavLink :to="{ name: routeNames.account }">Личный кабинет</UiNavLink>
      <UiNavLink :to="{ name: routeNames.test }">Тестирование</UiNavLink>
    </div>
    <div class="footer-links">
      <UiOuterLink href="https://www.google.com">
        Согласие на обработку персональных данных
      </UiOuterLink>
      <UiOuterLink href="https://www.google.com"> Политика конфиденциальности </UiOuterLink>
    </div>
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
