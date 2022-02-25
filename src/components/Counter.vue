<template>
  <div
    v-if="loaded"
    class="is-flex is-justify-content-center is-align-items-center"
  >
    <p
      v-show="showDay"
      class="is-size-4"
      :class="!darkMode ? 'has-text-info' : 'has-text-warning'"
    >
      {{ displayDays }}
    </p>
    <span
      v-show="showDay"
      class="px-1"
      :class="!darkMode ? 'has-text-dark' : 'has-text-light'"
      >:</span
    >
    <p
      v-show="showHour"
      class="is-size-4"
      :class="!darkMode ? 'has-text-info' : 'has-text-warning'"
    >
      {{ displayHours }}
    </p>
    <span
      class="px-1"
      v-show="showHour"
      :class="!darkMode ? 'has-text-dark' : 'has-text-light'"
      >:</span
    >
    <p
      class="is-size-4"
      :class="!darkMode ? 'has-text-info' : 'has-text-warning'"
    >
      {{ displayMinutes }}
    </p>
    <span class="px-1" :class="!darkMode ? 'has-text-dark' : 'has-text-light'"
      >:</span
    >
    <p
      class="is-size-4"
      :class="!darkMode ? 'has-text-info' : 'has-text-warning'"
    >
      {{ displaySeconds }}
    </p>
  </div>
</template>

<script>
// import moment from "moment";

import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
  name: "counter",
  props: ["deadlineISO", "showDay", "showHour", "stop"],
  data: () => ({
    displayDays: 0,
    displayHours: 0,
    displayMinutes: 0,
    displaySeconds: 0,
    loaded: false,
    expired: false,
  }),
  computed: {
    _seconds: () => 1000,
    _minutes() {
      return this._seconds * 60;
    },
    _hours() {
      return this._minutes * 60;
    },
    _days() {
      return this._hours * 24;
    },
    end() {
      return new Date(
        this.year,
        this.month,
        this.date,
        this.hour,
        this.minute,
        this.second,
        this.millisecond
      );
    },
  },
  mounted() {
    this.showRemaining();
  },
  methods: {
    formatNum: (num) => (num < 10 ? "0" + num : num),
    showRemaining() {
      const timer = setInterval(() => {
        const now = new Date();
        const distance = new Date(this.deadlineISO).getTime() - now.getTime();
        if (distance < 0) {
          clearInterval(timer);
          this.expired = true;
          return;
        }
        if (this.stop) {
          clearInterval(timer);
          this.expired = true;
          return;
        }
        const days = Math.floor(distance / this._days);
        const hours = Math.floor((distance % this._days) / this._hours);
        const minutes = Math.floor((distance % this._hours) / this._minutes);
        const seconds = Math.floor((distance % this._minutes) / this._seconds);
        this.displayMinutes = this.formatNum(minutes);
        this.displaySeconds = this.formatNum(seconds);
        this.displayHours = this.formatNum(hours);
        this.displayDays = this.formatNum(days);
        this.loaded = true;
      }, 1000);
    },
  },

  setup() {
    const store = useStore();

    return {
      darkMode: computed(() => store.state?.darkMode),
    };
  },
};
</script>

<style lang="scss" scoped>
.content p:not(:last-child) {
  margin-bottom: 0px;
}
</style>