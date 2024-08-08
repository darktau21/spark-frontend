<template>
  <label for="certificates">Сертификаты</label>
  <p>Загрузите изображения формата JPEG/ JPG/ PNG. Вы можете добавить не более 10 файлов.</p>
  <div class="box_input_files">
    <input
      id="files"
      type="file"
      ref="files"
      multiple
      @change="handleFilesUpload()"
      accept="image/png, image/jpeg, image/jpg"
    />

    <div class="box-file-listing">
      <div v-for="(file, key) in files" class="file-listing">
        {{ file.name }}
        <span class="remove-file" @click="removeFile(key)">
          <img src="/public/crossoutline.svg" alt="" />
        </span>
      </div>
    </div>
  </div>

  <div class="box_upload">
    <span @click="addFiles()" class="btn_upload">Загрузить файл</span>
  </div>
</template>
<script>
import { useUsersStore } from '@/stores';
const user = useUsersStore();
export default {
  data() {
    return {
      files: [],
      user,
    };
  },
  methods: {
    addFiles() {
      this.$refs.files.click();
    },
    handleFilesUpload(index) {
      let uploadedFiles = this.$refs.files.files;
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }

      if (this.files.length > 10) {
        alert('Превышено максимальное количество файлов. Будет загружено только 10 файлов');
        this.files.splice(index, 1);
        return;
      }
      user.sert = this.files;
    },
    removeFile(key) {
      this.files.splice(key, 1);
    },
  },
};
</script>

<style scoped>
.box_input_files {
  display: block;
}
input[type='file'] {
  position: absolute;
  top: -500px;
}
label {
  font-family: 'Nunito Sans';
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 20px;
}
.box-file-listing {
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
}
.file-listing {
  display: flex;
  background: rgba(209, 219, 255, 1);
  padding: 10px;
  border-radius: 12px;
  color: rgba(21, 21, 21, 1);
  white-space: nowrap;
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  justify-content: space-between;
  gap: 4px;
}

.remove-file {
  cursor: pointer;
  float: right;
}
.box_upload {
  display: flex;
  justify-content: right;
}
.btn_upload {
  font-size: 20px;
  max-width: 292px;
  width: 100%;
  text-align: center;

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
  margin-top: 20px;
  padding: 20px;
}
@media (max-width: 380px) {
  .box-file-listing {
    grid-template-columns: 100%;
  }
}
</style>
