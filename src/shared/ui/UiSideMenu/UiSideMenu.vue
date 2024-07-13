<template>
  <Teleport to="#side-menu">
    <Transition :duration="500">
      <div
        v-if="sideMenuState.isOpen"
        aria-describedby="side-menu-description"
        aria-labeledby="side-menu-title"
        class="wrapper"
        role="dialog"
        @click="sideMenuState.closeSideMenu"
      >
        <div v-if="sideMenuState.isOpen" class="menu" @click.stop>
          <header class="header">
            <UiHeading id="side-menu-title" variant="h2">{{ title }}</UiHeading>
            <UiButton variant="tertiary-light" @click="sideMenuState.closeSideMenu">
              <UiIcon :height="30" :width="30" icon="close" />
            </UiButton>
          </header>
          <div class="menu-content">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { UiButton, UiHeading, UiIcon } from '..';
import { useSideMenu } from './useSideMenu';

const sideMenuState = useSideMenu();

defineProps<{
  title: string;
}>();
</script>

<style scoped>
.wrapper {
  position: fixed;
  inset: 0;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  cursor: pointer;
  z-index: 10;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  max-width: 70%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  transition: max-width 0.5s ease;
  cursor: default;
}

.menu-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  overflow-y: auto;
  height: 100%;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease-in-out;
}
.v-leave-active {
  transition-delay: 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-active .menu,
.v-leave-active .menu {
  transition: all 0.3s ease-in-out;
}
.v-enter-active .menu {
  transition-delay: 0.25s;
}

.v-enter-from .menu,
.v-leave-to .menu {
  transform: translateX(-60px);
  opacity: 0;
}
</style>
