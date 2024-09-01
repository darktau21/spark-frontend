<template>
  <UiInput :id ref="inputRef" :label :name :type="inputType" :value class="password-input">
    <UiButton
      class="button"
      type="button"
      variant="tertiary"
      @click.stop.prevent="togglePasswordVisibility"
      @mousedown.prevent
      @mouseup.prevent
    >
      <UiIcon :icon="eyeIcon" />
    </UiButton>
  </UiInput>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import UiButton from './UiButton.vue';
import UiIcon from './UiIcon/UiIcon.vue';
import UiInput from './UiInput.vue';

defineProps<{
  id: string;
  label?: string;
  name: string;
  value?: string;
}>();

const inputRef = ref<InstanceType<typeof UiInput>>();
const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
};

const inputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const eyeIcon = computed(() => (isPasswordVisible.value ? 'eye-opened' : 'eye-closed'));
</script>

<style scoped>
.button {
  color: rgb(21, 21, 21);
}
</style>
