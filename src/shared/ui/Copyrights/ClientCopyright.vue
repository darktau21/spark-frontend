<template>
  <div class="client-copyright">©️ {{ currentYear }}, Николаев Сергей Владимирович</div>
</template>
<script setup lang="ts">
const currentYear = new Date().getFullYear().toString();
</script>
<style scoped>
.client-copyright {
  color: rgba(255, 255, 255, 1);
}
</style>
