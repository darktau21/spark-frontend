import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { TYPE, useToast } from 'vue-toastification';
import questions from './questions.json';
import { computed, ref } from 'vue';
import { testApi } from '@/shared/api';
import { routeNames, storage } from '@/shared/lib';
import { wait } from '@/shared/lib/wait';

const TEST_STORE_KEY = 'store:test';

export const useTest = defineStore(TEST_STORE_KEY, () => {
  const toast = useToast();
  const router = useRouter();
  // Определяем вопросы с фиксированными значениями
  const testRes = ref<testApi.TestResponse>();
  const prevTestRes = ref<testApi.TestResponse>();
  const state = ref<'start' | 'inProgress' | 'end'>('start');
  const currentIndex = ref(0);
  const localResults = ref<Record<string, string>>({});
  const sums = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // Массив для хранения сумм
  const isFirst = computed(() => currentIndex.value <= 0);
  const isLast = computed(() => currentIndex.value >= questions.length - 1);
  const isAllQuestionsCompleted = computed(
    () => Object.keys(localResults.value).length === questions.length
  );
  const currentQuestion = computed(() => {
    return questions[currentIndex.value];
  });

  // Функция для получения суммы ответов на заданные вопросы
  const getSum = (questionIds: number[]) => {
    return questionIds.reduce((sum, id) => {
      const value = localResults.value[id];
      return sum + (value ? parseInt(value, 10) : 0);
    }, 0);
  };

  // Вопросы, на которые нужно подсчитать сумму ответов
  const ERM = [1, 14, 27, 40, 53, 65];
  const TMM = [3, 16, 29, 31, 42, 55];
  const SS = [9, 22, 48, 54, 61, 73];
  const ERS = [4, 17, 30, 43, 56, 68];
  const TMS = [6, 19, 32, 45, 66, 70];
  const EMP = [20, 35, 50, 52, 63, 76];
  const ERI = [12, 25, 36, 38, 41, 51];
  const PL = [2, 10, 23, 37, 49, 69];
  const PRO = [5, 15, 44, 62, 64, 75];
  const SF = [8, 11, 18, 24, 28, 57];
  const IMP = [7, 33, 46, 59, 71, 74];
  const NEU = [21, 34, 47, 60, 67, 72];
  const VAL = [13, 26, 39, 58, 77];
  // Функция для обновления сумм
  const updateSums = () => {
    sums.value[0] = getSum(ERM);
    sums.value[1] = getSum(TMM);
    sums.value[2] = getSum(SS);
    sums.value[3] = getSum(ERS);
    sums.value[4] = getSum(TMS);
    sums.value[5] = getSum(EMP);
    sums.value[6] = getSum(ERI);
    sums.value[7] = getSum(PL);
    sums.value[8] = getSum(PRO);
    sums.value[9] = getSum(SF);
    sums.value[10] = getSum(IMP);
    sums.value[11] = getSum(NEU);
    sums.value[12] = getSum(VAL);
  };

  const clear = () => {
    prevTestRes.value = undefined;
    testRes.value = undefined;
    state.value = 'start';
    currentIndex.value = 0;
    localResults.value = {};
    sums.value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  };

  const next = () => {
    if (isLast.value) {
      state.value = 'end';
      return;
    }
    if (state.value === 'start') {
      state.value = 'inProgress';
      return;
    }
    currentIndex.value++;
  };

  const prev = () => {
    if (isFirst.value) {
      state.value = 'start';
      console.log('state start');
      return;
    }
    if (state.value === 'end') {
      state.value = 'inProgress';
      return;
    }

    currentIndex.value--;
  };

  const getTests = async () => {
    const res = await testApi.getTest();
    testRes.value = res.results[0];
    prevTestRes.value = res.results[1];
  };
  const save = async () => {
    try {
      if (!isAllQuestionsCompleted.value) {
        toast.error('Невозможно сохранить тест, так как не на все вопросы даны ответы');
        return;
      }
      updateSums();
      const loader = toast.info('Сохранение результата теста', { timeout: false });
      await testApi.saveTest({ answers: sums.value });
      await wait(5000);
      router.push({ name: routeNames.account });
      clear();
      await getTests();
      toast.update(loader, {
        content: 'Результаты теста успешно сохранены',
        options: {
          type: TYPE.SUCCESS,
          timeout: 5000,
        },
      });
    } catch (e) {
      toast.warning(
        'Произошла ошибка отправки теста, перезагрузите страницу, чтобы отправить результат повторно'
      );
    }
  };
  const saveLocal = () => {
    if (!isAllQuestionsCompleted.value) {
      toast.error('Невозможно сохранить тест, так как не на все вопросы даны ответы');
      return;
    }
    updateSums();
    storage.set('testResults', sums.value);
    toast.info('Результаты теста сохранены, войдите для просмотра');
    router.push({ name: routeNames.login });
    clear();
  };

  getTests();

  return {
    testRes,
    prevTestRes,
    next,
    prev,
    currentQuestion,
    localResults,
    state,
    isFirst,
    isLast,
    save,
    saveLocal,
    isAllQuestionsCompleted,
  };
});