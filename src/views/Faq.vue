<template>
  <div class="creators">
    <div class="title-section">
      <h1 class="title is-left" :class="darkMode ? 'darkText' : ''">FAQ</h1>
      <p class="subtitle is-left pt-3" :class="darkMode ? 'darkText' : ''">
        Have Any Questions?
      </p>
    </div>
    <section>
      <div class="row-accordion">
        <div class="col-accordion columns is-gapless">
          <div class="tabs-accordion column is-two-thirds contact">
            <div class="tab-accordion">
              <input type="radio" id="rd1" name="rd">
              <label class="tab-accordion-label" for="rd1">Question 1</label>
              <div class="tab-accordion-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
            </div>
            <div class="tab-accordion">
              <input type="radio" id="rd2" name="rd">
              <label class="tab-accordion-label" for="rd2">Question 2</label>
              <div class="tab-accordion-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
            </div>
            <div class="tab-accordion">
              <input type="radio" id="rd3" name="rd">
              <label class="tab-accordion-label" for="rd3">Question 3</label>
              <div class="tab-accordion-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
            </div>
            <div class="tab-accordion">
              <input type="radio" id="rd4" name="rd">
              <label class="tab-accordion-label" for="rd4">Question 4</label>
              <div class="tab-accordion-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
            </div>
            <div class="tab-accordion">
              <input type="radio" id="rd5" name="rd">
              <label class="tab-accordion-label" for="rd5">Question 5</label>
              <div class="tab-accordion-content">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";

export default {
  name: "Faq",
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
  components() {
  },
  setup() {
    const store = useStore();
    const darkMode = computed(() => store.state.darkMode);
    return {
      darkMode,
    };
  },
  data: () => {
    return {
    };
  },
  methods: {
  }
  
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

.creators {
  max-width: 1000px;
  margin: 0 auto;
}

.is-left {
    text-align: left;
}
h1 {
  margin: 0;
  line-height: 2;
  text-align: center;
}
h2 {
  margin: 0 0 .5em;
  font-weight: normal;
}
input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
.row-accordion {
  display:flex;
  
}
.row-accordion.col-accordion {
  flex:1;
}
.row-accordion.col-accordion:last-child {
  margin-left: 1em;
}
.tabs-accordion {
  overflow: hidden;
}
.tab-accordion {
  color: white;
  overflow: hidden;
  margin-top: 15px;
  margin-bottom: 20px;
}
.tab-accordion-label {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  background: #2D2E36;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
}
.tab-accordion-content {
  max-height: 0;
  padding: 0 1em;
  color: #2D2E36;
  background: white;
  transition: all .15s;
}
.tab-accordion-label::after {
  content: "\276F";
  width: 1em;
  height: 1em;
  text-align: center;
  transition: all .35s;
}
input:checked+ .tab-accordion-label {
  background: darken(#2c3e50, 10%);
}
input:checked+ .tab-accordion-content::after {
  transform: rotate(90deg);
}
input:checked~ .tab-accordion-content {
  max-height: 100vh;
  padding: 1em;
}

</style>
