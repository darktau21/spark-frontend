<template>
  <slot :setSelectedTab="setSelectedCurrentTab" :isSelected="isSelected" />
</template>
<script setup lang="ts">
import { computed, inject } from 'vue';
import { SELECTED_TAB_SYMBOL, SET_TAB_SYMBOL, type TabId } from './const';
const props = defineProps<{
  /**
   * Уникальный (!) id таба, который будет отображен при нажатии на содержимое слота
   */
  tabId: TabId;
}>();
const setSelectedTab = inject(SET_TAB_SYMBOL);
const selectedTab = inject(SELECTED_TAB_SYMBOL);
if (!setSelectedTab) {
  throw new Error('setSelectedTab is not provided');
}
const setSelectedCurrentTab = () => setSelectedTab(props.tabId);
const isSelected = computed(() => selectedTab?.value === props.tabId);
</script>