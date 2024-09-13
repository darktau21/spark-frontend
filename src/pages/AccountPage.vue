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
        :role="data?.role && accountApi.roleLabels[data?.role]"
      />
      <div class="info-column">
        <ProfessionalInfo
          class="professional-info-block"
          :competencies="data?.competencies"
          :educational-organization="eduOrgName"
          :professional-competencies="data?.professional_competencies"
          :professional-interests="data?.professional_interests"
          :specialty="data?.specialty"
          :is-loading="isLoading.data"
        />
        <MeritsInfo
          class="merits-info-block"
          :achievements="data?.achievements"
          :competitions="data?.competitions"
          :certificates="data?.certificates?.map((c) => c.certificate)"
          :is-loading="isLoading.data"
        />
      </div>
      <div class="test-diagram-block">
        <UiTabContainer initial-selection="psychotype">
          <div class="select-diagram-btns">
            <UiTab #default="{ isSelected, setSelectedTab }" tab-id="psychotype">
              <UiButton class="select-diagram-btn" @click="setSelectedTab" :active="isSelected">
                Диаграмма психотипа
              </UiButton>
            </UiTab>
            <UiTab tab-id="unknown">
              <UiButton class="select-diagram-btn" disabled> ---- </UiButton>
            </UiTab>
            <UiTab tab-id="unknown">
              <UiButton class="select-diagram-btn" disabled> ---- </UiButton>
            </UiTab>
            <UiTab tab-id="unknown">
              <UiButton class="select-diagram-btn" disabled> ---- </UiButton>
            </UiTab>
          </div>
          <UiGradientBorder :border-radius="borderRadius" :border-width="4">
            <UiTabWindow tab-id="psychotype">
              <div v-if="test.testRes">
                <div class="diagram">
                  <TestDiagram
                    :results="test.testRes?.answers"
                    :prev-results="test.prevTestRes?.answers"
                  />
                </div>
                <div class="diagram-info">
                  <UiHeading variant="h2"> Тяга к острым ощущениям </UiHeading>
                  <UiParagraph>
                    Тяга к острым ощущениям – это стремление испытать нечто захватывающее, что
                    вызывает адреналин и бурю эмоций. Такие люди сосредоточены на процессе, а не на
                    последствиях. Пример – Дима, который занимается экстремальными видами спорта
                    ради эмоций, хотя иногда недооценивает риски. В минимальной форме это может быть
                    просмотр экстремальных видео. Биохимия мозга: высокий тестостерон, колебания
                    адреналина, низкий кортизол.
                  </UiParagraph>
                  <UiHeading variant="h2"> Эмпатия </UiHeading>
                  <UiParagraph>
                    Эмпатия – это способность чувствовать чужие эмоции. Люди с высокой эмпатией
                    заботятся о других, но могут забывать о своих нуждах. Люди с низкой эмпатией
                    меньше обращают внимание на чувства других. Пример – при синдроме Аспергера
                    сложно "поймать" волну эмоций. Биохимия мозга: окситоцин и вазопрессин,
                    взаимодействующие с тестостероном и норадреналином.
                  </UiParagraph>
                  <UiHeading variant="h2"> Аналитические способности </UiHeading>
                  <UiParagraph>
                    Аналитические способности – это умение собирать и анализировать информацию для
                    понимания ситуации. Пример – игрок, анализирующий свои ошибки для улучшения
                    стратегии. Этот навык помогает разбираться в сложных вещах и делать правильные
                    выводы. Биохимия мозга: глутамат, норадреналин, дофамин и ацетилхолин.
                  </UiParagraph>
                  <UiHeading variant="h2"> Физический темп </UiHeading>
                  <UiParagraph>
                    Физический темп – это скорость выполнения физических действий. Высокий темп
                    полезен в ситуациях, требующих быстроты, как у повара в ресторане. Низкий темп
                    помогает в делах, требующих точности, как у скульптора. Биохимия мозга: дофамин,
                    γ-аминомасляная кислота, δ-опиоидный рецептор.
                  </UiParagraph>
                  <UiHeading variant="h2"> Социально-вербальный темп </UiHeading>
                  <UiParagraph>
                    Социально-вербальный темп – это скорость, с которой человек общается и понимает
                    речь. Пример – Лена, которая быстро обсуждает видео с друзьями и предугадывает,
                    о чём говорят персонажи в сериале. Высокий темп помогает в быстром общении, но
                    может приводить к пропуску деталей. Биохимия мозга: эстроген, нейропептиды под
                    контролем дофамина.
                  </UiParagraph>
                  <UiHeading variant="h2"> Пластичность </UiHeading>
                  <UiParagraph>
                    Пластичность – это способность адаптироваться к новым ситуациям. Пример – Алекс,
                    который легко переключается между задачами, но иногда бывает непоследовательным.
                    Минимальная пластичность помогает сосредотачиваться на одной задаче, но может
                    затруднять адаптацию к изменениям. Биохимия мозга: дофамин, ацетилхолин,
                    γ-аминомасляная кислота.
                  </UiParagraph>
                  <UiHeading variant="h2"> Физическая выносливость </UiHeading>
                  <UiParagraph>
                    Физическая выносливость – это способность долго выполнять физические упражнения
                    без усталости. Пример – Ваня, который может долго бегать или играть в футбол.
                    Выносливость может быть долгосрочной, как у марафонца, или интенсивной, как у
                    гимнаста. Биохимия мозга: серотонин, орексины, нейропептиды, гистамин.
                  </UiParagraph>
                  <UiHeading variant="h2"> Социально-вербальная выносливость </UiHeading>
                  <UiParagraph>
                    Социально-вербальная выносливость – это умение долго поддерживать разговор, не
                    уставая. Пример – человек, который может часами беседовать, оставаясь интересным
                    собеседником. Это важно в социальных ситуациях и помогает заводить друзей и быть
                    успешным. Биохимия мозга: эстроген, гистамин, дофамин, серотонин.
                  </UiParagraph>
                  <UiHeading variant="h2"> Интеллектуальная выносливость </UiHeading>
                  <UiParagraph>
                    Интеллектуальная выносливость – это способность сосредотачиваться на важном и
                    игнорировать отвлекающие факторы. Пример – студент на экзамене, который
                    концентрируется на ключевых аспектах задачи. Высокая интеллектуальная
                    выносливость помогает учиться и решать сложные задачи. Биохимия мозга:
                    норадреналин, ацетилхолин, серотонин.
                  </UiParagraph>
                  <UiHeading variant="h2"> Невротизм </UiHeading>
                  <UiParagraph>
                    Невротизм – это склонность избегать стрессовых ситуаций. Люди с высоким уровнем
                    невротизма предпочитают предсказуемость и избегают риска. Пример – Женя, который
                    избегает новых ситуаций из-за страха перед неизвестным. Люди с низким уровнем
                    невротизма легче справляются с неопределённостью. Биохимия мозга: опиоидные
                    k-рецепторы, цитокины, микробиота кишечника, норадреналин.
                  </UiParagraph>
                  <UiHeading variant="h2"> Импульсивность </UiHeading>
                  <UiParagraph>
                    Импульсивность – это склонность действовать под влиянием эмоций без обдумывания
                    последствий. Пример – человек, который быстро принимает решения в экстренных
                    ситуациях. Высокая импульсивность полезна для быстрого реагирования, низкая –
                    для обдуманных действий.Биохимия мозга: опиоидные δ-рецепторы, дофамин.
                  </UiParagraph>
                  <UiHeading variant="h2"> Диспозиционная удовлетворённость </UiHeading>
                  <UiParagraph>
                    Диспозиционная удовлетворённость – это чувство защищённости и хорошего
                    настроения. Пример – Макс, который всегда улыбается и уверен в себе. Лёша, с
                    низкой удовлетворённостью, часто беспокоится, но внимателен к деталям. Это
                    баланс между уверенностью и осторожностью. Биохимия мозга: опиоидные
                    μ-рецепторы, микробиота кишечника, дофамин, серотонин.
                  </UiParagraph>
                </div>
              </div>
              <div class="no-test-results" v-else>
                <UiHeading variant="h2">Диаграмма психотипа</UiHeading>
                <UiParagraph
                  >Вы пока не прошли тестирование, чтобы мы определили Ваш психотип. Пройти
                  тестирование можно по кнопке ниже.</UiParagraph
                >
                <UiNavButton class="test-link" :to="{ name: routeNames.test }"
                  >Пройти тестирование</UiNavButton
                >
              </div>
            </UiTabWindow>
          </UiGradientBorder>
        </UiTabContainer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MainInfo, MeritsInfo, ProfessionalInfo, useAccount } from '@/entities/account';
