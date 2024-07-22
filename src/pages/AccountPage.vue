<script>
import { useUsersStore } from '@/stores';
// import { storeToRefs } from 'pinia';
import Radar from '@/component/Radar.vue';
import { Icon } from '@iconify/vue';
const userStore = useUsersStore();
// const { selectedFile } = storeToRefs(useUsersStore());

export default {
  name: 'AccountePage',
  name: 'AccountePage',
  data() {
    return {
      userStore: userStore,
      visible: false,
    };
  },
  components: {
    Radar,
    Icon,
  },
  methods: {},
};
</script>

<template>
  <section v-for="user in userStore.user" :key="user.email" class="box_account">
    <div class="title_account">
      <h1>Личный кабинет</h1>
      <router-link v-slot="{ edit }" to="/accountedit">
        <button class="but_edit" @click="edit">
          <img src="/edit.svg" alt="" />
          <span>Редактировать</span>
        </button>
      </router-link>
    </div>

    <div class="box_pers">
      <div class="picture_input">
        <div class="hexagon">
          <img v-bind:src="user.avatar" alt="" />
        </div>
      </div>

      <div class="box_data">
        <p class="pers_data">
          {{ user.last_name }} {{ user.first_name }} {{ user.patronymic_name }}
        </p>
        <div class="icon_box" v-show="user.tel_number != ''">
          <Icon icon="fluent:phone-32-light" height="28" />
          <p class="pers_data">{{ user.tel_number }}</p>
        </div>
        <div class="icon_box">
          <Icon icon="mdi-light:email" height="28" />
          <p class="pers_data">{{ user.user_email }}</p>
        </div>
        <div class="icon_box" v-show="user.telegram != ''">
          <Icon icon="mingcute:telegram-fill" height="28" />
          <p class="pers_data">{{ user.telegram }}</p>
        </div>
      </div>
    </div>

    <div class="box_prof">
      <div class="box__prof">
        <div class="prof_user">
          <label>Образование</label>
          <p class="text_prof_user">{{ user.education }}</p>
          <label>Компетенции</label>
          <p class="text_prof_user">{{ user.competencies }}</p>
          <label>Профессиональные интересы</label>
          <p class="text_prof_user">{{ user.prof_interes }}</p>
          <label>Профессиональные навыки</label>
          <p class="text_prof_user">{{ user.skills }}</p>
        </div>
        <div class="skills_user">
          <label>Достижения</label>
          <p class="text_prof_user">{{ user.achievements }}</p>
          <label>Конкурсы</label>
          <p class="text_prof_user">{{ user.contests }}</p>
          <label>Сертификаты</label>
          <p class="text_prof_user">{{ user.certificates }}</p>
        </div>
      </div>

      <div class="chart_box">
        <div class="diag_box">
          <label class="typo__label">Диаграмма психотипа</label>
          <p>
            Вы пока не прошли тестирование, чтобы мы определили Ваш психотип.Пройти тестирование
            можно по кнопке ниже.
          </p>
          <router-link v-slot="{ runtest }" to="/test">
            <button class="but_test" @click="runtest">Пройти тестирование</button>
          </router-link>

          <div>
            <div>
              <Radar />
            </div>
            <p>Ваш психотип -</p>
          </div>
        </div>
        <button @click="visible = !visible" v-show="user.test != 'false'">
          {{ visible ? 'Скрыть подробную информацию' : 'Подробнее' }}
        </button>
        <div v-show="visible" class="description_box">Какое-то описание</div>
      </div>
    </div>
  </section>
</template>
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
.box_account {
  padding-top: 40px;
  max-width: 1420px;
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
.title_account {
  display: flex;
  justify-content: space-between;
}
.but_edit {
  width: 255px;
  height: 64px;
  border-radius: 20px;
  border: 1px solid rgb(151, 71, 255);
  color: #081168;
  cursor: pointer;
}
button > img,
button > span {
  vertical-align: middle;
}
button > img {
  padding-right: 10px;
}

.box_pers {
  display: flex;
  position: relative;
  height: 280px;
  background-color: rgb(234, 238, 253);
  margin: 40px auto 0;
  border-radius: 60px;
  border: 4px solid #081168;
}
.picture_input {
  max-width: 280px;
  width: 100%;
  margin: 0 auto;
  display: flex;
}

.box_data {
  width: 80%;
  margin: 30px 40px;
  text-align: start;
}

.pers_data {
  padding: 10px 0;
}
.icon_box {
  display: flex;
  gap: 10px;
  align-items: center;
}

.box_prof {
  display: flex;
  margin: 20px auto 120px;
  gap: 20px;
}
.box__prof {
  display: grid;
  gap: 20px;
  max-width: 460px;
  width: 100%;
}

.prof_user,
.skills_user {
  background-color: rgb(234, 238, 253);
  text-align: start;
  border-radius: 60px;
  padding: 40px;
  gap: 20px;
  border: 4px solid #081168;
}

label {
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 10pxs;
}
.chart_box {
  position: relative;
  display: block;
  max-width: 940px;
  width: 100%;
}
.diag_box,
.description_box {
  background-color: rgb(234, 238, 253);
  text-align: start;
  border-radius: 60px;
  padding: 40px;
  border: 4px solid #081168;
}
/* .diag_box {
  clip-path: polygon(0 0, 100% 0, 100% 70%, 60% 70%, 60% 100%, 0 100%);
} */
.text_prof_user {
  font-size: 16px;
  text-align: left;
  padding-bottom: 20px;
}
button,
li,
div,
a {
  -webkit-tap-highlight-color: transparent;
}

.hexagon {
  width: 200px;
  height: 115px;
  border-radius: 5px;
  position: relative;
  object-fit: contain;
  background-color: rgb(208, 212, 197);
  border: none;
  margin: auto;
}

.hexagon:before,
.hexagon:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background-color: rgb(208, 212, 197);
  top: 0;
  left: 0;
}

.hexagon:before {
  transform: rotate(60deg);
}

.hexagon:after {
  transform: rotate(-60deg);
}
.but_test {
  width: 288px;
  height: 64px;
  border-radius: 20px;
  border: 1px solid rgb(151, 71, 255);
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(to top left, rgba(2, 1, 43, 1) 0%, rgba(37, 78, 220, 1) 100%);
}
@media (max-width: 800px) {
  .box_prof {
    flex-wrap: wrap;
  }
  .box__prof,
  .achiev_user {
    max-width: 100%;
  }
}
</style>
