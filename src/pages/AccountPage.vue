<script>
import { useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';
const userStore = useUsersStore();
const { selectedFile } = storeToRefs(useUsersStore());
export default {
  name: 'AccountePage',
  data() {
    return {
      userStore: userStore,
      selectedFile,
    };
  },

  methods: {},
};
</script>

<template>
  <div>
    <h1>Личный кабинет</h1>
    <DeleteAccount />
  </div>
</template>

<script lang="ts" setup>
import { DeleteAccount } from '@/features/deleteAccount';
</script>
