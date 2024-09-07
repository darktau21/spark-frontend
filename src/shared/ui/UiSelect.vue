<template>
  <div class="select-wrapper">
    <label class="label" :for="id" v-if="label">
      <UiHeading variant="h3">
        {{ label }}
      </UiHeading>
    </label>
    <div class="options-wrapper">
      <input
        ref="input"
        autocomplete="off"
        :class="[
          'select-input',
          selectedOption?.label === localModel && 'select-input-selected',
          !searchable && 'select-input-not-searchable',
        ]"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model="localModel"
        :id
        @input="handleInput"
        @keydown="handleKeydown"
        :readonly="!searchable"
      />
      <UiIcon :class="['icon', isSelectOpen && 'icon-opened']" icon="arrow" />
      <Transition
        :css="false"
        @before-enter="onBeforeListEnter"
        @enter="onListEnter"
        @leave="onListLeave"
      >
        <TransitionGroup
          v-show="isSelectOpen"
          class="options-list"
          @before-enter="onBeforeEnter"
          @enter="onEnter"
          @leave="onLeave"
          :css="false"
          tag="ul"
          ref="optionList"
        >
          <li
            :title="o.label"
            @click="handleSelect(o)"
            :class="[
              'option',
              o.value === selectedOption?.value && 'option-selected',
              i === highlightedIndex && 'option-highlighted',
            ]"
            :data-element="i"
            v-for="(o, i) in options"
            :key="o.value ?? 'null'"
            ref="optionElements"
            @mousedown.prevent
          >
            {{ o.label }}
          </li>
        </TransitionGroup>
      </Transition>
    </div>
    <div class="error">
      <UiParagraph v-show="!isValid" variant="p3">
        {{ errorMessage }}
      </UiParagraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { useField } from 'vee-validate';
import { computed, nextTick, ref, useTemplateRef, watch, type Ref } from 'vue';
import UiHeading from './UiHeading.vue';
import UiParagraph from './UiParagraph.vue';
import UiIcon from './UiIcon';

type Option = { label: string; value: string | number | null };

const inputRef = useTemplateRef('input');
const isSelectOpen = ref(false);
const selectedOption = ref<Option | null>(null);
const localModel = ref<string>('');
const model = defineModel<string | number | null>();

const props = withDefaults(
  defineProps<{
    label?: string;
    id: string;
    options?: Option[];
    name: string;
    searchable?: boolean;
  }>(),
  {
    options: () => [] as Option[],
    searchable: false,
  }
);

const emit = defineEmits<{
  search: [value: string];
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  selectedOption.value = null;
  emit('search', target.value);
};

const handleFocus = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  isSelectOpen.value = true;
  const textLength = target.value.length;
  target.setSelectionRange(textLength, textLength);
};

const handleBlur = () => {
  isSelectOpen.value = false;
};

const handleSelect = (opt: Option) => {
  selectedOption.value = opt;
  localModel.value = opt.label;
  model.value = opt.value;
  inputRef.value?.blur();
};

const optionElements = useTemplateRef<HTMLLIElement[]>('optionElements');
const scrollToHighlighted = async () => {
  await nextTick();
  const highlightedElement = optionElements.value?.[highlightedIndex.value];
  console.log(highlightedElement);
  if (highlightedElement) {
    highlightedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
};

const setSelectedOption = (model?: Ref<string | number | null> | string | number | null) => {
  const selected = props.options.find((o) => o.value === model);
  if (selected) {
    selectedOption.value = selected;
    localModel.value = selected.label;
  }
};

watch(model, (m) => {
  setSelectedOption(m);
});

watch(
  () => props.options,
  () => {
    if (isSelectOpen.value) {
      console.log('return');
      return;
    }
    console.log(model.value);
    setSelectedOption(model.value);
  }
);

setSelectedOption(model.value);

const { errorMessage } = useField(props.name, undefined, {
  validateOnValueUpdate: true,
});
const isValid = computed(() => !errorMessage.value);

const optionsListRef = useTemplateRef('optionList');
const scrollTop = () => {
  if (!optionsListRef.value) {
    return;
  }

  const el = optionsListRef.value.$el as HTMLUListElement;
  el.scrollTo({ left: 0, top: 0 });
};
const highlightedIndex = ref<number>(-1);
const handleKeydown = (e: KeyboardEvent) => {
  if (!isSelectOpen.value) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    highlightedIndex.value = (highlightedIndex.value + 1) % props.options.length;
    scrollToHighlighted();
  } else if (e.key === 'ArrowUp') {
    console.log(highlightedIndex.value);
    console.log(props.options.length);
    e.preventDefault();
    highlightedIndex.value =
      (highlightedIndex.value - 1 + props.options.length) % props.options.length;
    scrollToHighlighted();
  } else if (e.key === 'Enter' && highlightedIndex.value >= 0) {
    e.preventDefault();
    handleSelect(props.options[highlightedIndex.value]);
    scrollToHighlighted();
  } else {
    highlightedIndex.value = -1;
    scrollTop();
  }
};

