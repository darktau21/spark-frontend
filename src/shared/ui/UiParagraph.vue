<template>
  <p :class="['paragraph', variant]"><slot /></p>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'p1' | 'p2' | 'p3';
  }>(),
  {
    variant: 'p1',
  }
);
</script>

<style>
.p1 {
  --font-size: 1.8rem;
  --font-weight: 400;
}
.p2 {
  --font-size: 1.6rem;
  --font-weight: 400;
}
.p3 {
  --font-size: 1.4rem;
  --font-weight: 400;
}

.paragraph {
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  padding: 0;
  margin: 0;
}
</style>
