<script setup lang="ts">
import { AccountAvatar, AccountMenu, useAccount } from '@/entities/account';
import { LogoutButton } from '@/features/logout';
import { routeNames } from '@/shared/lib';
import { UiNavButton } from '@/shared/ui';

const account = useAccount();
</script>

<template>
  <div v-if="!account.isAuthorized" class="auth-buttons">
    <UiNavButton :to="{ name: routeNames.login }" variant="primary">Вход</UiNavButton>
    <UiNavButton :to="{ name: routeNames.register }" variant="secondary">Регистрация</UiNavButton>
  </div>
  <AccountMenu v-else>
    <template #account>
      <AccountAvatar
        :avatar="account.data?.photo"
        :is-loading="account.isLoading.data"
        :name="account.data?.first_name"
      />
    </template>
    <template #logout>
      <LogoutButton />
    </template>
  </AccountMenu>
</template>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
</style>
