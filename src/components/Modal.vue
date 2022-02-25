<template>
  <div class="modal" :class="[modalActive ? 'is-active' : 'is-close']">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box rounded" :class="darkMode ? 'dark' : ''">
        <slot />
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="closeModalHandler()"
    >
      Close
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    modalActive: Boolean,
    darkMode: Boolean,
  },
  setup() {
    const store = useStore();
    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    return {
      closeModalHandler,
    };
  },
};
</script>

<style>
.is-open {
  display: block;
}
.modal {
  z-index: 999999999;
}
.is-close {
  display: none;
}
.rounded {
  border-radius: 20px;
}
</style>