<template>
  <div class="page">
    <UiTwoSidesBlock>
      <template #right>
        <div class="form-wrapper">
          <UiHeading align="center">Смена пароля</UiHeading>
          <RestorePasswordConfirmationForm :token="token" :uid="uid" />
        </div>
      </template>
    </UiTwoSidesBlock>
  </div>
</template>

<script setup lang="ts">
import { RestorePasswordConfirmationForm } from '@/features/restorePassword';
import { UiHeading, UiTwoSidesBlock } from '@/shared/ui';

defineProps<{
  token: string;
  uid: string;
}>();
</script>

<style scoped>
.page {
  padding: 10rem 0;
}

@media screen and (max-width: 40rem) {
  .page {
    padding: 5rem 0;
  }
}

.form-wrapper {
  padding: 3rem 15%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: stretch;
}

@media screen and (max-width: 50rem) {
  .form-wrapper {
    padding: 3rem 1.5rem;
  }
}
</style>
