const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    vuetify: {},
  },
  devServer: {
    host: "127.0.0.1",
  },
});
