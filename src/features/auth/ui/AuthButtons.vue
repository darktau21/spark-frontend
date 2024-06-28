<script setup lang="ts">
import { UiButton } from '@/shared/ui';
</script>

<template>
  <div class="auth-buttons">
    <UiButton>Вход</UiButton>
    <UiButton>Регистрация</UiButton>
  </div>
</template>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
</style>
