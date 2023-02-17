import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import store from "./store";
import axios from "./plugins/axios";
import cookies from "./plugins/cookies";

import type { AxiosInstance } from "axios";
import type { Store } from "vuex";
import { Cookies } from "cookies-ts";

declare module "@vue/runtime-core" {
  interface State {
    count: number;
  }

  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $store: Store<State>;
    $cookies: Cookies;
  }
}

loadFonts();
createApp(App)
  .use(router)
  .use(store)
  .use(cookies)
  .use(axios, { baseUrl: "http://localhost:8000/" })
  .use(vuetify)
  .mount("#app");
