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
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { AppLayout } from '@/shared/layouts';
import { AppFooter } from '@/widgets/AppFooter';
import { AppHeader } from '@/widgets/AppHeader';
import { RouterOutlet } from '@/widgets/RouterOutlet';
import { onMounted } from 'vue';

onMounted(async () => {
  const account = useAccount();
  await account.rememberMeHandler();
  // await accountApi.restorePassword({ email: 'test10@gmail.com' });
});
</script>
