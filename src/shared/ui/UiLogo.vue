<script setup lang="ts">
import { routeNames } from '@/shared/lib';
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink :to="{ name: routeNames.home }" class="logo">
    <span class="logo-icon">✨</span>
    <span class="logo-text">ИСКРА</span>
  </RouterLink>
</template>

<style scoped>
.logo {
  font-size: 3.8rem;
  font-weight: 700;
  line-height: 1;
  color: rgb(0, 0, 0);
  text-decoration: none;
}

@media screen and (max-width: 30em) {
  .logo-text {
    display: none;
  }
}
</style>
