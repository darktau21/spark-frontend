<template>
  <select id="educational_organization">
    <option v-for="option in options">
      {{ option.university }}
    </option>
  </select>
</template>

<script lang="ts">
import { useAccount } from '@/entities/account';
const userStore = useAccount();

export default {
  name: 'Select',
  data() {
    return {
      options: [
        { university: 'МГУ' },
        { university: 'ФСБ' },
        { university: 'РИНХ' },
        { university: 'ДГТУ' },
        { university: 'ЮФУ' },
      ],
      education: { university: 'Не выбрано' },
      userStore,
    };
  },
};
</script>
