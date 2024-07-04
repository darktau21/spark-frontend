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
import { useAccount } from '@/entities/account/model/useAccount';
import { accountApi } from '@/shared/api';
import { api } from '@/shared/api/base';
import { AppLayout } from '@/shared/layouts';
import { AppFooter } from '@/widgets/AppFooter';
import { AppHeader } from '@/widgets/AppHeader';
import { RouterOutlet } from '@/widgets/RouterOutlet';
import { onMounted } from 'vue';

onMounted(() => {
  try {
    const data = accountApi.getMe();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
</script>
