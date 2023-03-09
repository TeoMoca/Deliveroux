import Cookies from "cookies-ts";
import type { App } from "vue";

export default {
  install: (app: App) => {
    app.config.globalProperties.$cookies = new Cookies();
  },
};
