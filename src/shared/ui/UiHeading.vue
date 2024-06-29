<template>
  <h1 v-if="variant === 'h1'" class="text-2xl font-bold">
    <slot />
  </h1>
  <h2 v-if="variant === 'h2'" class="text-xl font-bold">
    <slot />
  </h2>
  <h3 v-if="variant === 'h3'" class="text-lg font-bold">
    <slot />
  </h3>
  <h4 v-if="variant === 'h4'" class="text-base font-bold">
    <slot />
  </h4>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'h1' | 'h2' | 'h3' | 'h4';
  }>(),
  {
    variant: 'h1',
  }
);
</script>

<style scoped></style>
