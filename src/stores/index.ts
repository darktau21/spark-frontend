import { defineStore } from 'pinia';

export const useUsersStore = defineStore('user', {
  state: () => {
    return {
      test_result: '', // Результаты тестирования
      role_user: '',
      last_name: '',
      first_name: '',
      interes: [],
      obr: '',
      sert: [],
      dost: '',
      phone: '',
    };
  },
});
