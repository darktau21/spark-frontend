import { ref } from 'vue';

export function useMatchMedia(query: string) {
  const mql = window.matchMedia(query);
  const isMatched = ref<boolean>(mql.matches);

  mql.onchange = (e) => {
    isMatched.value = e.matches;
  };

  return isMatched;
}
