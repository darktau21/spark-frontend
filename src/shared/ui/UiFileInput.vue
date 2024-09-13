<script setup lang="ts">
import { useField } from 'vee-validate';
import { ref } from 'vue';
import { DataUrl } from '../lib/DataUrl';

const uploadedUrls = defineModel<DataUrl[]>({default: []});
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  change: [fileDataUrls: DataUrl[]];
}>();

const props = defineProps<{
  multiple?: boolean;
  id?: string;
  name: string;
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
  handleChange(props.multiple ? [...urls, ...uploadedUrls.value] : urls[0]);
  const res = await validate();
  uploadedUrls.value = res.valid ? [...urls, ...uploadedUrls.value] : uploadedUrls.value;
};

const remove = (file?: string) => uploadedUrls.value = uploadedUrls.value.filter((f) => f.dataUrl !== file);
</script>

<template>
    <slot :uploadedUrls :errorMessage :handleClick :remove />
    <slot name="msg" />
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
</template>
<style scoped>
.wrapper {
  min-height: 100%;
}
.file-input {
  display: none;
}
</style>
