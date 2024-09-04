<template>
  <div class='window' v-show="isSelected">
      <slot :isSelected="isSelected" />
  </div>
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { SELECTED_TAB_SYMBOL, type TabId } from './const';
const props = defineProps<{
  /**
   * Уникальный id таба
   */
  tabId: TabId;
}>();
const selectedTab = inject(SELECTED_TAB_SYMBOL);
const isSelected = computed(() => selectedTab?.value === props.tabId);
</script>
<style scoped>
.window {
  max-width: 100%;
}
</style>