<template>
  <UiGradientBorder v-if="!isQueryMatched">
    <UiTwoSidesBlock>
      <template #left>
        <UiTilesImage />
      </template>
      <template #right>
        <slot />
      </template>
    </UiTwoSidesBlock>
  </UiGradientBorder>
  <UiTwoSidesBlock v-else>
    <template #left>
      <UiTilesImage />
    </template>
    <template #right>
      <slot />
    </template>
  </UiTwoSidesBlock>
</template>

<script setup lang="ts">
import { useMatchMedia } from '@/shared/lib';
import { UiGradientBorder, UiTilesImage, UiTwoSidesBlock } from '@/shared/ui';

const isQueryMatched = useMatchMedia('(max-width: 64em)');
</script>

<style scoped>
.form-wrapper {
  padding: 3rem 15%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: stretch;
}

.form-border {
  align-self: center;
}

@media screen and (max-width: 50rem) {
  .form-wrapper {
    padding: 3rem 1.5rem;
  }
}
</style>
