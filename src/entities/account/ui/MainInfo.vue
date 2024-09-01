<template>
  <UiGradientBorder :border-radius="borderRadius" :border-width="4">
    <div class="main-info">
      <BigAccountAvatar :avatar-url="avatarUrl" :is-loading="isLoading" />
      <div class="info-text">
        <UiHeading class="name-wrapper" variant="h2">
          <span v-show="!isLoading" class="full-name">
            {{ fullName }}
          </span>
          <UiSkeleton v-show="isLoading" :width="placeholderWidth" height="2rem" />
          <span v-show="!isLoading" v-if="role" class="role">
            {{ role }}
          </span>
          <UiSkeleton v-show="isLoading" width="8ch" height="1.6rem" />
        </UiHeading>
        <div class="contacts">
          <UiParagraph :class="['contact', !phone && 'contact-not-defined']">
            <UiIcon class="contact-icon" icon="phone" :width="28" :height="28" />
            <UiOuterLink
              v-show="!isLoading"
              v-if="phone"
              :href="`tel:${phone}`"
              class="contact-link"
            >
              {{ phone }}
            </UiOuterLink>
            <span v-else v-show="!isLoading"> Не указано </span>
            <UiSkeleton width="16ch" v-show="isLoading" height="1.8rem" />
          </UiParagraph>
          <UiParagraph :class="['contact', !email && 'contact-not-defined']">
            <UiIcon class="contact-icon" icon="mail" :width="28" :height="28" />
            <UiOuterLink
              v-show="!isLoading"
              v-if="email"
              :href="`mailto:${email}`"
              class="contact-link"
            >
              {{ email }}
            </UiOuterLink>
            <span v-else v-show="!isLoading"> Не указано </span>
            <UiSkeleton width="16ch" v-show="isLoading" height="1.8rem" />
          </UiParagraph>
          <UiParagraph :class="['contact', !tg && 'contact-not-defined']">
            <UiIcon class="contact-icon" icon="tg" :width="28" :height="28" />
            <UiOuterLink v-show="!isLoading" v-if="tg" :href="tg" class="contact-link">
              {{ tg }}
            </UiOuterLink>
            <span v-else v-show="!isLoading"> Не указано </span>
            <UiSkeleton width="16ch" v-show="isLoading" height="1.8rem" />
          </UiParagraph>
        </div>
      </div>
    </div>
  </UiGradientBorder>
</template>
<script setup lang="ts">
import { useMatchMedia } from '@/shared/lib';
import {
  UiGradientBorder,
  UiHeading,
  UiIcon,
  UiOuterLink,
  UiParagraph,
  UiSkeleton,
} from '@/shared/ui';
import { computed } from 'vue';

import BigAccountAvatar from './BigAccountAvatar.vue';

withDefaults(
  defineProps<
    Partial<{
      avatarUrl: null | string;
      email: null | string;
      fullName: null | string;
      isLoading: boolean | null;
      phone: null | string;
      role: null | string;
      tg: null | string;
    }>
  >(),
  {
    isLoading: true,
  }
);

const isMediaMatches = useMatchMedia('(max-width: 52em)');
const borderRadius = computed(() => (isMediaMatches.value ? 20 : 60));
const placeholderWidth = computed(() => (isMediaMatches.value ? '18ch' : '32ch'));
</script>

<style scoped>
.main-info {
  display: flex;
  gap: 3rem;
  padding: 2rem;
}

.info-text {
  flex: 1 1;
  max-width: calc(100% - 10rem - 170px);
}

@media screen and (max-width: 52em) {
  .main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    padding: 1rem;
    max-width: 100%;
  }

  .name-wrapper:deep(h2),
  .contacts {
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .info-text {
    max-width: calc(100% - 2ch);
  }
}

.name-wrapper:deep(h2) {
  display: flex;
  gap: 1.6rem;
  align-items: center;
  flex-wrap: wrap;
  min-width: 20ch;
  min-height: 2rem;
}

.role {
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
}

.contacts {
  display: flex;
  flex-direction: column;
  padding: 1.2rem 0;
  gap: 1rem;
  width: 100%;
}

.contact {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-height: 1.8rem;
  min-width: 16ch;
  max-width: 100%;
  color: rgb(21, 21, 21);
}

.contact-link {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact-icon {
  flex: 0 0 28px;
}

.contact-not-defined {
  color: rgb(156, 159, 169);
}
</style>
