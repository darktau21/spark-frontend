<script>
import { useUsersStore } from '@/stores';
import PictureInput from 'vue-picture-input';
import Modal from '@/component/Modal.vue';
// import { storeToRefs } from 'pinia';

const userStore = useUsersStore();
// const { newUser } = storeToRefs(useUsersStore());

export default {
  name: 'AccountEdit',

  components: {
    PictureInput,
    Modal,
  },

  data() {
    return {
      options: [
        { university: 'МГУ' },
        { university: 'ФСБ' },
        { university: 'РИНХ' },
        { university: 'ДГТУ' },
        { university: 'ЮФУ' },
      ],
      userStore: userStore,
      education: { university: 'Не выбрано' },
      tags: [],
      newTag: '',
      isModalVisible: false,
    };
  },

  methods: {
    onChange() {
      const image = this.$refs.pictureInput.file;
      this.userStore.user.image.push(image);
    },
    addTag(tag) {
      if (this.newTag != '') {
        this.tags.push(tag);
        this.newTag = '';
      }
      return false;
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    // editUser() {
    //   this.$store.dispatch({ newUser });
    // },
  },
};
</script>

<template>
  <section class="box_account" v-for="user in userStore.user" :key="user.email">
    <div class="title_account">
      <h1>Редактирование личного кабинета</h1>
      <div>
        <button @click="showModal" class="but_edit">Удалить личный кабинет</button>
        <modal v-show="isModalVisible" @close="closeModal" />
      </div>
    </div>

    <div class="box_pers">
      <div class="picture_input">
        <picture-input
          ref="pictureInput"
          v-model="user.image"
          width="246"
          height="246"
          radius="50"
          class="hexagon"
          accept="image/jpeg,image/png"
          size="5"
          button-class="btnchange"
          remove-button-class="btnremove"
          removable="true"
          :zIndex="1"
          :custom-strings="{
            upload: '<p>Ваше устройство не поддерживает загрузку файлов.</p>',
            drag: 'Здесь могло бы быть Ваше фото',
            fileSize: 'Размер файла превышает ограничение',
            fileType: 'Этот тип файла не поддерживается',
            change: 'Изменить',
            remove: 'Удалить',
          }"
          @change="onChange"
        >
        </picture-input>
        <p>Рекомендуемый формат файла JPEG / PNG</p>
        <p>Рекомендуемый размер не более 5 МБ</p>
      </div>

      <div class="box_data">
        <label for="last_name">Фамилия*</label>
        <input
          required
          id="last_name"
          v-model="user.last_name"
          @keyup.enter="editUser()"
          type="text"
          placeholder="Фамилия"
        />
        <label for="first_name">Имя*</label>
        <input required type="text" id="first_name" v-model="user.first_name" placeholder="Имя" />
        <label for="patronymic_name">Отчество*</label>
        <input
          required
          type="text"
          id="patronymic_name"
          v-model="user.patronymic_name"
          placeholder="Отчество"
        />
      </div>

      <div class="box_data">
        <label for="tel_number">Телефон </label>
        <input type="tel" id="tel_number" v-model="user.tel_number" placeholder="" />
        <label for="user_email">Электронная почта</label>
        <p class="disable">
          {{ user.user_email }}
        </p>
        <label for="telegram">Ссылка на Telegram</label>
        <input type="text" id="telegram" v-model="user.telegram" placeholder="" />
      </div>
    </div>

    <div class="box_prof">
      <div class="box_select">
        <label for="education">Образование</label>
        <select v-model="user.education" id="education">
          <option v-bind:education="university" v-for="option in options">
            {{ option.university }}
          </option>
        </select>
        <label for="prof_interes">Профессиональные интересы</label>
        <span>Вы можете добавить до 10 интересов</span>
        <input
          v-model="newTag"
          type="text"
          @keydown.enter="addTag(newTag)"
          @keydown.prevent.tab="addTag(newTag)"
          placeholder="Например, психология "
        />
        <div class="tag-input">
          <ul class="tags">
            <li v-for="(tag, index) in tags" :key="tag" class="tag">
              {{ tag }}
              <button class="delete" @click="removeTag(index)">x</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="box_select">
        <label>Компетенции</label>
        <input
          type="text"
          id="competencies"
          v-model="user.competencies"
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
        <input
          type="text"
          id="achievements"
          v-model="user.achievements"
          placeholder="Расскажите о своих достижениях"
        />
        <label for="contests">Конкурсы</label>
        <input
          type="text"
          id="contests"
          v-model="user.contests"
          placeholder="Опишите конкурсы, в которых вы участвовали"
        />
      </div>
      <div class="box_select">
        <label for="certificates">Сертификаты</label>
        <p>Загрузите изображения формата JPEG/JPG/PNG. Вы можете добавить не более 10 файлов.</p>
        <input type="file" id="certificates" accept="image/jpeg, image/jpg, image/png" multiple />
      </div>
    </div>
    <div class="box_btn">
      <router-link v-slot="{ account }" to="/account">
        <button class="btn_back" @click="account">Назад</button>
      </router-link>
      <button class="btn_save" @click="editUser">Сохранить изменения</button>
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
  width: 100%;
}

.picture_img {
  /* margin: 40px; */
  object-fit: contain;
  text-align: center;
}

.box_data {
  display: grid;
  max-width: 460px;
  width: 100%;
  padding: 40px;
  text-align: start;
  background-color: rgb(234, 238, 253);
  border-radius: 30px;
}
label {
  font-size: 18px;
  font-weight: 700;
}
input,
select {
  margin-bottom: 20px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgb(37, 78, 220);
}
.disable {
  height: 52px;
  border-radius: 8px;
  background-color: rgb(174, 174, 174);
  padding: 15px 10px;
}
.box_prof {
  display: flex;
  margin: 20px auto 40px;
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
  gap: 20px;
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
ul {
  max-width: 700px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0;
  padding: 0;
}
.tag {
  background: rgb(8, 17, 104);
  padding: 5px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
}
</style>
