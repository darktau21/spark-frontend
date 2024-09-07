<template>
  <div class="accordion">
    <slot name="button" :toggle :isOpened />
    <div class="content" ref="content">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap';
import { nextTick, useTemplateRef, watch } from 'vue';
import { ref } from 'vue';

const content = useTemplateRef<HTMLDivElement>('content');
const isOpened = ref(false);
watch(isOpened, async (newVal) => {
  await nextTick(); // Ensure DOM is updated
  const el = content.value;
  const height = el?.scrollHeight || 1500;
  const duration = Math.min(height / 500, 1.5); // Scale duration based on height
  if (!el) {
    return;
  }
  if (newVal) {
    el.style.display = 'block'; // Set display block before animation
    await gsap.fromTo(el, { height: 0 }, { height: `auto` }).duration(duration);
  } else {
    await gsap.to(el, { height: 0 }).duration(duration);
    el.style.display = 'none'; // Set display none after animation
  }
});
const toggle = () => (isOpened.value = !isOpened.value);
</script>
<style scoped>
.accordion {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  overflow: hidden;
}

.content {
  height: 0;
  display: none;
}
</style>
