import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default {
  install: (Vue) => {
    // console.log("store", store);
    // if (!store) {
    //   throw new Error("Please provide vuex store.");
    // }
    // store.registerModule({ states, mutations, actions });

    Vue.mixin({
      data() {
        return {
          provider: null,
          account: "",
          chainId: "",
          balance: "",
          connected: false,
          darkMode: true,
        };
      },
      // mounted() {
      //   // this.connectWallet();
      //   console.log("plugin mounted");
      // },
      created() {
        //  Create WalletConnect Provider
        this.provider = new WalletConnectProvider({
          infuraId: "8acc78d5beb44a14aa0a70a712c14811",
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
            97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
          },
        });

        // Subscribe to account change
        this.provider.on("accountsChanged", async (accounts) => {
          this.chainId = this.provider.chainId;
          this.account = accounts[0];
          await this.getBalance(accounts[0]);
          this.connected = true;
          // console.log(accounts);
          // console.log(this.provider, this.connected);
        });

        // Subscribe to chainId change
        this.provider.on("chainChanged", (chainId) => {
          this.chainId = chainId;
          this.connected = true;
          // console.log(chainId);
          // console.log(this.provider, this.connected);
        });

        // Subscribe to session connection
        this.provider.on("connect", () => {
          // console.log("connect");
          this.connected = true;
        });

        // Subscribe to session disconnection
        this.provider.on("disconnect", (code, reason) => {
          console.log(code, reason);
          this.chainId = "";
          this.account = "";
          this.balance = "";
          this.connected = false;
        });

        this.provider.on("error", () => {
          this.provider.disconnect();
        });
      },
      methods: {
        async disconnectWallet() {
          await this.provider.disconnect();
          this.chainId = "";
          this.account = "";
          this.balance = "";
          this.connected = false;
        },
        async connectWallet() {
          if (!this.provider.connected) {
            //  Enable session (triggers QR Code modal)
            await this.provider.enable();
          } else {
            console.log(this.provider, this.connected);
            this.chainId = await this.provider.chainId;
            this.account = await this.provider.accounts[0];
            await this.getBalance(this.account);
            this.connected = true;
            console.log("connect");
          }
        },
        async getBalance(account) {
          const web3Provider = new providers.Web3Provider(this.provider);
          const balance = await web3Provider.getBalance(account);
          this.balance = ethers.utils.formatUnits(balance, 18);
        },
      },
    });
  },
};
