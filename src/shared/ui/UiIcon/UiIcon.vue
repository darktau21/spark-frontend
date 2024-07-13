<template>
  <svg
    :width="width"
    :height="height"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <use :width="width" :height="height" :xlink:href="`${sprite}#${icon}`"></use>
  </svg>
</template>

<script setup lang="ts">
import sprite from './sprite.svg';

type Icon = 'checkbox' | 'checkbox-checked' | 'eye-opened' | 'eye-closed' | 'menu' | 'close';

withDefaults(
  defineProps<{
    height?: number;
    icon: Icon;
    width?: number;
  }>(),
  {
    height: 20,
    width: 20,
  }
);
</script>
