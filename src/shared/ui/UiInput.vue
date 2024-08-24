<template>
  <div class="wrapper">
    <label :for="id" class="label">
      <UiHeading variant="h3">{{ label }}</UiHeading>
    </label>
    <div class="input-wrapper">
      <input
        v-bind="$attrs"
        :id
        v-model="model"
        :class="[
          { 'input-valid': isValid, 'input-error': !isValid, 'with-slot': isSlotProvided },
          'input',
        ]"
        :name
        :value="inputValue"
        @blur="handleBlur"
        @change="handleChange"
      />
      <span v-if="isSlotProvided" class="tail-icon">
        <slot />
      </span>
    </div>
    <div class="error">
      <UiParagraph v-show="!isValid" variant="p3">
        {{ errorMessage }}
      </UiParagraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, toRef, useSlots } from 'vue';

import UiHeading from './UiHeading.vue';
import UiParagraph from './UiParagraph.vue';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<string>();

const props = defineProps<{
  id: string;
  label?: string;
  name: string;
  value?: string;
}>();

const name = toRef(props, 'name');
const slots = useSlots();

const isSlotProvided = computed(() => slots.default !== undefined);
const {
  errorMessage,
  handleBlur,
  handleChange,
  value: inputValue,
} = useField(name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: true,
});
const isValid = computed(() => !errorMessage.value);
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 28ch;
}

.input-wrapper {
  position: relative;
}

.input {
  background-color: rgb(238, 238, 238);
  padding: 1rem 1.6rem;
  border-radius: 8px;
  font-size: 1.6rem;
  border: none;
  outline: none;
  color: rgb(0, 0, 0);
  transition: 0.3s ease-in-out;
  width: 100%;
}

.label {
  margin-bottom: 0.8rem;
  align-self: flex-start;
}

.input::placeholder {
  color: rgb(0, 0, 0, 0.2);
}

.input:focus {
  background-color: rgb(244, 244, 244);
  outline: 1px solid rgb(151, 71, 255);
}

.input-valid {
  background-color: rgb(238, 238, 238);
}

.input-error {
  background-color: rgb(251, 200, 200);
}

.input:disabled {
  outline: 1px solid rgb(238, 238, 238);
  background-color: rgb(244, 244, 244);
  color: rgb(217, 217, 217);
  cursor: not-allowed;
}

.error {
  height: 1.6rem;
  margin-top: 0.8rem;
  color: rgb(255, 0, 0);
}

.with-slot {
  padding-right: 6rem;
}

.tail-icon {
  padding: 0;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
