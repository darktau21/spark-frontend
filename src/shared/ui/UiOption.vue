<script setup lang="ts">
import UiIcon from './UiIcon';

withDefaults(defineProps<{
  showClose?: boolean;
}>(), {
showClose: true,
})
</script>

<template>
  <div class="option">
    <span>
      <slot/>
    </span>
    <UiIcon v-if="showClose" icon="close"/>
  </div>
</template>
<style scoped>
.option {
  background-color: rgba(209, 219, 255, 1);
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}
</style>