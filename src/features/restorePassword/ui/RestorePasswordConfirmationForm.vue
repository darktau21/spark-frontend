<template>
  <form class="form">
    <UiPasswordInput
      id="new-password"
      v-bind="newPasswordAttrs"
      v-model="newPassword"
      :disabled="account.isLoading.restorePassword"
      autocomplete="email"
      label="Введите новый пароль"
      name="new_password"
      placeholder="Не менее 8 символов"
    />
    <UiPasswordInput
      id="re-new-password"
      v-bind="reNewPasswordAttrs"
      v-model="reNewPassword"
      :disabled="account.isLoading.restorePassword"
      autocomplete="email"
      label="Повторите пароль"
      name="re_new_password"
    />
    <UiButton :disabled="!isSubmitAllowed" :error="isError" class="button" @click="onSubmit"
      >Сменить пароль</UiButton
    >
  </form>
</template>

<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { UiButton, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed } from 'vue';

const props = defineProps<{
  token: string;
  uid: string;
}>();

const validationSchema = toTypedSchema(accountApi.restorePasswordConfirmPayload);
const { defineField, errors, handleSubmit, meta } =
  useForm<accountApi.RestorePasswordConfirmPayload>({
    initialValues: {
      token: props.token,
      uid: props.uid,
    },
    validationSchema,
  });

const [newPassword, newPasswordAttrs] = defineField('new_password', { validateOnChange: true });
const [reNewPassword, reNewPasswordAttrs] = defineField('re_new_password', {
  validateOnChange: true,
});

const account = useAccount();
const isSubmitAllowed = computed(() => {
  return (
    !account.isLoading.restorePasswordConfirm &&
    Object.keys(errors.value).length === 0 &&
    meta.value.valid
  );
});
const isError = computed(() => Object.keys(errors.value).length > 0);

const onSubmit = handleSubmit(async (data) => {
  await account.confirmRestorePassword({
    ...data,
    token: props.token,
    uid: props.uid,
  });
});
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
