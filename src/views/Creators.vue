<template>
  <div class="creators">
    <Loader v-show="showLoader?.creators" />

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
          Our Creators
        </h1>
        <p class="subtitle is-left pt-3" :class="darkMode ? 'darkText' : ''">
          Have a look at our creators
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
      v-if="creatorsListsForCreators.length > 6"
    >
      <!-- <div class="column is-right">
        <DropDown />
      </div> -->
      <div class="column is-right">
        <select class="select dropdown" @change="onChangeSort">
          <option class="option-list" value="1">Name A-Z</option>
          <option class="option-list" value="-1">Name Z-A</option>
        </select>
      </div>
    </div>

    <section class="creators-section">
      <div class="columns is-multiline is-mobile">
        <div
          class="column is-6-mobile is-6-tablet is-4-desktop"
          :key="index"
          v-for="(item, index) in creatorsListsForCreators"
        >
          <CardCreators
            :cardImg="FindImageUrl(item?.images, 'PROFILE')"
            :avatarImg="FindImageUrl(item?.images, 'AVATAR')"
            :title="item?.displayName"
            :profile="item"
            :description="item?.tagLine"
            :buttonText="`Explore`"
            :routeUrl="`/creators/${item?.slug}`"
            :trackData="item"
            :trackEvent="`FLIP CREATOR`"
            :trackExploreEvent="`EXPLORE CREATOR`"
          >
            <SocialMediaLinks :socialMedia="item?.socialMedia" />
          </CardCreators>
        </div>
      </div>
      <div v-if="creatorsListsForCreators.length > 6">
        <button
          @click="loadMore()"
          v-if="creatorsListsForCreators.length > 0"
          :class="darkMode ? 'button-load-light' : 'button-load'"
        >
          Load more
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import CardCreators from "@/components/CardCreators";
// import DropDown from "@/components/DropDown";
import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/card-img.png";
import creator1Img from "../assets/creator-img-1.png";
import creator2Img from "../assets/creator-img-2.png";
import Loader from "@/components/Loader";
import SocialMediaLinks from "@/components/IconLists";

import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  name: "Creators",
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
    store.dispatch("toggleLoader", { creators: true });
    store.dispatch("getCreatorsForCreators", params);
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const creatorsListsForCreators = computed(
      () => store.state.creatorsListsForCreators
    );
    const showLoader = computed(() => store.state?.showLoader);

    const limit = computed(() => store.state?.limitCreators);
    const offset = computed(() => store.state?.offsetCreators);
    const sort = computed(() => store.state?.sortCreators);

    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item?.type === key)?.url;

    const loadMore = () => {
      store.dispatch("trackingEvents", {
        event: "LOAD MORE CREATORS",
        data: { limit: limit.value + 6, offset, sort: sort.value },
      });
      store.dispatch("getCreatorsForCreators", {
        limit: limit.value + 6,
        offset: offset,
        sort: sort.value,
      });
    };

    let sortType1 = ref(1);
    const onChangeSort = (event) => {
      sortType1 = event.target.value;
      store.dispatch("trackingEvents", {
        event: "SORT CREATORS",
        data: event.target.value,
      });
      store.dispatch("getCreatorsForCreators", {
        limit: limit.value,
        offset: offset,
        sort: sortType1,
      });
    };

    return {
      showLoader,
      darkMode,
      creatorsListsForCreators,
      limit,
      offset,
      sort,
      loadMore,
      FindImageUrl,
      onChangeSort,
    };
  },
  data: () => {
    return {
      creator1Img,
      creator2Img,
      cardImg,
      avatarImg,
    };
  },
  components: { CardCreators, Loader, SocialMediaLinks },
};
</script>
<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins.sass";

@include tablet {
  .title-section {
    padding-bottom: 50px !important;
    padding-top: 50px !important;
  }
  .select.dropdown {
    font-size: 20px;
    height: 2.5em;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 6px;
    padding-bottom: 13px;
    width: 200px;
    background-color: #1b1a21;
    color: white;
    height: 50px;
    border-radius: 0.5rem;
    border: none;
  }
  .option-list {
    background-color: white;
    color: black;
    max-width: 20px;
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
.button-load-light {
  color: #007de7;
  border: 1px solid #007de7;
  border-radius: 10px;
  padding: 10px 20px;
  width: 260px;
  background-color: #2a2d3a;
}
.button-load:hover {
  background-color: #3e8ed0;
  border-color: #3e8ed0;
  color: #fff;
}
.button-load-light:hover {
  background-color: #3e8ed0;
  border-color: #3e8ed0;
  color: #fff;
}
.is-right {
  text-align: right;
}
.select.dropdown {
  font-size: 20px;
  height: 2.5em;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 13px;
  width: 200px;
  background-color: #1b1a21;
  color: white;
  height: 50px;
  border-radius: 0.5rem;
  border: none;
}
.option-list {
  background-color: white;
  color: black;
  max-width: 20px;
}
</style>
