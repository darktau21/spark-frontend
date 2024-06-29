<template>
  <a :class="['button', variant]" rel="noopener noreferrer" target="_blank">
    <slot />
  </a>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary';
  }>(),
  {
    variant: 'tertiary',
  }
);
</script>

<style scoped>
.primary {
  --color-default: rgb(255, 255, 255);
  --color-hover: rgb(255, 255, 255);
  --color-active: rgb(255, 255, 255);

  --bg-color-default: rgb(151, 71, 255);
  --bg-color-hover: rgb(94, 0, 215);
  --bg-color-active: rgb(68, 15, 136);

  --border-default: none;
  --border-hover: none;
  --border-active: none;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.secondary {
  --color-default: rgb(151, 71, 255);
  --color-hover: rgb(94, 0, 215);
  --color-active: rgb(68, 15, 136);

  --bg-color-default: transparent;
  --bg-color-hover: transparent;
  --bg-color-active: transparent;

  --border-default: 1px solid rgb(151, 71, 255);
  --border-hover: 1px solid rgb(94, 0, 215);
  --border-active: 1px solid rgb(68, 15, 136);

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.tertiary {
  --color-default: rgb(0, 0, 0);
  --color-hover: rgb(151, 71, 255);
  --color-active: rgb(94, 0, 215);

  --bg-color-default: transparent;
  --bg-color-hover: transparent;
  --bg-color-active: transparent;

  --border-default: none;
  --border-hover: none;
  --border-active: none;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1rem 1rem 1rem 0.4rem;
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
