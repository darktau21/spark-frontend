import { onMounted, onUnmounted, type Ref } from 'vue';

export const useClickOutside = (ref: Ref<HTMLElement | null>, callback: () => void) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.value && !ref.value.contains(event.target as Node)) {
      callback();
    }
  };

  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
};
