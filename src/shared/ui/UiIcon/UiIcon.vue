<template>
  <svg
    :height="height"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
  >
    <use :height="height" :width="width" :xlink:href="`${sprite}#${icon}`"></use>
  </svg>
</template>

<script setup lang="ts">
import sprite from './sprite.svg';

type Icon =
  | 'checkbox'
  | 'checkbox-checked'
  | 'close'
  | 'eye-closed'
  | 'eye-opened'
  | 'menu'
  | 'phone'
  | 'mail'
  | 'tg'
  | 'arrow'
  | 'plus'
  | "trash";

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
