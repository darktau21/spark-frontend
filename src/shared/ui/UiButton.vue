<template>
  <button :class="['button', variant, error && 'error', active && 'active']">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    active?: boolean;
    error?: boolean;
    variant?: 'danger' | 'primary' | 'secondary' | 'tertiary' | 'tertiary-light';
  }>(),
  {
    active: false,
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
  --bg-color-error: rgb(254, 25, 25);
  --bg-color-disabled: rgb(202, 202, 202);

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.secondary {
  --color-default: rgb(2, 0, 119);
  --color-hover: rgb(111, 65, 186);
  --color-active: rgb(255, 255, 255);
  --color-error: rgb(254, 25, 25);
  --color-disabled: rgb(202, 202, 202);

  --bg-color-active: linear-gradient(316.71deg, #0c08a7 0%, #6386fe 100%);

  --border-default: 1px solid rgb(2, 0, 119);
  --border-hover: 1px solid rgb(111, 65, 186);
  --border-active: 1px solid transparent;
  --border-error: 1px solid transparent;
  --border-disabled: 1px solid transparent;

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
}

.tertiary {
  --color-default: rgba(3, 0, 124, 1);
  --color-hover: rgba(141, 164, 243, 1);
  --color-active: rgba(37, 78, 220, 1);
  --color-error: rgb(254, 25, 25);
  --color-disabled: rgb(202, 202, 202);

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 0.5rem;
}

.tertiary-light {
  --color-default: rgba(255, 255, 255);
  --color-hover: rgba(200, 200, 255);
  --color-active: rgba(150, 150, 255);
  --color-error: rgb(254, 25, 25);
  --color-disabled: rgb(202, 202, 202);

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 0.5rem;
}

.danger {
  --color-default: rgb(255, 255, 255);
  --color-hover: rgb(255, 255, 255);
  --color-active: rgb(255, 255, 255);
  --color-disabled: rgb(255, 255, 255);

  --bg-color-default: rgb(254, 25, 25);
  --bg-color-hover: rgb(229, 23, 23);
  --bg-color-active: rgb(206, 21, 21);
  --bg-color-disabled: rgb(202, 202, 202);

  --font-size: 1.8rem;
  --font-weight: 600;

  --padding: 1.2rem 2rem;
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
