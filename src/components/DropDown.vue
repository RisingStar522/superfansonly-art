<template>
  <div
    class="dropdown is-left"
    @click="toggle()"
    :class="{ 'is-active': clickCard }"
  >
    <div class="dropdown-trigger">
      <button
        class="drop-button is-justify-content-space-between"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>Name A-Z</span>
        <span class="arrow-down">
          <svg
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 330 330"
            style="enable-background: new 0 0 330 330"
            xml:space="preserve"
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
          c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
          s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a href="#" class="dropdown-item is-active">Name A-Z</a>
        <a href="#" class="dropdown-item">Name Z-A</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "DropDown",
  props: {
    cardImg: String,
    avatarImg: String,
    title: String,
    description: String,
    buttonText: String,
    routeUrl: String,
  },
  setup() {
    const clickCard = ref(false);
    const toggle = () => {
      clickCard.value = !clickCard.value;
    };

    
    var dropdown = document.querySelector('.dropdown');
      dropdown.addEventListener('click', function(event) {
        event.stopPropagation();
        // alert('here')
        dropdown.classList.toggle('is-active');
    });
    return {
      clickCard,
      toggle,
    };
  },
};
</script>
<style>
.drop-button {
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  background-color: #1b1a21;
  border: none;
  color: white;
  width: 200px;
}
.arrow-down {
  width: 1rem;
  fill: white;
}
</style>