import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import questions from './questions.json';

const TEST_STORE_KEY = 'store:test';

export const useTest = defineStore(TEST_STORE_KEY, () => {
  const currentQuestionIndex = ref(0);
  const currentQuestion = computed(() => questions[currentQuestionIndex.value]);
});
