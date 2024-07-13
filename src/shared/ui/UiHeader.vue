<template>
  <div class="header">
    <div>
      <slot name="left" />
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 0;
  gap: 1.5rem;
}
.center {
  flex: 1 0;
}
</style>
