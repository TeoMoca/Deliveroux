<template>
  <section class="step-wizard">
    <ul class="step-wizard-list">
      <li
        :class="['step-wizard-item', state === 'EP' ? 'current-item' : '']"
        id="1"
      >
        <span class="progress-count"
          ><v-icon v-if="state === 'EP'">mdi-chef-hat</v-icon></span
        >
        <span class="progress-label">En préparation</span>
      </li>
      <li :class="['step-wizard-item', state === 'P' ? 'current-item' : '']">
        <span class="progress-count"
          ><v-icon v-if="state === 'P'">mdi-food</v-icon></span
        >
        <span class="progress-label"
          >Commande préparé, le livreur va la récupérer</span
        >
      </li>
      <li :class="['step-wizard-item', state === 'EC' ? 'current-item' : '']">
        <span class="progress-count"
          ><v-icon v-if="state === 'EC'">mdi-bicycle</v-icon></span
        >
        <span class="progress-label">Le livreur se dirige chez vous</span>
      </li>
      <li :class="['step-wizard-item', state === 'F' ? 'current-item' : '']">
        <span class="progress-count"
          ><v-icon v-if="state === 'F'">mdi-robot-happy</v-icon></span
        >
        <span class="progress-label"
          >Commande livré, il ne vous reste plus qu'à donner votre code au
          livreur</span
        >
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProgressBar",

  components: {},

  props: { msg: String, state: String },

  computed: {},

  methods: {},
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.step-wizard {
  background-color: var(--light-mode-color-four);
  background-image: linear-gradient(
    0deg,
    var(--light-mode-color-four) 10%,
    var(--light-mode-color-five) 90%
  );
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.step-wizard-list {
  background: #fff;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  color: var(--light-mode-color-four);
  list-style-type: none;
  border-radius: 10px;
  display: flex;
  padding: 15px 10px;
  position: relative;
  z-index: 10;
}
.step-wizard-item {
  padding: 0 20px;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 170px;
  position: relative;
}
.step-wizard-item + .step-wizard-item:after {
  content: "";
  position: absolute;
  left: 0;
  top: 19px;
  background: var(--light-mode-color-five);
  width: 100%;
  height: 2px;
  transform: translateX(-50%);
  z-index: -10;
}
.progress-count {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  color: transparent;
}
.progress-count::after {
  content: "";
  height: 40px;
  width: 40px;
  background: var(--light-mode-color-five);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  z-index: -10;
}
.progress-count::before {
  content: "";
  height: 10px;
  width: 20px;
  border-left: 3.5px solid var(--light-mode-color-two);
  border-bottom: 3.5px solid var(--light-mode-color-two);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%) rotate(-45deg);
  transform-origin: center center;
}
.progress-label {
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  color: var(--light-mode-color-three);
}
.current-item .progress-count::before,
.current-item ~ .step-wizard-item .progress-count::before {
  display: none;
}
.current-item ~ .step-wizard-item .progress-count::after {
  height: 10px;
  width: 10px;
}
.current-item ~ .step-wizard-item .progress-label {
  color: var(--light-mode-color-three);
  opacity: 0.7;
}
.current-item .progress-count::after {
  background: #fff;
  border: 2px solid var(--light-mode-color-five);
}
.current-item .progress-count {
  color: var(--light-mode-color-five);
}
</style>
