import { createStore } from "vuex";
import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BscConnector } from "@binance-chain/bsc-connector";
import * as uccSdk from "ucc-sdk";

import eth from "@/assets/eth.png";
import avatarImg from "@/assets/avatar-img.png";
import cardImg from "@/assets/detail-img.png";
import smallImg from "@/assets/small-img.png";

import BNBICON from "@/assets/BNB-icon.png";
import ETHICON from "@/assets/ETH-icon.png";
import MATICICON from "@/assets/MATIC-icon.png";
import PRTICON from "@/assets/PRT-icon.png";
import USDCICON from "@/assets/USDC-logo.png";
import METAMASKICON from "@/assets/METAMASK-payment.svg";
import TWTICON from "@/assets/TWT.png";

let provider = new WalletConnectProvider({
  infuraId: "8acc78d5beb44a14aa0a70a712c14811",
  rpc: {
    56: "https://bsc-dataseed.binance.org/",
    97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  },
});
let bsc = new BscConnector({
  supportedChainIds: [56, 97], // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
});

const InititalizeTracking = () => {
  const apiKey = "live_soon_to_be_deprecated";
  const stage = "dev";
  const res = uccSdk.track.initialize(
    process.env.VUE_APP_VUE_CUSTOMER_ID,
    process.env.VUE_APP_VUE_PROJECT_ID,
    apiKey,
    null,
    stage
  );
  console.log(res);
};

