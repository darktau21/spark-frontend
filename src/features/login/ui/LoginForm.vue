<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { routeNames } from '@/shared/lib';
import { UiButton, UiCheckBox, UiInput, UiNavLink, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';

const validationSchema = toTypedSchema(accountApi.loginPayload);
const { defineField, errors, handleSubmit, meta } = useForm<accountApi.LoginPayload>({
  validationSchema,
});

const [email, emailAttrs] = defineField('email', { validateOnChange: true });
const [password, passwordAttrs] = defineField('password', { validateOnChange: true });

const account = useAccount();
const isSubmitAllowed = computed(() => {
  return !account.isLoading.login && Object.keys(errors.value).length === 0 && meta.value.valid;
});

const isError = computed(() => Object.keys(errors.value).length > 0);

const remember = ref(false);

const onSubmit = handleSubmit(async (values) => {
  await account.login(values, remember.value);
});
</script>

<template>
  <form :validation-schema="validationSchema" class="form" @submit="onSubmit">
    <UiInput
      id="email"
      v-bind="emailAttrs"
      v-model="email"
      :disabled="account.isLoading.login"
      autocomplete="email"
      label="Введите адрес эл. почты"
      name="email"
      placeholder="Email"
    />
    <UiPasswordInput
      id="password"
      v-bind="passwordAttrs"
      v-model="password"
      :disabled="account.isLoading.login"
      autocomplete="new-password"
      label="Пароль"
      name="password"
      placeholder="Не менее 8 символов"
    />
    <UiCheckBox v-model="remember">Запомнить меня</UiCheckBox>
    <UiNavLink
      :to="{ name: routeNames.restorePassword }"
      class="forgot-password"
      variant="tertiary"
    >
      Забыли пароль?
    </UiNavLink>
    <UiButton :disabled="!isSubmitAllowed" :error="isError" class="button" type="submit">
      Войти
    </UiButton>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.6rem;
}
.button {
  align-self: center;
}

.forgot-password {
  align-self: flex-start;
}
</style>
