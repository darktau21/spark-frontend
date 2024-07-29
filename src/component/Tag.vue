<template>
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
        <v-button class="delete" @click="removeTag(index)">x</v-button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useUsersStore } from '@/stores';
const user = useUsersStore();
export default {
  name: 'Tag',
  data() {
    return {
      tags: [],
      newTag: '',
    };
  },

  methods: {
    addTag(tag) {
      if (this.newTag != '') {
        this.tags.push(tag);
        user.professional_interests = this.tags;
        this.newTag = '';
      }
      return false;
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
  },
};
</script>
<style scope>
.tag {
  background: rgb(8, 17, 104);
  padding: 5px;
  border-radius: 4px;
  color: white;
  white-space: nowrap;
}
input {
  margin-bottom: 20px;
  height: 52px;
  border-radius: 8px;
  border: 1px solid rgb(37, 78, 220);
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
  cursor: pointer;
}
</style>
