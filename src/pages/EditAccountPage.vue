<template>
  <div class="edit-account-page">
    <h1>Редактирование личного кабинета</h1>
    <form class="account-form" @submit="onSubmit">
      <UiFileInput v-bind="photoAttrs" name="photo" @change="(data) => photo = data[0].file" class="avatar-block" accept="image/jpeg, image/png" label="Загрузить фотографию">
        <template #view="{ uploadedUrls }">
          <BigAccountAvatar :avatar-url="uploadedUrls[0]?.dataUrl" :is-loading="false" />
        </template>
        <template #msg>
          <div class="avatar-msg">
            <UiParagraph> Формат файла: JPEG/JPG/PNG </UiParagraph>
            <UiParagraph> Размер не более 8МБ </UiParagraph>
          </div>
        </template>
      </UiFileInput>
      <UiGradientBorder class="name-block-wrapper" :border-width="4" :border-radius="borderRadius">
        <div class="block name-block">
          <UiInput
            id="lastName"
            v-bind="lastNameAttrs"
            v-model="lastName"
            autocomplete="family-name"
            label="Фамилия"
            name="last_name"

          />
          <UiInput
            id="firstName"
            v-bind="firstNameAttrs"
            v-model="firstName"
            autocomplete="given-name"
            label="Имя"
            name="first_name"
          />
          <UiInput
            id="patronymic"
            v-bind="patronymicAttrs"
            v-model="patronymic"
            autocomplete="additional-name"
            label="Отчество"
            name="patronymic"
          />
        </div>
      </UiGradientBorder>
      <UiGradientBorder class="contact-block-wrapper" :border-width="4" :border-radius="borderRadius">
        <div class="block contact-block">
          <UiInput
            id="phone"
            v-bind="phoneAttrs"
            v-model="phone"
            autocomplete="tel"
            label="Телефон"
            name="phone_number"
          />
          <UiInput
            id="email"
            v-bind="emailAttrs"
            v-model="email"
            :disabled="true"
            autocomplete="off"
            label="Электронная почта*"
            name="email"
          />
          <UiInput
            id="tg"
            v-bind="tgAttrs"
            v-model="tg"
            label="Ссылка на Telegram"
            name="telegram"
          />
        </div>
      </UiGradientBorder>
      <UiGradientBorder class="edu-block-wrapper" :border-width="4" :border-radius="borderRadius">
        <div class="block edu-block">
          <UiInput
            id="phone"
            v-bind="phoneAttrs"
            v-model="phone"
            autocomplete="tel"
            label="Телефон"
            name="phone_number"
          />
          <UiInput
            id="email"
            v-bind="emailAttrs"
            v-model="email"
            :disabled="true"
            autocomplete="off"
            label="Электронная почта*"
            name="email"
          />
          <UiInput
            id="tg"
            v-bind="tgAttrs"
            v-model="tg"
            label="Ссылка на Telegram"
            name="telegram"
          />
        </div>
      </UiGradientBorder>
      <div class="btn-wrapper">
        <UiButton @click.prevent="handleGoBack" variant="secondary">Назад</UiButton>
        <UiButton>Сохранить изменения</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { BigAccountAvatar, useAccount } from '@/entities/account';
import { accountApi, eduOrgApi } from '@/shared/api';
import { useMatchMedia } from '@/shared/lib';
import { UiButton, UiFileInput, UiGradientBorder, UiInput, UiParagraph } from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const eduOrgName = ref<string>();
const account = useAccount();
const router = useRouter();

const handleGoBack = () => router.go(-1);

watch(
  () => account.data?.educational_organization,
  async (value) => {
    if (!value) {
      return;
    }
    eduOrgName.value = (await eduOrgApi.getOrg(value)).name;
  }
);

const isMediaMatches = useMatchMedia('(max-width: 52em)');
const borderRadius = computed(() => (isMediaMatches.value ? 20 : 40));

const validationSchema = toTypedSchema(accountApi.updateAccountPayload);
const { defineField, errors, handleSubmit, meta, controlledValues } = useForm<accountApi.UpdateAccountPayload>({
  validationSchema,
  initialValues: {
    ...account.data,
    professional_competencies: account.data?.professional_competencies ?? []
  },
});

const [photo, photoAttrs] = defineField('photo');
const [lastName, lastNameAttrs] = defineField('last_name');
const [firstName, firstNameAttrs] = defineField('first_name');
const [patronymic, patronymicAttrs] = defineField('patronymic');
const [phone, phoneAttrs] = defineField('phone_number');
const [email, emailAttrs] = defineField('email');
const [tg, tgAttrs] = defineField('telegram');

watch(() => account.data, (val) => {
  if (val) {
    controlledValues.value = val
  }
})

const onSubmit = handleSubmit(async (data) => {
  await account.update(data);
})
</script>

<style scoped>
.edit-account-page {
  padding: 3rem 0;
}

.account-form {
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
  align-items: start;
}

@media screen and (max-width: 60em) {
  .account-form {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

.avatar-msg {
  text-align: center;
}

.avatar-block {
  grid-column: 1/3;
}

.block {
  display: flex;
  padding: 2rem;
  flex-direction: column;
}

@media screen and (max-width: 52em) {
  .block {
    padding: 1rem;
  }
}

.name-block-wrapper {
  grid-column: 3/5;
}

.contact-block-wrapper {
  grid-column: 5/7;
}

.edu-block-wrapper {
  grid-column: 1/4;
}

.btn-wrapper {
  grid-row: -1/-2;
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
