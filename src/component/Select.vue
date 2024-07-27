<template>
  <select id="educational_organization">
    <option v-bind:educational_organization="university" v-for="option in options">
      {{ option.university }}
    </option>
  </select>
</template>

<script lang="ts">
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
    };
  },
};
</script>
