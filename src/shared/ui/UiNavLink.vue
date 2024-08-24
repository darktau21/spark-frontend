<template>
  <RouterLink :class="['link', variant]" :to="to" active-class="active">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { type RouteLocationAsRelativeGeneric, RouterLink } from 'vue-router';

type Variant = `${'dark' | 'light'}${'' | '-line'}`;

withDefaults(
  defineProps<{
    to: RouteLocationAsRelativeGeneric;
    variant?: Variant;
  }>(),
  {
    variant: 'dark-line',
  }
);
</script>

<style scoped>
.dark {
  --color-default: rgba(3, 0, 124, 1);
  --color-hover: rgba(141, 164, 243, 1);
  --color-active: rgba(37, 78, 220, 1);

  --font-size: 1.8rem;
  --font-weight: 600;

  --wrap: normal;
  --padding: 0.5rem;
}

.dark-line {
  --color-default: rgba(3, 0, 124, 1);
  --color-hover: rgba(141, 164, 243, 1);
  --color-active: rgba(37, 78, 220, 1);

  --font-size: 1.8rem;
  --font-weight: 600;

  --wrap: nowrap;
  --padding: 0.5rem;
}

.light {
  --color-default: rgba(255, 255, 255);
  --color-hover: rgba(200, 200, 255);
  --color-active: rgba(150, 150, 255);

  --font-size: 1.8rem;
  --font-weight: 600;

  --wrap: normal;
  --padding: 0.5rem;
}

.light-line {
  --color-default: rgba(255, 255, 255);
  --color-hover: rgba(200, 200, 255);
  --color-active: rgba(150, 150, 255);

  --font-size: 1.8rem;
  --font-weight: 600;

  --wrap: nowrap;
  --padding: 0.5rem;
}

.link {
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding: var(--padding);
  transition:
    background 0.15s ease-in-out,
    color 0.15s ease-in-out;
  cursor: pointer;
  color: var(--color-default);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  white-space: var(--wrap);
}

@media screen and (hover: hover) {
  .link:hover {
    color: var(--color-hover);
  }
}

.link.active,
.link:active {
  color: var(--color-active);
}

.link.dark-line::before,
.link.light-line::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  width: 0%;
  height: 2px;
  transition: width 0.15s ease-in-out;
  background-color: var(--color-active);
}

.link.dark-line.active::before,
.link.dark-line:active::before,
.link.light-line.active::before,
.link.light-line:active::before {
  width: 100%;
}
</style>
