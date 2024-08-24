<template>
  <div class="two-sides-block">
    <div class="left part">
      <slot name="left" />
    </div>
    <div class="right part">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.two-sides-block {
  display: grid;
  grid-template-columns: repeat(2, minmax(32rem, 1fr));
  background-color: rgb(255, 255, 255);
  min-height: 60rem;
}

.part {
  padding: 4rem;
  display: grid;
  position: relative;
  z-index: 10;
}

.right {
  align-self: self-start;
  margin: 4rem 0;
}

@media screen and (max-width: 64em) {
  .two-sides-block {
    align-items: stretch;
    grid-template-columns: minmax(32rem, 1fr);
  }

  .left {
    display: none;
  }
  .part {
    padding: 1rem;
  }
}
</style>
