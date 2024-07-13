<template>
  <UiButton variant="tertiary-light" @click="account.logout">Выйти</UiButton>
</template>

<script setup>
import { UiButton } from '@/shared/ui';
import { useAccount } from '@/entities/account';

const account = useAccount();
</script>
