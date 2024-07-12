<template>
  <div variant="tertiary-light" class="account-avatar">
    <div class="image-wrapper">
      <img class="image" v-if="!isLoading" :src="avatar" />
      <UiSkeleton v-else />
    </div>
    <div class="name">
      <span class="name-text" v-if="!isLoading">{{ name }}</span>
      <UiSkeleton class="name-skeleton" v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UiSkeleton } from '@/shared/ui';
import roflanEbalo from './roflanebalo.webp';

withDefaults(
  defineProps<{
    avatar?: string;
    name?: string;
    isLoading?: boolean;
  }>(),
  {
    isLoading: true,
    avatar: roflanEbalo,
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
