<template>
  <div class="wrapper">
    <embed class="view"  :src="link" width="280" height="150" />
  </div>
</template>
<script setup lang="ts">

defineProps<{
  link: string;
}>();

</script>
<style scoped>
.wrapper {
  overflow: hidden;
  position: relative;
  width: 280px;
  height: 150px;
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 20px;
}

.view {
  height: 100%;
  object-fit: contain;
  object-position: center;
}

.name {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba(211, 219, 252, 0.9);
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  z-index: 10;
}
.delete {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(128, 128, 128, 0.5);
  opacity: 0;
  color: #fff;
  user-select: none;
}

@media screen and (hover: hover) {
  .delete:hover {
    opacity: 1;
  }
}

</style>
