/* eslint-disable perfectionist/sort-objects */
import { defineStore } from 'pinia';
import { boolean } from 'zod';

export const useUsersStore = defineStore('user', {
  state: () => {
    return {
      user: [
        {
          education: '', //Образование
          first_name: '', //Имя
          last_name: '', //Фамилия
          patronymic_name: '', //Отчество
          tel_number: '', // Номер телефона
          user_email: 'iskra@mail.ru',
          telegram: '', //Телеграм
          avatar: {
            type: File, // Аватар
          },
          prof_interes: '', //Проф интересы
          achievements: '', // Достижения
          competencies: '', // Компетенции
          skills: '', // Проф навыки
          contests: '', // Конкурсы
          certificates: {
            // Сертификаты
            type: File,
          },

          total_result: '', // Результаты тестирования
        },
      ],
    };
  },
  // getters: {
  //   getUser(state) {
  //     return state.user;
  //   },
  // },

  // actions: {},
});
