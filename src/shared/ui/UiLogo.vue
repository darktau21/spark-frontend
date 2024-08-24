<script setup lang="ts">
import { routeNames } from '@/shared/lib';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

import UiLogoSvg from './UiLogoSvg.vue';

type Variant = 'dark' | 'light';

const props = withDefaults(
  defineProps<{
    variant?: Variant;
  }>(),
  {
    variant: 'dark',
  }
);

const COLORS_MAP: Record<Variant, string> = {
  dark: 'rgb(2, 0, 119)',
  light: 'rgb(255, 255, 255)',
};

const color = computed(() => COLORS_MAP[props.variant]);
</script>

<template>
  <RouterLink :to="{ name: routeNames.home }" class="logo">
    <span class="logo-icon"><UiLogoSvg width="45" height="40" /></span>
    <span class="logo-text">ИСКРА</span>
  </RouterLink>
</template>

<style scoped>
.logo {
  font-size: 3.8rem;
  font-weight: 700;
  line-height: 1;
  color: v-bind(color);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
}

@media screen and (max-width: 30em) {
  .logo-text {
    display: none;
  }
}
</style>
