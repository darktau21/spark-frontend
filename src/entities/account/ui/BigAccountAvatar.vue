<template>
  <div class="avatar">
    <img loading="lazy" v-show="!isLoading" :src="avatarUrl ?? avatarPlaceholder" :alt="`Аватар пользователя`" />
    <UiSkeleton v-show="isLoading" />
  </div>
</template>
<script setup lang="ts">
import { UiSkeleton } from '@/shared/ui';
import avatarPlaceholder from './avatar-placeholder.webp';
withDefaults(
  defineProps<
    Partial<{
      avatarUrl: string | null;
      isLoading: boolean;
    }>
  >(),
  {
    isLoading: true,
  }
);
</script>
<style scoped>
.avatar {
  flex: 0 0 170px;
  width: 170px;
  height: 170px;
  clip-path: polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  background-color: rgba(209, 219, 255, 1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
