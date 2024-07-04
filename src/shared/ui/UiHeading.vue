<template>
  <h1 v-if="variant === 'h1'" class="heading h1">
    <slot />
  </h1>
  <h2 v-if="variant === 'h2'" class="heading h2">
    <slot />
  </h2>
  <h3 v-if="variant === 'h3'" class="heading h3">
    <slot />
  </h3>
  <h4 v-if="variant === 'h4'" class="heading h4">
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

<style scoped>
.h1 {
  --font-size: 2.8rem;
  --font-weight: 700;
}
.h2 {
  --font-size: 2.4rem;
  --font-weight: 700;
}
.h3 {
  --font-size: 1.8rem;
  --font-weight: 700;
}
.h4 {
  --font-size: 1.6rem;
  --font-weight: 700;
}
.heading {
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  padding: 0;
  margin: 0;
  line-height: 1.25;
}
</style>
