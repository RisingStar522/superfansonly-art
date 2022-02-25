<template>
  <div class="ajax-loader-container">
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
<style lang="scss" scoped>
.ajax-loader-container {
  top: 0;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999999999999999999;
  //   background: #f8f8f8;
  //   opacity: 0.8;
}

.lds-dual-ring-dark {
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 40%;
  background-size: contain;
  margin: auto;
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
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  left: 50%;
  top: 40%;
  background-size: contain;
  margin: auto;
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
.ajax-loader {
  background: #f00;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2em;
  height: 2em;
  background-size: contain;
  display: block;
  margin: auto;
}
</style>

