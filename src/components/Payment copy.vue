<template>
  <div class="content">
    <div class="logo-container">
      <p class="title is-centered" :class="darkMode ? 'darkText' : ''">
        <img :src="logo" width="60" height="60" class="" />
      </p>
    </div>
    <div class="information-container">
      <div class="qrcode-container" v-show="!payBtn">
        <qrcode-vue
          :value="paymentDeposit?.result?.transferInstruction?.links[0].link"
          :size="200"
          level="H"
          class="py-1 px-2"
        />
      </div>
      <p
        class="is-centered"
        :class="darkMode ? 'darkText' : ''"
        v-show="!payBtn"
      >
        Scan payment address
      </p>
      <div class="amount-container">
        <div class="is-flex is-justify-content-center is-align-content-start">
          <p
            class="is-size-2 is-centered mt-5"
            :class="darkMode ? 'darkText' : ''"
          >
            {{ paymentDeposit?.result?.amount }}
          </p>
          <figure class="image is-48x48">
            <img
              v-if="paymentDeposit"
              :src="FindIcon(paymentDeposit?.result?.currency)"
              alt=""
            />
          </figure>
        </div>
        <div class="smaller-container">
          <p class="is-centered pr-2 pt-4" :class="darkMode ? 'darkText' : ''">
            {{ paymentDeposit?.result?.transferInstruction?.tokenAmount }}
          </p>
          <div class="coinImg-container">
            <img
              v-if="paymentDeposit"
              :src="
                FindIcon(
                  paymentDeposit?.result?.transferInstruction?.tokenSymbol
                )
              "
              alt=""
            />
          </div>
        </div>
        <p class="is-centered" :class="darkMode ? 'darkText' : ''">
          <span>WARNING: </span>
          This is a testnet transaction. Please ensure funds are sent from your
          test wallets.
        </p>
      </div>
      <div class="paywith-container is-left pt-4 px-4">
        <p :class="darkMode ? 'darkText' : ''">Paying With:</p>
        <div class="selected-payment pt-2">
          <p
            class="is-centered pr-2 is-size-4 pt-5"
            :class="darkMode ? 'darkText' : ''"
            v-if="paymentDeposit"
          >
            {{
              FindIconName(
                paymentDeposit?.result?.transferInstruction?.tokenSymbol
              )
            }}
          </p>
          <div class="coinSelectImg-container">
            <img
              v-if="paymentDeposit"
              :src="
                FindIcon(
                  paymentDeposit?.result?.transferInstruction?.tokenSymbol
                )
              "
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="paywith-container is-left p-4">
        <p :class="darkMode ? 'darkText' : ''">Wallet Provider :</p>
        <div class="selector">
          <div class="selectField" @click="toggleShowDropdown()">
            <div v-if="selected" class="selectedField">
              <img :src="selected.img" alt="" />
              <span class="pl-3"> {{ selected.description }} </span>
            </div>
            <p v-else>
              <span> Select Wallet </span>
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
      </div>
      <div class="count-down">
        <counter
          :showDay="false"
          :showHour="false"
          :deadlineISO="deadlineISO"
          :stop="stop"
        />
      </div>
      <div class="buttons is-flex is-justify-content-center are-medium">
        <button class="button is-info is-outlined" @click="cancelPayment()">
          Cancel
        </button>
        <button
          v-show="payBtn"
          class="button btn-explore"
          @click="$isMobile() ? payHandler() : desktopPay()"
        >
          Pay
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import logo from "../assets/SuperFansOnly_Logo-Black-Background.svg";
import QrcodeVue from "qrcode.vue";

import METAMASK from "../assets/METAMASK-payment.svg";
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import moment from "moment";
import { watch } from "@vue/runtime-core";
import Counter from "./Counter.vue";

