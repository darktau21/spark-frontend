<script>
import { useAccount } from '@/entities/account';
const userStore = useAccount();
// import { useUsersStore } from '@/stores';
// const user = useUsersStore();

export default {
  name: 'Roleuser',
  data() {
    return {
      userStore,
    };
  },
};
</script>

<template>
  <select id="role_user">
    <option selected disabled hidden>Не выбрано</option>
    <option>Руководитель</option>
    <option>Преподаватель</option>
    <option>Студент</option>
  </select>
</template>
