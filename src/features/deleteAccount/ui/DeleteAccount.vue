<template>
  <UiButton variant="danger" @click="account.deleteAccount"> Удалить аккаунт </UiButton>
</template>
<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { UiButton } from '@/shared/ui';

const account = useAccount();
</script>
