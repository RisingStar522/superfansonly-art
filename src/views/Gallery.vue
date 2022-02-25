<template>
  <div class="gallery">
    <div class="title-section columns">
      <div class="column is-12-mobile is-left">
        <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">Gallery</h1>
        <p class="subtitle is-left pt-3" :class="darkMode ? 'darkText' : ''">
          Have a look at your personal collection
        </p>
      </div>
      
      <div v-if="!wallet?.connected" class="column is-12-mobile is-right">
        <button
          v-if="!wallet.connected"
          class="button btn-explore btn-connect connect-button px-2"
          @click="connectWallet()"
          ref="Btn"
        >
          Connect Wallet
        </button>
      </div>
    </div>


    <div
      class="
        title-section
        columns
        is-multiline
        is-flex
        is-justify-content-space-between
        is-align-items-center
      "
       v-if="wallet.connected"
    >
      
      <div class="column is-right">
        <DropDown />
      </div>
    </div>
    <!-- <div className="section is-flex my-6" v-if="!wallet.connected">

    </div> -->
    <!-- <div>
      <button
        class="button btn-explore px-6"
        v-if="connected"
        @click="modalHandler"
      >
        Scan
      </button>
    </div> -->
    <section class="gallery-section" v-if="wallet?.connected">
      <div class="columns is-multiline is-vcentered is-mobile">
        <div
          class="column is-6-mobile is-4-desktop"
          v-for="(item, index) in collections"
          :key="index"
        >
          <Card
            :cardImg="item?.cardImg"
            :avatarImg="item?.avatarImg"
            :title="item?.title"
            :description="item?.description"
             :isDisabled="false"
            :buttonText="`View`"
            :routeUrl="`/payment`"
          >
            <div class="section is-centered">
              <p :class="darkMode ? '' : 'darkText dark'">
                Address:
                <strong
                  class="break-word"
                  :class="darkMode ? '' : 'darkText dark'"
                  >{{ wallet?.account }}</strong
                >
              </p>
              <p class="" :class="darkMode ? '' : 'darkText dark'">
                ChainId:
                <strong :class="darkMode ? '' : 'darkText dark'">{{
                  wallet?.chainId
                }}</strong>
              </p>
              <p class="" :class="darkMode ? ' ' : 'darkText dark'">
                Balance:
                <strong :class="darkMode ? '' : 'darkText dark'">{{
                  wallet?.balance
                }}</strong>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>

  <Modal :modalActive="modalActive" :darkMode="darkMode">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <div class="title-container is-border-bottom py-4">
            <div class="wallet-container" :class="darkMode ? '' : 'dark'">
              <img v-if="!darkMode" :src="walletWhite" alt="" />
              <img v-if="darkMode" :src="walletDark" alt="" />
            </div>
            <p
              class="title is-centered pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              Scan
            </p>
          </div>
        </div>
        <div class="message-container mx-3">
          <p class="py-4" :class="darkMode ? 'darkText' : ''">
            Scanning to retrive your tokens
          </p>
        </div>
        <div class="binance-container py-4">
          <div class="binance-img">
            <img :src="binanceLogo" alt="" />
          </div>
          <div class="binance-title-container">
            <p class="binance-title is-uppercase">BINANCE SMART CHAIN</p>
          </div>
        </div>
        <div
          class="address-info-container is-black-border"
          :class="darkMode ? 'is-white-border' : ''"
        >
          <div
            class="
              contract-container
              is-black-border-bottom is-flex is-justify-content-center
            "
            :class="darkMode ? 'is-white-border-bottom' : ''"
          >
            <p class="has-text-weight-bold" :class="darkMode ? 'darkText' : ''">
              Contract Address:
            </p>
            <p
              class="has-text-weight-normal pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              xxxxxxxxxx
            </p>
          </div>
          <div
            class="
              contract-container
              is-black-border-bottom is-flex is-justify-content-center
            "
            :class="darkMode ? 'is-white-border-bottom' : ''"
          >
            <p class="has-text-weight-bold" :class="darkMode ? 'darkText' : ''">
              Token Symbol:
            </p>
            <p
              class="has-text-weight-normal pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              SFO
            </p>
          </div>
          <div class="contract-container is-flex is-justify-content-center">
            <p class="has-text-weight-bold" :class="darkMode ? 'darkText' : ''">
              Token Found:
            </p>
            <p
              class="has-text-weight-normal pl-3"
              :class="darkMode ? 'darkText' : ''"
            >
              13
            </p>
          </div>
        </div>
        <div class="progress-container">
          <div class="message-container mx-3">
            <p class="py-4" :class="darkMode ? 'darkText' : ''">
              Scan Progress
            </p>
          </div>
          <div class="progress-bar">
            <progress class="progress is-info" value="60" max="100"></progress>
          </div>
          <div class="button-container py-6">
            <button @click="closeModalHandler()" class="btn-explore">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </article>
  </Modal>
</template>

<script>
import Card from "@/components/Card";
import DropDown from "@/components/DropDown";
import avatarImg from "../assets/avatar-img.png";
import walletDark from "../assets/wallet-dark.png";
import walletWhite from "../assets/wallet-white.png";
import cardImg from "../assets/card-img.png";
import binanceLogo from "../assets/binance-logo.png";
import Modal from "@/components/Modal";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  name: "Gallery",
  mounted() {
    const store = useStore();
    store.dispatch("connectWallet");
    // this.loadMarkerSDK();
  },

  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const modalActive = computed(() => store.state.modalActive);
    const wallet = computed(() => store.state.wallet);
    // console.log("wallet connected", wallet.value);
    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    const connectWallet = () => {
      store.dispatch("connectWallet");
    };

    return {
      darkMode,
      modalActive,
      closeModalHandler,
      wallet,
      connectWallet,
    };
  },
  data: () => {
    return {
      cardImg,
      avatarImg,
      walletDark,
      walletWhite,
      binanceLogo,
      collections: [
        {
          id: 1,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 2,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 3,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 4,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 5,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 6,
          cardImg,
          avatarImg,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
      ],
    };
  },

  components: {
    Card,
    Modal,
    DropDown,
  },
};
</script>

<style scoped lang="scss">
@import 'bulma/sass/utilities/mixins.sass';

@include tablet {
  .title-section {
    padding-bottom: 50px !important;
    padding-top: 50px !important;
  }
}

.is-right {
  text-align: right;
}
.is-left {
  text-align: left;
}
.gallery {
  max-width: 1000px;
  margin: 0 auto;
}
.title-section {
  padding-bottom: 50px;
  padding-top: 20px;
}
.display-none {
  display: none;
}
.break-word {
  inline-size: 400px;
  overflow-wrap: break-word;
}
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.wallet-container {
  border-radius: 50%;
  width: 54px;
  height: 54px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wallet-container img {
  width: 22px;
  height: 22px;
  object-fit: cover;
}
.is-border-bottom {
  border-bottom: 2px solid #f1f0f1;
}
.binance-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.binance-img {
  width: 40px;
  height: 40px;
}
.binance-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.binance-title-container {
  width: 100px;
  height: 46px;
}
.binance-title {
  color: #f3ba2f;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 21px;
  text-align: center;
}
.address-info-container {
  border-radius: 20px;
}
.is-black-border {
  border: 2px solid black;
}
.is-white-border {
  border: 2px solid #fff;
}
.is-black-border-bottom {
  border-bottom: 2px solid black;
}
.is-white-border-bottom {
  border-bottom: 2px solid #fff;
}
.progress-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.progress-bar {
  width: 300px;
  display: flex;
  justify-content: center;
}
.connect-button {
  font-size: 1rem !important;
}
</style>
