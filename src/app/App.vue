<template>
  <AppLayout>
    <template #header>
      <AppHeader />
    </template>
    <RouterOutlet />
    <template #footer>
      <Footer />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { AppLayout } from '@/shared/layouts';
import { AppHeader } from '@/widgets/AppHeader';
import { RouterOutlet } from '@/widgets/RouterOutlet';
</script>
