<template>
  <button :class="['button', variant, error && 'error', active && 'active']" :disabled>
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean;
    disabled?: boolean;
    error?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-light';
  }>(),
  {
    active: false,
    disabled: false,
    error: false,
    variant: 'primary',
  }
);
</script>

<style scoped>
.primary {
  --color-default: rgb(255, 255, 255);
  --color-hover: rgb(255, 255, 255);
  --color-active: rgb(255, 255, 255);
  --color-error: rgb(255, 255, 255);
  --color-disabled: rgb(255, 255, 255);

  --bg-color-default: rgb(151, 71, 255);
  --bg-color-hover: rgb(94, 0, 215);
  --bg-color-active: rgb(68, 15, 136);
  --bg-color-error: rgb(254, 25, 25);
  --bg-color-disabled: rgb(202, 202, 202);

  --border-default: none;
  --border-hover: none;
  --border-active: none;
  --border-error: none;
  --border-disabled: none;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.secondary {
  --color-default: rgb(151, 71, 255);
  --color-hover: rgb(94, 0, 215);
  --color-active: rgb(68, 15, 136);
  --color-error: rgb(254, 25, 25);
  --color-disabled: rgb(202, 202, 202);

  --bg-color-default: transparent;
  --bg-color-hover: transparent;
  --bg-color-active: transparent;
  --bg-color-error: transparent;
  --bg-color-disabled: transparent;

  --border-default: 1px solid rgb(151, 71, 255);
  --border-hover: 1px solid rgb(94, 0, 215);
  --border-active: 1px solid rgb(68, 15, 136);
  --border-error: 1px solid rgb(254, 25, 25);
  --border-disabled: 1px solid rgb(202, 202, 202);

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.tertiary {
  --color-default: rgb(151, 71, 255);
  --color-hover: rgb(94, 0, 215);
  --color-active: rgb(68, 15, 136);
  --color-error: rgb(254, 25, 25);
  --color-disabled: rgb(202, 202, 202);

  --bg-color-default: transparent;
  --bg-color-hover: transparent;
  --bg-color-active: transparent;
  --bg-color-error: transparent;
  --bg-color-disabled: transparent;

  --border-default: none;
  --border-hover: none;
  --border-active: none;
  --border-error: none;
  --border-disabled: none;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 0.5rem;
}

.tertiary-light {
  --color-default: rgb(0, 0, 0);
  --color-hover: rgb(179, 107, 255);
  --color-active: rgb(151, 71, 255);
  --color-error: rgb(254, 25, 25);
  --color-disabled: rgb(202, 202, 202);

  --bg-color-default: transparent;
  --bg-color-hover: transparent;
  --bg-color-active: transparent;
  --bg-color-error: transparent;
  --bg-color-disabled: transparent;

  --border-default: none;
  --border-hover: none;
  --border-active: none;
  --border-error: none;
  --border-disabled: none;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 0.5rem;
}

.button {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (hover: hover) {
  .button:hover {
    background: var(--bg-color-hover);
    color: var(--color-hover);
    border: var(--border-default);
  }
}

.button:active,
.button.active {
  background: var(--bg-color-active);
  color: var(--color-active);
  border: var(--border-active);
}

.button:disabled {
  background: var(--bg-color-disabled);
  color: var(--color-disabled);
  border: var(--border-disabled);
  cursor: not-allowed;
}

.button.error {
  background: var(--bg-color-error);
  color: var(--color-error);
  border: var(--border-error);
}
</style>
