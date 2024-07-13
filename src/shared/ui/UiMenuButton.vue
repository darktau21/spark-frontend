<template>
  <div ref="menuRef" class="menu-wrapper">
    <slot :is-open="isOpen" :toggle-menu="toggle" name="button" />
    <Transition>
      <div v-show="isOpen" class="menu">
        <slot :is-open="isOpen" :toggle-menu="toggle" name="menu" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from 'vue';

import { useClickOutside } from '../lib';

const menuRef = ref<HTMLElement | null>(null);
useClickOutside(menuRef, () => {
  isOpen.value = false;
});

const props = withDefaults(
  defineProps<{
    open?: boolean;
  }>(),
  {
    open: false,
  }
);

const isOpen = ref(props.open);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.menu-wrapper {
  position: relative;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 2;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
