<script setup lang="ts">
import { AuthButtons } from '@/features/auth/ui';
import { UiHeader, UiLogo } from '@/shared/ui';
</script>

<template>
  <UiHeader>
    <template #left>
      <UiLogo />
    </template>
    <template #right>
      <AuthButtons />
    </template>
  </UiHeader>
</template>
