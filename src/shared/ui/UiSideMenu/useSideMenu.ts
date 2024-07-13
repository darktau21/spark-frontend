import { defineStore } from 'pinia';
import { ref } from 'vue';

const SIDE_MENU_STORE_KEY = "store:sideMenu";

export const useSideMenu = defineStore(SIDE_MENU_STORE_KEY, () => {
  const isOpen = ref(false);

  const closeSideMenu = () => isOpen.value = false;
  const openSideMenu = () => isOpen.value = true;
  const toggleSideMenu = () => isOpen.value = !isOpen.value;

  return { isOpen, closeSideMenu, openSideMenu, toggleSideMenu };
});
