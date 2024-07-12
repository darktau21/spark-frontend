<template>
  <nav class="nav-menu">
    <slot />
  </nav>
</template>

<style scoped>
.nav-menu {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 56em) {
  .nav-menu {
    display: none;
  }
}
</style>
