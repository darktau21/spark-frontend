<script setup lang="ts">
import { routeNames } from '@/shared/lib';
import { UiNavLink } from '@/shared/ui';
</script>

<template>
  <div class="auth-buttons">
    <UiNavLink :to="{ name: routeNames.login }" variant="primary">Вход</UiNavLink>
    <UiNavLink :to="{ name: routeNames.register }" variant="secondary">Регистрация</UiNavLink>
  </div>
</template>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
</style>
