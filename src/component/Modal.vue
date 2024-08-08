<script lang="ts">
export default {
  name: 'Modal',
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
<template>
  <teleport to="#modal">
    <transition name="modal-fade">
      <div class="modal-backdrop" @wheel.prevent @touchmove.prevent @scroll.prevent>
        <div class="modal" role="dialog" aria-labelledby="modalTitle">
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
          <div class="modal_box">
            <h2>Предупреждение</h2>
            <p>
              Вы уверены, что хотите удалить свой профиль?<br />
              Отменить это действие будет невозможно.
            </p>
            <div class="btn_box">
              <button type="button" class="btn-back" @click="close">Отмена</button>
              <button type="button" class="btn-del">Удалить профиль</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  max-width: 620px;
  width: 100%;
  height: 350px;
  background: #ffffff;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  z-index: 10;
  border-radius: 40px;
  margin: 0 20px;
}

.btn-close {
  position: absolute;
  border: none;
  top: 40px;
  right: 40px;
  font-size: 20px;
  cursor: pointer;
  color: rgb(21, 21, 21);
  background: transparent;
  text-align: right;
}
.modal_box {
  margin: auto;
  text-align: center;
}
.btn_box {
  gap: 20px;
  display: flex;
  justify-content: center;
}

.btn-back {
  max-width: 152px;
  height: 64px;
  width: 100%;
  color: rgba(8, 17, 104, 1);
  background: #ffffff;
  border: 1px solid #4aae9b;
  border-radius: 20px;
}
.btn-del {
  max-width: 252px;
  height: 64px;
  width: 100%;
  color: #ffffff;
  background: radial-gradient(
      51% 56% at 100% 0%,
      rgba(115, 15, 148, 1) 0%,
      rgba(175, 70, 210, 0.2) 63%,
      rgba(175, 70, 210, 0) 100%
    ),
    linear-gradient(316.71deg, rgba(2, 1, 43, 1) 0%, rgba(41, 85, 236, 1) 100%);
  border-radius: 20px;
  border: none;
}
</style>
