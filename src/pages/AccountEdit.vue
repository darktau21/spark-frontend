<script>
import { useAccount } from '@/entities/account';
import PictureInput from 'vue-picture-input';
import Modal from '@/component/Modal.vue';
import Tag from '@/component/Tag.vue';
import Select from '@/component/Select.vue';
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
      this.$refs.pictureInput;
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
        <button @click="showModal" class="but_edit">Удалить личный кабинет</button>
        <modal v-show="isModalVisible" @close="closeModal" />
      </div>
    </div>
    <form>
      <div class="box_pers">
        <div class="picture_input">
          <picture-input
            ref="pictureInput"
            width="246"
            height="246"
            plain="true"
            accept="image/jpeg,image/png"
            size="5"
            button-class="btnchange"
            remove-button-class="btnremove"
            removable="true"
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
          <label for="first_name">Имя*</label>
          <input required type="text" id="first_name" placeholder="Имя" />
          <label for="patronymic">Отчество*</label>
          <input required type="text" id="patronymic" placeholder="Отчество" />
        </div>

        <div class="box_data">
          <label for="phone_number">Телефон </label>
          <input type="tel" id="phone_number" placeholder="" maxlength="12" minlength="11" />
          <label for="user_email">Электронная почта</label>
          <p class="disable">{{}}</p>
          <label for="telegram">Ссылка на Telegram</label>
          <input type="text" id="telegram" placeholder="" />
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
            v-model="user.achievements"
            maxlength="1000"
            placeholder="Расскажите о своих достижениях"
          ></textarea>

          <label for="contests">Конкурсы</label>
          <textarea
            name="text"
            id="contests"
            v-model="user.contests"
            maxlength="1000"
            placeholder="Опишите конкурсы, в которых вы участвовали"
          ></textarea>
          <!-- <input type="text" id="contests" placeholder="Опишите конкурсы, в которых вы участвовали" /> -->
        </div>
        <div class="box_select">
          <label for="certificates">Сертификаты</label>
          <p>Загрузите изображения формата JPEG/JPG/PNG. Вы можете добавить не более 10 файлов.</p>
          <input
            type="file"
            id="certificates"
            ref="certificates"
            accept="image/jpeg, image/jpg, image/png"
            multiple
            class="btn_input"
          />
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
  border: 1px solid rgb(8, 17, 104);
  color: rgb(8, 17, 104);
}
.btnremove {
  max-width: 174px;
  width: 100%;
  height: 64px;
  border-radius: 20px;
  border: 1px solid red;
  color: red;
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
  border: 1px solid #081168;
  color: #081168;
  cursor: pointer;
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
  background-color: rgb(234, 238, 253);
  border-radius: 30px;
}
label {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
}
input,
select,
textarea {
  margin-bottom: 20px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgb(37, 78, 220);
  resize: vertical;
}
.disable {
  height: 52px;
  border-radius: 8px;
  background-color: rgb(174, 174, 174);
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
  padding: 40px;
  background-color: rgb(234, 238, 253);
  border-radius: 30px;
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
  border: 1px solid rgb(8, 17, 104);
  color: rgb(8, 17, 104);
}
.btn_save {
  font-size: 20px;
  max-width: 292px;
  width: 100%;
  height: 64px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  background: linear-gradient(to top left, rgba(2, 1, 43, 1) 0%, rgba(37, 78, 220, 1) 100%);
}
@media (max-width: 800px) {
  .picture_input,
  .box_data,
  .box_select,
  .box_select_block {
    max-width: 100%;
  }
  .box_prof,
  .box_pers,
  .box_select_flex {
    flex-wrap: wrap;
  }
}
</style>
