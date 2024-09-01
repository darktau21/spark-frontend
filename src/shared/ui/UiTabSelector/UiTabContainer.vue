<template>
  <slot />
</template>
<script setup lang="ts">
import { provide, ref } from 'vue';
import { SELECTED_TAB_SYMBOL, SET_TAB_SYMBOL, type TabId } from './const';
const props = defineProps<{
  /**
   * id блока, который необходимо отображать при мануте компонента
   */
  initialSelection: string;
}>();
const selectedTab = ref<TabId>(props.initialSelection);
const setSelectedTab = (tabId: TabId) => (selectedTab.value = tabId);
provide(SELECTED_TAB_SYMBOL, selectedTab);
provide(SET_TAB_SYMBOL, setSelectedTab);
</script>