<template>
  <div class="account-page">
    <h1>Личный кабинет</h1>
    <div class="account-info">
      <MainInfo
        class="main-info-block"
        :avatar-url="data?.photo"
        :email="data?.email"
        :full-name="fullName"
        :is-loading="isLoading.data"
      />
      <ProfessionalInfo
        class="professional-info-block"
        :competencies="data?.competencies"
        :educational-organization="eduOrgName"
        :professional-competencies="data?.professional_competencies"
        :professional-interests="data?.professional_interests"
        :is-loading="isLoading.data"
      />
      <MeritsInfo
        class="merits-info-block"
        :achievements="data?.achievements"
        :competitions="data?.competitions"
        :is-loading="isLoading.data"
      />
      <div class="test-diagram-block">
        <UiTabContainer initial-selection="psychotype">
          <div class="select-diagram-btns">
            <UiTab #default="{isSelected, setSelectedTab}" tab-id="psychotype">
              <UiButton class="select-diagram-btn" @click="setSelectedTab" :active="isSelected">
                Диаграмма психотипа
              </UiButton>
            </UiTab>
            <UiTab tab-id="unknown">
              <UiButton class="select-diagram-btn" disabled>
                -------
              </UiButton>
            </UiTab>
            <UiTab tab-id="unknown">
              <UiButton class="select-diagram-btn" disabled>
                -------
              </UiButton>
            </UiTab>
            <UiTab tab-id="unknown">
              <UiButton class="select-diagram-btn" disabled>
                -------
              </UiButton>
            </UiTab>
          </div>
          <UiTabWindow tab-id="psychotype">

          </UiTabWindow>
        </UiTabContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainInfo, MeritsInfo, ProfessionalInfo, useAccount } from '@/entities/account';
import { eduOrgApi } from '@/shared/api';
import { UiButton, UiTab, UiTabContainer, UiTabWindow } from '@/shared/ui';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const eduOrgName = ref<string>();
const { data, isLoading } = storeToRefs(useAccount());
const fullName = computed(
  () =>
    `${data.value?.last_name ?? ''} ${data.value?.first_name ?? ''} ${data.value?.patronymic ?? ''}`.trim() ||
    'Анонимов Аноним Анонимович'
);

watch(
  () => data.value?.educational_organization,
  async (value) => {
    if (!value) {
      return;
    }
    eduOrgName.value = (await eduOrgApi.getOrg(value)).name;
  }
);
</script>

<style scoped>
.account-page {
  padding: 3rem 0;
}

.account-info {
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 35% 1fr;
  gap: 2rem;
  align-items: start;
}

@media screen and (max-width: 60em) {
  .account-info {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

.main-info-block {
  grid-column: 1/-1;
  grid-row: 1/2;
}

.professional-info-block {
  grid-column: 1/2;
  grid-row: 2/3;
}

.merits-info-block {
  grid-column: 1/2;
  grid-row: 3/4;
}

.test-diagram-block {
  grid-column: 2/3;
  grid-row: 2/4;
}

.select-diagram-btns {
  display: flex;
  gap: 1rem;
  /* justify-content: space-between; */
}

.select-diagram-btn {
  flex: 1 1 25%;
}
</style>
