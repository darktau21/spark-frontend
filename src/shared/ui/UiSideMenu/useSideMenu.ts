import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

const SIDE_MENU_STORE_KEY = "store:sideMenu";

export const useSideMenu = defineStore(SIDE_MENU_STORE_KEY, () => {
  const isOpen = ref(false);

  const closeSideMenu = () => isOpen.value = false;
  const openSideMenu = () => isOpen.value = true;
  const toggleSideMenu = () => isOpen.value = !isOpen.value;

  watch(isOpen, () => {
    if (isOpen.value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });

  return { isOpen, closeSideMenu, openSideMenu, toggleSideMenu };
});
