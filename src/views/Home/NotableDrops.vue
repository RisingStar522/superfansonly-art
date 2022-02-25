<template>
  <div class="position-relative my-4">
    <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">
      Notable Drops
    </h1>
    <Loader v-show="showLoader?.notableDrops" />
    <div
      class="columns is-multiline is-vcentered is-mobile is-tablet is-desktop"
      v-if="notableDrops"
    >
      <div
        class="column is-6-mobile is-6-tablet is-4-desktop mt-6"
        v-for="(item, index) in notableDrops"
        :key="index"
      >
        <Card
          :cardImg="item?.promoImage == '' ? cardImg : item?.promoImage"
          :avatarImg="
            item?.creator?.avatar == '' ? avatarImg : item?.creator?.avatar
          "
          :trackData="item"
          :trackEvent="`FLIP NOTABLE DROP`"
          :trackExploreEvent="`EXPLORE NOTABLE DROP`"
          :isDisabled="false"
          :ribbon="true"
          :ribbonText="item?.status"
          :title="item?.creator?.displayName"
          :description="item?.name"
          :buttonText="`Explore`"
          :routeUrl="`/creators/${item?.creator?.id}/drops/${item?.dropId}`"
        >
          <div class="is-centered section">
            <p :class="darkMode ? '' : 'darkText dark'">
              Start Date:
              <strong
                class="break-word"
                :class="darkMode ? '' : 'darkText dark'"
                >{{ moment(item?.startsOn).format("dddd, MMMM DD YYYY") }}
              </strong>
            </p>
            <p class="py-2" :class="darkMode ? '' : 'darkText dark'">
              End Date:
              <strong :class="darkMode ? '' : 'darkText dark'">
                {{ moment(item?.endsOn).format("dddd, MMMM DD YYYY") }}
              </strong>
            </p>
            <p class="py-2" :class="darkMode ? ' ' : 'darkText dark'">
              Token Standard:
              <strong :class="darkMode ? '' : 'darkText dark'">ERC721</strong>
            </p>
            <div class="py-2" :class="darkMode ? ' ' : 'darkText dark'">
              <!-- <div class="coin-container">
                <img :src="BNBICON" class="small_icon" alt="" />
                <img :src="ETHICON" class="small_icon" alt="" />
                <img :src="MATICICON" class="small_icon" alt="" />
                <img :src="PRTICON" class="small_icon" alt="" />
                <img :src="USDCICON" class="small_icon" alt="" />
              </div> -->
              <strong :class="darkMode ? '' : 'darkText dark'">{{
                item?.blockchain?.contractAddress
              }}</strong>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>


<script>
import Card from "@/components/Card";
import Loader from "@/components/Loading";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import moment from "moment";

import BNBICON from "../../assets/BNB-icon.png";
import ETHICON from "../../assets/ETH-icon.png";
import MATICICON from "../../assets/MATIC-icon.png";
import PRTICON from "../../assets/PRT-icon.png";
import USDCICON from "../../assets/USDC-logo.png";

export default {
  name: "notable-drops-view",
  mounted() {
    let params = { limit: 6, offset: 0 };
    const store = useStore();

    store.dispatch("toggleLoader", { notableDrops: true });
    store.dispatch("getNotableDrops", params);
  },
  components: {
    Card,
    Loader,
  },
  setup() {
    const store = useStore();

    const stateValues = computed(() => store.state);

    // console.log(stateValues.value);
    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item.type === key)?.url;

    const loadMore = () =>
      store.dispatch("getNotableDrops", {
        limit: stateValues?.value.limit,
        offset: stateValues?.value.offset,
      });
    const filterObjsInArr = (arr, selection) => {
      var filtered = arr.filter(function (e) {
        return this.indexOf(e.symbol) > -1;
      }, selection);
      return filtered;
    };
    return {
      darkMode: computed(() => store.state?.darkMode),
      showLoader: computed(() => store.state?.showLoader),
      notableDrops: computed(() => store.state?.notableDrops),
      coin_providers: computed(() => store.state?.coin_providers),
      limit: stateValues?.value?.limit,
      offset: stateValues?.value?.offset,
      filterObjsInArr,
      moment,
      FindImageUrl,
      loadMore,
      BNBICON,
      ETHICON,
      MATICICON,
      PRTICON,
      USDCICON,
    };
  },
};
</script>


<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins.sass";
.position-relative {
  position: relative;
}
@include mobile {
  .home {
    margin: 0 auto;
  }
}
@include tablet {
  .home {
    margin: 0 auto;
  }
}
.is-left {
  text-align: left;
}
.card {
  background-color: black !important;
  border-radius: 1.25rem !important;
}
.card-content {
  width: 100%;
}
.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
}

.media-left {
  padding-top: 30px;
  padding-left: 20px;
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
.button-load:hover {
  background-color: #3e8ed0;
  border-color: #3e8ed0;
  color: #fff;
}
.m-auto {
  margin: auto;
}
.green-background {
  background: turquoise;
}
.height-200 {
  height: 200px;
}
.splide__arrow--prev {
  left: -2em !important;
}
.splide__arrow--next {
  right: -1em !important;
}
.splide__pagination {
  bottom: -2em !important;
}
.coin-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.small_icon {
  width: 36px;
  height: 36px;
}
</style>
