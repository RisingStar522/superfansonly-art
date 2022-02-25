<template>
  <div>
    <section class="hero home-hero">
      <figure class="image inverted">
        <img :src="FindImageUrl(profile?.images, 'BANNER')" />
      </figure>
    </section>
    <div class="profile-main columns is-mobile is-multiline">
      <div class="column is-12">
        <div class="columns is-mobile is-vcentered is-justify-content-center">
          <div class="column profile-img-container is-3">
            <figure class="image is-1by1">
              <img
                class="is-rounded"
                :src="FindImageUrl(profile?.images, 'AVATAR')"
              />
            </figure>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="profile">
          <h1 class="is-size-3 title pb-1" :class="darkMode ? 'darkText' : ''">
            {{ profile?.displayName }}
          </h1>

          <div class="is-flex is-justify-content-center mt-1">
            <a
              v-for="social in this.profile.socialMedia"
              :key="social"
              :url="social.userId"
              class="mx-1"
              :href="social.userId"
              target="_blank"
            >
              <svg
                v-if="social.socialNetwork == 'OnlyFans'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
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
                  :fill="darkMode ? '#FFFFFF' : '#000000'"
                  class="st0"
                  d="M46.1,0C20.6,0,0,20.7,0,46.3s20.7,46.2,46.3,46.1c25.5,0,46.1-20.7,46.1-46.2C92.4,20.7,71.7,0,46.1,0
                    C46.2,0,46.2,0,46.1,0z M46.1,87.6C23.2,87.5,4.7,68.9,4.8,46.1S23.4,4.8,46.3,4.8c22.8,0.1,41.3,18.6,41.3,41.4
                    c0,22.9-18.5,41.4-41.4,41.4C46.2,87.6,46.1,87.6,46.1,87.6L46.1,87.6z"
                />
                <path
                  :fill="darkMode ? '#FFFFFF' : '#000000'"
                  class="st1"
                  d="M65,42.4v-3.8c0-4.5-1.8-8.8-5.1-12c-3.2-3.2-7.6-5-12.2-5h-3.1c-4.6,0-8.9,1.8-12.2,5c-3.2,3.1-5.1,7.5-5.1,12
                    v3.8l-2.1,3.8v5.6c0,5,2,9.8,5.6,13.3c3.6,3.6,8.5,5.5,13.6,5.5h3.5c5.1,0,9.9-2,13.5-5.5c3.6-3.5,5.6-8.3,5.6-13.3v-5.6L65,42.4z
                    M48.2,59.5V64l0,0c0,0.7-0.3,1.3-0.9,1.6h-2c-0.6-0.4-0.9-1-0.9-1.7v-4.5c-2.7-1.1-4.1-4.1-3-6.9c0.8-2,2.8-3.4,4.9-3.4h0.3
                    c2.9,0,5.3,2.3,5.3,5.3c0,2.2-1.3,4.2-3.4,5H48.2z M57.3,42.6H35.1v-3.9c0-2.5,1-4.9,2.8-6.7c1.8-1.8,4.2-2.8,6.7-2.8h3.1
                    c2.5,0,4.9,1,6.7,2.8c1.8,1.7,2.8,4.1,2.8,6.6L57.3,42.6z"
                />
              </svg>
              <svg
                v-if="social.socialNetwork == 'Telegram'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
              >
                <path
                  d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"
                />
              </svg>
              <svg
                v-if="social.socialNetwork == 'Instagram'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
              >
                <path
                  d="M 29 3 C 28.0625 3 27.164063 3.382813 26.5 4 C 25.835938 4.617188 25.363281 5.433594 25 6.40625 C 24.355469 8.140625 24.085938 10.394531 24.03125 13.03125 C 19.234375 13.179688 14.820313 14.421875 11.28125 16.46875 C 10.214844 15.46875 8.855469 14.96875 7.5 14.96875 C 6.089844 14.96875 4.675781 15.511719 3.59375 16.59375 C 1.425781 18.761719 1.425781 22.238281 3.59375 24.40625 L 3.84375 24.65625 C 3.3125 26.035156 3 27.488281 3 29 C 3 33.527344 5.566406 37.585938 9.5625 40.4375 C 13.558594 43.289063 19.007813 45 25 45 C 30.992188 45 36.441406 43.289063 40.4375 40.4375 C 44.433594 37.585938 47 33.527344 47 29 C 47 27.488281 46.6875 26.035156 46.15625 24.65625 L 46.40625 24.40625 C 48.574219 22.238281 48.574219 18.761719 46.40625 16.59375 C 45.324219 15.511719 43.910156 14.96875 42.5 14.96875 C 41.144531 14.96875 39.785156 15.46875 38.71875 16.46875 C 35.195313 14.433594 30.800781 13.191406 26.03125 13.03125 C 26.09375 10.546875 26.363281 8.46875 26.875 7.09375 C 27.164063 6.316406 27.527344 5.757813 27.875 5.4375 C 28.222656 5.117188 28.539063 5 29 5 C 29.460938 5 29.683594 5.125 30.03125 5.40625 C 30.378906 5.6875 30.785156 6.148438 31.3125 6.6875 C 32.253906 7.652344 33.695313 8.714844 36.09375 8.9375 C 36.539063 11.238281 38.574219 13 41 13 C 43.75 13 46 10.75 46 8 C 46 5.25 43.75 3 41 3 C 38.605469 3 36.574219 4.710938 36.09375 6.96875 C 34.3125 6.796875 33.527344 6.109375 32.75 5.3125 C 32.300781 4.851563 31.886719 4.3125 31.3125 3.84375 C 30.738281 3.375 29.9375 3 29 3 Z M 41 5 C 42.667969 5 44 6.332031 44 8 C 44 9.667969 42.667969 11 41 11 C 39.332031 11 38 9.667969 38 8 C 38 6.332031 39.332031 5 41 5 Z M 25 15 C 30.609375 15 35.675781 16.613281 39.28125 19.1875 C 42.886719 21.761719 45 25.226563 45 29 C 45 32.773438 42.886719 36.238281 39.28125 38.8125 C 35.675781 41.386719 30.609375 43 25 43 C 19.390625 43 14.324219 41.386719 10.71875 38.8125 C 7.113281 36.238281 5 32.773438 5 29 C 5 25.226563 7.113281 21.761719 10.71875 19.1875 C 14.324219 16.613281 19.390625 15 25 15 Z M 7.5 16.9375 C 8.203125 16.9375 8.914063 17.148438 9.53125 17.59375 C 7.527344 19.03125 5.886719 20.769531 4.75 22.71875 C 3.582031 21.296875 3.660156 19.339844 5 18 C 5.714844 17.285156 6.609375 16.9375 7.5 16.9375 Z M 42.5 16.9375 C 43.390625 16.9375 44.285156 17.285156 45 18 C 46.339844 19.339844 46.417969 21.296875 45.25 22.71875 C 44.113281 20.769531 42.472656 19.03125 40.46875 17.59375 C 41.085938 17.148438 41.796875 16.9375 42.5 16.9375 Z M 17 22 C 14.800781 22 13 23.800781 13 26 C 13 28.199219 14.800781 30 17 30 C 19.199219 30 21 28.199219 21 26 C 21 23.800781 19.199219 22 17 22 Z M 33 22 C 30.800781 22 29 23.800781 29 26 C 29 28.199219 30.800781 30 33 30 C 35.199219 30 37 28.199219 37 26 C 37 23.800781 35.199219 22 33 22 Z M 17 24 C 18.117188 24 19 24.882813 19 26 C 19 27.117188 18.117188 28 17 28 C 15.882813 28 15 27.117188 15 26 C 15 24.882813 15.882813 24 17 24 Z M 33 24 C 34.117188 24 35 24.882813 35 26 C 35 27.117188 34.117188 28 33 28 C 31.882813 28 31 27.117188 31 26 C 31 24.882813 31.882813 24 33 24 Z M 34.15625 33.84375 C 34.101563 33.851563 34.050781 33.859375 34 33.875 C 33.683594 33.9375 33.417969 34.144531 33.28125 34.4375 C 33.28125 34.4375 32.757813 35.164063 31.4375 36 C 30.117188 36.835938 28.058594 37.6875 25 37.6875 C 21.941406 37.6875 19.882813 36.835938 18.5625 36 C 17.242188 35.164063 16.71875 34.4375 16.71875 34.4375 C 16.492188 34.082031 16.066406 33.90625 15.65625 34 C 15.332031 34.082031 15.070313 34.316406 14.957031 34.632813 C 14.84375 34.945313 14.894531 35.292969 15.09375 35.5625 C 15.09375 35.5625 15.863281 36.671875 17.46875 37.6875 C 19.074219 38.703125 21.558594 39.6875 25 39.6875 C 28.441406 39.6875 30.925781 38.703125 32.53125 37.6875 C 34.136719 36.671875 34.90625 35.5625 34.90625 35.5625 C 35.207031 35.273438 35.296875 34.824219 35.128906 34.441406 C 34.960938 34.058594 34.574219 33.820313 34.15625 33.84375 Z"
                />
              </svg>
              <svg
                v-if="social.socialNetwork == 'Reddit'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
              >
                <path
                  d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"
                />
              </svg>
              <svg
                v-if="social.socialNetwork == 'Twitter'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
              >
                <path
                  d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"
                />
              </svg>
              <svg
                v-if="social.socialNetwork == 'Facebook'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="25px"
                height="25px"
              >
                <path
                  d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"
                />
              </svg>
              <svg
                v-if="social.socialNetwork == 'TikTok'"
                :fill="darkMode ? '#FFFFFF' : '#000000'"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="25px"
                height="25px"
              >
                <path
                  d="M 9 4 C 6.2495759 4 4 6.2495759 4 9 L 4 41 C 4 43.750424 6.2495759 46 9 46 L 41 46 C 43.750424 46 46 43.750424 46 41 L 46 9 C 46 6.2495759 43.750424 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.671576 6 44 7.3284241 44 9 L 44 41 C 44 42.671576 42.671576 44 41 44 L 9 44 C 7.3284241 44 6 42.671576 6 41 L 6 9 C 6 7.3284241 7.3284241 6 9 6 z M 26.042969 10 A 1.0001 1.0001 0 0 0 25.042969 10.998047 C 25.042969 10.998047 25.031984 15.873262 25.021484 20.759766 C 25.016184 23.203017 25.009799 25.64879 25.005859 27.490234 C 25.001922 29.331679 25 30.496833 25 30.59375 C 25 32.409009 23.351421 33.892578 21.472656 33.892578 C 19.608867 33.892578 18.121094 32.402853 18.121094 30.539062 C 18.121094 28.675273 19.608867 27.1875 21.472656 27.1875 C 21.535796 27.1875 21.663054 27.208245 21.880859 27.234375 A 1.0001 1.0001 0 0 0 23 26.240234 L 23 22.039062 A 1.0001 1.0001 0 0 0 22.0625 21.041016 C 21.906673 21.031216 21.710581 21.011719 21.472656 21.011719 C 16.223131 21.011719 11.945313 25.289537 11.945312 30.539062 C 11.945312 35.788589 16.223131 40.066406 21.472656 40.066406 C 26.72204 40.066409 31 35.788588 31 30.539062 L 31 21.490234 C 32.454611 22.653646 34.267517 23.390625 36.269531 23.390625 C 36.542588 23.390625 36.802305 23.374442 37.050781 23.351562 A 1.0001 1.0001 0 0 0 37.958984 22.355469 L 37.958984 17.685547 A 1.0001 1.0001 0 0 0 37.03125 16.6875 C 33.886609 16.461891 31.379838 14.012216 31.052734 10.896484 A 1.0001 1.0001 0 0 0 30.058594 10 L 26.042969 10 z M 27.041016 12 L 29.322266 12 C 30.049047 15.2987 32.626734 17.814404 35.958984 18.445312 L 35.958984 21.310547 C 33.820114 21.201935 31.941489 20.134948 30.835938 18.453125 A 1.0001 1.0001 0 0 0 29 19.003906 L 29 30.539062 C 29 34.707538 25.641273 38.066406 21.472656 38.066406 C 17.304181 38.066406 13.945312 34.707538 13.945312 30.539062 C 13.945312 26.538539 17.066083 23.363182 21 23.107422 L 21 25.283203 C 18.286416 25.535721 16.121094 27.762246 16.121094 30.539062 C 16.121094 33.483274 18.528445 35.892578 21.472656 35.892578 C 24.401892 35.892578 27 33.586491 27 30.59375 C 27 30.64267 27.001859 29.335571 27.005859 27.494141 C 27.009759 25.65271 27.016224 23.20692 27.021484 20.763672 C 27.030884 16.376775 27.039186 12.849206 27.041016 12 z"
                />
              </svg>
            </a>
          </div>
          <p class="is-size-5 mt-5" :class="darkMode ? 'darkText' : ''">
            {{ profile?.description }}
          </p>
          <div class="column is-full is-right" v-if="creatorDrops.length > 0">
            <DropDown />
          </div>
        </div>
      </div>
      <section class="column is-12 home-section">
        <!-- <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">Notable</h1> -->
        <div class="columns is-multiline is-vcentered is-mobile">
          <div
            class="column is-6-mobile"
            v-for="(item, index) in creatorDrops"
            :key="index"
          >
            <Card
              :cardImg="FindImageUrl(item?.images, 'BANNER')"
              :avatarImg="FindImageUrl(item?.images, 'PROMO')"
              :title="item?.name"
              :description="item?.crowdSale?.status"
              :buttonText="`Explore`"
              :routeUrl="`#`"
              :isDisabled="false"
              :trackData="item"
              :trackEvent="`FLIP CREATOR DROP`"
              :trackExploreEvent="`EXPLORE CREATOR DROP`"
            >
              <div class="is-centered section">
                <p :class="darkMode ? '' : 'darkText dark'">
                  Chain Name:
                  <strong
                    class="break-word"
                    :class="darkMode ? '' : 'darkText dark'"
                    >{{ item?.blockchain?.chainName }}</strong
                  >
                </p>
                <p class="" :class="darkMode ? '' : 'darkText dark'">
                  ChainId:
                  <strong :class="darkMode ? '' : 'darkText dark'">{{
                    item?.blockchain?.chainId
                  }}</strong>
                </p>
                <p class="" :class="darkMode ? ' ' : 'darkText dark'">
                  Token Standard:
                  <strong :class="darkMode ? '' : 'darkText dark'">{{
                    item?.blockchain?.tokenStandard
                  }}</strong>
                </p>
                <p class="" :class="darkMode ? ' ' : 'darkText dark'">
                  Contract Address:
                  <strong :class="darkMode ? '' : 'darkText dark'">{{
                    item?.blockchain?.contractAddress
                  }}</strong>
                </p>
              </div>
            </Card>
          </div>
        </div>
        <div class="mt-5">
          <button
            class="button-load mt-5"
            @click="loadMore()"
            v-if="creatorDrops.length > 0"
          >
            Load more
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import DropDown from "@/components/DropDown";
import avatarImg from "../assets/avatar-img.png";
import cardImg from "../assets/card-img.png";
import heroProfileImg from "../assets/hero-profile.png";
import bannerImg from "../assets/banner-img.png";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
export default {
  name: "Home",
  mounted() {
    const store = useStore();
    store.dispatch("trackingPages", {
      protocol: window && window.location ? window.location.protocol : null,
      host: window && window.location ? window.location.host : null,
      port: window && window.location ? window.location.port : null,
      origin: window && window.location ? window.location.origin : null,
      pathname: window && window.location ? window.location.pathname : null,
      url: window && window.location ? window.location.href : null,
    });
    store.dispatch("getCreators");
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const darkMode = computed(() => store.state.darkMode);
    const creatorsLists = computed(() => store.state.creatorsLists);
    const creatorDrops = computed(() => store.state.creatorDrops);
    const FindImageUrl = (arrayLists, key) =>
      arrayLists.find((item) => item.type === key)?.url;
    // console.log(selectedCreator.value);
    watch(creatorsLists, (curr) => {
      // console.log(curr, prev);
      if (curr.length > 0) {
        const creator = curr?.find((item) => item.slug === route.params.slug);
        // console.log(creator);
        store.dispatch("getCreatorDrops", {
          status: "PENDING",
          creatorId: creator?._id,
        });
        //enum: ["PENDING", "ONGOING", "SOLD OUT", "ENDED"]
      }
    });

    const loadMore = () => {
      store.dispatch("trackingEvents", {
        event: "LOAD MORE CREATOR DROPS",
        data: {},
      });
    };

    return {
      darkMode,
      loadMore,
      // selectedCreator,
      creatorDrops,
      FindImageUrl,
    };
  },
  components: { Card, DropDown },
  computed: {
    profile() {
      const slug = this.$route.params.slug;
      return this.$store.state.creatorsLists.find(function (c) {
        return c.slug === slug;
      });
    },
  },
  data: function () {
    return {
      social: {},
      bannerImg,
      heroProfileImg,
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
      ],
    };
  },
};
</script>

<style scoped>
.is-full {
  width: 100%;
}
.profile-main {
  margin-top: -15%;
}
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home-hero {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}
.profile-img-container img {
  border: 3px solid white;
}
.is-right {
  text-align: right;
}
.is-left {
  text-align: left;
}
.card {
  background-color: black !important;
  border-radius: 1.25rem !important;
  height: 240px;
}

.card--reverse-order {
  flex-direction: row-reverse;
}

.is-horizontal {
  display: flex;
  flex-basis: 50ex;
  flex-grow: 0;
  flex-shrink: 1;
}

.media-left {
  padding-top: 30px;
  margin-right: 15rem;
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
</style>
