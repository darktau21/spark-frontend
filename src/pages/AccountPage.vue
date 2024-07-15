<script>
import { useUsersStore } from '@/stores';
import { storeToRefs } from "pinia";
const userStore = useUsersStore();
const  { selectedFile}  = storeToRefs(useUsersStore());
export default {
  name: "AccountePage",
  data() {
    return {
      userStore: userStore,
      selectedFile
      
     
    };
  },

  methods: {
   
  },
};
</script>

<template>
  <section v-for="user in userStore.user" :key="user.email" class="box_account">
    <div class="title_account">
      <h1>Личный кабинет</h1>
      <router-link v-slot="{ edit }" to="/accountedit">
        <button class="but_edit" @click="edit">Редактировать</button>
      </router-link>
    </div>

    <div class="box_pers">
      <div class="picture_input">
        <div class="picture_img">{{ user.image }}</div>
      </div>

      <div class="box_data">
        <p v-if="user.user_email == 'iskra@mail.ru'" class="pers_data">
          {{ user.last_name }} {{ user.first_name }} {{ user.patronymic_name }}
        </p>
        <p v-if="user.user_email == 'iskra@mail.ru'" class="pers_data">{{ user.education }}</p>
        <p v-if="user.user_email == 'iskra@mail.ru'" class="pers_data">{{ user.tel_number }}</p>
        <p v-if="user.user_email == 'iskra@mail.ru'" class="pers_data">{{ user.user_email }}</p>
        <p v-if="user.user_email == 'iskra@mail.ru'" class="pers_data">{{ user.user_telegram }}</p>
      </div>
    </div>

    <div class="box_prof">
      <div class="prof_user">
        <label>Образование</label>
        <p class="text_prof_user">{{ user.last_name }}</p>
        <label>Компетенции</label>
        <p class="text_prof_user">{{ user.last_name }}</p>
        <label>Профессиональные интересы</label>
        <p class="text_prof_user">{{ user.prof_interes }}</p>
        <label>Профессиональные навыки</label>
        <p class="text_prof_user">{{ user.last_name }}</p>
      </div>
      <div class="diag_box">
        <label class="typo__label">Диаграмма психотипа</label>
        <!-- <img class="diag_img" src="../components/image/diag.jpg" alt="" /> -->
      </div>
    </div>
  </section>
</template>
<style scoped>

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
  color: rgb(151, 71, 255);
  cursor: pointer;
}

.box_pers {
  display: flex;
  height: 280px;
  background-color: rgb(234, 238, 253);
  margin: 40px auto 0;
  border-radius: 30px;
}
.picture_input {
  width: 20%;
  margin: 0;
}

.picture_img {
  margin: 40px auto;
  object-fit: contain;
  text-align: center;
  background-color: rgb(208, 212, 197);
  border: none;
  border-radius: 50%;
  width: 200px;
  height: 200px;
}

.box_data {
  width: 80%;
  margin-left: 40px;
  text-align: start;
}

.pers_data {
  padding: 5px 40px;
}

.box_prof {
  display: flex;
  margin: 20px auto 120px;
  gap: 20px;
}

.prof_user {
  max-width: 460px;
  width: 100%;
  background-color: rgb(234, 238, 253);
  text-align: start;
  border-radius: 40px;
  padding: 40px;
}

label {
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 10pxs;
}
.diag_box {
  max-width: 940px;
  width: 100%;
  background-color: rgb(234, 238, 253);
  text-align: start;
  border-radius: 40px;
  padding: 40px;
}

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
</style>
