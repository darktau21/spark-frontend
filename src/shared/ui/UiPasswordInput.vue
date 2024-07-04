<template>
  <UiInput class="password-input" :id :name :label :value :type="inputType">
    <UiButton
      type="button"
      class="button"
      @click.stop.prevent="togglePasswordVisibility"
      variant="tertiary"
    >
      <UiIcon :icon="eyeIcon" />
    </UiButton>
  </UiInput>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import UiInput from './UiInput.vue';
import UiIcon from './UiIcon/UiIcon.vue';
import UiButton from './UiButton.vue';

defineProps<{
  label?: string;
  name: string;
  id: string;
  value?: string;
}>();

const isPasswordVisible = ref(false);
const togglePasswordVisibility = () => (isPasswordVisible.value = !isPasswordVisible.value);

const inputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const eyeIcon = computed(() => (isPasswordVisible.value ? 'eye-opened' : 'eye-closed'));
</script>

<style scoped>
.input {
  padding-right: 10rem;
}

.button {
  padding: 0;
  color: rgb(21, 21, 21);
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
}
</style>
