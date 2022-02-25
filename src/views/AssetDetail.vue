<template>
  <div class="item">
    <div class="columns">
      <div class="column is-half">
        <div class="ribbon-image">
          <span
            class="ribbon"
            :title="selectedCreatorDropAsset?.status"
            :class="
              selectedCreatorDropAsset?.status === 'FOR SALE' ? 'green' : 'red'
            "
          >
          </span>
          <div class="p-20">
            <figure class="image">
              <img
                :src="selectedCreatorDropAsset?.tokenImage"
                alt=""
                class="cardImg"
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="info-container is-left">
          <h1
            class="is-size-3 title pb-3 mt-4 pt-4"
            :class="darkMode ? 'darkText' : ''"
          >
            {{ selectedCreatorDropAsset?.contentType }}
          </h1>
          <p class="subtitle pt-1" :class="darkMode ? 'darkText' : ''">
            Creator
          </p>
          <div class="avatar-container">
            <div class="avatarImg-container">
              <figure class="image is-3by3" v-show="selectedCreator?.Drop">
                <img
                  :src="
                    selectedCreator?.Drop
                      ? FindImageUrl(
                          selectedCreator?.Drop?.creator?.images,
                          'AVATAR'
                        )
                      : collection?.avatarImg
                  "
                  class="avatar"
                />
              </figure>
            </div>
            <p class="title avatar-desc" :class="darkMode ? 'darkText' : ''">
              {{ selectedCreator?.Drop?.creator?.displayName }}
            </p>
          </div>
          <div class="trait-container">
            <div
              class="pills-container"
              v-for="(item, index) in selectedCreatorDropAsset?.traits"
              :key="index"
            >
              <span> {{ item?.key }} </span>
              <span> {{ item?.value }} </span>
            </div>
          </div>
          <div class="description-container mt-2">
            <!-- <div class="tabs" :class="darkMode ? 'darkText' : ''">
              <ul :class="darkMode ? 'darkText' : ''">
                <li v-bind:class="{ 'is-active': isActive == 'Desciption' }">
                  <a
                    class="is-size-7 title py-4 description"
                    v-on:click="
                      (isActive = 'Desciption'), darkMode ? 'darkText' : ''
                    "
                    >Desciption</a
                  >
                </li>
                <li v-bind:class="{ 'is-active': isActive == 'Details' }">
                  <a
                    class="is-size-7 title py-4 description"
                    v-on:click="isActive = 'Details'"
                    >Details</a
                  >
                </li>
                <li v-bind:class="{ 'is-active': isActive == 'Extras' }">
                  <a
                    class="is-size-7 title py-4 description"
                    v-on:click="isActive = 'Extras'"
                    >Extras</a
                  >
                </li>
              </ul>
            </div> -->
            <!-- <div
              class="tab-contents"
              :class="darkMode ? 'darkText' : 'lightText'"
            >
              <div
                class="content subtitle py-3"
                v-bind:class="{ 'is-active': isActive == 'Desciption' }"
              >
                <p class="subtitle py-3" :class="darkMode ? 'darkText' : ''">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </p>
              </div>
              <div
                class="content subtitle py-3"
                v-bind:class="{ 'is-active': isActive == 'Details' }"
              >
                <p
                  class="subtitle pt-3 columns"
                  :class="darkMode ? 'darkText' : ''"
                >
                  <span class="column is-half">Contract</span>
                  <span class="column is-half" style="text-align: right"
                    >{{ collection?.contact }}
                  </span>
                </p>
                <p class="subtitle columns" :class="darkMode ? 'darkText' : ''">
                  <span class="column is-half">Token ID</span>
                  <span class="column is-half" style="text-align: right"
                    >{{ collection?.tokenId }}
                  </span>
                </p>
                <p class="subtitle columns" :class="darkMode ? 'darkText' : ''">
                  <span class="column is-half">Token Standard</span>
                  <span class="column is-half" style="text-align: right"
                    >{{ collection?.tokenStandard }}
                  </span>
                </p>
                <p class="subtitle columns" :class="darkMode ? 'darkText' : ''">
                  <span class="column is-half">Blockchain</span>
                  <span class="column is-half" style="text-align: right"
                    >{{ collection?.blockchain }}
                  </span>
                </p>
              </div>
              <div
                class="content subtitle py-3"
                v-bind:class="{ 'is-active': isActive == 'Extras' }"
              >
                <p class="subtitle py-3" :class="darkMode ? 'darkText' : ''">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </p>
              </div>
            </div> -->
          </div>
          <div class="price-container">
            <p class="is-size-4 title pt-5" :class="darkMode ? 'darkText' : ''">
              Price
            </p>
            <div class="coin-container">
              <img
                class="small-img"
                v-if="selectedCreatorDropAsset"
                :src="
                  FindIcon(selectedCreatorDropAsset?.fixedSellingPrice?.token)
                "
                alt=""
              />
              <p
                class="is-size-4 px-3 price"
                :class="darkMode ? 'darkText' : ''"
              >
                {{ selectedCreatorDropAsset?.fixedSellingPrice?.amount }}
                {{ selectedCreatorDropAsset?.fixedSellingPrice?.token }}
              </p>
              <!-- <p class="is-size-6" :class="darkMode ? 'darkText' : ''">
                {{ collection?.dollar }}
              </p> -->
            </div>
          </div>
          <div class="item-button-container py-3">
            <button
              @click="checkoutModalHandler()"
              class="btn-explore isDisabled"
            >
              Buy Now
            </button>
          </div>

          <div>
            <!-- <div class="selector">
              <div class="selectField" @click="toggleShowDropdown()">
                <div v-if="selected" class="selectedField">
                  <img :src="selected.img" alt="" />

                  <span class="pl-3"> {{ selected.description }} </span>
                </div>
                <p v-else>
                  <span> Select Wallet </span>
                  <img src="" alt="" />
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
            </div> -->
          </div>
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
import Modal from "@/components/Modal";
import PaymentSuccess from "@/components/PaySuccess";
import Checkout from "@/components/Checkout";
import AddDeposit from "@/components/Payment";

