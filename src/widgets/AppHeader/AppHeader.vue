<script setup lang="ts">
import { AuthButtons } from '@/features/auth/ui';
import { routeNames } from '@/shared/lib';
import { UiHeader, UiIcon, UiLogo, UiMenuButton, UiNavLink, UiNavMenu } from '@/shared/ui';
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
    </template>
    <template #right>
      <AuthButtons />
    </template>
  </UiHeader>
</template>

<style scoped></style>
