<template>
  <span class="skeleton"></span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    animationDuration?: string;
  }>(),
  {
    animationDuration: '2s',
  }
);
</script>

<style scoped>
.skeleton {
  display: inline-block;
  background-color: rgb(217, 217, 217);
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.skeleton::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  z-index: 1;
  animation: shimmer v-bind(animationDuration) infinite;
}

@keyframes shimmer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
