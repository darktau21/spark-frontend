<script setup lang="ts">
import { computed, ref } from 'vue';
import { DataUrl } from '../lib/DataUrl';
import UiButton from './UiButton.vue';
import { useField, validate } from 'vee-validate';

const uploadedUrls = ref<DataUrl[]>([]);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  change: [fileDataUrls: DataUrl[]];
}>();

const props = defineProps<{
  multiple?: boolean;
  id?: string;
  name: string;
  label: string;
  accept?: string;
  maxSize?: number;
}>();

const handleClick = () => {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.click();
};

const { errorMessage, handleBlur, handleChange, validate } = useField(props.name, undefined);

const reset = () => (uploadedUrls.value = []);

defineExpose({
  reset,
});

const onChange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const filesArray = Array.from(input.files ?? []);
  const urls = await Promise.all(filesArray.map(async (f) => await DataUrl.create(f)));
  handleChange(props.multiple ? urls : urls[0]);
  const res = await validate();
  uploadedUrls.value = res.valid ? urls : [];
};
</script>

<template>
  <div class="file-input-wrapper">
    <slot name="view" :uploadedUrls />
    <slot name="msg" :errorMessage />
    <UiButton @click.prevent="handleClick" variant="secondary">{{ label }}</UiButton>
    <input
      v-bind="$attrs"
      :accept
      :id
      :name
      multiple
      ref="inputRef"
      @change="onChange"
      @blur="handleBlur"
      type="file"
      class="file-input"
    />
  </div>
</template>
<style scoped>
.file-input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.file-input {
  display: none;
}
</style>
