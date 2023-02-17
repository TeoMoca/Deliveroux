<template>
  <v-app>
    <v-main>
      <nav-bar />
      <back-to-page v-if="$route.path !== '/'" />
      <div class="router-container">
        <router-view />
      </div>
      <notif-circle v-if="condition" :id-user="id_user" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavBar from "./components/NavBar.vue";
import NotifCircle from "./components/NotifCircle.vue";
import BackToPage from "./components/BackToPage.vue";

export default defineComponent({
  name: "App",
  components: {
    NavBar,
    NotifCircle,
    BackToPage,
  },
  data: () => ({
    id_user: "",
  }),
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
  created() {
    this.id_user = this.$cookies.get("userId") as string;
  },
  computed: {
    condition() {
      return !(
        this.$route.path === "/" ||
        this.$route.path === "/register" ||
        this.$route.path === "/customerRegister" ||
        this.$route.path === "/deliveryRegister"
      );
    },
  },
});
</script>

<style>
* {
  --light-mode-color-one: #000;
  --light-mode-color-two: #e0e0ce;
  --light-mode-color-three: #a4243b;
  --light-mode-color-four: #ff7f11;
  --light-mode-color-five: #ff3f00;

  --dark-mode-color-one: #fff;
  --dark-mode-color-two: #00000;
  --dark-mode-color-three: #00000;
  --dark-mode-color-four: #00000;
  --dark-mode-color-five: #00000;
}

i {
  color: var(--light-mode-color-two);
}

a {
  text-decoration: none;
  color: inherit;
}

body ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

body ::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 20px;
}

body ::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: var(--light-mode-color-four);
}

.router-container {
  margin-top: 130px;
}
</style>
