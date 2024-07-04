<template>
  <div class="page">
    <UiTwoSidesBlock>
      <template #right>
        <div class="form-wrapper">
          <UiHeading>Регистрация</UiHeading>
          <RegistrationForm />
        </div>
      </template>
    </UiTwoSidesBlock>
  </div>
</template>

<script setup lang="ts">
import { RegistrationForm } from '@/features/registration/ui';
import { UiHeading, UiTwoSidesBlock } from '@/shared/ui';
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
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}
</style>
