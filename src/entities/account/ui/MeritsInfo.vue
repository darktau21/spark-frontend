<template>
  <UiGradientBorder :border-radius="borderRadius" :border-width="4">
    <div class="merits-info">
      <div :class="['info', !achievements && 'info-not-defined']">
        <UiHeading variant="h2">Достижения</UiHeading>
        <UiParagraph v-show="!isLoading" class="info-value">{{ achievements || 'Не указано' }}</UiParagraph>
        <UiSkeleton v-show="isLoading"height="2rem"/>
      </div>
      <div :class="['info', !competitions && 'info-not-defined']">
        <UiHeading variant="h2">Конкурсы</UiHeading>
        <UiParagraph v-show="!isLoading" class="info-value">{{ competitions || 'Не указано' }}</UiParagraph>
        <UiSkeleton v-show="isLoading"height="2rem"/>
      </div>
      <div class="info">
        <slot/>
      </div>
    </div>
  </UiGradientBorder>
</template>
<script setup lang="ts">
import { useMatchMedia } from '@/shared/lib';
import { UiGradientBorder, UiHeading, UiParagraph, UiSkeleton } from '@/shared/ui';
import { computed } from 'vue';

withDefaults(defineProps<Partial<{
  achievements: string | null;
  competitions: string | null;
  isLoading: boolean;
}>>(), {});

const isMediaMatches = useMatchMedia('(max-width: 52em)');
const borderRadius = computed(() => (isMediaMatches.value ? 20 : 60));
</script>
<style scoped>
.merits-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.info-value {
  --font-size: 2rem;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
}
.info-not-defined {
  color: rgb(156, 159, 169);
}
</style>