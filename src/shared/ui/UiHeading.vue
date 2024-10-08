<template>
  <div>
    <h1 v-if="variant === 'h1'" :class="['heading h1', alignClasses]">
      <slot v-if="!isLoading" />
    </h1>
    <h2 v-if="variant === 'h2'" :class="['heading h2', alignClasses]">
      <slot />
    </h2>
    <h3 v-if="variant === 'h3'" :class="['heading h3', alignClasses]">
      <slot />
    </h3>
    <h4 v-if="variant === 'h4'" :class="['heading h4', alignClasses]">
      <slot />
    </h4>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    align?: 'center' | 'left' | 'right';
    isLoading?: boolean;
    variant?: 'h1' | 'h2' | 'h3' | 'h4'; 
  }>(),
  {
    align: 'left',
    isLoading: false,
    variant: 'h1',
  }
);

const alignClasses = computed(() => {
  return {
    'align-center': props.align === 'center',
    'align-left': props.align === 'left',
    'align-right': props.align === 'right',
  };
});
</script>

<style scoped>
.h1 {
  --font-size: 2.8rem;
  --font-weight: 700;
}
.h2 {
  --font-size: 2.4rem;
  --font-weight: 700;
}
.h3 {
  --font-size: 1.8rem;
  --font-weight: 700;
}
.h4 {
  --font-size: 1.6rem;
  --font-weight: 700;
}
.heading {
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  padding: 0;
  margin: 0;
  line-height: 1.25;
}

.align-center {
  text-align: center;
}
.align-left {
  text-align: left;
}
.align-right {
  text-align: right;
}
</style>
