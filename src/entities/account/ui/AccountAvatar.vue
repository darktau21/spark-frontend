<template>
  <div class="account-avatar" variant="tertiary-light">
    <div class="image-wrapper">
      <img v-if="!isLoading" :src="avatar ?? roflanEbalo" class="image" />
      <UiSkeleton v-else />
    </div>
    <div class="name">
      <span v-if="!isLoading" class="name-text">{{ name ?? 'Аноним' }}</span>
      <UiSkeleton v-else class="name-skeleton" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UiSkeleton } from '@/shared/ui';

import roflanEbalo from './roflanebalo.webp';

withDefaults(
  defineProps<{
    avatar?: null | string;
    isLoading?: boolean;
    name?: null | string;
  }>(),
  {
    avatar: roflanEbalo,
    isLoading: true,
    name: 'Аноним',
  }
);
</script>

<style scoped>
.image-wrapper {
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  border: 1px solid rgb(217, 217, 217);
  overflow: hidden;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.account-avatar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.name-skeleton {
  height: 1.6rem;
  min-width: 10ch;
}

.name-text {
  display: inline-block;
  max-width: 12ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
