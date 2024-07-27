<template>
  <input
    v-model="professional_interests"
    type="text"
    @keydown.enter="addTag(professional_interests)"
    @keydown.prevent.tab="addTag(professional_interests)"
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
</template>

<script lang="ts">
export default {
  name: 'Tag',
  data() {
    return {
      tags: [],
      professional_interests: '',
    };
  },

  methods: {
    addTag(tag) {
      if (this.professional_interests != '') {
        this.tags.push(tag);
        this.professional_interests = '';
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
</style>
