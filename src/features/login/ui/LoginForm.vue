<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { UiButton, UiInput, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';

const validationSchema = toTypedSchema(accountApi.loginPayload);
const { errors, handleSubmit, meta, defineField } = useForm<accountApi.LoginPayload>({
  validationSchema,
});

const [email, emailAttrs] = defineField('email', { validateOnChange: true });
const [password, passwordAttrs] = defineField('password', { validateOnChange: true });

const account = useAccount();
const isSubmitAllowed = computed(() => {
  return !account.isLoading.login && Object.keys(errors.value).length === 0 && meta.value.valid;
});

const isError = computed(() => Object.keys(errors.value).length > 0);

const onSubmit = handleSubmit(async (values) => {
  await account.login(values);
});
</script>

<template>
  <form class="form" :validation-schema="validationSchema" @submit="onSubmit">
    <UiInput
      id="email"
      autocomplete="email"
      name="email"
      placeholder="Email"
      label="Введите адрес эл. почты"
      :disabled="account.isLoading.login"
      v-bind="emailAttrs"
      v-model="email"
    />
    <UiPasswordInput
      id="password"
      autocomplete="new-password"
      name="password"
      placeholder="Не менее 8 символов"
      label="Пароль"
      :disabled="account.isLoading.login"
      v-bind="passwordAttrs"
      v-model="password"
    />
    <UiButton :disabled="!isSubmitAllowed" :error="isError" class="button" type="submit">
      Зарегистрироваться
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
</style>
