<template>
  <div class="edit-account-page">
    <header class="header">
      <h1>Редактирование личного кабинета</h1>
      <DeleteAccount />
    </header>
    <form class="account-form" @submit="onSubmit">
      <UiFileInput
        ref="fileInputRef"
        v-bind="photoAttrs"
        name="photo"
        @change="
          async (data) => {
            photo = data[0];
          }
        "
        class="avatar-block"
        accept="image/jpeg, image/png"
        label="Загрузить фотографию"
      >
        <template #view="{ uploadedUrls }">
          <BigAccountAvatar
            :avatar-url="uploadedUrls[0]?.dataUrl ?? account.data?.photo"
            :is-loading="false"
          />
        </template>
        <template #msg="{ errorMessage }">
          <div class="avatar-msg">
            <UiParagraph> Формат файла: JPEG/JPG/PNG </UiParagraph>
            <UiParagraph :class="errorMessage && 'error'"> Размер не более 8МБ </UiParagraph>
          </div>
        </template>
      </UiFileInput>
      <UiGradientBorder class="name-block-wrapper" :border-width="4" :border-radius="borderRadius">
        <div class="block name-block">
          <UiInput
            class="lastName"
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
          <UiSelect
            :options="roleOptions"
            v-model="role"
            v-bind="roleAttrs"
            name="role"
            label="Роль"
            id="role"
          />
        </div>
      </UiGradientBorder>
      <UiGradientBorder
        class="contact-block-wrapper"
        :border-width="4"
        :border-radius="borderRadius"
      >
        <div class="block contact-block">
          <UiInput
            id="phone"
            v-bind="phoneAttrs"
            v-model="phone"
            autocomplete="tel"
            inputmode="tel"
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
            inputmode="url"
            name="telegram"
          />
        </div>
      </UiGradientBorder>
      <UiGradientBorder class="edu-block-wrapper" :border-width="4" :border-radius="borderRadius">
        <div class="block edu-block">
          <UiSelect
            searchable
            class="edu-org-input"
            :options="eduOrgsOptions"
            label="Образование"
            id="eduOrg"
            v-bind="eduOrgAttrs"
            v-model="eduOrg"
            @search="debouncedEduOrgsList"
            name="educational_organization"
          />
          <UiInput
            class="specialty-input"
            id="specialty"
            v-bind="specialtyAttrs"
            v-model="specialty"
            label="Специальность"
            name="specialty"
          />
          <UiMultipleSelect
            id="professionalInterests"
            label="Профессиональные интересы"
            v-bind="professionalInterestsAttrs"
            v-model="professionalInterests"
            name="professional_interests"
          >
            <template #msg>
              <UiParagraph class="prof-comp-msg" variant="p2">
                Вы можете добавить до 10 интересов
              </UiParagraph>
            </template>
            <template #options="{ options, handleDelete }">
              <UiOption @click="handleDelete(o)" v-for="o in options" :key="o">
                {{ o }}
              </UiOption>
            </template>
          </UiMultipleSelect>
        </div>
      </UiGradientBorder>
      <UiGradientBorder class="prof-block-wrapper" :border-width="4" :border-radius="borderRadius">
        <div class="block prof-block">
          <UiInput
            class="competencies-input"
            id="competencies"
            v-bind="competenciesAttrs"
            v-model="competencies"
            label="Компетенции"
            name="competencies"
          />
          <UiMultipleSelect
            autocomplete
            id="professionalCompetencies"
            label="Профессиональные навыки"
            v-bind="professionalCompetenciesAttrs"
            v-model="professionalCompetencies"
            name="professional_competencies"
            @input="handleCompetenciesInput"
            :autocompleteOptions="competenciesAutocomplete"
          >
            <template #msg>
              <UiParagraph class="prof-comp-msg" variant="p2">
                Вы можете добавить до 10 навыков
              </UiParagraph>
            </template>
            <template #options="{ options, handleDelete }">
              <UiOption @click="handleDelete(o)" v-for="o in options" :key="o">
                {{ o }}
              </UiOption>
            </template>
          </UiMultipleSelect>
        </div>
      </UiGradientBorder>
      <UiGradientBorder
        class="achievements-block-wrapper"
        :border-width="4"
        :border-radius="borderRadius"
      >
        <div class="block achievements-block">
          <UiTextArea id="achievements" label="Достижения" name="achievements" />
          <UiTextArea id="competitions" label="Конкурсы" name="competitions" />
        </div>
      </UiGradientBorder>
      <div class="btn-wrapper">
        <UiButton @click.prevent="handleGoBack" variant="secondary">Назад</UiButton>
        <UiButton :error="!isValid">Сохранить изменения</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { BigAccountAvatar, useAccount } from '@/entities/account';
