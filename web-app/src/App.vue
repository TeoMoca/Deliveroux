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
    mode: "",
  }),
  beforeCreate() {
    this.$store.commit("initialiseStore");
    (localStorage.getItem("theme") || "") === "dark"
      ? document.querySelector("html")?.classList.add("dark-mode")
      : "";
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
  outline: none !important;
  color: var(--color-seven);
  transition: all 0.3s ease-in-out !important;
}

:root.dark-mode {
  --color-one: #32779c;
  --color-two: #d62828;
  --color-three: #ff7f00;
  --color-four: #fcbf49;
  --color-five: #474746;
  --color-six: #000;
  --color-seven: #fff;
}

:root {
  --color-one: #003049;
  --color-two: #d62828;
  --color-three: #ff7f00;
  --color-four: #fcbf49;
  --color-five: #eae2b7;
  --color-six: #fff;
  --color-seven: #000;
}

.v-main {
  background: var(--color-five);
}

i {
  color: var(--color-one);
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
  background: var(--color-four);
}

.router-container {
  margin-top: 134px;
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--color-seven);
  opacity: 1; /* Firefox */
}
</style>
