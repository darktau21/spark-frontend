<script setup lang="ts">
import { ref } from 'vue';
import { fileToDataURL } from '../lib';
import UiButton from './UiButton.vue';


type DataUrl = { dataUrl: string; size: number, name: string, file: File };

const uploadedUrls = ref<DataUrl[]>([]);
const inputRef = ref<HTMLInputElement>();

const emit = defineEmits<{
  change: [fileDataUrls: DataUrl[]];
}>();

defineProps<{
  multiple?: boolean;
  id?: string;
  name?: string;
  label: string;
  accept?: string;
}>();

const handleChange = async (e: Event) => {
  const input = e.target as HTMLInputElement;
  const filesArray = Array.from(input.files ?? []);
  const urls = await Promise.all(
    filesArray.map(async (f) => ({ dataUrl: await fileToDataURL(f), size: f.size, name: f.name, file: f }))
  );
  uploadedUrls.value = urls;
  emit('change', urls)
};

const handleClick = () => {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.click();
}
</script>

<template>
  <div class="file-input-wrapper">
    <slot name="view" :uploadedUrls />
    <slot name="msg"/>
    <UiButton @click.prevent="handleClick" variant="secondary">{{ label }}</UiButton>
    <input v-bind="$attrs" :accept :id :name multiple ref="inputRef" @change="handleChange" type="file" class="file-input" />
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