import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/detail-img.png";
import eth from "../assets/eth.png";
import { useRoute } from "vue-router";

import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
// import Counter from '../components/Counter.vue';
// import { watch } from "@vue/runtime-core";

// import { Countdown } from "vue3-flip-countdown";
import { onMounted } from "vue";

export default {
  name: "Item",
  components: {
    Modal,
    PaymentSuccess,
    Checkout,
    AddDeposit,
  },
  data: () => {
    return {
      cardImg,
      avatarImg,
      isActive: "Desciption",
      collection: {
        cardImg,
        avatarImg,
        eth,
        price: "0.549 ETH",
        dollar: "($2,233.90)",
        title: "Nanoe",
        description: "Mystery Drop 1 out of XX",
        buttonText: "Buy for 4.5 ETH",
        contact: "0xd23433...0de",
        tokenId: "2",
        tokenStandard: "ERC-721",
        blockchain: "Ethereum",
      },
    };
  },
  mounted() {
    const route = useRoute();
    const store = useStore();
    store.dispatch("trackingPages", {
      protocol: window && window.location ? window.location.protocol : null,
      host: window && window.location ? window.location.host : null,
      port: window && window.location ? window.location.port : null,
      origin: window && window.location ? window.location.origin : null,
      pathname: window && window.location ? window.location.pathname : null,
      url: window && window.location ? window.location.href : null,
    });
    const dropId = route.params.dropId;
    const creatorId = route.params.creatorId;
    const assetId = route.params.assetId;
    store.dispatch("getCreatorDropAsset", { dropId, creatorId, assetId });
    store.dispatch("getCreatorDropsAsset", { dropId, creatorId });
  },

  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const walletImgs = computed(() => store.state.walletImgs);
    const selectedCreator = computed(() => store.state.selectedCreator);
    const coin_providers = computed(() => store.state.coin_providers);
    const selectedCreatorDropAsset = computed(
      () => store.state.selectedCreatorDropAsset
    );
    const selectedCreatorDropAssets = computed(
      () => store.state.selectedCreatorDropAssets
    );
    onMounted(() => {
      console.log("mounted!");
    });
    // console.log(selectedCreatorDropAssets);
    const modalActive = computed(() => store.state.modalActive);
    const modalActiveContent = computed(() => store.state.modalActiveContent);
    const paymentDeposit = computed(() => store.state.payment);
    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item.type === key)?.url || avatarImg;
    const FindIcon = (key) =>
      coin_providers.value?.find((item) => item.symbol === key)?.icon;
    const checkoutModalHandler = () => {
      store.dispatch("trackingEvents", {
        event: "START CHECKOUT NFT",
        data: selectedCreatorDropAsset.value,
      });
      store.dispatch("toggleModal", {
        modalActive: true,
        modalActiveContent: "CHECKOUT",
      });
    };
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
    return {
      darkMode,
      selectedCreator,
      selectedCreatorDropAsset,
      selectedCreatorDropAssets,
      modalActive,
      modalActiveContent,
      checkoutModalHandler,
      paymentDeposit,
      FindImageUrl,
      FindIcon,
      walletImgs,
      SelectedWalletHandler,
      selected,
      showDropdown,
      toggleShowDropdown,
    };
  },
};
</script>

