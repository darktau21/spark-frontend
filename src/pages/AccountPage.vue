<script lang="ts">
import { useAccount } from '@/entities/account';
import Radar from '@/component/Radar.vue';
import { Icon } from '@iconify/vue';
import { useUsersStore } from '@/stores';
const userStore = useAccount();
const user = useUsersStore();
export default {
  name: 'AccountePage',
  name: 'AccountePage',
  data() {
    return {
      visible: false,
      userStore,
      user,
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
  <section class="box_account">
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
          <img class="hexagon_img" src="/5.png" alt="" />
        </div>
      </div>

      <div class="box_data">
        <p class="label_data">
          {{ userStore.data?.last_name }} {{ userStore.data?.first_name }}
          {{ userStore.data?.patronymic }}
        </p>
        <div class="icon_box">
          <Icon icon="fluent:phone-32-light" height="28" />
          <p class="pers_data">{{ userStore.data?.phone_number }}</p>
        </div>
        <div class="icon_box">
          <Icon icon="mdi-light:email" height="28" />
          <p class="pers_data">{{}}</p>
        </div>
        <div class="icon_box">
          <Icon icon="mingcute:telegram-fill" height="28" />
          <p class="pers_data">{{ userStore.data?.telegram }}</p>
        </div>
      </div>
    </div>

    <div class="box_prof">
      <div class="box__prof">
        <div class="prof_user">
          <label>Образование</label>
          <p v-show="userStore.data?.educational_organization == null">-</p>
          <p class="text_prof_user">{{ userStore.data?.educational_organization }}</p>

          <label>Специальность</label>
          <p v-show="userStore.data?.specialty == null">-</p>
          <p class="text_prof_user">{{ userStore.data?.specialty }}</p>

          <label>Компетенции</label>
          <p v-show="userStore.data?.competencies == null">-</p>
          <p class="text_prof_user">{{ userStore.data?.competencies }}</p>

          <label>Профессиональные интересы</label>
          <p v-show="userStore.data?.professional_interests == null">-</p>
          <p class="text_prof_user" v-for="interests in userStore.data?.professional_interests">
            {{ interests }}
          </p>

          <label>Профессиональные навыки</label>
          <p v-show="userStore.data?.professional_competencies == null">-</p>
          <p class="text_prof_user">{{ userStore.data?.professional_competencies }}</p>
        </div>

        <div class="skills_user">
          <label>Достижения</label>
          <p v-show="userStore.data?.achievements == null">-</p>
          <p class="text_prof_user">{{ userStore.data?.achievements }}</p>

          <label>Конкурсы</label>
          <p v-show="userStore.data?.competitions == null">-</p>
          <p class="text_prof_user">{{ userStore.data?.competitions }}</p>

          <!-- <label>Сертификаты</label>
          <p v-show="userStore.data?.educational_organization == null">-</p>
          <p class="text_prof_user">{{}}</p> -->
        </div>
      </div>

      <div class="chart_box">
        <div class="diag_box" v-show="user.test_result == ''">
          <label>Диаграмма психотипа</label>
          <p class="text_prof_user">
            Вы пока не прошли тестирование, чтобы мы определили Ваш психотип.Пройти тестирование
            можно по кнопке ниже.
          </p>
          <router-link v-slot="{ runtest }" to="/test">
            <button class="but_test" @click="runtest">Пройти тестирование</button>
          </router-link>
        </div>
        <div v-show="user.test_result != ''">
          <div class="diag_box">
            <div>
              <Radar />
            </div>
            <p>Ваш психотип -</p>
          </div>
          <!-- <button @click="visible = !visible">
            {{ visible ? 'Скрыть подробную информацию' : 'Подробнее' }}
          </button>
          <div v-show="visible" class="description_box">Какое-то описание</div> -->
        </div>
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
  height: 254px;
  margin: 40px auto 0;
  border-radius: 60px;
  border: 4px solid rgba(3, 0, 124, 1);
}
.picture_input {
  max-width: 254px;
  width: 100%;
  margin: 0 auto;
  display: flex;
}
.hexagon {
  width: 174px;
  clip-path: polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  height: 174px;
  border-radius: 5px;
  object-fit: contain;
  background-color: rgba(209, 219, 255, 1);
  border: none;
  margin: auto;
}
.hexagon_img {
  width: 100%;
  object-fit: contain;
}

.box_data {
  max-width: 1166px;
  width: 100%;
  margin: 40px 0;
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.label_data,
label {
  font-family: 'Nunito Sans';
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
}
label {
  margin-bottom: 10px;
}
.pers_data,
.text_prof_user {
  font-family: 'Nunito Sans';
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
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
  text-align: start;
  border-radius: 60px;
  padding: 40px;
  border: 4px solid #081168;
  display: flex;
  flex-direction: column;
}

.chart_box {
  position: relative;
  display: block;
  max-width: 940px;
  width: 100%;
}
.diag_box,
.description_box {
  text-align: start;
  border-radius: 60px;
  padding: 40px;
  border: 4px solid #081168;
}

.text_prof_user {
  padding-bottom: 20px;
}
.tag {
  display: grid;
  width: fit-content;
  padding: 10px;
  white-space: nowrap;
  max-width: 700px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
}
button,
li,
div,
a {
  -webkit-tap-highlight-color: transparent;
}

.but_test {
  width: 288px;
  height: 64px;
  border-radius: 20px;
  border: 1px solid rgb(151, 71, 255);
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(316.71deg, #02012b 0%, #2955ec 100%),
    radial-gradient(
      51.12% 56.12% at 100% 0%,
      #730f94 0%,
      rgba(175, 70, 210, 0.2) 63.01%,
      rgba(175, 70, 210, 0) 100%
    );
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
