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
    <div class="border_color border_top">
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
            {{}}
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
    </div>

    <div class="box_prof">
      <div class="box__prof">
        <div class="border_color">
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
        </div>
        <div class="border_color">
          <div class="skills_user">
            <label>Достижения</label>
            <p v-show="userStore.data?.achievements == null">-</p>
            <p class="text_prof_user">{{ user.dost }}</p>

            <label>Конкурсы</label>
            <p v-show="userStore.data?.competitions == null">-</p>
            <p class="text_prof_user">{{ userStore.data?.achievements }}</p>

            <label>Сертификаты</label>
            <p>-</p>
            <p class="text_prof_user">{{}}</p>
          </div>
        </div>
      </div>

      <div class="chart_box">
        <div class="border_union" v-show="user.test_result == ''">
          <div class="test_link_box">
            <label>Диаграмма психотипа</label>
            <p class="text_prof_user">
              Вы пока не прошли тестирование, чтобы мы определили Ваш психотип. Пройти тестирование
              можно по кнопке ниже.
            </p>
            <router-link v-slot="{ runtest }" to="/test">
              <button class="but_test" @click="runtest">Пройти тестирование</button>
            </router-link>
          </div>
        </div>
        <div class="border_color" v-show="user.test_result != ''">
          <div class="diag_box">
            <label>Диаграмма психотипа</label>
            <div>
              <Radar />
            </div>
            <p>Ваш психотип -</p>
            <div class="box_btn_description">
              <button @click="visible = !visible" class="btn_description">
                {{ visible ? 'Скрыть подробную информацию' : 'Подробнее' }}
              </button>
            </div>
          </div>
        </div>
        <div v-show="visible" class="description_box">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium esse alias
            voluptatibus blanditiis enim nihil, veniam eveniet iste quia? Ratione in accusamus porro
            ipsa, dolore repudiandae quisquam explicabo deserunt reprehenderit? 200
          </p>
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
  border: 2px solid rgba(3, 0, 124, 1);
  color: rgba(3, 0, 124, 1);
  cursor: pointer;
  background-color: #ffffff;
}
button > img,
button > span {
  vertical-align: middle;
}
button > img {
  padding-right: 10px;
}
.border_color {
  background: radial-gradient(
      51% 56% at 100% 0%,
      rgba(115, 15, 148, 1) 0%,
      rgba(175, 70, 210, 0.2) 63%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, rgba(2, 1, 43, 1) 0%, rgba(41, 85, 236, 1) 100%);
  border-radius: 60px;
  padding: 4px;
}
.border_top {
  margin: 40px auto 0;
}
.box_pers {
  display: flex;
  position: relative;
  height: 246px;
  border-radius: 56px;
  background-color: #ffffff;
}
.picture_input {
  max-width: 254px;
  width: 100%;
  margin: 0 auto;
  display: flex;
}
.hexagon {
  width: 164px;
  clip-path: polygon(50% 0, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  height: 174px;
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
  border-radius: 56px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.chart_box {
  position: relative;
  display: block;
  max-width: 940px;
  width: 100%;
  height: fit-content;
  display: grid;
  gap: inherit;
}
.test_link_box {
  text-align: start;
  border-radius: 60px;
  padding: 40px;
  position: relative;
  height: 240px;
}
.diag_box {
  text-align: start;
  border-radius: 56px;
  padding: 40px;
  position: relative;
  background-color: white;
}

.description_box {
  text-align: start;
  border-radius: 56px;
  padding: 40px;
  position: relative;
  border: 4px solid rgba(3, 0, 124, 1);
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
.box_btn_description {
  width: 100%;
  display: flex;
  justify-content: right;
  margin-top: 20px;
}
.but_test,
.btn_description {
  width: 288px;
  height: 64px;
  border-radius: 20px;
  border: 1px solid rgb(151, 71, 255);
  color: #ffffff;
  cursor: pointer;
  background: radial-gradient(
      51% 56% at 100% 0%,
      rgba(115, 15, 148, 1) 0%,
      rgba(175, 70, 210, 0.2) 63%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, rgba(2, 1, 43, 1) 0%, rgba(41, 85, 236, 1) 100%);
}
.but_test {
  position: absolute;
  right: 0;
  bottom: 0;
}

.border_union {
  background-image: url(/public/Union.svg);
  width: 100%;
  background-repeat: no-repeat;
}
.border_uniondiag {
  background-image: url(/public/Uniondiag.svg);
  width: 100%;
  background-repeat: no-repeat;
}
@media (max-width: 800px) {
  .title_account,
  .box_pers,
  .box_prof {
    flex-wrap: wrap;
    height: auto;
  }
  .title_account {
    justify-content: center;
    gap: 20px;
  }
  .box__prof,
  .achiev_user {
    max-width: 100%;
  }
  .box_pers,
  .prof_user,
  .skills_user,
  .test_link_box,
  .diag_box {
    padding: 20px;
  }
  label {
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
  }
  .text_prof_user {
    font-size: 16px;
  }
  .but_test,
  .btn_description {
    width: 240px;
  }
}
@media (max-width: 1420px) {
  .but_test,
  .btn_description {
    width: 240px;
    position: relative;
  }
  .border_union {
    background-image: none;
  }
  .test_link_box {
    border: 4px solid rgba(3, 0, 124, 1);
    height: auto;
  }
}
</style>
