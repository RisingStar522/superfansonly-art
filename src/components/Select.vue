<template>
  <div class="selector">
    <div class="selectField" @click="toggleShowDropdown()">
      <div v-if="selected" class="selectedField">
        <img :src="selected.img" alt="" />

        <span class="pl-3"> {{ selected.description }} </span>
      </div>
      <p v-else>
        <span> Select Wallet </span>
        <!-- <img src="" alt="" /> -->
      </p>
      <span class="icon" :class="showDropdown ? 'rotate' : ''">
        <i class="fas fa-chevron-down"></i>
      </span>
    </div>
    <ul class="walletList" v-show="showDropdown">
      <li
        class="walletOption"
        v-for="item in walletImgs"
        v-bind:key="item.id"
        @click="SelectedWalletHandler(item)"
      >
        <img :src="item.img" alt="" />
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

const props = defineProps({
  walletImgs: Array,
});
const { walletImgs } = toRefs(props);

const selected = ref(null);
const showDropdown = ref(false);
const toggleShowDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const SelectedWalletHandler = (wallet) => {
  console.log("selected wallet", wallet);
  selected.value = wallet;
  showDropdown.value = !showDropdown.value;
};
</script>

<style lang="scss" scoped>
// custom dropdown
.selector {
  width: 350px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.selectField {
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.selectField img {
  width: 12px;
}

.selectedField {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.selectedField img {
  width: 25px;
}
.walletList {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 6px;
  overflow: hidden;
  transition: max-height 0.5s, overflow 0s;
}
.walletOption {
  width: 100%;
  padding: 15px 0 15px 70px;
  list-style: none;
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  transition: max-height 0.5s, overflow 0.5s 0.5s;
}
.walletOption img {
  width: 25px;
  position: absolute;
  top: 12px;
  left: 25px;
}
.walletOption:hover {
  background: rgba(255, 255, 255, 0.7);
}
.rotate {
  transform: rotate(180deg);
}

.icon {
  transition: transform 0.5s;
}
</style>
