<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { PERSONAL_DATA_CONSENT_LINK, PRIVACY_POLICY_LINK } from '@/shared/const';
import {
  UiButton,
  UiCheckBox,
  UiHeading,
  UiInput,
  UiOuterLink,
  UiParagraph,
  UiPasswordInput,
} from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';

const validationSchema = toTypedSchema(accountApi.registerPayload);
const { defineField, errors, handleSubmit, meta } = useForm<accountApi.RegisterPayload>({
  validationSchema,
});

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
  <form class="form" @submit="onSubmit">
    <UiHeading align="center">Регистрация</UiHeading>
    <UiInput
      id="email"
      v-bind="emailAttrs"
      v-model="email"
      :disabled="account.isLoading.register"
      autocomplete="email"
      inputmode="email"
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
      <UiParagraph variant="p2"
        >Я даю
        <UiOuterLink variant="inline" :href="PERSONAL_DATA_CONSENT_LINK"
          >согласие на обработку персональных данных</UiOuterLink
        >
        и согласен с
        <UiOuterLink variant="inline" :href="PRIVACY_POLICY_LINK"
          >политикой конфиденциальности</UiOuterLink
        >
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
  padding: 2rem;
}
.button {
  align-self: center;
}
</style>
