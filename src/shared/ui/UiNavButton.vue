<template>
  <RouterLink :class="['button', variant]" :to="to" active-class="active">
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
import { type RouteLocationAsRelativeGeneric, RouterLink } from 'vue-router';

withDefaults(
  defineProps<{
    to: RouteLocationAsRelativeGeneric;
    variant?: 'primary' | 'secondary' | 'tertiary';
  }>(),
  {
    variant: 'primary',
  }
);
</script>

<style scoped>
.primary {
  --color-default: rgb(255, 255, 255);
  --color-hover: rgb(255, 255, 255);
  --color-active: rgb(255, 255, 255);

  --bg-color-default: radial-gradient(
      51.12% 56.12% at 100% 0%,
      #730f94 0%,
      rgba(175, 70, 210, 0.2) 63.01%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, #02012b 0%, #2955ec 100%);
  --bg-color-hover: linear-gradient(
    135.99deg,
    #02012b -28.99%,
    #080339 6.47%,
    #072f9e 49.44%,
    #af46d2 96.04%
  );
  --bg-color-active: linear-gradient(316.71deg, #0c08a7 0%, #6386fe 100%);

  --border-default: none;
  --border-hover: none;
  --border-active: none;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.secondary {
  --color-default: rgb(2, 0, 119);
  --color-hover: rgb(111, 65, 186);
  --color-active: rgb(255, 255, 255);

  --bg-color-default: transparent;
  --bg-color-hover: transparent;
  --bg-color-active: linear-gradient(316.71deg, #0c08a7 0%, #6386fe 100%);

  --border-default: 1px solid rgb(2, 0, 119);
  --border-hover: 1px solid rgb(111, 65, 186);
  --border-active: 1px solid transparent;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.button {
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding: var(--padding);
  transition:
    background 0.15s ease-in-out,
    color 0.15s ease-in-out;
  border-radius: 10px;
  border: var(--border-default);
  cursor: pointer;
  background: var(--bg-color-default);
  color: var(--color-default);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  white-space: nowrap;
}

@media (hover: hover) {
  .button:hover {
    background: var(--bg-color-hover);
    color: var(--color-hover);
    border: var(--border-default);
  }
}

.button:active,
.active {
  background: var(--bg-color-active);
  color: var(--color-active);
  border: var(--border-active);
}
</style>
