<script setup lang="ts">
import { routeNames } from '@/shared/lib';
import { UiButton, UiMenuButton, UiNavLink, UiPanel } from '@/shared/ui';
</script>

<template>
  <UiMenuButton>
    <template #button="{ toggleMenu, isOpen }">
      <UiButton :active="isOpen" variant="tertiary-light" @click="toggleMenu">
        <slot name="account" />
      </UiButton>
    </template>
    <template #menu="{ toggleMenu }">
      <UiPanel>
        <UiNavLink :to="{ name: routeNames.account }" @click="toggleMenu">Мой профиль</UiNavLink>
        <UiNavLink :to="{ name: routeNames.editAccount }" @click="toggleMenu"
          >Редактировать профиль</UiNavLink
        >
        <slot name="logout" />
      </UiPanel>
    </template>
  </UiMenuButton>
</template>
