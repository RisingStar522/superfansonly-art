<template>
  <div class="switch:check">
    <input
      type="checkbox"
      ref="switchRef"
      class="check-input"
      title="Dark Mode"
      @change="switchEvent"
    />
  </div>
</template>

<script>
import { defineComponent, ref, nextTick } from "vue";

export default defineComponent({
  name: "DarkMode",
  setup() {
    const switchRef = ref(null);
    const darkMode = ref(false);
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark").matches
    ) {
      nextTick(() => {
        switchRef.value.checked = true;
        switchToggle();
      });
    }

    const darkAttrs = () => {
      // console.log("testing", darkMode.value);

      if (darkMode.value) {
        // console.log("chk");
        document.documentElement.setAttribute("data-mode", "dark");
        document.body.classList.add("darker");
      } else {
        document.documentElement.removeAttribute("dark-mode");
      }
    };
    const switchToggle = () => {
      if (switchRef.value.checked) {
        darkMode.value = true;
        darkAttrs();
      } else {
        darkMode.value = false;
        darkAttrs();
      }
    };
    const switchEvent = () => {
      nextTick(() => {
        switchToggle();
      });
    };

    return {
      switchRef,
      switchEvent,
    };
  },
});
</script>