import { DeleteAccount } from '@/features/deleteAccount';
import { accountApi, eduOrgApi, hhApi } from '@/shared/api';
import { DataUrl, routeNames, useMatchMedia } from '@/shared/lib';
import {
  UiButton,
  UiFileInput,
  UiGradientBorder,
  UiInput,
  UiMultipleSelect,
  UiOption,
  UiParagraph,
  UiSelect,
  UiTextArea,
} from '@/shared/ui';
import { toTypedSchema } from '@vee-validate/zod';
import { useDebounceFn } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const eduOrgList = ref<eduOrgApi.EduOrgPaginatedResponse['results']>([]);
const account = useAccount();
const router = useRouter();

const fileInputRef = ref<InstanceType<typeof UiFileInput>>();
const handleGoBack = () => router.go(-1);

const isMediaMatches = useMatchMedia('(max-width: 52em)');
const borderRadius = computed(() => (isMediaMatches.value ? 20 : 40));

const validationSchema = toTypedSchema(accountApi.updateAccountPayload);
const { defineField, errors, handleSubmit, setValues } = useForm<accountApi.UpdateAccountPayload>({
  validationSchema,
  initialValues: {
    ...account.data,
    photo: DataUrl.createFromString(account.data?.photo ?? ''),
    professional_competencies: account.data?.professional_competencies ?? [],
    professional_interests: account.data?.professional_interests ?? [],
  },
});

const isValid = computed(() => Object.values(errors.value).flat().length === 0);

const [photo, photoAttrs] = defineField('photo');
const [lastName, lastNameAttrs] = defineField('last_name');
const [firstName, firstNameAttrs] = defineField('first_name');
const [patronymic, patronymicAttrs] = defineField('patronymic');
const [phone, phoneAttrs] = defineField('phone_number');
const [email, emailAttrs] = defineField('email');
const [tg, tgAttrs] = defineField('telegram');
const [eduOrg, eduOrgAttrs] = defineField('educational_organization');
const [specialty, specialtyAttrs] = defineField('specialty');
const [professionalInterests, professionalInterestsAttrs] = defineField('professional_interests');
const [professionalCompetencies, professionalCompetenciesAttrs] = defineField(
  'professional_competencies'
);
const [competencies, competenciesAttrs] = defineField('competencies');
const [role, roleAttrs] = defineField('role');
const roleOptions = accountApi.roles.map((r) => ({ label: accountApi.roleLabels[r], value: r }));
const competenciesAutocomplete = ref<string[]>([]);

const handleEduOrgsList = async (search?: string, toggleLoading?: (isLoading: boolean) => void) => {
  toggleLoading?.(true);
  const res = await eduOrgApi.getOrgs({ search, limit: 20 });
  eduOrgList.value = res.results;
  toggleLoading?.(false);
};

const debouncedEduOrgsList = useDebounceFn(handleEduOrgsList, 1000);

onMounted(async () => {
  await handleEduOrgsList();
});

const debouncedFn = useDebounceFn(async (val: string) => {
  competenciesAutocomplete.value = await hhApi.searchCompetencies(val);
}, 1000);

const handleCompetenciesInput = async (val: string) => {
  debouncedFn(val);
};

const eduOrgsOptions = computed(() => [
  { label: 'Не указано', value: null },
  ...eduOrgList.value.map((o) => ({ value: o.id, label: o.name })),
]);

watch(
  () => account.data,
  (val) => {
    if (val) {
      setValues({ ...val, photo: DataUrl.createFromString(val.photo ?? '') });
    }
  }
);

watch(
  () => account.data?.educational_organization,
  async (val) => {
    if (!val) {
      return;
    }
    const org = await eduOrgApi.getOrg(val);
    if (eduOrgList.value.find((e) => e.id === org.id)) {
      return;
    }
    eduOrgList.value = [org, ...eduOrgList.value];
  },
  {
    immediate: true,
  }
);

const onSubmit = handleSubmit(async (data) => {
  await account.update(data);
  router.push({ name: routeNames.account });
});
</script>

<style scoped>
.edit-account-page {
  padding: 3rem 0;
}

.account-form {
  display: grid;
  align-items: stretch;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
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
  position: relative;
}

@media screen and (max-width: 52em) {
  .block {
    padding: 1rem;
  }
}

.name-block-wrapper {
  grid-column: 3/5;
}

.name-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
}

.name-block:deep(> div:first-child),
.name-block:deep(> div:last-child) {
  grid-column: 1/-1;
}

.edu-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
}

.edu-block:deep(> div:last-child) {
  grid-column: 1/-1;
}

.prof-comp-msg {
  padding-bottom: 1rem;
}

.contact-block-wrapper {
  grid-column: 5/7;
}

.edu-block-wrapper,
.achievements-block-wrapper {
  grid-column: 1/4;
}

.prof-block-wrapper {
  grid-column: 4/7;
}

.btn-wrapper {
  grid-row: -1/-2;
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.error {
  color: rgb(255, 0, 0);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1.6rem;
}
</style>
