<script setup lang="ts">
import { computed, ref } from 'vue';

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
  if ((event.code === 'Enter' || event.code === 'Space') && event.target instanceof HTMLElement) {
    event.target.click();
  }
};
</script>

<template>
  <div class="wrapper">
    <label class="label" tabindex="0" @keydown="handleKeyboardFocus">
      <input
        class="checkbox"
        type="checkbox"
        v-bind="$attrs"
        :value="props.modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLInputElement)?.checked ?? false)"
      />
      <UiIcon class="icon" :icon="iconName" />
      <slot />
    </label>
  </div>
</template>

<style scoped>
.checkbox {
  appearance: none;
  background: none;
  margin: 0;
  display: none;
}

.label {
  margin: 0;
  padding: 0;
  padding-left: 3rem;
  position: relative;
}

.icon {
  position: absolute;
  top: 0;
  left: 0;
  color: rgb(21, 21, 21);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
