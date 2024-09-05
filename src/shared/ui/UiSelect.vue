<template>
  <div class="wrapper">
    <label :for="id" class="label">
      <UiHeading variant="h3">{{ label }}</UiHeading>
    </label>
    <VueSelect
      :reduce="(o: Option) => o.value"
      :options
      label="label"
      v-bind="$attrs"
      :searchable="false"
      class="select"
      :deselectFromDropDown="false"
      :clearable="false"
      :input-id="id"
    >
      <template #no-options> Нет доступных значений </template>
    </VueSelect>
    <div class="error">
      <UiParagraph v-show="errorMessage" variant="p3">
        {{ errorMessage }}
      </UiParagraph>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueSelect from 'vue-select';
import UiHeading from './UiHeading.vue';
import UiParagraph from './UiParagraph.vue';
import { useField } from 'vee-validate';

type Option = { label: string; value: string | number | null };

const props = defineProps<{
  id: string;
  label?: string;
  name: string;
  options: Option[];
}>();

const { errorMessage } = useField(props.name, undefined, {
  validateOnValueUpdate: true,
});
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 9ch;
}

.select {
  --vs-border-width: 0;
  --vs-font-size: 1.6rem;
  height: 3.8rem;
  padding: 0 0.6rem;
  padding-top: 0.2rem;
  background-color: rgb(238, 238, 238);
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

.select::placeholder {
  color: rgb(0, 0, 0, 0.2);
}

.select:focus {
  background-color: rgb(244, 244, 244);
  outline: 1px solid rgb(151, 71, 255);
}

.select:disabled {
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
<style>
.vs__dropdown-menu {
  top: calc(100% + 1rem) !important;
}
</style>
