<template>
  <div class="footer" :class="darkMode ? 'dark' : ''">
    <section class="footer-section">
      <div class="columns">
        <div class="column is-two-fifths">
          <router-link
            class="logo is-flex footer-item mb-4"
            to="/"
            :class="darkMode ? 'darkText' : 'lightText'"
          >
            <img :src="logo" width="75" height="106" class="is-pulled-left" />
          </router-link>
          <p
            class="title is-5 footer-title-p mt-4 pt-4"
            :class="darkMode ? 'darkText' : ''"
          >
            Sign Up and Don't Miss a Drop!
          </p>
          <div class="sendemail-container">
            <!-- :class="darkMode ? 'darkText' : 'whiteText'" -->
            <input
              class="input is-normal no-outline"
              type="textfield"
              placeholder="Your Email"
              v-model="email"
            />
            <button
              class="btn-footer-email button neg-margin-left"
              :class="darkMode ? 'darkText' : ''"
              v-on:click="sendEmail()"
            >
              Email Me!
            </button>
          </div>
        </div>
        <div class="column col-6 is-flex">
          <div class="column col-3">
            <p
              class="title is-5 mb-5 footer-title-p"
              :class="darkMode ? 'darkText' : ''"
            >
              SuperFansOnly
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/explore"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                Explore
              </router-link>
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/creators"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                Our Creators
              </router-link>
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/gallery"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                Gallery
              </router-link>
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/how-it-works"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                How it works
              </router-link>
            </p>
          </div>
          <div class="column col-3">
            <p
              class="title is-5 footer-title-p"
              :class="darkMode ? 'darkText' : ''"
            >
              Support
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/contact-us"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                Contact Us
              </router-link>
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/faq"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                FAQ
              </router-link>
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/terms-of-service"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                Terms of Service
              </router-link>
            </p>
            <p class="footer-title footer-title-p">
              <router-link
                to="/privacy-policy"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                Privacy Policy
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import logo from "../assets/SuperFansOnly_Logo-Black-Background.svg";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  name: "Footer",
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    const VUE_FEATURE_FLIP = process.env.VUE_APP_VUE_FEATURE_VALUE;
    // console.log("checking .env", process.env.VUE_APP_NODE_ENV); // OUTPUT: development

    return {
      darkMode,
      VUE_FEATURE_FLIP,
    };
  },
  data: () => {
    return {
      logo,
      email: null,
    };
  },
  methods: {
    sendEmail() {
      const store = useStore();
      if (this.email === null) {
        alert("Enter Email");
        return;
      }
      store.dispatch("trackingEvents", {
        event: "FORM_SUBMISSION_PAYMENT_CONFIRMATION",
        data: this.email,
      });
      console.log(this.email);
    },
  },
};
</script>

<style lang="scss">
@import "bulma/sass/utilities/mixins.sass";

@include mobile {
  .logo {
    justify-content: center;
  }
}
.footer {
  margin: 0 auto;
  padding-bottom: 20px !important;
  background-color: white !important;
}
.footer-item img {
  justify-content: flex-start;
  justify-content: start;
  justify-content: left;
}
.title {
  clear: both;
}
.footer-title {
  margin-top: 0px;
}
.sendemail-container {
  clear: both;
  max-width: 400px;
  display: flex;
}
.message {
  background: #fff;
}
.no-outline {
  outline: none;
  border: none;
  border-radius: 10px;
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
.btn-footer-email {
  background: #007de7 !important;
  border-radius: 10px !important;
  border: none !important;
  color: #fff !important;
  padding: 10px 20px !important;
}
.footer-title-p {
  text-align: left;
  padding-top: 8px;
  font-size: 1.125rem;
}
</style>
