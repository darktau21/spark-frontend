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
import { authApi } from '@/shared/api';
import { AppLayout } from '@/shared/layouts';
import { AppFooter } from '@/widgets/AppFooter';
import { AppHeader } from '@/widgets/AppHeader';
import { RouterOutlet } from '@/widgets/RouterOutlet';
import { onMounted } from 'vue';

onMounted(async () => {
  try {
    const response = await authApi.register({
      email: 'test@test.com',
      first_name: 'Test',
      last_name: 'Test',
      password: 'test',
      patronymic: 'Test',
      re_password: 'test',
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
</script>
