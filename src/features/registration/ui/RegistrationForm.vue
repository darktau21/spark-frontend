<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { UiButton, UiCheckBox, UiInput, UiParagraph, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';

const validationSchema = toTypedSchema(accountApi.registerPayload);
const { defineField, errors, handleSubmit, meta } = useForm<accountApi.RegisterPayload>({
  validationSchema,
});

const [firstName, firstNameAttrs] = defineField('first_name');
const [lastName, lastNameAttrs] = defineField('last_name');
const [patronymic, patronymicAttrs] = defineField('patronymic');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [rePassword, rePasswordAttrs] = defineField('re_password');

const account = useAccount();
const isAgreementChecked = ref(false);
const isSubmitAllowed = computed(() => {
  return (
    !account.isLoading.register &&
    Object.keys(errors.value).length === 0 &&
    meta.value.valid &&
    isAgreementChecked.value
  );
});

const isError = computed(() => Object.keys(errors.value).length > 0);

const onSubmit = handleSubmit(async (values) => {
  await account.register(values);
});
</script>

<template>
  <form :validation-schema="validationSchema" class="form" @submit="onSubmit">
    <UiInput
      id="first_name"
      v-bind="firstNameAttrs"
      v-model="firstName"
      :disabled="account.isLoading.register"
      autocomplete="given-name"
      label="Имя"
      name="first_name"
      placeholder="Не более 30 символов"
    />
    <UiInput
      id="last_name"
      v-bind="lastNameAttrs"
      v-model="lastName"
      :disabled="account.isLoading.register"
      autocomplete="family-name"
      label="Фамилия"
      name="last_name"
      placeholder="Не более 30 символов"
    />
    <UiInput
      id="patronymic"
      v-bind="patronymicAttrs"
      v-model="patronymic"
      :disabled="account.isLoading.register"
      autocomplete="additional-name"
      label="Отчество"
      name="patronymic"
      placeholder="Не более 30 символов"
    />
    <UiInput
      id="email"
      v-bind="emailAttrs"
      v-model="email"
      :disabled="account.isLoading.register"
      autocomplete="email"
      label="Введите адрес эл. почты"
      name="email"
      placeholder="Email"
    />
    <UiPasswordInput
      id="password"
      v-bind="passwordAttrs"
      v-model="password"
      :disabled="account.isLoading.register"
      autocomplete="new-password"
      label="Пароль"
      name="password"
      placeholder="Не менее 8 символов"
    />
    <UiPasswordInput
      id="re_password"
      v-bind="rePasswordAttrs"
      v-model="rePassword"
      :disabled="account.isLoading.register"
      autocomplete="new-password"
      label="Повторите пароль"
      name="re_password"
    />
    <UiCheckBox id="agreement" v-model="isAgreementChecked" name="agreement">
      <UiParagraph variant="p2">
        Я даю согласие на обработку персональных данных и согласен с политикой конфиденциальности
      </UiParagraph>
    </UiCheckBox>
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
