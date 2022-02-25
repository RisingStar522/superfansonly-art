<template >
  <div>
    <div class="app" :class="darkMode ? 'dark' : ''">
      <div class="container-header">
        <Navbar />
      </div>
    </div>
    <div class="app" :class="darkMode ? 'dark' : ''">
      <div class="container is-max-desktop container-main">
        <router-view />
      </div>
    </div>
    <div class="app" :class="darkMode ? 'dark' : ''">
      <div class="container is-max-widescreen container-footer">
        <Footer />
      </div>
    </div>
    <div class="app" :class="darkMode ? 'dark' : ''">
      <div class="container is-max-widescreen container-social">
        <FooterSocial />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "bulma/sass/utilities/mixins.sass";

@media screen and (max-width: 1023px) {
  .container-header {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}

@media screen and (max-width: 1023px) {
  .container-header {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
}

@include mobile {
  .container-main {
    padding: 0 1rem 4rem;
  }
  html {
    font-size: 12px !important;
  }
}
.app {
  border-bottom-width: 1px !important;
  border-bottom-style: solid;
  border-bottom-color: #E3E1E3 ;
  padding-top: 1px;
  padding-bottom: 2px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container-main {
  padding: 0 1rem 80px;
}
.container-social {
  padding-bottom: 20px;
}
.dark {
  background: #24252d !important;
}
.darkText {
  color: #fff !important;
  border-bottom-color: #000 !important;
}
.darkText::placeholder {
  color: #fff !important;
}
.lightText {
  color: #000 !important;
  border-bottom-color: #fff !important;
}
.lightText::placeholder {
  color: #000 !important;
}
.whiteText {
  background-color: #000 !important;
}
.whiteText::placeholder {
  color: white !important
}
.dark::placeholder {
  color: #fff !important;
}
.light::placeholder {
  color: #000 !important;
}
.navitem:hover {
  background-color: black !important;
  color: white !important;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import * as uccSdk from "ucc-sdk";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterSocial from "@/components/FooterSocial";
import markerSDK from "@marker.io/browser";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

window.addEventListener("DOMContentLoaded", () => {
  console.log(
    uccSdk.track.initialize(
      "New Customer",
      "New Project",
      "api_key",
      "landing_page_id",
      "dev"
    )
  );
});

export default {
  mounted() {
    this.loadMarkerSDK();
  },
  data: () => {
    return {
      widget: null,
      destinationId: "61df2b572ba05e20f16c8606",
    };
  },
  methods: {
    async loadMarkerSDK() {
      // Load widget using the Marker.io SDK
      this.widget = await markerSDK.loadWidget({
        destination: this.destinationId,
      });

      const events = [
        "load",
        "loaderror",
        "beforeunload",
        "show",
        "hide",
        "capture",
        "feedbackbeforesend",
        "feedbacksent",
        "feedbackerror",
        "feedbackdiscarded",
      ];

      for (const eventName of events) {
        this.widget.on(eventName, () => {
          this.eventLog += `Event "${eventName}"\n`;
        });
      }
    },

    unloadMarkerSDK() {
      this.widget.unload();
      this.widget = null;
    },
  },

  computed: {
    loaded() {
      return !!this.widget;
    },
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
  components: { Navbar, Footer, FooterSocial },
};
</script>
