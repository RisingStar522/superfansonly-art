<template>
  <div>
    <section class="hero home-hero">
      <figure class="image inverted">
        <img
          :src="FindImageUrl(selectedCreator?.Drop?.creator?.images, 'BANNER')"
        />
      </figure>
    </section>
    <div class="profile-main is-mobile is-multiline">
      <div class="is-12">
        <div class="columns is-mobile is-vcentered is-justify-content-center">
          <div class="column profile-img-container is-3">
            <figure class="image is-1by1">
              <img
                class="is-rounded"
                :src="
                  FindImageUrl(selectedCreator?.Drop?.creator?.images, 'AVATAR')
                "
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="drop-info-container w-75">
        <h1 class="is-size-3" :class="darkMode ? 'darkText' : ''">
          {{ selectedCreator?.Drop?.creator?.displayName }} Presents
        </h1>

        <div class="columns">
          <div class="column is-12-mobile" :class="darkMode ? 'darkText' : ''">
            <div class="ribbon-image">
              <span
                class="ribbon"
                :title="selectedCreator?.Drop?.crowdSale?.status"
                :class="
                  selectedCreator?.Drop?.crowdSale?.status === 'PENDING'
                    ? 'orange'
                    : selectedCreator?.Drop?.crowdSale?.status === 'ONGOING'
                    ? 'green'
                    : 'red'
                "
              >
              </span>
              <div class="left-image-container">
                <figure class="image">
                  <img
                    class="cardImg"
                    :src="FindImageUrl(selectedCreator?.Drop?.images, 'PROMO')"
                  />
                </figure>
              </div>
              <div
                class="
                  m-5
                  is-flex is-justify-content-center is-align-content-center
                  p-20
                "
              >
                <figure class="image is-32x32">
                  <img
                    :src="
                      FindIconByChain(
                        selectedCreator?.Drop?.blockchain?.chainName
                      )
                    "
                  />
                </figure>
                <div>
                  <p>
                    {{ selectedCreator?.Drop?.blockchain?.tokenStandard }}
                  </p>
                  <a
                    class="link-text-color"
                    target="_blank"
                    :href="`${FindLinkByChainId(
                      selectedCreator?.Drop?.blockchain?.chainId
                    )}${selectedCreator?.Drop?.blockchain?.contractAddress}`"
                  >
                    View Contract
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div
            class="column is-12-mobile is-two-thirds-desktop"
            :class="darkMode ? 'darkText' : ''"
          >
            <div class="right-container">
              <div class="card" :class="darkMode ? '' : 'dark'">
                <header class="card-header">
                  <p
                    class="card-header-title is-bigger-text is-center"
                    :class="darkMode ? 'darkText' : 'darkText'"
                  >
                    {{ selectedCreator?.Drop?.name }}
                  </p>
                  <a
                    :href="selectedCreator?.Drop?.externalLink"
                    target="_blank"
                    class="card-header-icon"
                    aria-label="more options"
                  >
                    <span class="icon">
                      <i
                        :class="darkMode ? 'darkText' : 'darkText'"
                        class="fas fa-external-link-alt"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </a>
                </header>
              </div>
              <div class="card">
                <header class="card-header">
                  <p
                    class="card-header-title is-center"
                    :class="darkMode ? 'darkText' : 'darkText'"
                  >
                    {{ selectedCreator?.Drop?.description }}
                  </p>
                </header>
              </div>
              <div class="card">
                <header class="card-header">
                  <p
                    class="card-header-title is-center"
                    :class="darkMode ? 'darkText' : 'darkText'"
                  >
                    Opens
                    {{
                      moment(selectedCreator?.Drop?.crowdSale?.startsOn).format(
                        "dddd, MMMM DD YYYY"
                      )
                    }}
                  </p>
                </header>
              </div>
              <div class="card">
                <header class="card-header">
                  <p
                    class="card-header-title is-center"
                    :class="darkMode ? 'darkText' : 'darkText'"
                  >
                    Fixed Price NFT Sale
                    <br />
                    Pay with
                    <small
                      class="pt-5"
                      v-for="(item, index) in selectedCreator?.Drop?.crowdSale
                        ?.paymentTokens"
                      :key="index"
                    >
                      <div class="coinSelectImg-container">
                        <img :src="FindIcon(item)" alt="" />
                      </div>
                    </small>
                  </p>
                </header>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="position-relative">
        <div
          class="
            columns
            is-multiline is-centered is-mobile is-tablet is-desktop
          "
        >
          <div
            class="column is-6-mobile is-6-tablet is-4-desktop mt-6"
            v-for="(item, index) in selectedCreatorDropAssets"
            :key="index"
          >
            <Card
              :cardImg="item?.tokenImage"
              :ribbon="true"
              :ribbonText="item?.status"
              :title="`${item?.fixedSellingPrice?.amount} ${item?.fixedSellingPrice?.token} `"
              :description="item?.contentType"
              :isDisabled="
                selectedCreator?.Drop?.crowdSale?.status === 'PENDING'
                  ? true
                  : false
              "
              :buttonText="`Buy Now`"
              :routeUrl="`/creators/${creatorId}/drops/${dropId}/assets/${item?._id}`"
              :trackData="item"
              :trackEvent="`FLIP NFT`"
              :trackExploreEvent="`START BUYING NFT`"
            >
              <div class="section is-centered">
                <p :class="darkMode ? '' : 'darkText dark'">
                  <strong
                    class="break-word"
                    :class="darkMode ? '' : 'darkText dark'"
                    >{{ item?.description }}</strong
                  >
                </p>
                <p
                  :class="darkMode ? '' : 'darkText dark'"
                  v-for="(x, index) in item?.traits"
                  :key="index"
                >
                  {{ x?.key }}:
                  <strong
                    class="break-word"
                    :class="darkMode ? '' : 'darkText dark'"
                    >{{ x?.value }}</strong
                  >
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/detail-img.png";
import eth from "../assets/eth.png";
import { useRoute } from "vue-router";
import Card from "@/components/Card";
// import Loader from "@/components/Loader";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import moment from "moment";
export default {
  name: "Item",
  components: {
    Card,
    // Loader,
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
    const dropId = route.params.dropId;
    const creatorId = route.params.creatorId;
    // console.log(dropId, creatorId, "just checking");
    store.dispatch("trackingPages", {
      protocol: window && window.location ? window.location.protocol : null,
      host: window && window.location ? window.location.host : null,
      port: window && window.location ? window.location.port : null,
      origin: window && window.location ? window.location.origin : null,
      pathname: window && window.location ? window.location.pathname : null,
      url: window && window.location ? window.location.href : null,
    });
    store.dispatch("getCreators");
    store.dispatch("toggleLoader", { creators: true });
    store.dispatch("getCreatorDropsAsset", { dropId, creatorId });
  },

  setup() {
    const route = useRoute();
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const selectedCreator = computed(() => store.state.selectedCreator);
    const selectedCreatorDropAssets = computed(
      () => store.state.selectedCreatorDropAssets
    );
    const coin_providers = computed(() => store.state.coin_providers);
    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item.type === key)?.url;
    const FindIcon = (key) =>
      coin_providers.value?.find((item) => item.symbol === key)?.icon;
    const FindIconByChain = (key) =>
      coin_providers.value?.find((item) => item.chainName === key)?.icon;
    const FindLinkByChainId = (key) => {
      // console.log(key);
      const res = coin_providers.value?.reduce(
        (prev, coin) =>
          prev ||
          coin.networks.find((item) => parseInt(item.id) === parseInt(key)),
        undefined
      );
      console.log("network", res?.link);
      return res?.link;
    };
    // FindLinkByChainId(97);
    const showLoader = computed(() => store.state?.showLoader);
    // console.log(selectedCreatorDropAssets.value);
    const dropId = route.params.dropId;
    const creatorId = route.params.creatorId;
    // console.log(dropId, creatorId, showLoader);
    // console.log(selectedCreator.value);
    return {
      darkMode,
      selectedCreator,
      selectedCreatorDropAssets,
      FindImageUrl,
      FindIcon,
      FindIconByChain,
      FindLinkByChainId,
      moment,
      showLoader,
      dropId,
      creatorId,
    };
  },
};
</script>

<style scoped>
.is-bigger-text {
  font-size: 25px;
}
.link-text-color {
  color: #62baea;
}
.link-text-color:hover {
  color: #007de7;
}
.is-full {
  width: 100%;
}
.is-center {
  justify-content: center;
}
.max-height-400 {
  height: 400px;
}

.drop-info-container {
  margin: 0 auto;
  width: 75%;
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
.flex-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.right-container {
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.left-image-container {
  border: 1px solid #2a2e3a;
  background: #2a2e3a;
  border-radius: 20px;
  height: 300px;
  width: 250px;
  padding: 10px;
}
.profile-main {
  margin-top: -15%;
}
.cardImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
}
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home-hero {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.profile-img-container img {
  border: 3px solid white;
}
.is-right {
  text-align: right;
}

.is-left {
  text-align: left;
}
.card {
  border-radius: 0px !important;
  background-color: #393939 !important;
}

.card--reverse-order {
  flex-direction: row-reverse;
}

.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
}

.media-left {
  padding-top: 30px;
  margin-right: 15rem;
  font-size: 2.25rem;
  font-weight: bold;
  color: white;
}
.title-1 {
  margin-right: 9rem;
}
.button-load {
  color: #007de7;
  border: 1px solid #007de7;
  border-radius: 10px;
  padding: 10px 20px;
  width: 260px;
  background-color: white;
}

.ribbon-image .ribbon {
  position: absolute;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
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
</style>