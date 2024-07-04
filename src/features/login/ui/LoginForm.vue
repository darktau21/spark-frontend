<script setup lang="ts">
import { useLogin } from '@/entities/account/model/useLogin';
import { accountApi } from '@/shared/api';
import { UiButton, UiInput, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';

const validationSchema = toTypedSchema(accountApi.loginPayload);
const { errors, handleSubmit, meta } = useForm<accountApi.LoginPayload>({
  validationSchema,
});
const { isError: isQueryError, isPending, mutate } = useLogin();
const isSubmitAllowed = computed(() => {
  return !isPending.value && Object.keys(errors.value).length === 0 && meta.value.valid;
});

const isError = computed(() => isQueryError.value || Object.keys(errors.value).length > 0);

const onSubmit = handleSubmit(async (values) => {
  mutate(values);
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
      :disabled="isPending"
    />
    <UiPasswordInput
      id="password"
      autocomplete="new-password"
      name="password"
      placeholder="Не менее 8 символов"
      label="Пароль"
      :disabled="isPending"
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
  gap: 1.6rem;
}
.button {
  align-self: center;
}
</style>
