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
import { AppLayout } from '@/shared/layouts';
import { routeNames } from '@/shared/lib';
import { AppFooter } from '@/widgets/AppFooter';
import { AppHeader } from '@/widgets/AppHeader';
import { RouterOutlet } from '@/widgets/RouterOutlet';
import { onErrorCaptured, onMounted } from 'vue';
import { useRouter } from 'vue-router';

onErrorCaptured((error) => {
  const router = useRouter();
  console.error(error);
  router.push({ name: routeNames.serverError });
});

onMounted(async () => {
  const account = useAccount();
  window.addEventListener('beforeunload', async () => {
    await account.rememberMeHandler();
  });
});
</script>
