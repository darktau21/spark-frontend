<script>
import { useAccount } from '@/entities/account';
import PictureInput from 'vue-picture-input';
import Modal from '@/component/Modal.vue';
import Tag from '@/component/Tag.vue';
import Certificates from '@/component/Certificates.vue';
import Select from '@/component/Select.vue';
import Roleuser from '@/component/Roleuser.vue';
import { useUsersStore } from '@/stores';
const user = useUsersStore();
const userStore = useAccount();
export default {
  name: 'AccountEdit',

  components: {
    PictureInput,
    Modal,
    Tag,
    Select,
    Certificates,
    Roleuser,
  },

  data() {
    return {
      userStore,
      user,
      isModalVisible: false,
    };
  },

  methods: {
    onChange() {
      this.$refs.pictureInputs;
    },

    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<template>
  <section class="box_account">
    <div class="title_account">
      <h1>Редактирование личного кабинета</h1>
      <div>
        <button @click="showModal" class="but_edit">
          <img src="/public/Vector.svg" alt="" />
          <span>Удалить личный кабинет</span>
        </button>
        <Modal v-if="isModalVisible" @close="closeModal" />
      </div>
    </div>
    <form>
      <div class="box_pers">
        <div class="picture_input">
          <picture-input
            ref="pictureInput"
            width="246"
            height="246"
            :plain="true"
            accept="image/jpeg,image/png"
            size="5"
            button-class="btnchange"
            remove-button-class="btnremove"
            :removable="true"
            :zIndex="0"
            :custom-strings="{
              upload: '<p>Ваше устройство не поддерживает загрузку файлов.</p>',
              drag: 'Здесь могло бы быть Ваше фото',
              fileSize: 'Размер файла превышает ограничение',
              fileType: 'Этот тип файла не поддерживается',
              change: 'Загрузить',
              remove: 'Удалить',
            }"
            @change="onChange"
          >
          </picture-input>

          <span>Рекомендуемый формат файла JPEG / PNG</span> <br />
          <span>Рекомендуемый размер не более 5 МБ</span>
        </div>

        <div class="box_data">
          <label for="last_name">Фамилия*</label>
          <input required id="last_name" type="text" placeholder="Фамилия" />
          <div class="box__data">
            <div>
              <label for="first_name">Имя*</label>
              <input required type="text" id="first_name" placeholder="Имя" />
            </div>
            <div>
              <label for="patronymic">Отчество*</label>
              <input required type="text" id="patronymic" placeholder="Отчество" />
            </div>
          </div>

          <label for="role_user">Роль пользователя</label>
          <Roleuser />
        </div>

        <div class="box_data">
          <label for="phone_number">Телефон </label>
          <input type="tel" id="phone_number" placeholder="" maxlength="12" minlength="11" />
          <label for="user_email">Электронная почта</label>
          <p class="disable">{{}}</p>
          <label for="telegram">Ссылка на Telegram</label>
          <input type="text" id="telegram" placeholder="" pattern="[A-Za-z]" />
        </div>
      </div>

      <div class="box_prof">
        <div class="box_select">
          <div class="box_select_flex">
            <div class="box_select_block">
              <label for="educational_organization">Образование</label>
              <Select />
            </div>
            <div class="box_select_block">
              <label for="speciality">Специальность</label>
              <input type="text" id="speciality" placeholder="Введите специальность" />
            </div>
          </div>
          <label for="professional_competencies">Профессиональные интересы</label>
          <span>Вы можете добавить до 10 интересов</span>
          <Tag />
        </div>
        <div class="box_select">
          <label for="competencies">Компетенции</label>
          <input
            type="text"
            id="competencies"
            placeholder="Не более 1000 символов"
            maxlength="1000"
          />

          <label>Профессиональные навыки</label>
          <span>Вы можете добавить до 10 навыков</span>
          <input type="text" placeholder="Например, коммуникабельность" />
        </div>
      </div>
      <div class="box_prof">
        <div class="box_select">
          <label for="achievements">Достижения</label>
          <textarea
            name="text"
            id="achievements"
            maxlength="1000"
            placeholder="Расскажите о своих достижениях"
          ></textarea>

          <label for="contests">Конкурсы</label>
          <textarea
            name="text"
            id="contests"
            maxlength="1000"
            placeholder="Опишите конкурсы, в которых вы участвовали"
          ></textarea>
        </div>
        <div class="box_select">
          <Certificates />
        </div>
      </div>
    </form>

    <div class="box_btn">
      <router-link v-slot="{ account }" to="/account">
        <button class="btn_back" @click="account">Назад</button>
      </router-link>
      <button class="btn_save">Сохранить изменения</button>
    </div>
  </section>
</template>

<style>
.btnchange {
  max-width: 174px;
  width: 100%;
  height: 64px;
  border-radius: 20px;
  border: 2px solid rgba(3, 0, 124, 1);
  color: rgba(3, 0, 124, 1);
  background-color: white;
  font-weight: 600;
}
.btnremove {
  max-width: 174px;
  width: 100%;
  height: 64px;
  border-radius: 20px;
  border: 2px solid red;
  color: red;
  background-color: white;
}
</style>
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
p {
  padding: 20px 0;
}
.title_account {
  display: flex;
  justify-content: space-between;
}
.but_edit {
  width: 351px;
  height: 64px;
  border-radius: 20px;
  border: 2px solid rgba(3, 0, 124, 1);
  color: rgba(3, 0, 124, 1);
  cursor: pointer;
  font-family: 'Nunito Sans';
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  background-color: white;
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
  margin: 40px auto 0;
  border-radius: 30px;
  gap: 20px;
  justify-content: flex-end;
}
.picture_input {
  max-width: 400px;
  min-width: 175px;
  width: 100%;
}

.box_data {
  display: grid;
  max-width: 460px;
  min-width: 270px;
  width: 100%;
  padding: 40px;
  text-align: start;
  border: double 4px transparent;
  border-radius: 60px;
  background-image: linear-gradient(white, white),
    linear-gradient(316.71deg, #0c08a7 0%, #6386fe 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.box__data {
  display: grid;
  grid-template-columns: 47% 47%;
  justify-content: space-between;
}
label {
  font-family: 'Nunito Sans';
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 10px;
}
input,
select,
textarea {
  width: 100%;
  margin-bottom: 20px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgb(37, 78, 220);
  resize: vertical;
  padding: 16px;
}

span {
  margin-bottom: 10px;
}
.disable {
  height: 52px;
  border-radius: 8px;
  background-color: rgba(222, 227, 244, 1);
  padding: 15px 10px;
  margin-bottom: 20px;
}
.box_prof {
  display: flex;
  margin: 20px auto 20px;
  gap: 20px;
}
.box_select {
  display: grid;
  text-align: left;
  max-width: 700px;
  width: 100%;
  height: fit-content;
  padding: 40px;
  border-radius: 60px;
  border: double 4px transparent;
  border-radius: 60px;
  background-image: linear-gradient(white, white),
    linear-gradient(316.71deg, #0c08a7 0%, #6386fe 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
.box_select_flex {
  display: flex;
  gap: 20px;
}
.box_select_block {
  display: grid;
  max-width: 350px;
  width: 100%;
}
.box_btn {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding-bottom: 120px;
}
.btn_back {
  font-size: 20px;
  width: 140px;
  height: 64px;
  border-radius: 20px;
  border: 2px solid rgba(3, 0, 124, 1);
  color: rgba(3, 0, 124, 1);
  background: white;
  font-weight: 600;
}
.btn_save {
  font-size: 20px;
  max-width: 292px;
  font-weight: 600;
  width: 100%;
  height: 64px;
  border-radius: 20px;
  border: none;
  color: white;
  cursor: pointer;
  background: radial-gradient(
      51% 56% at 100% 0%,
      rgba(115, 15, 148, 1) 0%,
      rgba(175, 70, 210, 0.2) 63%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, rgba(2, 1, 43, 1) 0%, rgba(41, 85, 236, 1) 100%);
}
@media (max-width: 800px) {
  .picture_input,
  .box_data,
  .box_select,
  .box_select_block {
    max-width: 100%;
  }
  .title_account,
  .box_prof,
  .box_pers,
  .box_select_flex {
    flex-wrap: wrap;
  }
  .title_account {
    justify-content: center;
    gap: 20px;
  }
  .box_select,
  .box_data {
    padding: 20px;
  }
  .box__data {
    display: block;
  }
  .but_edit,
  .btn_upload {
    width: 240px;
  }
}
</style>
