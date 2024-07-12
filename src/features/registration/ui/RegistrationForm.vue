<script setup lang="ts">
import { useAccount } from '@/entities/account';
import { accountApi } from '@/shared/api';
import { UiButton, UiCheckBox, UiInput, UiParagraph, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';

const validationSchema = toTypedSchema(accountApi.registerPayload);
const { errors, handleSubmit, meta, defineField } = useForm<accountApi.RegisterPayload>({
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
  <form class="form" :validation-schema="validationSchema" @submit="onSubmit">
    <UiInput
      id="first_name"
      autocomplete="given-name"
      name="first_name"
      placeholder="Не более 30 символов"
      label="Имя"
      :disabled="account.isLoading.register"
      v-bind="firstNameAttrs"
      v-model="firstName"
    />
    <UiInput
      id="last_name"
      autocomplete="family-name"
      name="last_name"
      placeholder="Не более 30 символов"
      label="Фамилия"
      :disabled="account.isLoading.register"
      v-bind="lastNameAttrs"
      v-model="lastName"
    />
    <UiInput
      id="patronymic"
      autocomplete="additional-name"
      name="patronymic"
      placeholder="Не более 30 символов"
      label="Отчество"
      :disabled="account.isLoading.register"
      v-bind="patronymicAttrs"
      v-model="patronymic"
    />
    <UiInput
      id="email"
      autocomplete="email"
      name="email"
      placeholder="Email"
      label="Введите адрес эл. почты"
      :disabled="account.isLoading.register"
      v-bind="emailAttrs"
      v-model="email"
    />
    <UiPasswordInput
      id="password"
      autocomplete="new-password"
      name="password"
      placeholder="Не менее 8 символов"
      label="Пароль"
      :disabled="account.isLoading.register"
      v-bind="passwordAttrs"
      v-model="password"
    />
    <UiPasswordInput
      id="re_password"
      autocomplete="new-password"
      name="re_password"
      label="Повторите пароль"
      :disabled="account.isLoading.register"
      v-bind="rePasswordAttrs"
      v-model="rePassword"
    />
    <UiCheckBox id="agreement" name="agreement" v-model="isAgreementChecked">
      <UiParagraph variant="p2">
        Я даю согласие на обработку персональных данных и согласен с политикой конфиденциальности
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
