<template>
  <UiButton variant="tertiary" @click="account.logout">Выйти</UiButton>
</template>

<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { UiButton } from '@/shared/ui';

const account = useAccount();
</script>
