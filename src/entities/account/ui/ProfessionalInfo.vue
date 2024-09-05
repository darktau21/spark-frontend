<template>
  <UiGradientBorder :border-radius="borderRadius" :border-width="4">
    <div class="professional-info">
      <div :class="['info', !educationalOrganization && 'info-not-defined']">
        <UiHeading variant="h2">Образование</UiHeading>
        <UiParagraph v-show="!isLoading" class="info-value">{{
          educationalOrganization || 'Не указано'
        }}</UiParagraph>
        <UiSkeleton v-show="isLoading" height="2rem" />
      </div>
      <div :class="['info', !specialty && 'info-not-defined']">
        <UiHeading variant="h2">Специальность</UiHeading>
        <UiParagraph v-show="!isLoading" class="info-value">{{
          specialty || 'Не указано'
        }}</UiParagraph>
        <UiSkeleton v-show="isLoading" height="2rem" />
      </div>
      <div :class="['info', !competencies && 'info-not-defined']">
        <UiHeading variant="h2">Компетенции</UiHeading>
        <UiParagraph v-show="!isLoading" class="info-value">{{
          competencies || 'Не указано'
        }}</UiParagraph>
        <UiSkeleton v-show="isLoading" height="2rem" />
      </div>
      <div :class="['info', (professionalInterests?.length ?? 0) <= 0 && 'info-not-defined']">
        <UiHeading variant="h2">Профессиональные интересы</UiHeading>
        <UiParagraph
          v-if="(professionalInterests?.length ?? 0) > 0"
          v-show="!isLoading"
          class="info-value"
        >
          <span v-for="i in professionalInterests" :key="i">{{ i }}</span>
        </UiParagraph>

        <UiParagraph
          v-if="(professionalInterests?.length ?? 0) <= 0"
          v-show="!isLoading"
          class="info-value"
        >
          Не указано
        </UiParagraph>
        <!-- <UiParagraph v-show="!isLoading" class="info-value">{{ professionalInterests?.join('\n') || 'Не указано' }}</UiParagraph> -->
        <UiSkeleton v-show="isLoading" height="2rem" />
      </div>
      <div :class="['info', (professionalCompetencies?.length ?? 0) <= 0 && 'info-not-defined']">
        <UiHeading variant="h2">Профессиональные компетенции</UiHeading>
        <UiParagraph
          v-if="(professionalCompetencies?.length ?? 0) > 0"
          v-show="!isLoading"
          class="info-value"
        >
          <span v-for="i in professionalCompetencies" :key="i">{{ i }}</span>
        </UiParagraph>

        <UiParagraph
          v-if="(professionalCompetencies?.length ?? 0) <= 0"
          v-show="!isLoading"
          class="info-value"
        >
          Не указано
        </UiParagraph>
        <!-- <UiParagraph v-show="!isLoading" class="info-value">{{ professionalInterests?.join('\n') || 'Не указано' }}</UiParagraph> -->
        <UiSkeleton v-show="isLoading" height="2rem" />
      </div>
    </div>
  </UiGradientBorder>
</template>
<script setup lang="ts">
import { useMatchMedia } from '@/shared/lib';
import { UiGradientBorder, UiHeading, UiParagraph, UiSkeleton } from '@/shared/ui';
import { computed } from 'vue';

withDefaults(
  defineProps<
    Partial<{
      educationalOrganization: string | null;
      specialty: string | null;
      competencies: string | null;
      professionalInterests: string[] | null;
      professionalCompetencies: string[] | null;
      isLoading: boolean;
    }>
  >(),
  { isLoading: true }
);

const isMediaMatches = useMatchMedia('(max-width: 52em)');
const borderRadius = computed(() => (isMediaMatches.value ? 20 : 60));
</script>
<style scoped>
.professional-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.info-value {
  --font-size: 2rem;
  max-width: 100%;
  white-space: normal;
  overflow-wrap: break-word;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.info-not-defined {
  color: rgb(156, 159, 169);
}
</style>
