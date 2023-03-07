<template>
  <v-app>
    <v-main>
      <nav-bar ref="NavRef" />
      <back-to-page v-if="$route.path !== '/'" />
      <div class="router-container">
        <router-view
          @updateNotifications="updateNotifications"
          @updateBalance="updateBalance"
        />
      </div>
      <notif-circle ref="NotifRef" v-if="condition" :id-user="id_user" />
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
  methods: {
    updateBalance() {
      let nav = this.$refs.NavRef as any;
      nav.updateBalance();
    },
    async updateNotifications() {
      console.log("yes yes yes");
      let notif = this.$refs.NotifRef as any;
      await notif.setNotifsByUserId();
      console.log("no no no");
    },
  },
  computed: {
    condition() {
      return !(
        this.$route.path === "/" ||
        this.$route.path === "/register" ||
        this.$route.path === "/customerRegister" ||
        this.$route.path === "/deliveryRegister" ||
        this.$route.path === "/restaurateurRegister"
      );
    },
  },
});
</script>

<style>
* {
  --light-mode-color-one: #003049;
  --light-mode-color-two: #d62828;
  --light-mode-color-three: #ff7f00;
  --light-mode-color-four: #fcbf49;
  --light-mode-color-five: #eae2b7;

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
  margin-top: 15vh;
  height: 85vh;
}
</style>
