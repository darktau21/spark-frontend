<template>
  <div class="menu-wrapper" ref="menuRef">
    <slot name="button" :isOpen="isOpen" :toggleMenu="toggle" />
    <Transition>
      <div v-show="isOpen" class="menu">
        <slot name="menu" :isOpen="isOpen" :toggleMenu="toggle" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps } from 'vue';
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
