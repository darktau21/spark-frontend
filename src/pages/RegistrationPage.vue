<template>
  <div class="page">
    <AuthForm>
      <UiGradientBorder class="form-border" :border-width="4" :border-radius="30">
        <RegistrationForm />
      </UiGradientBorder>
    </AuthForm>
  </div>
</template>

<script setup lang="ts">
import { RegistrationForm } from '@/features/registration';
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
</style>
