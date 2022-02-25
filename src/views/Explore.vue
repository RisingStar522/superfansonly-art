<template>
  <div class="explore">
    <Loader v-show="showLoader?.notableDrops" />

    <div
      class="
        title-section
        columns
        is-multiline
        is-flex
        is-justify-content-space-between
        is-align-items-center
      "
    >
      <div class="column is-12-mobile">
        <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">
          Explore
        </h1>
        <p class="subtitle is-left pt-3" :class="darkMode ? 'darkText' : ''">
          Explore all our collections
        </p>
      </div>
    </div>

    <div
      class="
        columns
        is-multiline
        is-flex
        is-justify-content-space-between
        is-align-items-center
      "
    >
      <div class="column is-right" v-if="exploreDrops.length > 6">
        <DropDown />
      </div>
    </div>

    <section class="explore-section">
      <div class="columns is-multiline is-vcentered is-mobile">
        <div
          class="column is-6-mobile is-4-desktop is-6-tablet mb-6"
          v-for="(item, index) in exploreDrops"
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
                <div class="coin-container">
                  <img :src="BNBICON" class="small_icon" alt="" />
                  <img :src="ETHICON" class="small_icon" alt="" />
                  <img :src="MATICICON" class="small_icon" alt="" />
                  <img :src="PRTICON" class="small_icon" alt="" />
                  <img :src="USDCICON" class="small_icon" alt="" />
                </div>
                <strong :class="darkMode ? '' : 'darkText dark'">{{
                  item?.blockchain?.contractAddress
                }}</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div v-if="exploreDrops.length > 6">
        <button class="button-load" @click="loadMore()">Load more</button>
      </div>
    </section>
  </div>
</template>

<script>
import Card from "@/components/Card";
import DropDown from "@/components/DropDown";
import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/card-img.png";
import Loader from "@/components/Loader";
import moment from "moment";

import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

import BNBICON from "../assets/BNB-icon.png";
import ETHICON from "../assets/ETH-icon.png";
import MATICICON from "../assets/MATIC-icon.png";
import PRTICON from "../assets/PRT-icon.png";
import USDCICON from "../assets/USDC-logo.png";

export default {
  name: "Explore",
  mounted() {
    let params = { limit: 6, offset: 0, sort: 1 };
    const store = useStore();

    store.dispatch("trackingPages", {
      protocol: window && window.location ? window.location.protocol : null,
      host: window && window.location ? window.location.host : null,
      port: window && window.location ? window.location.port : null,
      origin: window && window.location ? window.location.origin : null,
      pathname: window && window.location ? window.location.pathname : null,
      url: window && window.location ? window.location.href : null,
    });
    store.dispatch("toggleLoader", { notableDrops: true });
    store.dispatch("getExploreDrops", params);
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const exploreDrops = computed(() => store.state.exploreDrops);
    const showLoader = computed(() => store.state?.showLoader);

    const limit = computed(() => store.state?.limitExploreDrops);
    const offset = computed(() => store.state?.offsetExploreDrops);
    const sort = computed(() => store.state?.sortExploreDrops);

    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item?.type === key)?.url;

    const loadMore = () => {
      store.dispatch("trackingEvents", {
        event: "LOAD MORE NOTABLE DROPS",
        data: { limit: limit.value + 6, offset, sort: sort.value },
      });
      store.dispatch("getExploreDrops", {
        limit: limit.value + 6,
        offset: offset,
        sort: sort.value,
      });
    };

    let sortType1 = ref(1);
    const onChangeSort = (event) => {
      sortType1 = event.target.value;
      store.dispatch("trackingEvents", {
        event: "SORT NOTABLE DROPS",
        data: event.target.value,
      });
      store.dispatch("getExploreDrops", {
        limit: limit.value,
        offset: offset,
        sort: sortType1,
      });
    };

    return {
      showLoader,
      darkMode,
      exploreDrops,
      limit,
      offset,
      sort,
      loadMore,
      FindImageUrl,
      onChangeSort,
      BNBICON,
      ETHICON,
      MATICICON,
      PRTICON,
      USDCICON,
      moment,
    };
  },
  data: () => {
    return {
      cardImg,
      avatarImg,
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
          description:
            "Mystery Drop 1 out of XX Mystery Drop 1 out of Mystery Drop 1 out of XXMystery Drop 1 out of XXMystery Drop 1 out of XXMystery Drop 1 out of XXMystery Drop 1 out of XXMystery Drop 1 out of XXMystery Drop 1 out of XX Drop 1 out of XXMystery Drop 1 out of XX",
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
  components: { Card, DropDown, Loader },
};
</script>

<style scoped lang="scss">
@import "bulma/sass/utilities/mixins.sass";

@include tablet {
  .title-section {
    padding-bottom: 50px !important;
    padding-top: 50px !important;
  }
}

.title-section {
  padding-bottom: 20px;
  padding-top: 10px;
}
.button-load {
  color: #007de7;
  border: 1px solid #007de7;
  border-radius: 10px;
  padding: 10px 20px;
  width: 260px;
  background-color: white;
}
.is-right {
  text-align: right;
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
