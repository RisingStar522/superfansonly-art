<template>
  <div class="columns is-gapless">
    <div class="column is-12-mobile is-6-desktop">
      <div class="payment-section">
        <img :src="collection?.cardImg" alt="" class="cardImg" />
      </div>
    </div>
    <div class="column is-12-mobile is-6-desktop">
      <div class="payment-section is-left">
        <h1 class="is-size-3 title pb-3" :class="darkMode ? 'darkText' : ''">
          {{ collection?.description }}
        </h1>
        <p class="subtitle pt-6" :class="darkMode ? 'darkText' : ''">Creator</p>
        <div class="columns is-mobile is-gapless">
          <div class="column is-2-tablet is-1-desktop is-3">
            <figure class="image is-1by1">
              <img :src="collection?.avatarImg" class="avatar" />
            </figure>
          </div>
          <p
            class="is-flex is-align-content-center title avatar-desc"
            :class="darkMode ? 'darkText' : ''"
          >
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
              {{ collection?.price }} &nbsp; {{ collection?.coin }}
            </p>
            <p class="is-size-6" :class="darkMode ? 'darkText' : ''">
              ({{ collection?.dollar }})
            </p>
          </div>
        </div>
        <div class="button-container py-6">
          <button
            @click="checkoutModalHandler()"
            class="btn-explore isDisabled"
            :disabled="isDisabled"
          >
            {{ collection?.buttonText }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal :modalActive="modalActive" :darkMode="darkMode">
    <article class="media">
      <div class="media-content" v-show="modalActiveContent == 'CHECKOUT'">
        <Checkout />
      </div>

      <div class="media-content" v-show="modalActiveContent == 'PAY-SUCCESS'">
        <PaymentSuccess />
      </div>

      <div
        class="media-content deposit-container"
        v-show="modalActiveContent == 'DEPOSIT'"
      >
        <AddDeposit />
      </div>
    </article>
  </Modal>
</template>

<script>
import smallImg from "../assets/small-img.png";
import payImg from "../assets/pay-img.png";

import BNBICON from "../assets/BNB-icon.png";
import ETHICON from "../assets/ETH-icon.png";
import MATICICON from "../assets/MATIC-icon.png";
import PRTICON from "../assets/PRT-icon.png";
import USDCICON from "../assets/USDC-logo.png";

import Modal from "@/components/Modal";
import PaymentSuccess from "@/components/PaySuccess";
import Checkout from "@/components/Checkout";
import AddDeposit from "@/components/Payment";

import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";

export default {
  components: {
    Modal,
    PaymentSuccess,
    Checkout,
    AddDeposit,
  },
  methods: {
    showChange(event) {
      console.log(event.target.value); // will log a value of the selected option
    },
  },
  data: () => {
    return {
      BNBICON,
      ETHICON,
      MATICICON,
      PRTICON,
      USDCICON,

      smallImg,
      payImg,
      CreatorDrops: {},
    };
  },

  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const modalActive = computed(() => store.state.modalActive);
    const modalActiveContent = computed(() => store.state.modalActiveContent);
    const paymentDeposit = computed(() => store.state.payment);
    const collection = computed(() => store.state.collection);

    const pay = ref(false);
    const checkoutModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: true,
        modalActiveContent: "CHECKOUT",
      });
    };
    const payModalHandler = () => {
      pay.value = !pay.value;
    };

    return {
      darkMode,
      modalActive,
      modalActiveContent,
      checkoutModalHandler,
      pay,
      payModalHandler,
      paymentDeposit,
      collection,
    };
  },
};
</script>

<style lang="scss">
@import "bulma/sass/utilities/mixins.sass";

.payment-section {
  padding: 50px;
}

@include mobile {
  .payment-section {
    padding: 1rem;
  }
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
.small-container {
  display: flex;
  justify-content: flex-start;
}
.avatarImg-container {
  width: 150px;
  height: 150px;
}

.smallImg-container {
  width: 103px;
  height: 103px;
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
  cursor: pointer;
}
.bordered-top {
  border-top: 2px solid #f5f5f5;
}
.is-border-bottom {
  border-bottom: 2px solid #f1f0f1;
}
.title-container {
  padding: 30px;
}
.details-container {
  padding: 20px;
}
.small {
  width: 16px;
  height: 24px;
}
.content p:not(:last-child) {
  margin-bottom: 0px;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.payImg-container {
  width: 204px;
  height: 200px;
  margin: 0 auto;
  padding-top: 20px;
}
.payImg-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sendemail-container {
  display: flex;
}
.message {
  background: #fff;
}
.no-outline {
  outline: none;
  border: none;
  background: black;
  color: #fff;
}
.neg-margin-left {
  margin-left: -20px;
}
.no-outline ::placeholder {
  color: #fff;
  opacity: 1;
}
.radio-container {
  display: flex;
}
.radio-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.radio-img {
  width: 50px;
  height: 50px;
}
.dark-popper {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: white;
  --popper-theme-border-width: 0px;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 12px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.light-popper {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 12px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>