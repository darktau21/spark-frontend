<template>
  <div class="two-sides-block">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-sides-block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  min-height: 50rem;
}

.left {
  background-color: rgb(217, 217, 217);
  position: relative;
  z-index: 10;
}

@media screen and (max-width: 40rem) {
  .left {
    display: none;
  }
}

.right {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: grid;
  align-content: center;
  position: relative;
  z-index: 1;
}
</style>
