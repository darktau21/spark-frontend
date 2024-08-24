<template>
  <a :class="['link', variant]" target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
</template>

<script setup lang="ts">
type Variant = 'dark' | 'inline' | 'light';

withDefaults(
  defineProps<{
    variant?: Variant;
  }>(),
  {
    variant: 'dark',
  }
);
</script>

<style scoped>
.dark {
  --color-default: rgba(3, 0, 124, 1);
  --color-hover: rgba(141, 164, 243, 1);
  --color-active: rgba(37, 78, 220, 1);
  --color-visited: --color-visited: rgba(2, 0, 100, 1);

  --font-size: 1.8rem;
  --font-weight: 600;

  --wrap: normal;
  --padding: 0.5rem;
}

.light {
  --color-default: rgba(255, 255, 255);
  --color-hover: rgba(200, 200, 255);
  --color-active: rgba(150, 150, 255);
  --color-visited: rgba(180, 180, 255);

  --font-size: 1.8rem;
  --font-weight: 600;

  --wrap: normal;
  --padding: 0.5rem;
}

.link.inline {
  --color-default: rgba(24, 97, 165, 1);
  --color-hover: rgba(50, 150, 200, 1);
  --color-active: rgba(30, 120, 180, 1);
  --color-visited: rgba(20, 80, 140, 1);

  --font-size: inherit;
  --font-weight: inherit;

  --wrap: normal;
  --padding: 0;

  display: inline;
  text-decoration: underline;
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

.link:visited {
  color: var(--color-visited);
}

@media screen and (hover: hover) {
  .link:hover {
    color: var(--color-hover);
  }
}
</style>