export default {
  data: () => {
    return {
      deadlineISO: moment(moment()).add(15, "m").toDate(),
      stop: false,
      payBtn: false,
    };
  },
  mounted() {
    if (typeof window.BinanceChain !== "undefined") {
      //window.BinanceChain
      console.log("Binance is installed!");

      this.payBtn = true;
    } else if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      this.payBtn = true;
    }
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const paymentDeposit = computed(() => store.state.payment);
    const collection = computed(() => store.state.collection);
    const selected_coin = computed(() => store.state.selected_coin);
    const selected_coin_data = computed(() => store.state.selected_coin_data);
    const coin_providers = computed(() => store.state.coin_providers);
    const modalActiveContent = computed(() => store.state.modalActiveContent);
    const walletImgs = computed(() => store.state.walletImgs);

    watch(modalActiveContent, (curr, prev) => {
      console.log("watching paymentdeposit", curr, prev);
      let counter = 0;

      if (curr == "DEPOSIT") {
        var i = setInterval(function () {
          counter++;
          if (counter % 5 === 0) {
            if (
              paymentDeposit?.value?.result?.status === "not seen" ||
              paymentDeposit?.value?.result?.status === "pending"
            )
              // console.log("sending again");
              store.dispatch("getPaymentDeposit", {
                customerId: paymentDeposit?.value.result?.customerId,
                depositId: paymentDeposit?.value.result?._id,
              });
          } else if (paymentDeposit?.value?.result?.status === "confirmed") {
            // console.log("confirmation");
            this.stop = true;
            counter = 0;
            clearInterval(i);
            store.dispatch("toggleModal", {
              modalActive: true,
              modalActiveContent: "PAY-SUCCESS",
            });
          } else if (paymentDeposit?.value?.result?.status === "cancelled") {
            // console.log("cancellation");
            this.stop = true;
            counter = 0;
            clearInterval(i);
          }
          if (counter === 15 * 60) {
            // console.log("cancel everything");
            this.stop = true;
            counter = 0;
            clearInterval(i);
            store.dispatch("cancelPaymentDeposit", {
              customerId: paymentDeposit?.value.result?.customerId,
              depositId: paymentDeposit?.value.result?._id,
            });
            store.dispatch("toggleModal", {
              modalActive: false,
              modalActiveContent: "",
            });
          }
        }, 1000);
      }
    });
    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    const payHandler = () => {
      store.dispatch("trackingEvents", {
        event: "PAY NFT WITH DESKTOP WALLET",
        data: paymentDeposit.value,
      });
      window.open(
        paymentDeposit?.value.result?.transferInstruction?.links[0].link
      );
    };
    // console.log(paymentDeposit.value);
    const desktopPay = () => {
      console.log("desktop pay emitted");
      if (typeof window.BinanceChain !== "undefined") {
        store.dispatch("sendWalletTransaction", {
          wallet: "BINANCE",
          toAddress:
            paymentDeposit.value?.result?.transferInstruction
              ?.tokenContractAddress ||
            paymentDeposit.value?.result?.transferInstruction?.toAddress,
          data: paymentDeposit.value?.result?.transferInstruction?.data,
          customerId: paymentDeposit?.value.result?.customerId,
          depositId: paymentDeposit?.value.result?._id,
        });
      } else if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
        store.dispatch("sendWalletTransaction", {
          wallet: "METAMASK",
          toAddress:
            paymentDeposit.value?.result?.transferInstruction
              ?.tokenContractAddress ||
            paymentDeposit.value?.result?.transferInstruction?.toAddress,
          data: paymentDeposit.value?.result?.transferInstruction?.data,
          customerId: paymentDeposit?.value.result?.customerId,
          depositId: paymentDeposit?.value.result?._id,
        });
      } else {
        return;
      }
    };
    const cancelPayment = () => {
      store.dispatch("cancelPaymentDeposit", {
        customerId: paymentDeposit?.value.result?.customerId,
        depositId: paymentDeposit?.value.result?._id,
      });
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    const FindWalletLogo = (wallet) => {
      return wallet !== "METAMASK" ? METAMASK : METAMASK;
    };
    let walletLogo;
    switch (
      paymentDeposit?.value?.result?.transferInstruction?.links[0].wallet
    ) {
      case "METAMASK":
        walletLogo = METAMASK;
        break;

      default:
        walletLogo = logo;
        break;
    }

    const FindIcon = (key) =>
      coin_providers.value?.find((item) => item.symbol === key)?.icon;

    const FindIconName = (key) =>
      coin_providers.value?.find((item) => item.symbol === key)?.chainName;

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
      logo,
      walletLogo,
      closeModalHandler,
      darkMode,
      paymentDeposit,
      selected_coin,
      selected_coin_data,
      collection,
      payHandler,
      desktopPay,
      cancelPayment,
      FindWalletLogo,
      FindIcon,
      FindIconName,
      walletImgs,
      SelectedWalletHandler,
      selected,
      showDropdown,
      toggleShowDropdown,
    };
  },
  components: {
    QrcodeVue,
    Counter,
  },
};
</script>
<style scoped>
.qrcode-container canvas {
  background: #fff;
}
.smaller-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.coinImg-container {
  width: 24px;
  height: 24px;
}
.coinImg-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.coinSelectImg-container {
  width: 28px;
  height: 28px;
}
.coinSelectImg-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.full-width {
  width: 100%;
}
.modal-content {
  max-height: calc(100vh - 100px);
}
.selected-payment {
  display: flex;
  justify-content: center;
  align-items: center;
}

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
.content ul {
  list-style: disc outside;
  margin-left: 0px;
  margin-top: 0px;
}
</style>