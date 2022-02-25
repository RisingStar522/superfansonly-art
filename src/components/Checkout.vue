<template>
  <Loader v-show="showLoader?.payments" />
  <div class="content">
    <div class="title-container is-border-bottom">
      <p class="title is-centered" :class="darkMode ? 'darkText' : ''">
        Checkout
      </p>
    </div>
    <div class="details-container">
      <div class="columns is-border-bottom is-full-width pb-5">
        <div class="column">
          <p
            class="title has-text-left pb-3"
            :class="darkMode ? 'darkText' : ''"
          >
            NFT
          </p>
          <div class="small-container is-left">
            <div class="smallImg-container">
              <figure class="image is-5by3">
                <img :src="selectedCreatorDropAsset?.tokenImage" alt="" />
              </figure>
            </div>
            <div class="right-side">
              <p class="pl-3" :class="darkMode ? 'darkText' : ''">
                {{ selectedCreatorDropAsset?.description }}
              </p>
              <p
                class="pl-3 has-text-weight-bold"
                :class="darkMode ? 'darkText' : ''"
              >
                {{ selectedCreatorDropAsset?.contentType }}
              </p>
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <p
            class="title has-text-right pb-3"
            :class="darkMode ? 'darkText' : ''"
          >
            Price
          </p>
          <div class="coin-container">
            <img
              v-if="selectedCreatorDropAsset"
              :src="
                FindIcon(selectedCreatorDropAsset?.fixedSellingPrice?.token)
              "
              class="small"
              alt=""
            />
            <p class="is-size-6 px-1" :class="darkMode ? 'darkText' : ''">
              {{ selectedCreatorDropAsset?.fixedSellingPrice?.amount }}&nbsp;{{
                selectedCreatorDropAsset?.fixedSellingPrice?.token
              }}
            </p>
            <p class="is-size-7" :class="darkMode ? 'darkText' : ''">
              <!-- ({{ collection.dollar }}) -->
            </p>
          </div>
        </div>
      </div>
      <div class="columns px-3 is-border-bottom">
        <div class="column">
          <p class="subtitle has-text-left" :class="darkMode ? 'darkText' : ''">
            Total
          </p>
        </div>
        <div class="column is-one-quarter">
          <div class="coin-container">
            <img
              v-if="selectedCreatorDropAsset"
              :src="
                FindIcon(selectedCreatorDropAsset?.fixedSellingPrice?.token)
              "
              class="small"
              alt=""
            />
            <p class="is-size-6 px-1" :class="darkMode ? 'darkText' : ''">
              {{ selectedCreatorDropAsset?.fixedSellingPrice?.amount }}&nbsp;{{
                selectedCreatorDropAsset?.fixedSellingPrice?.token
              }}
            </p>
            <p class="is-size-7" :class="darkMode ? 'darkText' : ''">
              <!-- ({{ collection.dollar }}) -->
            </p>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p class="subtitle has-text-left" :class="darkMode ? 'darkText' : ''">
            Pay with:
          </p>
        </div>
        <div class="column">
          <div class="control radio-container">
            <div
              v-for="(item, index) in filterObjsInArr(
                coin_providers,
                selectedCreator.Drop?.crowdSale?.paymentTokens
              )"
              :key="index"
            >
              <input
                v-model="selected_coin"
                @change="onChange($event)"
                type="radio"
                :name="item.symbol"
                :id="item.symbol"
                class="mt-1"
                :value="item.symbol"
              />
              <label
                class="radio radio-button"
                :for="item.symbol"
                :title="item.name"
              >
                <Popper
                  hover="true"
                  :content="item.name"
                  placement="top"
                  :class="darkMode ? 'light-popper' : 'dark-popper'"
                  arrow="true"
                >
                  <img :src="item.icon" alt="" class="radio-img" />
                </Popper>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="buttons is-flex is-justify-content-center are-medium">
        <button class="button btn-explore" @click="payModalHandler()">
          Checkout
        </button>
        <button class="button is-info is-outlined" @click="closeModalHandler()">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import BNBICON from "../assets/BNB-icon.png";
import ETHICON from "../assets/ETH-icon.png";
import MATICICON from "../assets/MATIC-icon.png";
import PRTICON from "../assets/PRT-icon.png";
import USDCICON from "../assets/USDC-logo.png";

