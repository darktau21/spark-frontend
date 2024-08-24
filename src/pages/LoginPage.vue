<template>
  <div class="page">
    <AuthForm>
      <UiGradientBorder class="form-border" :border-width="4" :border-radius="30">
        <LoginForm />
      </UiGradientBorder>
      <div class="question">
        <UiParagraph>
          <span>Нет аккаунта?</span>
          <UiNavLink :to="{ name: routeNames.register }">Зарегистрироваться</UiNavLink>
        </UiParagraph>
      </div>
    </AuthForm>
  </div>
</template>

<script setup lang="ts">
import { LoginForm } from '@/features/login';
import { routeNames } from '@/shared/lib';
import { UiGradientBorder, UiNavLink, UiParagraph } from '@/shared/ui';
import { AuthForm } from '@/widgets/AuthForm';
</script>

<style scoped>
.question:deep(p) {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 3rem;
}

.page {
  padding: 5rem 0;
}

@media screen and (max-width: 40em) {
  .page {
    padding: 0;
  }
}
</style>
