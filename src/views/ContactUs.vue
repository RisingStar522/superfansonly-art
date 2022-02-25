<template>
  <div class="columns is-gapless">
    <div class="column is-two-thirds contact">
      <div class="title-section">
        <h1 class="title-contact" :class="darkMode ? 'darkText' : ''">
          Contact Us
        </h1>
        <p class="subtitle-contact pt-3" :class="darkMode ? 'darkText' : ''">
          SuperFansOnly.art is the first & largest
        </p>
        <p class="subtitle-contact" :class="darkMode ? 'darkText' : ''">
          NFT store for NSFW content
        </p>
      </div>
      <form class="field"  @submit.prevent="onSubmit">
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input is-static"
                :class="darkMode ? 'darkText' : ''"
                type="text"
                value="Name"
                readonly
              />
            </p>
          </div>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                id="name"
                class="input"
                v-model="state.name"
                :class="darkMode ? 'lightText' : 'darkText dark'"
                type="text"
                placeholder="Enter Your Name"
                required
              />
              <span 
                v-if="v$.name.$error"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                {{ v$.name.$errors[0].$message }}
              </span>
            </p>
          </div>
        </div>

        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input is-static"
                :class="darkMode ? 'darkText dark' : ''"
                type="text"
                value="Email"
                readonly
              />
            </p>
          </div>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                id="email"
                class="input"
                v-model="state.email"
                :class="darkMode ? 'lightText' : 'darkText dark'"
                type="email"
                placeholder="Enter Your Email"
                required
              />
              <span 
                v-if="v$.email.$error"
                :class="darkMode ? 'darkText' : 'lightText'"
              >
                {{ v$.email.$errors[0].$message }}
              </span>
            </p>
          </div>
        </div>

        <div class="field-body">
          <div class="field">
            <p class="control">
              <input
                class="input is-static"
                :class="darkMode ? 'darkText' : ''"
                type="text"
                value="Subject"
                readonly
              />
            </p>
          </div>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <textarea
                id="textarea"
                class="textarea"
                v-model="state.textarea"
                :class="darkMode ? 'lightText' : 'darkText dark'"
                placeholder="Enter Your Message"
                required
              ></textarea>
            </p>
          </div>
        </div>
        <a class="button btn-submit" @click="onSubmit">
          <strong>Submit</strong>
        </a>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, reactive } from "@vue/reactivity";
import useValidate from "@vuelidate/core";
import { required, email, maxLength } from '@vuelidate/validators'

export default {
  name: "contact-us",
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
    const darkMode = computed(() => store.state?.darkMode);
    const state = reactive({
      name: '',
      email: '',
      textarea: ''
    });
    const rules = computed(() => {
      return {
        email: { required, email },
        name: { required },
        textarea: { required, maxLength: maxLength(1000) },
      };
    });
    const v$ = useValidate(rules, state)
    return {
      darkMode,
      state, 
      v$
    };
  },
  data: () => {
  },
  components: { },
  methods: {
    onSubmit() {
      console.log(this.v$)
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) { // if ANY fail validation
        alert('Form successfully submitted.')
      } else {
        alert('Form failed validation')
      }
      console.log(this.name + this.email + this.textarea);
    }
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
input.is-static {
  font-weight: bold;
}
.dark {
  border-radius: 6px;
  font-size: 0.875rem;
}
.btn-submit {
  background-color: #007de7 !important;
  border-radius: 6px !important;
  border: none !important;
  color: #fff !important;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  float: left;
}
</style>
