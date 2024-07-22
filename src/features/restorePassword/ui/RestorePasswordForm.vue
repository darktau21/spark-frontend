<template>
  <form class="form">
    <UiInput
      id="restore-password-email"
      v-bind="emailAttrs"
      v-model="email"
      :disabled="account.isLoading.restorePassword"
      autocomplete="email"
      label="Введите адрес электронной почты, указанный при регистрации, для отправки ссылки по сбросу пароля"
      name="email"
      placeholder="Email"
    />
    <UiButton :disabled="!isSubmitAllowed" :error="isError" class="button" @click="onSubmit"
      >Восстановить пароль</UiButton
    >
  </form>
</template>

<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { UiButton, UiInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';

const validationSchema = toTypedSchema(accountApi.restorePasswordPayload);
const { defineField, errors, handleSubmit, meta } = useForm<accountApi.RestorePasswordPayload>({
  validationSchema,
});

const [email, emailAttrs] = defineField('email', { validateOnChange: true });

const account = useAccount();
const isSubmitAllowed = computed(() => {
  return (
    !account.isLoading.restorePassword && Object.keys(errors.value).length === 0 && meta.value.valid
  );
});

const onSubmit = handleSubmit(async ({ email }) => {
  await account.restorePassword(email);
});

const isError = computed(() => Object.keys(errors.value).length > 0);
</script>

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
