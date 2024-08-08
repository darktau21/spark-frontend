<template>
  <input
    id="tag"
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
        <span class="delete" @click="removeTag(index)">
          <img src="/public/crossoutline.svg" alt="" />
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
// import { useUsersStore } from '@/stores';
import { useAccount } from '@/entities/account';
// const user = useUsersStore();
const userStore = useAccount();
export default {
  name: 'Tag',
  data() {
    return {
      tags: [],
      newTag: '',
      // user,
    };
  },

  methods: {
    addTag(tag, index) {
      if (this.newTag != '') {
        this.tags.push(tag);
        this.newTag = '';
        // userStore.data?.professional_interests = this.tags;
      }
      if (this.tags.length > 10) {
        alert(
          'Превышено максимальное количество указанных проф. интересов. Будет загружено только 10'
        );
        this.tags.splice(index, 1);
      }
      return false;
    },

    removeTag(index) {
      this.tags.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.tag {
  background: rgba(209, 219, 255, 1);
  padding: 10px;
  border-radius: 12px;
  color: rgba(21, 21, 21, 1);
  white-space: nowrap;
  font-family: 'Nunito Sans';
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  gap: 4px;
}
input {
  margin-bottom: 20px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgb(37, 78, 220);
  padding: 16px;
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
.delete {
  display: flex;
  cursor: pointer;
}
</style>
