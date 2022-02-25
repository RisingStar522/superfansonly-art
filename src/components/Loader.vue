<template>
  <div class="loading-box">
    <div
      class="lds-dual-ring-dark"
      :class="darkMode ? 'lds-dual-ring-white' : 'lds-dual-ring-dark'"
    ></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
};
</script>

<style scoped>
.loading-box {
  position: fixed;
  top: 40%;
  width: 25%;
  margin: auto;
  z-index: 999;
  left: 0px;
  right: 0px;
}

.lds-dual-ring-dark {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring-dark:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #000;
  border-color: #000 transparent #000 transparent;
  animation: lds-dual-ring-dark 1.2s linear infinite;
}
@keyframes lds-dual-ring-dark {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.lds-dual-ring-white {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring-white:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring-white 1.2s linear infinite;
}
@keyframes lds-dual-ring-white {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>