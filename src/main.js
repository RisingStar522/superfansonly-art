import { createApp } from "vue";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import App from "./App.vue";
import router from "./router";
import FeatureFlipping from "vue-feature-flipping";
import { setEnabledFeatures } from "vue-feature-flipping";
// import VueCarousel from "vue-carousel";
import Countdown from "vue3-flip-countdown";
import VueSplide from "@splidejs/vue-splide";
// import VueMobileDetection from "vue-mobile-detection";

import store from "./store";
import "@/assets/scss/main.scss";

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://9cc82bd3b56b4bf3aeca1e846c6daf2e@o1100654.ingest.sentry.io/6125969",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

app
  .use(router)
  .use(store)
  .use(VueSplide)
  .use(FeatureFlipping)
  .use(Countdown)
  // .use(VueMobileDetection)
  .mount("#app");

setEnabledFeatures([process.env.VUE_APP_VUE_FEATURE_INCLUDES]);
