<template>
  <div class="gradient-border-container">
    <div class="gradient-border-content">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    borderRadius?: number;
    borderWidth?: number;
  }>(),
  {
    borderRadius: 100,
    borderWidth: 10,
  }
);

const borderRadius = computed(() => `${props.borderRadius}px`);
const borderWidth = computed(() => `${props.borderWidth}px`);
const contentBorderRadius = computed(() => `${props.borderRadius - props.borderWidth}px`);
</script>
<style scoped>
.gradient-border-container {
  background: radial-gradient(
      51.12% 56.12% at 100% 0%,
      #730f94 0%,
      rgba(175, 70, 210, 0.2) 63.01%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, #02012b 0%, #2955ec 100%);
  border-radius: v-bind(borderRadius);
  padding: v-bind(borderWidth);
  max-width: 100%;
}
.gradient-border-content {
  background: white;
  border-radius: v-bind(contentBorderRadius);
  /* overflow: hidden; */
  max-width: 100%;
  min-height: 100%;
}

.gradient-border-content > :first-child {
  border-radius: v-bind(contentBorderRadius);
}
</style>
