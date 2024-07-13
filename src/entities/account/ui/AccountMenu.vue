<script setup lang="ts">
import { routeNames } from '@/shared/lib';
import { UiButton, UiMenuButton, UiNavLink, UiPanel } from '@/shared/ui';
</script>

<template>
  <UiMenuButton>
    <template #button="{ toggleMenu, isOpen }">
      <UiButton variant="tertiary-light" @click="toggleMenu" :active="isOpen">
        <slot />
      </UiButton>
    </template>
    <template #menu="{ toggleMenu }">
      <UiPanel>
        <UiNavLink @click="toggleMenu" :to="{ name: routeNames.account }">Мой профиль</UiNavLink>
        <UiNavLink @click="toggleMenu" :to="{ name: routeNames.editAccount }"
          >Редактировать профиль</UiNavLink
        >
        <UiButton @click="toggleMenu" variant="tertiary-light">Выход</UiButton>
      </UiPanel>
    </template>
  </UiMenuButton>
</template>
