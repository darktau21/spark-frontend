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
        <UiNavLink :to="{ name: routeNames.home }">Главная</UiNavLink>
        <UiNavLink :to="{ name: routeNames.test }">Тестирование</UiNavLink>
        <UiNavLink :to="{ name: routeNames.events }">Мероприятия</UiNavLink>
      </UiNavMenu>
      <UiButton
        :active="sideMenuState.isOpen"
        class="menu-button"
        variant="tertiary-light"
        @click="sideMenuState.openSideMenu"
      >
        <UiIcon :height="30" :width="30" icon="menu" />
        <UiSideMenu title="Меню">
          <UiNavLink :to="{ name: routeNames.home }" @click="sideMenuState.closeSideMenu"
            >Главная</UiNavLink
          >
          <UiNavLink :to="{ name: routeNames.test }" @click="sideMenuState.closeSideMenu"
            >Тестирование</UiNavLink
          >
          <UiNavLink :to="{ name: routeNames.events }" @click="sideMenuState.closeSideMenu"
            >Мероприятия</UiNavLink
          >
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
  border: 1px solid rgb(224, 224, 224);
  border-radius: 8px;
  padding: 0.5rem;
}

@media (max-width: 56em) {
  .menu-button {
    display: flex;
  }
}
</style>
