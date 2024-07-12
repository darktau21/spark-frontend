<script setup lang="ts">
import { AccountAvatar, AccountMenu, useAccount } from '@/entities/account';
import { routeNames } from '@/shared/lib';
import { UiNavLink } from '@/shared/ui';

const account = useAccount();
</script>

<template>
  <div v-if="!account.isAuthorized" class="auth-buttons">
    <UiNavLink :to="{ name: routeNames.login }" variant="primary">Вход</UiNavLink>
    <UiNavLink :to="{ name: routeNames.register }" variant="secondary">Регистрация</UiNavLink>
  </div>
  <AccountMenu>
    <AccountAvatar :is-loading="account.isLoading.data" :avatar="account.data?.avatar" :name="account.data?.first_name" />
  </AccountMenu>
</template>

<style scoped>
.auth-buttons {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}
</style>
