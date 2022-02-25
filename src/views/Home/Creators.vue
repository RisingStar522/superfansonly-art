<template>
  <div class="position-relative my-6">
    <h1 class="title is-left pt-6" :class="darkMode ? 'darkText' : ''">
      Our Creators
    </h1>
    <div
      class="is-multiline is-vcentered is-center is-mobile is-tablet is-desktop"
    >
      <Loader v-show="showLoader?.creators" />
      <Splide :options="options" v-show="creatorsLists.length > 0">
        <SplideSlide v-for="(item, index) in creatorsLists" :key="index">
          <div class="column">
            <Card
              :cardImg="FindImageUrl(item?.images, 'PROFILE')"
              :avatarImg="FindImageUrl(item?.images, 'AVATAR')"
              :title="item?.displayName"
              :description="item?.tagLine"
              :buttonText="`Explore`"
              :routeUrl="`/creators/${item?.slug}`"
              :isDisabled="false"
              :trackData="item"
              :trackEvent="`FLIP CREATOR`"
              :trackExploreEvent="`EXPLORE CREATOR`"
            >
              <SocialMediaLinks :socialMedia="item?.socialMedia" />
            </Card>
          </div>
        </SplideSlide>
      </Splide>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import SocialMediaLinks from "@/components/IconLists";
import Loader from "@/components/Loading";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
// import Carousel from "@/components/carousel/Carousel.vue";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { watch } from "@vue/runtime-core";
export default {
  name: "creators-view",
  mounted() {
    const store = useStore();
    store.dispatch("toggleLoader", { creators: true });
    store.dispatch("getCreators");
  },
  components: {
    Card,
    SocialMediaLinks,
    Loader,
    Splide,
    SplideSlide,
  },
  setup() {
    const store = useStore();
    // const { darkMode, creatorsLists, showLoader, notableDrops, limit, offset } =

    // const statevalues = computed(() => store.state?.showLoader);
    // console.log("this is the loader state", statevalues.value);
    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item.type === key)?.url;

    watch(store.state?.showLoader, (curr, prev) => {
      console.log("checking loading", curr, prev);
    });
    const options = {
      rewind: false,
      perPage: 3,
      gap: "1rem",
      breakpoints: {
        300: {
          perPage: 2,
        },
        640: {
          perPage: 2,
        },
        1024: {
          perPage: 3,
        },
      },
    };
    return {
      darkMode: computed(() => store.state?.darkMode),
      creatorsLists: computed(() => store.state?.creatorsLists),
      showLoader: computed(() => store.state?.showLoader),
      FindImageUrl,
      options,
    };
  },
};
</script>

<style lang="scss">
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
  right: -2em !important;
}
.splide__pagination {
  bottom: -2em !important;
}
</style>
