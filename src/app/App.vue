<template>
  <AppLayout>
    <template #header>
      <AppHeader />
    </template>
    <RouterOutlet />
    <template #footer> <AppFooter /> </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { AppLayout } from '@/shared/layouts';
import { AppFooter } from '@/widgets/AppFooter';
import { AppHeader } from '@/widgets/AppHeader';
import { RouterOutlet } from '@/widgets/RouterOutlet';
</script>
