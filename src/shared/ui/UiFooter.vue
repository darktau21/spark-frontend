<template>
  <div class="footer full-width">
    <div class="wrapper">
      <div class="logo">
        <slot name="logo" />
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
    <div class="copyrights">
      <slot name="copyrights" />
    </div>
  </div>
</template>
<style scoped>
.footer {
  padding: 3rem 2rem;
  background: radial-gradient(
      51.12% 56.12% at 100% 0%,
      #730f94 0%,
      rgba(175, 70, 210, 0.2) 63.01%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, #02012b 0%, #2955ec 100%);
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
}

@media screen and (max-width: 48em) {
  .footer {
    border-radius: 0;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
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
  align-self: flex-start;
}

.copyrights {
  padding-top: 5rem;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.6rem;
  flex-wrap: wrap;
}
</style>
