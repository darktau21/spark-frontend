/* eslint-disable perfectionist/sort-objects */

import { defineStore } from 'pinia';

export const useUsersStore = defineStore('user', {
  state: () => {
    return {
      test_result: '', // Результаты тестирования
      certificates: '',
      professional_interests: '',
      achievements: '',
    };
  },
});
