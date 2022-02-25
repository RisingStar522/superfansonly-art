<template>
  <div class="main-container">
    <div class="card-wrapper mycard" :class="clickCard ? 'clicked-card' : ''">
      <div
        class="card-container card-front"
        :class="darkMode ? '' : 'dark'"
        @click="flipHandler()"
      >
        <div>
          <div class="image-container">
            <figure class="image is-4by5">
              <img :src="cardImg" />
            </figure>
          </div>
          <div class="card-wrapper-img columns is-mobile">
            <div class="column p-0 img-container is-one-third">
              <figure class="image is-1by1">
                <img class="is-rounded" :src="avatarImg" />
              </figure>
            </div>
          </div>
          <div class="info">
            <div
              class="title is-5 is-flex is-justify-content-center"
              :class="darkMode ? '' : 'darkText'"
            >
              <svg
                :fill="darkMode ? '#000000' : '#FFFFFF'"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 100 100"
                width="25px"
                height="25px"
                style="enable-background: new 0 0 50 50"
                xml:space="preserve"
              >
                <path
                  :fill="darkMode ? '#000000' : '#FFFFFF'"
                  class="st0"
                  d="M46.1,0C20.6,0,0,20.7,0,46.3s20.7,46.2,46.3,46.1c25.5,0,46.1-20.7,46.1-46.2C92.4,20.7,71.7,0,46.1,0
                    C46.2,0,46.2,0,46.1,0z M46.1,87.6C23.2,87.5,4.7,68.9,4.8,46.1S23.4,4.8,46.3,4.8c22.8,0.1,41.3,18.6,41.3,41.4
                    c0,22.9-18.5,41.4-41.4,41.4C46.2,87.6,46.1,87.6,46.1,87.6L46.1,87.6z"
                />
                <path
                  :fill="darkMode ? '#000000' : '#FFFFFF'"
                  class="st1"
                  d="M65,42.4v-3.8c0-4.5-1.8-8.8-5.1-12c-3.2-3.2-7.6-5-12.2-5h-3.1c-4.6,0-8.9,1.8-12.2,5c-3.2,3.1-5.1,7.5-5.1,12
                    v3.8l-2.1,3.8v5.6c0,5,2,9.8,5.6,13.3c3.6,3.6,8.5,5.5,13.6,5.5h3.5c5.1,0,9.9-2,13.5-5.5c3.6-3.5,5.6-8.3,5.6-13.3v-5.6L65,42.4z
                    M48.2,59.5V64l0,0c0,0.7-0.3,1.3-0.9,1.6h-2c-0.6-0.4-0.9-1-0.9-1.7v-4.5c-2.7-1.1-4.1-4.1-3-6.9c0.8-2,2.8-3.4,4.9-3.4h0.3
                    c2.9,0,5.3,2.3,5.3,5.3c0,2.2-1.3,4.2-3.4,5H48.2z M57.3,42.6H35.1v-3.9c0-2.5,1-4.9,2.8-6.7c1.8-1.8,4.2-2.8,6.7-2.8h3.1
                    c2.5,0,4.9,1,6.7,2.8c1.8,1.7,2.8,4.1,2.8,6.6L57.3,42.6z"
                />
              </svg>
              <p class="p-title is-5 pl-1">
                {{ title }}
              </p>
            </div>
            <p
              class="subtitle is-6 line-clamp"
              :class="darkMode ? '' : 'darkText'"
            >
              {{ description }}
            </p>
          </div>
          <div class="button-container">
            <!-- :to="{ path: '/creators/:id', params: { id: profile._id }}" -->
            <!-- <router-link 
              :to="{ name : 'Profile', params: { slug: profile.slug }}"
              class="button is-info is-large-desktop"
            > -->
            <router-link
              :to="{ name: 'Profile', params: { slug: profile.slug } }"
              class="button is-info is-large-desktop"
            >
              {{ buttonText }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- <div
        class="card-back"
        :class="darkMode ? '' : 'dark'"
        @click="flipHandler()"
      >
        <slot />
        <div class="button-container">
          <span>
            <router-link
              :to="{ name: 'Profile', params: { id: profile._id } }"
              class="btn-all bottom-neg"
            >
              {{ buttonText }}
            </router-link>
          </span>
        </div>
      </div> -->
      <div
        class="card-back card-container"
        :class="darkMode ? '' : 'dark'"
        @click="flipHandler()"
      >
        <div class="card-back-inner">
          <slot />
          <div class="back-button-container">
            <button
              class="button is-info is-large-desktop"
              @click.stop="navigateRoute()"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import lockImg from "../assets/lock.png";
import { useRouter } from "vue-router";
export default {
  name: "CardCreators",
  props: {
    cardImg: String,
    avatarImg: String,
    title: String,
    description: String,
    buttonText: String,
    // routeUrl: String,
    profile: Object,
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
      lockImg,
      navigateRoute,
    };
  },
  methods: {},
};
</script>
<style scoped>
.btn-explore {
  background: #007de7;
  color: white;
  font-weight: 700;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  border-radius: 10px;
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card-wrapper-img {
  max-height: 150px;
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
  max-width: 400px;
  background: #fff;
  border-radius: 25px;
  padding: 30px;
}
.card-back-inner {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.back-button-container {
  bottom: -20px;
  position: absolute;
  width: 100%;
  max-width: 300px;
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
  max-width: 460px;
  /* position: relative; */
}
.btn-all {
  z-index: 99;
  background: #007de7;
  border-radius: 4px;
  border: none;
  color: #fff;
  padding: 10px 1rem;
  cursor: pointer;
}
.bottom-neg {
  position: relative;
  bottom: -20px;
}
/* .info {
  margin-top: -15px;
} */
.mycard {
  position: relative;
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
  width: 100%;
  height: 100%;
  border-radius: 10px;
  backface-visibility: hidden;
  color: #000;
  background: #fff;
  border-radius: 25px;
  padding: 0.5rem;
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
  transform: rotateY(180deg);
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
.p-title {
  line-height: 26px;
  font-size: 1.2rem;
}
</style>