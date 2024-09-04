<template>
  <div class="accordion">
    <slot name="button" :toggle :isOpened />
    <div v-show="isOpened">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isOpened = ref(false);

const toggle = () => (isOpened.value = !isOpened.value);
</script>
<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}
</style>