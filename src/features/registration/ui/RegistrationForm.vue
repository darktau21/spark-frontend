<script setup lang="ts">
import { useRegister } from '@/entities/account/model';
import { accountApi } from '@/shared/api';
import { UiButton, UiCheckBox, UiInput, UiParagraph, UiPasswordInput } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref } from 'vue';

const validationSchema = toTypedSchema(accountApi.registerPayload);
const { errors, handleSubmit, meta } = useForm<accountApi.RegisterPayload>({
  validationSchema,
});
const { isError: isQueryError, isPending, mutate } = useRegister();
const isAgreementChecked = ref(false);
const isSubmitAllowed = computed(() => {
  return (
    !isPending.value &&
    Object.keys(errors.value).length === 0 &&
    meta.value.valid &&
    isAgreementChecked.value
  );
});

const isError = computed(() => isQueryError.value || Object.keys(errors.value).length > 0);

const onSubmit = handleSubmit(async (values) => {
  mutate(values);
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
      :disabled="isPending"
    />
    <UiInput
      id="last_name"
      autocomplete="family-name"
      name="last_name"
      placeholder="Не более 30 символов"
      label="Фамилия"
      :disabled="isPending"
    />
    <UiInput
      id="patronymic"
      autocomplete="additional-name"
      name="patronymic"
      placeholder="Не более 30 символов"
      label="Отчество"
      :disabled="isPending"
    />
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
    <UiPasswordInput
      id="re_password"
      autocomplete="new-password"
      name="re_password"
      label="Повторите пароль"
      :disabled="isPending"
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
  gap: 1.6rem;
}
.button {
  align-self: center;
}
</style>
