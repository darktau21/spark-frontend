<template>
  <div class="wrapper">
    <header class="container">
      <slot name="header" />
    </header>
    <main class="container main">
      <slot />
    </main>
    <footer class="container footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  min-width: 320px;
}

.main {
  flex: 1 0;
  position: relative;
}
</style>
