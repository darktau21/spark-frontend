<script setup lang="ts">
import { AuthButtons } from '@/features/auth/ui';
import { routeNames } from '@/shared/lib';
import {
  UiButton,
  UiHeader,
  UiIcon,
  UiLogo,
  UiNavLink,
  UiNavMenu,
  UiOuterLink,
  UiSideMenu,
  useSideMenu,
} from '@/shared/ui';

const sideMenuState = useSideMenu();
</script>

<template>
  <UiHeader>
    <template #left>
      <UiLogo />
    </template>
    <template #center>
      <UiNavMenu>
        <UiOuterLink href="https://test-iskra.ru/">Главная</UiOuterLink>
        <UiNavLink :to="{ name: routeNames.test }">Тестирование</UiNavLink>
        <UiOuterLink href="https://test-iskra.ru/">Мероприятия</UiOuterLink>
      </UiNavMenu>
      <UiButton
        :active="sideMenuState.isOpen"
        class="menu-button"
        variant="secondary"
        @click="sideMenuState.openSideMenu"
      >
        <UiIcon :height="30" :width="30" icon="menu" />
        <UiSideMenu title="Меню">
          <UiOuterLink href="https://test-iskra.ru/" @click="sideMenuState.closeSideMenu">
            Главная
          </UiOuterLink>
          <UiNavLink :to="{ name: routeNames.test }" @click="sideMenuState.closeSideMenu">
            Тестирование
          </UiNavLink>
          <UiOuterLink href="https://test-iskra.ru/" @click="sideMenuState.closeSideMenu">
            Мероприятия
          </UiOuterLink>
        </UiSideMenu>
      </UiButton>
    </template>
    <template #right>
      <AuthButtons />
    </template>
  </UiHeader>
</template>

<style scoped>
.menu-button {
  display: none;
  margin-right: auto;
  padding: 0.5rem;
}

@media (max-width: 56em) {
  .menu-button {
    display: flex;
  }
}
</style>
