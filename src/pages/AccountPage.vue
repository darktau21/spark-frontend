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
        <p class="pers_data">
          {{ userStore.data?.last_name }} {{ userStore.data?.first_name }}
          {{ userStore.data?.patronymic }}
        </p>
        <div class="icon_box" v-show="userStore.data?.phone_number != null">
          <Icon icon="fluent:phone-32-light" height="28" />
          <p class="pers_data">{{ userStore.data?.phone_number }}</p>
        </div>
        <div class="icon_box">
          <Icon icon="mdi-light:email" height="28" />
          <p class="pers_data">{{}}</p>
        </div>
        <div class="icon_box" v-show="userStore.data?.telegram != null">
          <Icon icon="mingcute:telegram-fill" height="28" />
          <p class="pers_data">{{ userStore.data?.telegram }}</p>
        </div>
      </div>
    </div>

    <div class="box_prof">
      <div class="box__prof">
        <div class="prof_user">
          <label>Образование</label>
          <p v-show="userStore.data?.educational_organization == null">------</p>
          <p class="text_prof_user">{{ userStore.data?.educational_organization }}</p>
          <label>Компетенции</label>
          <p v-show="userStore.data?.educational_organization == null">------</p>
          <p class="text_prof_user">{{}}</p>
          <label>Профессиональные интересы</label>
          <p v-show="user.professional_interests.length == 0">------</p>
          <p class="text_prof_user tag" v-for="interests in user.professional_interests">
            {{ interests }}
          </p>
          <label>Профессиональные навыки</label>
          <p v-show="userStore.data?.educational_organization == null">------</p>
          <p class="text_prof_user">{{}}</p>
        </div>
        <div class="skills_user">
          <label>Достижения</label>
          <p v-show="user.achievements == ''">------</p>
          <p class="text_prof_user">{{ user.achievements }}</p>
          <label>Конкурсы</label>
          <p v-show="user.contests == ''">------</p>
          <p class="text_prof_user">{{ user.contests }}</p>
          <label>Сертификаты</label>
          <p v-show="userStore.data?.educational_organization == null">------</p>
          <p class="text_prof_user">{{}}</p>
        </div>
      </div>

      <div class="chart_box">
        <div class="diag_box" v-show="user.test_result == ''">
          <label class="typo__label">Диаграмма психотипа</label>
          <p>
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
  margin-bottom: 20px;
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

.text_prof_user {
  font-size: 16px;
  text-align: left;
  padding-bottom: 20px;
}
.tag {
  display: grid;
  width: fit-content;
  background: rgb(8, 17, 104);
  padding: 10px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
  max-width: 700px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
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

.hexagon {
  width: 200px;
  clip-path: polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  height: 200px;
  border-radius: 5px;
  object-fit: contain;
  background-color: azure;
  border: none;
  margin: auto;
}
.hexagon_img {
  width: 100%;
  object-fit: contain;
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
