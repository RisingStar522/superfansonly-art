<template>
  <div class="content">
    <div class="title-container is-border-bottom">
      <p class="title is-centered" :class="darkMode ? 'darkText' : ''">
        Payment Successful
      </p>
    </div>
    <div class="content-container py-3 is-border-bottom">
      <div class="payImg-container is-centered">
        <figure class="image is-5by3" v-if="selectedCreatorDropAsset">
          <img :src="selectedCreatorDropAsset?.tokenImage" alt="" />
        </figure>
      </div>
      <div class="message-container mx-3">
        <p class="py-4" :class="darkMode ? 'darkText' : ''">
          You have successfully purchased
          {{ selectedCreatorDropAsset?.contentType }} from
          {{ selectedCreator?.Drop?.creator?.displayName }}.
        </p>
      </div>
      <div class="email-container">
        <p class="py-4" :class="darkMode ? 'darkText' : ''">
          Notify me about this reveal.
        </p>
        <div class="sendemail-container">
          <input
            class="input is-normal no-outline"
            type="text"
            placeholder="Your Email"
            v-model="email"
          />
          <button
            class="btn-explore button neg-margin-left"
            @click="sendEmail()"
          >
            Email Me!
          </button>
        </div>
      </div>
    </div>
    <div class="gallery-container">
      <p class="py-4" :class="darkMode ? 'darkText' : ''">Watch in Gallery</p>
      <div class="is-flex is-justify-content-center is-align-items-center">
        <button
          class="btn-explore button"
          @click="navigateRoute('/', 'GO TO HOME', '')"
        >
          Home
        </button>
        <button
          class="btn-explore button"
          @click="navigateRoute('/gallery', 'VIEW IN GALLERY', '')"
        >
          View in Gallery
        </button>
        <button
          class="btn-explore button"
          @click="
            navigateRoute(
              `/creators/${selectedCreator?.Drop?.creatorId}/drops/${selectedCreator?.Drop?.creatorDropId}`,
              'RETURN TO DROP',
              selectedCreator
            )
          "
        >
          Return to Drop
        </button>
        <!-- <router-link :to="'/'" class="btn-explore button"> Home </router-link>
        <router-link
          :to="`/creators/${selectedCreator?.Drop?.creatorId}/drops/${selectedCreator?.Drop?.creatorDropId}`"
          class="btn-explore button"
        >
          Return to Drop
        </router-link>
        <router-link :to="'/gallery'" class="btn-explore button">
          View in Gallery
        </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import payImg from "../assets/pay-img.png";
import eth from "../assets/eth.png";

// import ToolTip from "@/components/ToolTip";

import { useStore } from "vuex";
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  data: () => {
    return {
      payImg,
      collection: {
        eth,
        price: "0.549 ETH",
        dollar: "($2,233.90)",
        title: "Nanoe",
        description: "Mystery Drop 1 out of XX",
        buttonText: "Buy for 4.5 ETH",
      },
    };
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const darkMode = computed(() => store.state.darkMode);
    const modalActive = computed(() => store.state.modalActive);
    const selectedCreator = computed(() => store.state.selectedCreator);
    const selectedCreatorDropAsset = computed(
      () => store.state.selectedCreatorDropAsset
    );
    const pay = ref(false);
    const email = ref(null);
    const closeModalHandler = () => {
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
    };
    console.log(selectedCreator.value);
    const payModalHandler = () => {
      pay.value = !pay.value;
    };
    const sendEmail = () => {
      // console.log(email.value);
      store.dispatch("trackingEvents", {
        event: "FORM_SUBMISSION_PAYMENT_CONFIRMATION",
        data: {
          email: email.value,
          selectedCreatorDropAsset: selectedCreatorDropAsset.value,
          selectedCreator: selectedCreator.value,
        },
      });
      alert("Email Sent");
      email.value = null;
    };
    const navigateRoute = (routeUrl, trackEvent, trackData) => {
      store.dispatch("trackingEvents", {
        event: trackEvent,
        data: trackData,
      });
      store.dispatch("toggleModal", {
        modalActive: false,
        modalActiveContent: "",
      });
      router.push(routeUrl);
    };
    return {
      darkMode,
      modalActive,
      closeModalHandler,
      pay,
      payModalHandler,
      selectedCreatorDropAsset,
      selectedCreator,
      email,
      sendEmail,
      navigateRoute,
    };
  },
};
</script>

<style lang="scss" scoped>
.cardImg-container {
  padding: 50px;
}
.cardImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
}
.avatar-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.small-container {
  display: flex;
  justify-content: flex-start;
}
.avatarImg-container {
  width: 150px;
  height: 150px;
}

.smallImg-container {
  width: 103px;
  height: 103px;
}

.avatar {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.avatar-desc {
  padding-left: 30px;
}
.info-container {
  padding: 50px;
}
.description {
  border-bottom: 1px solid black;
}
.coin-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.price {
  font-weight: bolder;
}
.button-container {
  width: 100%;
  max-width: 400px;
}
.btn-explore {
  background: #007de7;
  border-radius: 10px;
  border: none;
  color: #fff;
  padding: 10px 20px;
}
.bordered-top {
  border-top: 2px solid #f5f5f5;
}
.is-border-bottom {
  border-bottom: 2px solid #f1f0f1;
}
.title-container {
  padding: 30px;
}
.details-container {
  padding: 20px;
}
.small {
  width: 16px;
  height: 24px;
}
.content p:not(:last-child) {
  margin-bottom: 0px;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.payImg-container {
  width: 204px;
  height: 200px;
  margin: 0 auto;
  padding-top: 20px;
}
.payImg-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.sendemail-container {
  display: flex;
}
.message {
  background: #fff;
}
.no-outline {
  outline: none;
  border: none;
  background: black;
  color: #fff;
}
.neg-margin-left {
  margin-left: -20px;
}
.no-outline ::placeholder {
  color: #fff;
  opacity: 1;
}
.radio-container {
  display: flex;
}
.radio-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.radio-img {
  width: 50px;
  height: 50px;
}
.dark-popper {
  --popper-theme-background-color: #333333;
  --popper-theme-background-color-hover: #333333;
  --popper-theme-text-color: white;
  --popper-theme-border-width: 0px;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 12px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}

.light-popper {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 12px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>