function onBeforeEnter(el: Element): void {
  const element = el as HTMLElement;
  element.style.opacity = '0';
  element.style.height = '0';
}

function onEnter(el: Element, done: () => void): void {
  const element = el as HTMLElement;
  gsap.to(element, {
    height: '3.8rem',
    opacity: 1,
    delay: (element.dataset.index ? parseFloat(element.dataset.index) : 0) * 0.15,
    onComplete: done,
  });
}

function onLeave(el: Element, done: () => void): void {
  const element = el as HTMLElement;
  gsap.to(element, {
    opacity: 0,
    height: 0,
    delay: (element.dataset.index ? parseFloat(element.dataset.index) : 0) * 0.15,
    onComplete: done,
  });
}

function onBeforeListEnter(el: Element): void {
  const element = el as HTMLElement;
  element.style.opacity = '0';
  element.style.maxHeight = '0';
}

function onListEnter(el: Element, done: () => void): void {
  const element = el as HTMLElement;
  gsap.to(element, {
    opacity: 1,
    'max-height': 'calc(100dvh / 4)',
    delay: (element.dataset.index ? parseFloat(element.dataset.index) : 0) * 0.15,
    onComplete: done,
  });
}

function onListLeave(el: Element, done: () => void): void {
  const element = el as HTMLElement;
  gsap.to(element, {
    opacity: 0,
    'max-height': 0,
    delay: (element.dataset.index ? parseFloat(element.dataset.index) : 0) * 0.15,
    onComplete: done,
  });
}
</script>
<style scoped>
.label {
  margin-bottom: 0.8rem;
  align-self: flex-start;
}

.select-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 10ch;
}

.select-input {
  background-color: rgb(238, 238, 238);
  padding: 1rem 1.6rem;
  padding-right: 4rem;
  border-radius: 8px;
  font-size: 1.6rem;
  border: none;
  outline: none;
  color: rgb(0, 0, 0);
  transition: 0.3s ease-in-out;
  width: 100%;
}

.select-input-not-searchable {
  cursor: pointer;
}

.select-input-selected {
  font-weight: 700;
}

.select-input::placeholder {
  color: rgb(0, 0, 0, 0.2);
}

.select-input:focus {
  background-color: rgb(244, 244, 244);
  outline: 1px solid rgb(151, 71, 255);
}

.options-wrapper {
  position: relative;
}

.icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  transition: transform 0.3s;
}

.icon-opened {
  transform: rotate(-180deg) translateY(50%);
}

.options-list {
  position: absolute;
  top: calc(100% + 1rem);
  z-index: 1;
  max-height: calc(100dvh / 4);
  border: 1px solid rgba(37, 78, 220, 1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  background-color: rgb(255, 255, 255);
  overflow-y: auto;
  overflow-x: hidden;
  transition: height 0.3s;
}

.option-selected {
  font-weight: 600;
}

.option-highlighted {
  background-color: rgb(245, 245, 245);
}

.option {
  font-size: 1.8rem;
  padding: 0.8rem 0.4rem;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1 0 2rem;
}

@media screen and (hover: hover) {
  .option:hover {
    background-color: rgb(245, 245, 245);
  }
}

.option:not(:last-child) {
  border-bottom: 1px solid rgb(211, 211, 211);
}

.error {
  height: 1.6rem;
  margin-top: 0.8rem;
  color: rgb(255, 0, 0);
}
</style>
