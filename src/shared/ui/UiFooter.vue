<template>
  <div class="footer">
    <div class="content">
      <div class="logo">
        <slot name="logo" />
      </div>
      <slot />
    </div>
    <div class="copyright">&copy; Николаев Сергей Владимирович</div>
  </div>
</template>
<style scoped>
.footer {
  padding: 3rem 0;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20ch, max-content));
  row-gap: 2rem;
  column-gap: 10%;
}

.logo {
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  margin-bottom: 1.5rem;
}

.copyright {
  padding-top: 3rem;
  user-select: none;
}
</style>