// import Popper from "vue3-popper";
import Loader from "@/components/Loader";
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
// import * as uccSdk from "ucc-sdk";
export default {
  components: {
    // Popper,
    Loader,
  },
  mounted() {
    const store = useStore();
    const paymentDeposit = computed(() => store.state.payment);
    const tokenSymbol = paymentDeposit?.value.result?.tokenSymbol;
    store.dispatch("changeCoin", tokenSymbol);
  },

  data: () => {
    return {
      hoverPopper: true,
      BNBICON,
      ETHICON,
      MATICICON,
      PRTICON,
      USDCICON,
    };
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const showLoader = computed(() => store.state.showLoader);
    const modalActive = computed(() => store.state.modalActive);
    const paymentDeposit = computed(() => store.state.payment);
    const collection = computed(() => store.state.collection);
    const selected_coin = computed(() => store.state.selected_coin);
    const selected_coin_data = computed(() => store.state.selected_coin_data);
    const coin_providers = computed(() => store.state.coin_providers);
    const selectedCreatorDropAsset = computed(
      () => store.state.selectedCreatorDropAsset
    );
    const selectedCreator = computed(() => store.state.selectedCreator);

    const onChange = (event) => {
      const data = event.target.value;
      store.dispatch("changeCoin", data);
    };
    const FindIcon = (key) =>
      coin_providers.value?.find((item) => item.symbol === key)?.icon;
    const pay = ref(false);
    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };

    const filterObjsInArr = (arr, selection) => {
      var filtered = arr.filter(function (e) {
        return this.indexOf(e.symbol) > -1;
      }, selection);
      return filtered;
    };
    const payModalHandler = () => {
      const data = {
        customerId: process.env.VUE_APP_VUE_CUSTOMER_ID,
        userId: null,
        currency: selectedCreatorDropAsset.value?.fixedSellingPrice?.token,
        price: selectedCreatorDropAsset.value?.fixedSellingPrice?.amount,
        coin: selected_coin.value,
        chainName: selected_coin_data.value?.chainName,

        events: [
          {
            fireWhen: "confirmed",
            customerId: process.env.VUE_APP_VUE_CUSTOMER_ID,
            projectId: process.env.VUE_APP_VUE_PROJECT_ID,

            type: "track",
            event: "NFT_PURCHASE_CONFIRMED",

            properties: {
              dropName: selectedCreator.value?.Drop?.name,
              creatorDisplayName:
                selectedCreator.value?.Drop?.creator?.displayName,
              assetId: selectedCreatorDropAsset.value?._id,
              chainId: selectedCreator.value?.Drop?.blockchain?.chainId,
              contractAddress:
                selectedCreator.value?.Drop?.blockchain?.contractAddress,
              tokenStandard:
                selectedCreator.value?.Drop?.blockchain?.tokenStandard,
              tokenId: selectedCreatorDropAsset.value?.tokenId,
            },
          },
        ],
      };
      store.dispatch("toggleLoader", { payments: true });
      store.dispatch("requestPaymentDeposit", data);
    };
    return {
      darkMode,
      showLoader,
      modalActive,
      closeModalHandler,
      pay,
      payModalHandler,
      paymentDeposit,
      collection,
      selected_coin,
      onChange,
      coin_providers,
      selectedCreatorDropAsset,
      filterObjsInArr,
      selectedCreator,
      FindIcon,
    };
  },
};
</script>

<style lang="scss" scoped>
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
.small-container {
  display: flex;
  justify-content: flex-start;
}
.avatarImg-container {
  width: 150px;
  height: 150px;
}

.smallImg-container {
  width: 200px;
  height: 100px;
}
.righ-side {
  display: flex;
  justify-content: space-between;
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
  width: 24px;
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
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.custom-radio-group {
  display: flex;
}
input[type="radio"] {
  -webkit-appearance: none;
}
label {
  height: 80px;
  width: 80px;
  margin: auto;
  position: relative;
  color: #18f98d;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  &:hover {
    .radio-img {
      transform: scale(1.25);
    }
  }
}

input[type="radio"]:checked + label {
  border: 2px solid #18f98d;
  border-radius: 50%;
  color: #ffffff;
  box-shadow: 0 15px 45px rgba(24, 249, 141, 0.2);
}
</style>