<style lang="scss" scoped>
.trait-container {
  margin: 10px;
  max-width: 300px;
  width: 100px;
  height: 30px;
}
.pills-container {
  width: 100%;
  height: 100%;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  font-size: 0;
  vertical-align: baseline;
  margin: 0 0.25em 0 0;
}
.pills-container::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.pills-container span {
  height: 100%;
  -webkit-box-shadow: 0 0 0 1px transparent inset 0 0 0 0 rgb(34, 36, 38 / 15%)
    inset;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgb(34, 36, 38 / 15%) inset;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  cursor: pointer;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: #393939 none;
  color: #fff;
  padding: 0.58571429em 1.5em 0.58571429em 1.5em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
}
.pills-container span:first-child {
  border-left: none;
  margin-left: 0;
  border-top-left-radius: 0.28571429rem;
  border-bottom-left-radius: 0.28571429rem;
}

.pills-container span:last-child {
  background: #41ce0e;
  border-top-right-radius: 0.28571429rem;
  border-bottom-right-radius: 0.28571429rem;
}
.item {
  max-width: 1036px;
  margin: 0 auto;
}
.img-container {
  margin-top: 50px;
}
.cardImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
}
// .subtitle {
//   // font-size: 0.875rem !important;
//   margin-bottom: 6px !important;
// }
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
  padding-left: 12px;
  font-size: 0.875rem !important;
}
/* .info-container {
  padding: 50px;
} */
.description {
  border-bottom: 1px solid black !important;
}
.coin-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.price {
  font-weight: bolder;
}
.item-button-container {
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
.tab-contents .content {
  display: none;
}
.tab-contents .content.is-active {
  display: block;
}
ul {
  border-bottom-color: black !important;
}
.tabs {
  margin-bottom: 0px !important;
}
.ribbon-image {
  padding: 20px;
}
.ribbon-image .ribbon {
  position: absolute;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  overflow: hidden;
  /* background: red; */
}

.ribbon-image .ribbon.red::before {
  background-color: #d22222;
}
.ribbon-image .ribbon.green::before {
  background-color: green;
}
.ribbon-image .ribbon.green::after {
  background-color: #49c674;
}
.ribbon-image .ribbon.red::after {
  background-color: #ff3860;
}

.ribbon-image .ribbon.blue::before {
  background-color: #62baea;
}
.ribbon-image .ribbon.blue::after {
  background-color: #4a98bf;
}

.ribbon-image .ribbon.orange::before {
  background-color: #ff8c00;
}
.ribbon-image .ribbon.orange::after {
  background-color: #ffa500;
}

.ribbon-image .ribbon::before {
  content: attr(title);
  position: absolute;
  width: 150%;
  height: 40px;
  background: #62baea;
  transform: rotate(-45deg) translateY(-20px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.1em;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}
.ribbon-image .ribbon::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background: #4a98bf;
  z-index: -1;
}
.small-img {
  width: 35px;
  height: 35px;
}

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