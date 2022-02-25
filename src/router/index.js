import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/Home.vue";
import Explore from "../views/Explore.vue";
import Item from "../views/Item.vue";
import Creators from "../views/Creators.vue";
import Profile from "../views/Profile.vue";
import Detail from "../views/Detail.vue";
import Gallery from "../views/Gallery.vue";
import Payment from "../views/Payment.vue";
import HowItWorks from "../views/HowItWorks.vue";
import Faq from "../views/Faq.vue";
import ContactUs from "../views/ContactUs.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import TermsOfService from "../views/TermsOfService.vue";
import AssetDetails from "../views/AssetDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/explore",
    name: "Explore",
    component: Explore,
    // component: () => import("@/views/Explore"),
  },
  {
    path: "/creators/:creatorId/drops/:dropId",
    name: "Item",
    // component: () => import("@/views/Item"),
    component: Item,
  },
  {
    path: "/creators/:creatorId/drops/:dropId/assets/:assetId",
    name: "AssetDetails",
    component: AssetDetails,

    // component: () => import("@/views/Creators"),
  },
  {
    path: "/creators",
    name: "Creators",
    component: Creators,

    // component: () => import("@/views/Creators"),
  },
  {
    path: "/creators/:slug",
    name: "Profile",
    component: Profile,

    // component: () => import("@/views/Profile"),
  },
  {
    path: "/gallery/:id",
    name: "Detail",
    component: Detail,

    // component: () => import("@/views/Detail"),
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,

    // component: () => import("@/views/Gallery"),
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,

    // component: () => import("@/views/Payment"),
  },
  {
    path: "/how-it-works",
    name: "HowItWorks",
    component: HowItWorks,

    // component: () => import("@/views/HowItWorks"),
  },
  {
    path: "/faq",
    name: "Faq",
    component: Faq,

    // component: () => import("@/views/Faq"),
  },
  {
    path: "/contact-us",
    name: "ContactUs",
    component: ContactUs,

    // component: () => import("@/views/ContactUs"),
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,

    // component: () => import("@/views/PrivacyPolicy"),
  },
  {
    path: "/terms-of-service",
    name: "TermsOfService",
    component: TermsOfService,

    // component: () => import("@/views/TermsOfService"),
  },
];
// console.log("BASE URL new", process.env.BASE_URL);
// console.log("NODE ENV", process.env.NODE_ENV);
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
