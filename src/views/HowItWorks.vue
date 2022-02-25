<template>
  <div class="how">
    <div class="title-section">
      <h1 class="title-contact" :class="darkMode ? 'darkText' : ''">How It Works</h1>
      <p class="subtitle-contact pt-3" :class="darkMode ? 'darkText' : ''">
        SuperFansOnly.art is the first & largest
      </p>
      <p class="subtitle-contact" :class="darkMode ? 'darkText' : ''">
        NFT store for NSFW content
      </p>
    </div>
    <section class="home-section">
      <div class="columns is-vcentered is-multiline">
        <div
          class="column is-12-mobile is-4-desktop"
          v-for="(item, index) in collections"
          :key="index"
        >
          <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                </figure>
              </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-6 mb-3">Method {{item.id}}</p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. 
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="py-4 px-6" :class="darkMode ? 'darkText' : ''">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
      <p class="py-4 px-6" :class="darkMode ? 'darkText' : ''">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </p>
    </section>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  name: "HowItWorks",
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
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
  data: function () {
    return {
      collections: [
        {
          id: 1,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 2,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        },
        {
          id: 3,
          title: "Nanoe",
          description: "Mystery Drop 1 out of XX",
        }
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import 'bulma/sass/utilities/mixins.sass';

@include tablet {
  .title-section {
    padding-bottom: 50px !important;
    padding-top: 50px !important;
  }
}

.title-section {
  padding-bottom: 20px;
  padding-top: 10px;
}
.how {
  max-width: 1000px;
  margin: 0 auto;
}

.title-contact {
  font-family: 'Gilroy', sans-serif !important;
  font-style: normal;
  font-weight: 800;
  text-align: left;
  font-size: 2rem;
}
.subtitle-contact {
  font-family: 'Montserrat', sans-serif !important;
  font-style: normal;
  text-align: left;
  font-size: 0.875rem;
  font-weight: bold;
  line-height: 105.7%;
}
.card-content {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 5px;
  padding-right: 5px;
}

</style>
