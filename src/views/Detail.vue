<template>
  <div class="columns">
    <div class="column">
      <div class="">
        <img :src="collection?.cardImg" alt="" class="cardImg" />
      </div>
    </div>
    <div class="column">
      <div class="is-left">
        <h1 class="is-size-3 title pb-3" :class="darkMode ? 'darkText' : ''">
          {{ collection?.description }}
        </h1>
        <p class="subtitle pt-6" :class="darkMode ? 'darkText' : ''">Creator</p>
        <div class="avatar-container">
          <div class="avatarImg-container">
            <img :src="collection?.avatarImg" class="avatar" alt="" />
          </div>
          <p class="title avatar-desc" :class="darkMode ? 'darkText' : ''">
            {{ collection?.title }}
          </p>
        </div>
        <div class="description-container mt-6">
          <p
            class="is-size-4 title py-4 description"
            :class="darkMode ? 'darkText' : ''"
          >
            Description
          </p>
          <p class="subtitle py-3" :class="darkMode ? 'darkText' : ''">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book
          </p>
        </div>
        <div class="price-container">
          <p class="is-size-4 title pt-5" :class="darkMode ? 'darkText' : ''">
            Price
          </p>
          <div class="coin-container">
            <img :src="collection.eth" alt="" />
            <p class="is-size-4 px-3 price" :class="darkMode ? 'darkText' : ''">
              {{ collection?.price }}
            </p>
            <p class="is-size-6" :class="darkMode ? 'darkText' : ''">
              {{ collection?.dollar }}
            </p>
          </div>
        </div>
        <div class="button-container py-6">
          <button class="btn-explore">{{ collection?.buttonText }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/detail-img.png";
import eth from "../assets/eth.png";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  data: () => {
    return {
      cardImg,
      avatarImg,
      collection: {
        cardImg,
        avatarImg,
        eth,
        price: "0.549 ETH",
        dollar: "($2,233.90)",
        title: "Nanoe",
        description: "Mystery Drop 1 out of XX",
        buttonText: "Buy for 4.5 ETH",
      },
    };
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
};
</script>

<style>
.cardImg-container {
  padding: 50px;
}
.cardImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
}
.avatar-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.avatarImg-container {
  width: 70px;
  height: 70px;
}
.avatar {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.avatar-desc {
  padding-left: 30px;
}
.info-container {
  padding: 50px;
}
.description {
  border-bottom: 1px solid black;
}
.coin-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.price {
  font-weight: bolder;
}
.button-container {
  width: 100%;
  max-width: 400px;
}
.btn-explore {
  background: #007de7;
  border-radius: 10px;
  border: none;
  color: #fff;
  padding: 10px 20px;
}
.bordered-top {
  border-top: 2px solid #f5f5f5;
}
</style>