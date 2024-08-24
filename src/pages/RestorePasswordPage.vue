<template>
  <div class="page">
    <AuthForm>
      <UiGradientBorder :border-radius="30" :border-width="4">
        <RestorePasswordForm />
      </UiGradientBorder>
    </AuthForm>
  </div>
</template>

<script setup lang="ts">
import { RestorePasswordForm } from '@/features/restorePassword';
import { UiGradientBorder } from '@/shared/ui';
import { AuthForm } from '@/widgets/AuthForm';
</script>

<style scoped>
.page {
  padding: 5rem 0;
}

@media screen and (max-width: 40em) {
  .page {
    padding: 0;
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
