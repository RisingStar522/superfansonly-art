<template>
  <div class="main-container">
    <div class="card-wrapper mycard" :class="clickCard ? 'clicked-card' : ''">
      <div
        class="card-container card-front"
        :class="darkMode ? '' : 'dark'"
        @click="flipHandler()"
      >
        <span
          v-show="ribbon && !clickCard"
          class="ribbon"
          :title="ribbonText"
          :class="
            ribbonText === 'FOR SALE'
              ? 'green'
              : ribbonText === 'PENDING'
              ? 'orange'
              : 'red'
          "
        >
        </span>
        <div>
          <div class="image-container">
            <figure class="image is-4by5" :class="avatarImg ? '' : 'is-4by5'">
              <img :src="cardImg" />
            </figure>
          </div>
          <div class="card-wrapper-img columns is-mobile" v-show="avatarImg">
            <div class="column p-0 img-container is-one-third">
              <figure class="image is-1by1">
                <img class="is-rounded" :src="avatarImg" />
              </figure>
            </div>
          </div>
          <div class="info" :class="avatarImg ? '' : 'mt-5'">
            <p
              class="title font-size-1-2-rem"
              :class="darkMode ? '' : 'darkText'"
            >
              {{ title }}
            </p>
            <p
              class="subtitle font-size-1-rem capitalize-text"
              :class="darkMode ? '' : 'darkText'"
            >
              {{ description }}
            </p>
          </div>
          <div class="button-container">
            <button
              class="button is-info is-large-desktop"
              @click.stop="navigateRoute()"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="card-back card-container"
        :class="darkMode ? '' : 'dark'"
        @click="flipHandler()"
      >
        <div class="card-back-inner">
          <slot />
          <div class="back-button-container">
            <!-- <span> -->
            <!-- <router-link :to="routeUrl" class="button is-info is-large-desktop">
              {{ buttonText }}
            </router-link> -->
            <button
              class="button is-info is-large-desktop"
              @click.stop="navigateRoute()"
            >
              {{ buttonText }}
            </button>
            <!-- </span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "Card",
  props: {
    cardImg: String,
    avatarImg: String,
    title: String,
    description: String,
    buttonText: String,
    routeUrl: String,
    ribbon: Boolean,
    ribbonText: String,
    isDisabled: Boolean,
    trackEvent: String,
    trackExploreEvent: String,
    trackData: Object,
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();
    const darkMode = computed(() => store.state.darkMode);
    const clickCard = ref(false);
    const navigateRoute = () => {
      store.dispatch("trackingEvents", {
        event: props.trackExploreEvent,
        data: props.trackData,
      });
      router.push(props.routeUrl);
    };
    const flipHandler = () => {
      if (!clickCard.value) {
        store.dispatch("trackingEvents", {
          event: props.trackEvent,
          data: props.trackData,
        });
      }
      clickCard.value = !clickCard.value;
    };
    return {
      darkMode,
      clickCard,
      flipHandler,
      navigateRoute,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "bulma/sass/utilities/mixins.sass";

.btn-explore {
  background: #007de7;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  border-radius: 10px;
}

.mycard .ribbon {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  overflow: hidden;
  /* background: red; */
}

.mycard .ribbon.red::before {
  background-color: #d22222;
}
.mycard .ribbon.green::before {
  background-color: green;
}
.mycard .ribbon.green::after {
  background-color: #49c674;
}
.mycard .ribbon.red::after {
  background-color: #ff3860;
}

.mycard .ribbon.blue::before {
  background-color: #62baea;
}
.mycard .ribbon.blue::after {
  background-color: #4a98bf;
}

.mycard .ribbon.orange::before {
  background-color: #ff8c00;
}
.mycard .ribbon.orange::after {
  background-color: #ffa500;
}

@include mobile {
  .mycard .ribbon {
    height: 100px;
  }
  .mycard .ribbon::before {
    height: 30px !important;
  }
}
@include tablet {
  .mycard .ribbon {
    height: 100px;
  }
  .mycard .ribbon::before {
    height: 30px !important;
  }
}

.mycard .ribbon::before {
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
.mycard .ribbon::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  background: #4a98bf;
  z-index: -1;
}
.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-wrapper-img {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -15% 0 0 0 !important;
  padding-bottom: 1rem;
}
.card-container {
  height: 100%;
  width: 100%;
  max-width: 300px;
  background: #fff;
  border-radius: 25px;
  padding: 30px;
}
.font-size-1-2-rem {
  font-size: 1.2rem;
}
.font-size-1-rem {
  font-size: 1rem;
}
.image-container {
  background: #333333;
  border-radius: 25px;
}
.image-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
}
.img-container {
  position: relative;
}
.img-container img {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.status-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #007de7;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  top: 80px;
  position: absolute;
}
.button-container {
  transform: translateY(50%);
  width: 100%;
  max-width: 300px;
  position: relative;
}
.btn-all {
  z-index: 99;
  background: #007de7;
  border-radius: 10px;
  border: none;
  color: #fff;
  padding: 10px 50px;
  cursor: pointer;
}
.bottom-neg {
  position: relative;
  bottom: -20px;
}
.capitalize-text {
  text-transform: lowercase;
}
/* .info {
  margin-top: -15px;
} */
.mycard {
  /* position: relative; */
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 0.8s ease;
  cursor: pointer;
}

/* .mycard:hover {
  transform: rotateY(180deg);
} */
.clicked-card {
  transform: rotateY(180deg);
}
.card-front {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  color: #000;
  background: #fff;
  border-radius: 25px;
  padding: 0.5rem;
}
.card-back-inner {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  /* overflow: hidden; */
  background: #fafafa;
  color: #333;
  text-align: center;
  padding: 0.5rem;

  transform: rotateY(180deg);
}
.back-button-container {
  bottom: -20px;
  position: absolute;
  width: 100%;
  max-width: 300px;
}
/* .line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 50px;
} */
.button.is-info {
  border-radius: 13px;
}
.button {
  z-index: 99999;
}
</style>