const state = {
  walletImgs: [
    {
      id: 1,
      img: METAMASKICON,
      name: "METAMASK_WALLET",
      symbol: "METAMASK",
      description: "Metamask",
      mobile: false,
    },
    {
      id: 2,
      img: BNBICON,
      name: "BINANCE_WALLET",
      symbol: "METAMASK",
      description: "Binance Chain Wallet",
      mobile: false,
    },
    {
      id: 3,
      img: METAMASKICON,
      name: "METAMASK_MOBILE",
      symbol: "METAMASK",
      description: "Metamask (mobile app)",
      mobile: true,
    },
    {
      id: 4,
      img: TWTICON,
      name: "TRUST_WALLET",
      symbol: "TRUSTWALLET",
      description: "Trust Wallet",
      mobile: true,
    },
  ],
  showLoader: {
    creators: false,
    notableDrops: false,
    payments: false,
    explores: false,
  },
  tracking: false,
  metamaskWallet: {
    account: "",
    chainId: "",
    connected: false,
    sent: false,
  },
  binanceWallet: {
    account: "",
    chainId: "",
    connected: false,
    sent: false,
  },
  wallet: {
    account: "",
    chainId: "",
    balance: "",
    connected: false,
  },
  selected_coin: "BNB",
  selected_coin_data: {},
  chains: [
    {
      chainName: "Binance Smart Chain",
      networks: [
        {
          name: "Mainnet",
          id: 56,
        },
        {
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      chainName: "Ethereum",
      networks: [
        {
          name: "Mainnet",
          id: 1,
        },
        {
          name: "Görli",
          id: 5,
        },
      ],
    },
    {
      chainName: "Polygon",
      networks: [
        {
          name: "Mainnet",
          id: 137,
        },
        {
          name: "Testnet",
          id: 80001,
        },
      ],
    },
  ],
  coin_providers: [
    {
      symbol: "BNB",
      icon: BNBICON,
      name: "Binance Coin",
      chainName: "Binance Smart Chain",
      networks: [
        {
          link: "https://bscscan.com/address/",
          name: "Mainnet",
          id: 56,
        },
        {
          link: "https://testnet.bscscan.com/address/",
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      symbol: "USDC",
      icon: USDCICON,
      name: "USDC stablecoin",
      chainName: "Binance Smart Chain",
      networks: [
        {
          link: "https://bscscan.com/address/",
          name: "Mainnet",
          id: 56,
        },
        {
          link: "https://testnet.bscscan.com/address/",
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      symbol: "PRT",
      icon: PRTICON,
      name: "Pornrocket",
      chainName: "Binance Smart Chain",
      networks: [
        {
          link: "https://bscscan.com/address/",
          name: "Mainnet",
          id: 56,
        },
        {
          link: "https://testnet.bscscan.com/address/",
          name: "Testnet",
          id: 97,
        },
      ],
    },
    {
      symbol: "MATIC",
      icon: MATICICON,
      name: "Polygon Matic",
      chainName: "Polygon",
      networks: [
        {
          name: "Mainnet",
          id: 137,
        },
        {
          name: "Testnet",
          id: 80001,
        },
      ],
    },
    {
      symbol: "ETH",
      icon: ETHICON,
      name: "Ether",
      chainName: "Ethereum",
      networks: [
        {
          link: "https://etherscan.io/address/",
          name: "Mainnet",
          id: 1,
        },
        {
          link: "https://goerli.etherscan.io/address/",
          name: "Görli",
          id: 5,
        },
      ],
    },
  ],
  collection: {
    eth,
    cardImg,
    avatarImg,
    smallImg,
    price: "0.549",
    coin: "ETH",
    dollar: "$2,233.90",
    title: "Nanoe",
    description: "Mystery Drop 1 out of XX",
    buttonText: "Buy Now",
  },
  darkMode: true,
  modalActive: false,
  modalActiveContent: "",
  payment: {},
  creatorsLists: [],
  creatorDrops: [],
  creatorsListsForCreators: [],
  selectedCreator: {},
  selectedCreatorDropAssets: [],
  selectedCreatorDropAsset: {},
  limitCreators: 6,
  offsetCreators: 0,
  sortCreators: 1,
  limitNotableDrops: 6,
  offsetNotableDrops: 0,
  notableDrops: [],
  exploreDrops: [],
  limitExploreDrops: 6,
  offsetExploreDrops: 0,
  sortExploreDrops: 1,
};

const WalletPlugins = (store) => {
  // console.log(store);

  // window.ethereum.on("accountsChanged", async (accounts) => {
  //   const metamaskWallet = {
  //     connected: true,
  //     account: accounts[0],
  //     // chainId: window.ethereum.chainId,
  //     // sent: false,
  //   };
  //   store.commit("METAMASK_ACCOUNT_CHANGED", metamaskWallet);
  // });
  provider.on("accountsChanged", async (accounts) => {
    const wallet = {
      chainId: provider.chainId,
      account: accounts[0],
      connected: true,
    };
    store.commit("ACCOUNT_CHANGED", wallet);
    store.commit("GET_BALANCE", accounts[0]);
  });
  provider.on("chainChanged", (chainId) => {
    const wallet = {
      chainId,
      connected: true,
    };
    store.commit("CHAIN_CHANGED", wallet);
  });
  provider.on("disconnect", (code, reason) => {
    console.log(code, reason);
    const wallet = {
      chainId: "",
      account: "",
      balance: "",
      connected: false,
    };
    store.commit("DISCONNECT", wallet);
  });
  provider.on("error", () => {
    const wallet = {
      chainId: "",
      account: "",
      balance: "",
      connected: false,
    };
    store.commit("DISCONNECT", wallet);
  });
};
async function runProvider() {
  if (!provider) {
    provider = new WalletConnectProvider({
      infuraId: "8acc78d5beb44a14aa0a70a712c14811",
      rpc: {
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      },
    });
  }
  await provider
    .enable()
    .then(() => console.log("first call resolved"))
    .catch(() => {
      provider = null;
    });
}
async function ConnectAllWallet(wallettype) {
  let wallet = {};
  if (wallettype === "METAMASK") {
    const response = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (response) {
      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      const account = await window.ethereum.request({
        method: "eth_accounts",
      });

      wallet = {
        chainId,
        account: account[0],
        connected: true,
      };
    }
  } else if (wallettype === "BINANCE") {
    const activate = await bsc.activate();
    if (activate) {
      const account = await bsc.getAccount();
      const chainId = await bsc.getChainId();
      wallet = {
        account,
        chainId,
        connected: true,
      };
    }
  } else {
    return;
  }
  return wallet;
}
const actions = {
  connectWallet({ commit }) {
    if (!provider) {
      provider = new WalletConnectProvider({
        infuraId: "8acc78d5beb44a14aa0a70a712c14811",
        rpc: {
          56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
      });
    }

    if (!provider.connected) {
      //  Enable session (triggers QR Code modal)
      runProvider();
    } else {
      const wallet = {
        chainId: provider.chainId,
        account: provider.accounts[0],
        connected: true,
      };
      commit("CONNECT_WALLET", wallet);
      commit("GET_BALANCE", provider.accounts[0]);
    }
  },

  async connectBinanceWallet({ commit }) {
    const activate = await bsc.activate();
    const account = await bsc.getAccount();
    const chainId = await bsc.getChainId();
    commit("CONNECT_BINANCE_WALLET", {
      activate,
      account,
      chainId,
      connected: true,
      sent: false,
    });
  },
  async connectMetamask({ commit }) {
    //  Enable session (triggers QR Code modal)
    if (typeof window.ethereum !== "undefined") {
      const metamaskWallet = await ConnectAllWallet("METAMASK");
      commit("CONNECT_METAMASK_WALLET", metamaskWallet);
    } else {
      const binanceWallet = await ConnectAllWallet("BINANCE");
      commit("CONNECT_BINANCE_WALLET", binanceWallet);
    }
  },
  async sendWalletTransaction({ commit }, value) {
    if (value.wallet === "METAMASK") {
      const metamaskWallet = await ConnectAllWallet(value.wallet);
      const params = [
        {
          from: metamaskWallet?.account,
          to: value.toAddress,
          data: value.data,
          gas: "0x5208", //gas limit must be 21000.
        },
      ];
      window.ethereum
        .request({
          method: "eth_sendTransaction",
          params,
        })
        .then((result) => {
          console.log("results from metamask sign transaction", result);

          uccSdk.payments
            .updateDeposit(value?.customerId, value?.depositId, result)
            .then((response) => {
              console.log("updated transaction metamask", response);
              commit("TOGGLE_LOADER", { payments: false });
            })
            .catch((err) => {
              console.log(err);
              commit("TOGGLE_LOADER", { payments: false });
            });

          // The result varies by by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
        })
        .catch((error) => {
          console.log(error);
          // If the request fails, the Promise will reject with an error.
        });
      commit("SIGN_TRANSACTION");
    } else if (value.wallet === "BINANCE") {
      const binanceWallet = await ConnectAllWallet(value.wallet);
      const params = [
        {
          from: binanceWallet?.account,
          to: value.toAddress,
          data: value.data,
        },
      ];
      window.BinanceChain.request({
        method: "eth_sendTransaction",
        params: params,
      })
        .then((result) => {
          console.log("results from binance sign transaction", result);
          uccSdk.payments
            .updateDeposit(value?.customerId, value?.depositId, result)
            .then((response) => {
              console.log("updated transaction binance", response);
              commit("TOGGLE_LOADER", { payments: false });
            })
            .catch((err) => {
              console.log(err);
              commit("TOGGLE_LOADER", { payments: false });
            });
          // The result varies by by RPC method.
          // For example, this method will return a transaction hash hexadecimal string on success.
        })
        .catch((error) => {
          console.log(error);
          // If the request fails, the Promise will reject with an error.
        });
      commit("SIGN_TRANSACTION");
    }
  },

  disconnectWallet({ commit }) {
    provider.disconnect();
    commit("DISCONNECT");
  },
  toggleDarkMode({ commit }) {
    commit("TOGGLE_DARK_MODE");
  },
  toggleLoader({ commit }, value) {
    // console.log("loader values:", value);
    commit("TOGGLE_LOADER", value);
  },

  changeCoin({ commit }, value) {
    // console.log("event triggered: ", value);
    commit("CHANGE_COIN", value);
  },

  async getCreators({ commit }) {
    try {
      const result = await fetch(`${process.env.VUE_APP_TEST_URL}/creators`);
      const res = await result.json();
      commit("GET_CREATORS", await res?.data);
      commit("TOGGLE_LOADER", {
        creators: false,
      });
      console.log(await res);
    } catch (error) {
      const err = await error;
      console.log(err);
      commit("TOGGLE_LOADER", { creators: false });
    }
  },
  async getCreatorDrops({ commit }, value) {
    try {
      // let filterString = JSON.stringify(
      //   JSON.stringify({ "crowdSale.status": value.status })
      // );

      const result = await fetch(
        `${process.env.VUE_APP_TEST_URL}/creators/${value?.creatorId}/drops`
      );
      const res = await result.json();
      console.log(await res);
      commit("GET_CREATOR_DROPS", await res?.data);
    } catch (error) {
      const err = await error;
      console.log(err);
      commit("TOGGLE_LOADER", { creators: false });
    }
  },
  getCreatorsForCreators({ commit }, payload) {
    let sortString = JSON.stringify(
      JSON.stringify({ displayName: payload.sort })
    );
    fetch(
      `${process.env.VUE_APP_TEST_URL}/creators/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset +
        `&sort_by=` +
        sortString
    )
      .then((res) => res.json())
      .then((data) => {
        commit("TOGGLE_LOADER", { creators: false });
        commit("GET_CREATORS_FOR_CREATORS", data?.data);
        commit("UPDATE_LIMIT_CREATORS", payload.limit);
        commit("UPDATE_OFFSET_CREATORS", payload.offset);
        commit("UPDATE_SORT_CREATORS", payload.sort);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });
  },
  getNotableDrops({ commit }, payload) {
    fetch(
      `${process.env.VUE_APP_TEST_URL}notable-drops/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        commit("TOGGLE_LOADER", { notableDrops: false });
        commit("GET_NOTABLE_DROPS", data?.data);
        commit("UPDATE_LIMIT_NOTABLE_DROPS", payload.limit);
        commit("UPDATE_OFFSET_NOTABLE_DROPS", payload.offset);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { notableDrops: false });
      });
  },
  getExploreDrops({ commit }, payload) {
    console.log("-----------getExploreDrops-------------");
    console.log(payload);
    let sortString = JSON.stringify(
      JSON.stringify({ displayName: payload.sort })
    );
    console.log(
      `${process.env.VUE_APP_TEST_URL}notable-drops/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset +
        `&sort_by=` +
        sortString
    );
    fetch(
      `${process.env.VUE_APP_TEST_URL}notable-drops/?limit=` +
        payload.limit +
        `&offset=` +
        payload.offset +
        `&sort_by=` +
        sortString
    )
      .then((res) => res.json())
      .then((data) => {
        commit("TOGGLE_LOADER", { notableDrops: false });
        commit("GET_EXPLORE_DROPS", data?.data);
        commit("UPDATE_LIMIT_EXPLORE_DROPS", payload.limit);
        commit("UPDATE_OFFSET_EXPLORE_DROPS", payload.offset);
        commit("UPDATE_SORT_EXPLORE_DROPS", payload.sort);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { notableDrops: false });
      });
  },

  getCreatorDropsAsset({ commit }, payload) {
    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/${payload.creatorId}/drops/${payload?.dropId}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("selected creator", data);
        // commit("TOGGLE_LOADER", { creators: false });
        console.log(
          "selected creator and drop: ",
          data?.data?.Drop?.creatorDropId,
          data?.data?.Drop?.creatorId
        );
        commit("SELECTED_CREATOR", data?.data);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });

    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/${payload.creatorId}/drops/${payload?.dropId}/assets`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("selected assets", data.data);
        commit("TOGGLE_LOADER", { creators: false });
        commit("SELECTED_CREATOR_DROP_ASSETS", data?.data);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });
  },

  getCreatorDropAsset({ commit }, payload) {
    let filterString = JSON.stringify(JSON.stringify({ _id: payload.assetId }));

    fetch(
      `${process.env.VUE_APP_TEST_URL}creators/${payload.creatorId}/drops/${payload?.dropId}/assets?filter=${filterString}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("selected asset only ", data.data[0]);
        commit("TOGGLE_LOADER", { creators: false });
        commit("SELECTED_CREATOR_DROP_ASSET", data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { creators: false });
      });
  },

  trackingPages({ commit }, payload) {
    console.log(payload);
    uccSdk.track
      .submitEvent(
        process.env.VUE_APP_VUE_CUSTOMER_ID,
        process.env.VUE_APP_VUE_PROJECT_ID,
        "PAGE_VIEWED",
        {
          protocol: payload.protocol,
          host: payload.host,
          port: payload.port,
          origin: payload.origin,
          pathname: payload.pathname,
          url: payload.url,
        },
        {},
        "page"
      )
      .then((response) => console.log("page tracking:", response))
      .catch((err) => console.log(err.response.data));
    commit("TRACK_PAGE");
  },

  trackingEvents({ commit }, payload) {
    console.log("tracking payload", payload);
    const user = {};
    const type = "track";
    InititalizeTracking();
    uccSdk.track
      .submitEvent(
        process.env.VUE_APP_VUE_CUSTOMER_ID,
        process.env.VUE_APP_VUE_PROJECT_ID,
        payload?.event,
        payload?.data,
        user,
        type
      )
      .then((response) => {
        console.log("responses from tracking:", response);
        commit("REQUEST_TRACK_EVENT", response);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  //createDeposit(customerId, chainName, userId, currency, amount, tokenSymbol, events)
  requestPaymentDeposit({ commit }, payload) {
    console.log("event triggered: ", payload);
    uccSdk.payments
      .createDeposit(
        payload?.customerId,
        payload?.chainName,
        payload?.userId,
        payload?.currency,
        payload?.price,
        payload?.coin,
        payload?.events
      )
      .then((response) => {
        console.log("checking the new response:", response);
        commit("REQUEST_PAYMENT_DEPOSIT", response);
        commit("TOGGLE_LOADER", { payments: false });
        commit("TOGGLE_MODAL", {
          modalActive: true,
          modalActiveContent: "DEPOSIT",
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        commit("TOGGLE_LOADER", { payments: false });
      });
  },
  getPaymentDeposit({ commit }, payload) {
    uccSdk.payments
      .getDeposit(payload?.customerId, payload?.depositId)
      .then((response) => {
        commit("GET_PAYMENT_DEPOSIT", response);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { payments: false });
      });
  },
  cancelPaymentDeposit({ commit }, payload) {
    uccSdk.payments
      .cancelDeposit(payload?.customerId, payload?.depositId)
      .then((response) => {
        commit("TOGGLE_LOADER", { payments: false });
        commit("CANCEL_PAYMENT_DEPOSIT", response);
      })
      .catch((err) => {
        console.log(err);
        commit("TOGGLE_LOADER", { payments: false });
      });
  },

  toggleModal({ commit }, value) {
    commit("TOGGLE_MODAL", value);
  },
  toggleModalContent({ commit }, value) {
    commit("TOGGLE_MODAL_CONTENT", value);
  },
};
const mutations = {
  SIGN_TRANSACTION(state) {
    console.log(state.binanceWallet);
  },
  CONNECT_WALLET(state) {
    state.wallet = {
      ...state.wallet,
      connected: true,
    };
  },

  CONNECT_BINANCE_WALLET(state, payload) {
    state.binanceWallet = {
      ...state.binanceWallet,
      ...payload,
    };
  },
  CONNECT_METAMASK_WALLET(state, payload) {
    state.metamaskWallet = {
      ...state.metamaskWallet,
      ...payload,
    };
  },

  ACCOUNT_CHANGED(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  METAMASK_ACCOUNT_CHANGED(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  CHAIN_CHANGED(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  DISCONNECT(state, payload) {
    state.wallet = {
      ...state.wallet,
      ...payload,
    };
  },
  REQUEST_TRACK_EVENT(state, payload) {
    state.tracking = payload;
  },
  REQUEST_PAYMENT_DEPOSIT(state, payload) {
    console.log(payload);
    state.payment = payload;
  },

  GET_PAYMENT_DEPOSIT(state, payload) {
    console.log(payload);
    state.payment = payload;
  },

  CANCEL_PAYMENT_DEPOSIT(state, payload) {
    console.log(payload);
    state.payment = payload;
  },

  GET_BALANCE(state, payload) {
    const web3Provider = new providers.Web3Provider(provider);
    web3Provider.getBalance(payload).then((response) => {
      state.wallet = {
        ...state.wallet,
        balance: ethers.utils.formatUnits(response, 18),
      };
    });
  },
  GET_CREATORS(state, payload) {
    state.creatorsLists = payload;
  },
  GET_CREATOR_DROPS(state, payload) {
    state.creatorDrops = {
      ...state.creatorDrops,
      ...payload,
    };
  },
  GET_CREATORS_FOR_CREATORS(state, payload) {
    state.creatorsListsForCreators = payload;
  },
  GET_NOTABLE_DROPS(state, payload) {
    console.log("GET_NOTABLE_DROPS");
    console.log(state);
    console.log(payload);
    state.notableDrops = payload;
  },
  GET_EXPLORE_DROPS(state, payload) {
    state.exploreDrops = payload;
  },
  SELECTED_CREATOR(state, payload) {
    state.selectedCreator = payload;
  },

  SELECTED_CREATOR_DROP_ASSETS(state, payload) {
    state.selectedCreatorDropAssets = payload;
  },

  SELECTED_CREATOR_DROP_ASSET(state, payload) {
    state.selectedCreatorDropAsset = payload;
  },

  TOGGLE_DARK_MODE(state) {
    state.darkMode = !state.darkMode;
  },
  TOGGLE_LOADER(state, payload) {
    state.showLoader = {
      ...state.showLoader,
      ...payload,
    };
  },
  CHANGE_COIN(state, payload) {
    state.selected_coin = payload;
    const selected_data = state?.coin_providers?.find(
      (item) => item?.symbol === payload
    );
    state.selected_coin_data = selected_data;
  },
  TOGGLE_MODAL(state, payload) {
    state.modalActive = payload.modalActive;
    state.modalActiveContent = payload.modalActiveContent;
  },
  TOGGLE_MODAL_CONTENT(state, payload) {
    state.modalActiveContent = payload;
  },
  UPDATE_LIMIT_CREATORS(state, payload) {
    state.limitCreators = payload;
  },
  UPDATE_OFFSET_CREATORS(state, payload) {
    state.offsetCreators = payload;
  },
  UPDATE_SORT_CREATORS(state, payload) {
    state.sortCreators = payload;
  },
  UPDATE_LIMIT_NOTABLE_DROPS(state, payload) {
    state.limitNotableDrops = payload + 6;
  },
  UPDATE_OFFSET_NOTABLE_DROPS(state, payload) {
    state.offsetNotableDrops = payload;
  },
  UPDATE_LIMIT_EXPLORE_DROPS(state, payload) {
    state.limitExploreDrops = payload;
  },
  UPDATE_OFFSET_EXPLORE_DROPS(state, payload) {
    state.offsetExploreDrops = payload;
  },
  UPDATE_SORT_EXPLORE_DROPS(state, payload) {
    state.sortExploreDrops = payload;
  },
  TRACK_PAGE(state) {
    console.log(state);
  },
};

export default createStore({
  state,
  mutations,
  actions,
  plugins: [WalletPlugins],
});
