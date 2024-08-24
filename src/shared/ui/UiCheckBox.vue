<script setup lang="ts">
import { computed } from 'vue';

import UiIcon from './UiIcon';

defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  modelValue: boolean;
}>();
defineEmits(['update:modelValue']);
const iconName = computed(() => (props.modelValue ? 'checkbox-checked' : 'checkbox'));

const handleKeyboardFocus = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLElement) {
    event.target.click();
  }
};
</script>

<template>
  <label class="label" tabindex="0" @keydown.space.enter.prevent="handleKeyboardFocus">
    <input
      class="checkbox"
      type="checkbox"
      v-bind="$attrs"
      :value="props.modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked ?? false)"
    />
    <UiIcon :icon="iconName" class="icon" />
    <slot />
  </label>
</template>

<style scoped>
.checkbox {
  appearance: none;
  background: none;
  margin: 0;
  display: none;
  cursor: pointer;
}

.label {
  margin: 0;
  padding: 0;
  padding-left: 3rem;
  position: relative;
  cursor: pointer;
  user-select: none;
}

.icon {
  position: absolute;
  top: 1rem;
  transform: translateY(-50%);
  left: 0;
  color: rgb(21, 21, 21);
}
</style>
