const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {},
  },

  devServer: {
    host: "25.65.113.21",
  },
});
