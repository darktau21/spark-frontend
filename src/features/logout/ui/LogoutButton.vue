<template>
  <UiButton variant="tertiary-light" @click="account.logout">Выйти</UiButton>
</template>

<script setup>
import { useAccount } from '@/entities/account';
import { UiButton } from '@/shared/ui';

const account = useAccount();
</script>
