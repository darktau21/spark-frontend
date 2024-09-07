<template>
  <div class="wrapper">
    <label :for="id" class="label">
      <UiHeading variant="h3">{{ label }}</UiHeading>
    </label>
    <slot name="msg" />
    <div class="input-wrapper">
      <div class="autocomplete-wrapper">
        <div class="input-btn-wrapper">
          <input
            :disabled="Boolean(errorMessage)"
            v-bind="$attrs"
            :id
            ref="inputRef"
            :class="[{ 'input-valid': isValid, 'input-error': !isValid }, 'input']"
            :name
            inputmode="search"
            enterkeyhint="enter"
            :value="localInputModel"
            @input="
              (event) => {
                const val = (event.target as HTMLInputElement)?.value ?? '';
                localInputModel = val;
                emit('input', val);
              }
            "
            @keydown.enter.prevent.stop
            @keyup.enter.prevent.stop="handleAdd"
            @focus="isAutocompleteOpened = true"
            @blur="isAutocompleteOpened = false"
          />
          <Transition name="fade">
            <button
              @mousedown.prevent
              @click.prevent.stop="handleAdd"
              v-show="localInputModel.length > 0"
              class="icon"
            >
              <UiIcon icon="plus" />
            </button>
          </Transition>
        </div>
        <div
          @click.prevent.stop
          @mousedown.prevent.stop
          class="autocomplete"
          v-if="autocomplete"
          v-show="isAutocompleteOpened"
        >
          <div class="options-autocomplete" v-show="(autocompleteOptions?.length ?? 0) > 0">
            <UiOption
              @click.prevent.stop="handleAutocompleteClick(o)"
              :showClose="false"
              v-for="o in autocompleteOptions"
              :key="o"
            >
              {{ o }}
            </UiOption>
          </div>
          <div class="not-found" v-show="(autocompleteOptions?.length ?? 0) <= 0">
            <UiParagraph> Ничего не найдено </UiParagraph>
          </div>
        </div>
      </div>
    </div>
    <div class="error">
      <UiParagraph v-show="!isValid" variant="p3">
        {{ errorMessage }}
      </UiParagraph>
    </div>
    <div v-if="isOptionsSlotProvided" class="options">
      <slot :options="inputValue" :handleDelete name="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { computed, ref, toRef, useSlots } from 'vue';

import UiHeading from './UiHeading.vue';
import UiParagraph from './UiParagraph.vue';
import UiOption from './UiOption.vue';
import UiIcon from './UiIcon';

defineOptions({
  inheritAttrs: false,
});

const isAutocompleteOpened = ref(false);
const props = defineProps<{
  id: string;
  label?: string;
  name: string;
  value?: string[];
  class?: string;
  autocompleteOptions?: string[];
  autocomplete?: boolean;
}>();

const {
  errorMessage,
  value: inputValue,
  handleChange,
} = useField(props.name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: true,
});

const localInputModel = ref('');

const handleAdd = () => {
  if (!localInputModel.value) {
    return;
  }
  if (!Array.isArray(inputValue.value)) {
    inputValue.value = [];
  }
  inputValue.value.push(localInputModel.value);
  handleChange(inputValue.value);
  localInputModel.value = '';
};

const handleAutocompleteClick = (val: string) => {
  if (!Array.isArray(inputValue.value)) {
    inputValue.value = [];
  }
  inputValue.value.push(val);
  handleChange(inputValue.value);
  localInputModel.value = '';
  emit('input', '');
};

const handleDelete = (option: string) => {
  inputValue.value = inputValue.value?.filter((o) => o !== option);
};

const inputRef = ref<HTMLInputElement>();
const focus = () => {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.focus();
};

defineExpose({
  focus,
});

const name = toRef(props, 'name');
const slots = useSlots();

const isOptionsSlotProvided = computed(() => slots.msg !== undefined);

const isValid = computed(() => !errorMessage.value);

const emit = defineEmits<{
  input: [value: string];
}>();
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 10ch;
}

.input-wrapper {
  position: relative;
}

.input-btn-wrapper {
  position: relative;
  width: 100%;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
}

@media screen and (hover: hover) {
  .icon:hover {
    color: rgb(140, 140, 140);
  }
}

.autocomplete-wrapper {
  position: relative;
}

.input {
  background-color: rgb(238, 238, 238);
  padding: 1rem 1.6rem;
  border-radius: 8px;
  font-size: 1.6rem;
  border: none;
  outline: none;
  color: rgb(0, 0, 0);
  transition: 0.3s ease-in-out;
  width: 100%;
}

.label {
  margin-bottom: 0.8rem;
  align-self: flex-start;
}

.input::placeholder {
  color: rgb(0, 0, 0, 0.2);
}

.input:focus {
  background-color: rgb(244, 244, 244);
  outline: 1px solid rgb(151, 71, 255);
}

.input-valid {
  background-color: rgb(238, 238, 238);
}

.input-error {
  background-color: rgb(251, 200, 200);
}

.input:disabled {
  outline: 1px solid rgb(238, 238, 238);
  background-color: rgb(244, 244, 244);
  color: rgb(217, 217, 217);
  cursor: not-allowed;
}

.error {
  height: 1.6rem;
  margin-top: 0.8rem;
  color: rgb(255, 0, 0);
}

.with-slot {
  padding-right: 6rem;
}

.tail-icon {
  padding: 0;
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
}

.options {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
}

.autocomplete {
  position: absolute;
  top: calc(100% + 1rem);
  left: 0;
  width: 100%;
  min-height: 2.4rem;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: stretch;
  align-items: center;
  border: 1px solid rgba(37, 78, 220, 1);
  border-radius: 8px;
  z-index: 100;
}

.not-found {
  padding: 1rem 0;
  flex: 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.options-autocomplete {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