import { TestDiagram, useTest } from '@/entities/test';
import { accountApi, eduOrgApi } from '@/shared/api';
import { routeNames, useMatchMedia } from '@/shared/lib';
import {
  UiAccordion,
  UiButton,
  UiGradientBorder,
  UiHeading,
  UiNavButton,
  UiParagraph,
  UiTab,
  UiTabContainer,
  UiTabWindow,
} from '@/shared/ui';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const eduOrgName = ref<string>();
const { data, isLoading, isAuthorized } = storeToRefs(useAccount());
const test = useTest();
const fullName = computed(
  () =>
    `${data.value?.last_name ?? ''} ${data.value?.first_name ?? ''} ${data.value?.patronymic ?? ''}`.trim() ||
    'Анонимов Аноним Анонимович'
);

const updateEduOrgName = async (value?: number | null) => {
  if (!value) {
    return;
  }
  eduOrgName.value = (await eduOrgApi.getOrg(value)).name;
};

watch(() => data.value?.educational_organization, updateEduOrgName, { immediate: true });
watch(isAuthorized, (val) => {
  if (val) {
    test.getTests();
  }
});
const isMediaMatches = useMatchMedia('(max-width: 52em)');
const borderRadius = computed(() => (isMediaMatches.value ? 20 : 60));
</script>

<style scoped>
.account-page {
  padding: 3rem 0;
}

.account-info {
  display: grid;
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
  max-width: 100%;
}

.test-diagram {
  padding: 2.4rem;
}

.diagram {
  max-width: 100%;
  position: relative;
}

.select-diagram-btns {
  display: flex;
  gap: 1rem;
  padding-bottom: 2rem;
}

.info-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.diagram-info {
  padding: 2rem 1.6rem;
}

.select-diagram-btn {
  flex: 1 1 25%;
}

.no-test-results {
  display: flex;
  flex-direction: column;
  padding: 2.8rem;
  gap: 1rem;
}

.test-link {
  align-self: flex-end;
}
</style>
